export const formatDate = (date) => {
  // Make sure we're working with a Date object
  if (!(date instanceof Date)) {
    // Try to convert to Date if it's not already
    date = new Date(date);
  }
  
  // Use the date instance (not the Date constructor) to call toLocaleDateString
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  });
};
