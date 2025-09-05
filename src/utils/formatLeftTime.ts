export const formatLeftTime = (rawSeconds: number) => {
	const hours = Math.floor(rawSeconds / 3600);
	const minutes = Math.floor((rawSeconds - hours * 3600) / 60);
	const seconds = rawSeconds - hours * 3600 - minutes * 60;
	return `${hours.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")}:${Math.round(seconds)}`;
};
