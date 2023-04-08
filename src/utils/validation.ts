/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
}

export { isValidEmail }
