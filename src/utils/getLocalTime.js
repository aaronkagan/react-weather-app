export default function getLocalTime(timezoneOffset) {
  const utcDate = new Date();
  const offsetInMilliseconds = timezoneOffset * 1000;
  const localDate = new Date(utcDate.getTime() + offsetInMilliseconds);
  const hours = localDate.getUTCHours().toString().padStart(2, '0');
  const minutes = localDate.getUTCMinutes().toString().padStart(2, '0');
  if (hours > 12) {
    return `${hours - 12}:${minutes} PM`;
  }
  if (hours < 10) {
    return `${hours[1]}:${minutes} AM`;
  }
  return `${hours}:${minutes} AM`;
}
