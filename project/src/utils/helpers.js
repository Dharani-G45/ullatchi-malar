/**
 * Format a date string to a more readable format
 * @param {string} dateString - The date string to format
 * @returns {string} - The formatted date string
 */
export const formatDate = (dateString) => {
  const options = { 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  }
  
  return new Date(dateString).toLocaleDateString('en-US', options)
}

/**
 * Truncate a string to a specified length
 * @param {string} str - The string to truncate
 * @param {number} length - The maximum length
 * @returns {string} - The truncated string
 */
export const truncateText = (str, length = 100) => {
  if (!str) return ''
  if (str.length <= length) return str
  
  return str.slice(0, length) + '...'
}