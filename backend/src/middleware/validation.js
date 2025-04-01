const validateSignup = (req, res, next) => {
  const { firstName, lastName, username, email, password, birthday } = req.body;
  const errors = {};

  // First Name validation
  if (!firstName || firstName.trim().length === 0) {
    errors.firstName = 'First name is required';
  }

  // Last Name validation
  if (!lastName || lastName.trim().length === 0) {
    errors.lastName = 'Last name is required';
  }

  // Username validation
  if (!username || username.trim().length < 3) {
    errors.username = 'Username must be at least 3 characters';
  }

  // Email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!email || !emailRegex.test(email)) {
    errors.email = 'Valid email is required';
  }

  // Password validation
  const passwordErrors = [];
  if (!password || password.length < 12) passwordErrors.push('at least 12 characters');
  if (!/[A-Z]/.test(password)) passwordErrors.push('an uppercase letter');
  if (!/[a-z]/.test(password)) passwordErrors.push('a lowercase letter');
  if (!/[0-9]/.test(password)) passwordErrors.push('a number');
  if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) passwordErrors.push('a special character');
  
  if (passwordErrors.length > 0) {
    errors.password = `Password must contain ${passwordErrors.join(', ')}`;
  }

  // Birthday validation
  const birthdayRegex = /^(0[1-9]|1[0-2])\/(0[1-9]|[12]\d|3[01])\/\d{4}$/;
  if (!birthday || !birthdayRegex.test(birthday)) {
    errors.birthday = 'Valid birthday in MM/DD/YYYY format is required';
  } else {
    // Additional date validation (e.g., check if it's a valid date, not in future)
    const [month, day, year] = birthday.split('/').map(Number);
    const birthdayDate = new Date(year, month - 1, day);
    const today = new Date();
    
    if (birthdayDate > today) {
      errors.birthday = 'Birthday cannot be in the future';
    }
    
    if (year < 1900) {
      errors.birthday = 'Invalid birth year';
    }
  }

  if (Object.keys(errors).length > 0) {
    return res.status(400).json({ 
      success: false, 
      errors 
    });
  }

  next();
};

module.exports = {
  validateSignup
}; 