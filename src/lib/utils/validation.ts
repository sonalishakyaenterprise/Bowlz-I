/**
 * Validate an email address
 */
export function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
}

/**
 * Validate an Indian phone number (10 digits, optional +91)
 */
export function isValidPhone(phone: string): boolean {
  const cleaned = phone.replace(/[\s\-()]/g, "");
  return /^(\+91)?[6-9]\d{9}$/.test(cleaned);
}

/**
 * Validate a non-empty string
 */
export function isNonEmpty(value: string): boolean {
  return value.trim().length > 0;
}

/**
 * Validate minimum string length
 */
export function hasMinLength(value: string, min: number): boolean {
  return value.trim().length >= min;
}

/**
 * Simple form field error messages
 */
export const VALIDATION_MESSAGES = {
  required: "This field is required.",
  invalidEmail: "Please enter a valid email address.",
  invalidPhone: "Please enter a valid 10-digit Indian mobile number.",
  minLength: (n: number) => `Must be at least ${n} characters.`,
} as const;
