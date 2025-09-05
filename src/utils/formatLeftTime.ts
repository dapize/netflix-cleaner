export const formatLeftTime = (rawSeconds: number) => {
	const view: string[] = [];
	const hours = Math.floor(rawSeconds / 3600);
	if (rawSeconds > 3600) view.push(`${hours.toString().padStart(2, "0")}`);
	const minutes = Math.floor((rawSeconds - hours * 3600) / 60);
	view.push(`${minutes.toString().padStart(2, "0")}`);
	const seconds = rawSeconds - hours * 3600 - minutes * 60;
	view.push(`${Math.round(seconds)}`);
	return view.join(":");
};
