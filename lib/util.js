/**
 * https://stackoverflow.com/questions/14212527/how-to-set-default-value-to-the-inputtype-date
 * @param {Any} dateStr Date instance, timestamp, UTC string, etc
 * @return {String} date string in the format - yyyy-mm-dd
 */
export const to_YY_MM_DD = (dateStr) => {
  const date = new Date(dateStr);
  const year = date.getFullYear();
  const month =
    date.getMonth() < 9 ? `0${date.getMonth() + 1}` : date.getMonth() + 1;
  const day = date.getDate() < 9 ? `0${date.getDate()}` : date.getDate();

  return `${year}-${month}-${day}`;
};

/**
 * Convert milliseconds into hours
 * @param {Number} ms milliseconds
 * @returns {Number} hour
 */
export const msToHr = (ms) => {
  return Number((ms / (1000 * 60 * 60)).toFixed(2));
};
