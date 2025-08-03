export const generateRandomId = (length = 8): string => {
  return Math.random()
    .toString(36)
    .substring(2, length + 2);
};

export const formatTime = (seconds: number): string => {
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins}:${secs.toString().padStart(2, "0")}`;
}
