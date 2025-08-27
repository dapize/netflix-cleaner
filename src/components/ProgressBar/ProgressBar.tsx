import { useCallback, useContext, useEffect, useState } from "preact/hooks";
import { type IMainContext, MainContext } from "../../context/Main";
import { formatLeftTime } from "../../utils/formatLeftTime";

export const ProgressBar = () => {
	const { videoNode } = useContext(MainContext) as IMainContext;
	const [percentage, setPercentage] = useState<string>("0");
	const [lastSecond, setLastSecond] = useState(-1);
	const [timeLeft, setTimeLeft] = useState("");

	const timeupdateHandler = useCallback(() => {
		const video = videoNode as HTMLVideoElement;
		const currentTime = video.currentTime;
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

	const pressArrowKey = useCallback((event: KeyboardEvent) => {
		const video = videoNode as HTMLVideoElement;
		if (event.code === "ArrowRight") {
			video.currentTime += 10;
		}
		if (event.code === "ArrowLeft") {
			video.currentTime -= 10;
		}
	}, []);

	useEffect(() => {
		videoNode!.addEventListener("timeupdate", timeupdateHandler);
		document.addEventListener("keydown", pressArrowKey);
		return () => {
			videoNode!.removeEventListener("timeupdate", timeupdateHandler);
			document.removeEventListener("keydown", pressArrowKey);
		};
	}, []);

	return (
		<div class="flex justify-between items-center w-full mb-2">
			<div class="h-[6px] bg-white/30 rounded-[3px] relative w-[calc(100%-70px)]">
				<div class="h-full rounded-[3px] bg-[#e50914]" style={{ width: `${percentage}%` }}></div>
			</div>
			<span class="text-[22px] text-white shrink-0 w-[50px] flex justify-end items-center">{timeLeft}</span>
		</div>
	);
};
