/**
 * Formats a date string or Date object into a human-readable format.
 * @param {string | Date} dateString dateString - The date string or Date object to format
 * @returns {string } Formatted date ('MM/DD/YYYY, HH:MM AM/PM')
 */
export const formatDateTime = (dateString: string | Date): string => {
  const date = typeof dateString === "string"
    ? new Date(dateString)
    : dateString;
  return date.toLocaleString(undefined, {
    year: "numeric",
    month: "numeric",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
};
