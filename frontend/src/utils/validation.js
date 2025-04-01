export const passwordRequirements = {
  length: (password) => password.length >= 12,
  uppercase: (password) => /[A-Z]/.test(password),
  lowercase: (password) => /[a-z]/.test(password),
  number: (password) => /[0-9]/.test(password),
  special: (password) => /[!@#$%^&*(),.?":{}|<>]/.test(password),
};

export const validateField = (name, value, formData = {}) => {
  let error = '';
  switch (name) {
    case 'firstName':
    case 'lastName':
    case 'username':
    case 'email':
    case 'password':
    case 'confirmPassword':
    case 'birthday':
      if (!value.trim()) error = 'Required';
      break;
    default:
      break;
  }
  return error;
}; 