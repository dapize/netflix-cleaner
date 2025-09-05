import { type IMainContext, MainContext } from "@context/Main";
import { formatLeftTime } from "@utils/formatLeftTime";
import { useCallback, useContext, useEffect, useState } from "preact/hooks";

export const ProgressBar = () => {
	const { videoNode } = useContext(MainContext) as IMainContext;
	const [percentage, setPercentage] = useState<string>("0");
	const [lastSecond, setLastSecond] = useState(-1);
	const [timeLeft, setTimeLeft] = useState("");

	const timeupdateHandler = useCallback(() => {
		const video = videoNode as HTMLVideoElement;
		const currentTime = video.currentTime;
		if (Number.isNaN(currentTime)) return;
		const currentSecond = Math.floor(video.currentTime);
		if (currentSecond !== lastSecond) {
			setLastSecond(currentSecond);
			const duration = video.duration;
			const percentage = ((currentTime / duration) * 100).toFixed(2);
			setPercentage(percentage);
			const getTimeLeft = formatLeftTime(duration - currentTime);
			setTimeLeft(getTimeLeft);
		}
	}, []);

	useEffect(() => {
		videoNode!.addEventListener("timeupdate", timeupdateHandler);
		return () => {
			videoNode!.removeEventListener("timeupdate", timeupdateHandler);
		};
	}, []);

	return (
		<div class="flex justify-between items-center w-full">
			<div class="h-[6px] bg-white/30 rounded-[3px] relative w-[calc(100%-90px)]">
				<div class="h-full rounded-[3px] bg-[#e50914]" style={{ width: `${percentage}%` }}></div>
			</div>
			<span class="text-[20px] text-white shrink-0 w-[50px] flex justify-end items-center">{timeLeft}</span>
		</div>
	);
};
