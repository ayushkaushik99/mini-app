// for camel case conversion of string
export const toCamelCase = (str) => {
    return str
        .toLowerCase()
        .replace(/\s+/g, '') // Remove spaces
        .replace(/(?:^\w|[A-Z]|\b\w)/g, (word, index) => {
            return index === 0 ? word.toLowerCase() : word.toUpperCase();
        });
};
// for non empty string validation
export const isNonEmptyString = (value) => typeof value === 'string' && value.trim().length > 0;
// for email validation
export const isValidEmail = (value) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(value);
};
// for daye validation
export const isValidDate = (value) => {
    const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
    return dateRegex.test(value);
};
// Check if the value is a valid whole number (no decimals, no non-numeric characters)
export const isValidWholeNumber = (value) => {
    const wholeNumberRegex = /^\d+$/;
    return wholeNumberRegex.test(value);
  };