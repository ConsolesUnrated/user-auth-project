# Replace the APP_DB, APP_USER, and APP_PASS placeholders with your actual database name, username, and a strong password.

# Make sure your Node app’s process.env or config points to postgres://$APP_USER:$APP_PASS@localhost:5432/$APP_DB.

# Once installed, you can deploy your app with pm2 start dist/index.js --name your-app (or similar) and pm2 save.

# READ ABOVE

#!/bin/bash
# installation.sh
# Installs and configures Apache reverse‑proxy, Node.js/PM2, PostgreSQL, and security tools.

set -euo pipefail

# ----------------------------
# 1. Update & Upgrade System
# ----------------------------
sudo apt-get update
sudo apt-get upgrade -y

# ----------------------------
# 2. Install Apache Web Server
# ----------------------------
sudo apt-get install -y apache2

# ----------------------------
# 3. Install PostgreSQL
# ----------------------------
sudo apt-get install -y postgresql postgresql-contrib

# ----------------------------
# 4. Create App Database & User
# ----------------------------
# TODO: replace APP_DB, APP_USER, APP_PASS with your values
APP_DB="your_app_db"
APP_USER="your_app_user"
APP_PASS="YourStrongPasswordReplace"

sudo -u postgres psql <<EOF
-- create a role & database for your Node app
CREATE USER $APP_USER WITH PASSWORD '$APP_PASS';
CREATE DATABASE $APP_DB OWNER $APP_USER;
\q
EOF

# ----------------------------
# 5. Install Node.js & PM2
# ----------------------------
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs build-essential
sudo npm install -g pm2

# ----------------------------
# 6. Configure Apache as Reverse Proxy
# ----------------------------
sudo a2enmod proxy proxy_http

# Back up default vhost
sudo cp /etc/apache2/sites-available/000-default.conf /etc/apache2/sites-available/000-default.conf.bak

# Write new proxy vhost
sudo tee /etc/apache2/sites-available/000-default.conf > /dev/null <<EOF
<VirtualHost *:80>
    ServerAdmin webmaster@localhost
    DocumentRoot /var/www/html

    ProxyRequests Off
    ProxyPass        / http://localhost:3000/
    ProxyPassReverse / http://localhost:3000/

    <Directory "/var/www/html">
        Options Indexes FollowSymLinks
        AllowOverride All
        Require all granted
    </Directory>
</VirtualHost>
EOF

sudo systemctl restart apache2

# ----------------------------
# 7. Install Security Tools
# ----------------------------
sudo apt-get install -y snort iptables-persistent

# Enable & start Snort
sudo systemctl enable snort
sudo systemctl restart snort

echo "Installation complete:
 • Apache configured as reverse proxy (port 80 → 3000)
 • PostgreSQL installed; DB '$APP_DB' and user '$APP_USER' created
 • Node.js (v18), build-essential, and PM2 installed
 • Snort & iptables-persistent installed and enabled."
