const validateSignup = (req, res, next) => {
  const { 
    username,
    email, 
    password,
    confirmPassword,
    firstName, 
    lastName,
    birthday
  } = req.body;

  // Check if all required fields are present
  if (!username || !email || !password || !confirmPassword || !firstName || !lastName || !birthday) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  // Validate username (alphanumeric, 3-20 characters)
  if (!/^[a-zA-Z0-9]{3,20}$/.test(username)) {
    return res.status(400).json({ error: 'Username must be 3-20 alphanumeric characters' });
  }

  // Validate email format
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({ error: 'Invalid email format' });
  }

  // Validate password (at least 6 characters)
  if (password.length < 6) {
    return res.status(400).json({ error: 'Password must be at least 6 characters long' });
  }

  // Validate password match
  if (password !== confirmPassword) {
    return res.status(400).json({ error: 'Passwords do not match' });
  }

  // Validate names (no numbers or special characters)
  const nameRegex = /^[a-zA-Z\s-]{2,30}$/;
  if (!nameRegex.test(firstName) || !nameRegex.test(lastName)) {
    return res.status(400).json({ error: 'Names can only contain letters, spaces, and hyphens (2-30 characters)' });
  }

  // Validate birthday format (YYYY-MM-DD)
  const birthdayRegex = /^\d{4}-\d{2}-\d{2}$/;
  if (!birthdayRegex.test(birthday)) {
    return res.status(400).json({ error: 'Invalid birthday format (YYYY-MM-DD)' });
  }

  // Validate birthday is in the past
  const birthdayDate = new Date(birthday);
  if (birthdayDate > new Date()) {
    return res.status(400).json({ error: 'Birthday must be in the past' });
  }

  next();
};

module.exports = { validateSignup }; 