export function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
}

export function isValidPassword(password) {
  return password.length >= 8;
}

export function isValidPhone(phone) {
  return /^01[0125]\d{8}$/.test(phone.trim());
}