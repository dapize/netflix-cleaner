/** biome-ignore-all lint/a11y/noStaticElementInteractions: <explanation> */
/** biome-ignore-all lint/a11y/useKeyWithClickEvents: <explanation> */
import { type IMainContext, MainContext } from "@context/Main";
import { Seek } from "@services/Seek";
import { formatLeftTime } from "@utils/formatLeftTime";
import type { MouseEvent } from "preact/compat";
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

	const handleOnClickProgress = (event: MouseEvent<HTMLDivElement>) => {
		const target = event.target as HTMLDivElement;
		const rect = target.getBoundingClientRect();
		const clickX = event.clientX - rect.left;
		const width = rect.width;
		const percentage = clickX / width;
		const realTime = percentage * (videoNode as HTMLVideoElement).duration;
		Seek(realTime * 1000);
	};

	return (
		<div class="flex justify-between items-center w-full gap-x-4">
			<div
				class="w-full pointer-events-auto h-[30px] flex justify-center items-center group hover:cursor-pointer"
				onClick={handleOnClickProgress}
			>
				<div class="h-[6px] bg-white/30 rounded-[3px] relative w-full transition-all duration-200 group-hover:h-[10px]">
					<div class="h-full rounded-[3px] bg-[#e50914] absolute" style={{ width: `${percentage}%` }}>
						<button
							class="h-[20px] w-[20px] rounded-[50%] bg-[#e50914] absolute right-[-10px] top-1/2 [transform:translateY(-50%)] hover:cursor-pointer"
							type="button"
						></button>
					</div>
				</div>
			</div>
			<span class="text-[18px] text-white shrink-0 w-[50px] flex justify-end items-center">{timeLeft}</span>
		</div>
	);
};
