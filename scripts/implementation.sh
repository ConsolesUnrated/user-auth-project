#!/bin/bash
# implementation.sh
# Secure PostgreSQL, configure IPTables firewall rules, and set up Snort IDS.

set -euo pipefail

# ----------------------------
# Secure PostgreSQL Automatically
# ----------------------------

# 1. Set a strong password for the default postgres user
#    → Replace 'StrongPostgresPasswordReplace' with a secure secret
sudo -u postgres psql -c "ALTER USER postgres WITH PASSWORD 'StrongPostgresPasswordReplace';"

# 2. Remove any empty-role accounts
sudo -u postgres psql -tA -c "SELECT rolname FROM pg_roles WHERE rolname = ''" | \
  grep -q . && sudo -u postgres psql -c "DROP ROLE \"\";"

# 3. Drop any default/test database
sudo -u postgres psql -c "DROP DATABASE IF EXISTS test;"

# 4. Lock down remote access
#    - Only listen on localhost
#    - Enforce md5 authentication for all local connections
PG_CONF="/etc/postgresql/$(ls /etc/postgresql)/main/postgresql.conf"
HBA_CONF="/etc/postgresql/$(ls /etc/postgresql)/main/pg_hba.conf"

# Backup originals
sudo cp "$PG_CONF" "$PG_CONF.bak"
sudo cp "$HBA_CONF" "$HBA_CONF.bak"

# Listen only on localhost
sudo sed -ri "s/^#?(listen_addresses)\s*=.*/\1 = 'localhost'/" "$PG_CONF"

# In pg_hba.conf, replace any host‑all‑all lines with strict local md5
sudo sed -ri "s!^host\s+all\s+all\s+0\.0\.0\.0/0\s+\w+!# disabled remote access!" "$HBA_CONF"
sudo sed -ri "s!^host\s+all\s+all\s+::/0\s+\w+!# disabled remote access!" "$HBA_CONF"
# Ensure local connections use md5
sudo sed -ri "s!^(local\s+all\s+all\s+).*!\1md5!" "$HBA_CONF"

# Reload PostgreSQL to apply changes
sudo systemctl restart postgresql

echo "PostgreSQL hardened: password set, empty roles removed, remote access disabled."

# ----------------------------
# IPTables Firewall Configuration
# ----------------------------

# Flush all existing rules
sudo iptables -F
sudo iptables -X
sudo iptables -t nat -F
sudo iptables -t nat -X
sudo iptables -t mangle -F
sudo iptables -t mangle -X

# Default policies
sudo iptables -P INPUT DROP
sudo iptables -P FORWARD DROP
sudo iptables -P OUTPUT ACCEPT

# Allow loopback
sudo iptables -A INPUT -i lo -j ACCEPT

# Allow established/related
sudo iptables -A INPUT -m conntrack --ctstate ESTABLISHED,RELATED -j ACCEPT

# SSH, HTTP, HTTPS, and Node.js backend
sudo iptables -A INPUT -p tcp --dport 22   -m conntrack --ctstate NEW -j ACCEPT
sudo iptables -A INPUT -p tcp --dport 80   -m conntrack --ctstate NEW -j ACCEPT
sudo iptables -A INPUT -p tcp --dport 443  -m conntrack --ctstate NEW -j ACCEPT
sudo iptables -A INPUT -p tcp --dport 3000 -m conntrack --ctstate NEW -j ACCEPT

# Allow PostgreSQL only from localhost
sudo iptables -A INPUT -p tcp -s 127.0.0.1 --dport 5432 -m conntrack --ctstate NEW -j ACCEPT

# Log and drop everything else
sudo iptables -A INPUT -j LOG --log-prefix "IPTables-Dropped: " --log-level 4

# Persist rules
sudo netfilter-persistent save

echo "IPTables rules applied and saved."

# ----------------------------
# Snort IDS Configuration
# ----------------------------

# Backup Snort config
sudo cp /etc/snort/snort.conf /etc/snort/snort.conf.bak

# Add a simple ICMP-detect rule
echo 'alert icmp any any -> any any (msg:"ICMP Packet Detected"; sid:1000001; rev:1;)' | \
  sudo tee -a /etc/snort/rules/local.rules

# Restart Snort
sudo systemctl restart snort

echo "Snort IDS reloaded with custom rules."
