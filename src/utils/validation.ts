import DOMPurify from 'dompurify';

export const sanitizeInput = (input: string) => {
  return DOMPurify.sanitize(input, { ALLOWED_TAGS: [], ALLOWED_ATTR: [] });
};
export const validateInput = (input: string) => {
  // Allow only alphanumeric characters and spaces
  const regex = /^[a-zA-Z0-9\s]*$/;
  return regex.test(input);
};
