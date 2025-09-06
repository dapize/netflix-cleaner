export const formatTime = (rawSeconds: number) => {
	const hours = Math.floor(rawSeconds / 3600);
	const minutes = Math.floor((rawSeconds - hours * 3600) / 60);
	const seconds = rawSeconds - hours * 3600 - minutes * 60;
	const time = [minutes.toString().padStart(2, "0"), Math.round(seconds)];
	if (rawSeconds > 3600) time.unshift(hours.toString().padStart(2, "0"));
	return time.join(":");
};
