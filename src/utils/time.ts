export const formatTime = (date: string) => {
  const d = new Date(date);
  const hours = d.getHours();
  const minutes = d.getMinutes();

  return `${hours.toString().padStart(2, "0")}:${minutes
    .toString()
    .padStart(2, "0")}`;
};
