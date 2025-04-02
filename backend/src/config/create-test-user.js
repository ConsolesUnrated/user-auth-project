const { query } = require('./db');
const bcrypt = require('bcrypt');

async function createTestUser() {
  try {
    // Test user data
    const username = 'testuser';
    const email = 'test@example.com';
    const password = 'test123';
    const firstName = 'Test';
    const lastName = 'User';
    const birthday = '1990-01-01'; // YYYY-MM-DD format

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(password, salt);

    // Insert user
    const result = await query(
      'INSERT INTO users (username, email, password_hash, first_name, last_name, birthday, is_email_verified) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *',
      [username, email, passwordHash, firstName, lastName, birthday, true]
    );

    const user = result.rows[0];
    console.log('Test user created successfully:');
    console.log('Username:', user.username);
    console.log('Email:', user.email);
    console.log('Password:', password);
    console.log('First Name:', user.first_name);
    console.log('Last Name:', user.last_name);
    console.log('Birthday:', user.birthday);
    console.log('User ID:', user.id);

    // Insert security questions
    await query(
      'INSERT INTO security_questions (user_id, question1, answer1, question2, answer2, question3, answer3) VALUES ($1, $2, $3, $4, $5, $6, $7)',
      [
        user.id,
        'What is your favorite color?',
        'blue',
        'What is your pet\'s name?',
        'spot',
        'What city were you born in?',
        'london'
      ]
    );

    console.log('Security questions added for test user');
  } catch (error) {
    console.error('Error creating test user:', error);
  }
}

createTestUser(); 