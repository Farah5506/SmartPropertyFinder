export function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
}

export function isValidPassword(password) {
  return password.length >= 8;
}

// Egyptian mobile numbers: 010 / 011 / 012 / 015 + 8 digits
export function isValidPhone(phone) {
  return /^01[0125]\d{8}$/.test(phone.trim());
}