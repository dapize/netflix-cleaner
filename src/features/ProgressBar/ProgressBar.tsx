/** biome-ignore-all lint/a11y/noStaticElementInteractions: Is not necessary */
/** biome-ignore-all lint/a11y/useKeyWithClickEvents: Is not necessary */
import { type IMainContext, MainContext } from "@context/Main";
import { Seek } from "@services/Seek";
import { formatTime } from "@utils/formatTime";
import { useContext, useEffect, useRef, useState } from "preact/hooks";
import type { IDataNavigation } from "./ProgressBar.d";

export const ProgressBar = () => {
	const { videoNode } = useContext(MainContext) as IMainContext;
	const [percentageRed, setPercentageRed] = useState<string>("0");
	const [dataNavigation, setDataNavigation] = useState<IDataNavigation>({
		time: "",
		percentage: "0",
	});
	const [lastSecond, setLastSecond] = useState(-1);
	const [timeLeft, setTimeLeft] = useState("");
	const refBar = useRef(null);

	const getPercentageMouse = (event: MouseEvent) => {
		const target = refBar.current as unknown as HTMLDivElement;
		const rect = target.getBoundingClientRect();
		const widthBar = rect.width;
		const clickX = event.clientX - rect.left;
		return (clickX * 100) / widthBar;
	};

	const handleOnClickProgress = (event: MouseEvent) => {
		const percentage = getPercentageMouse(event);
		const realTime = (percentage * (videoNode as HTMLVideoElement).duration) / 100;
		Seek(realTime * 1000);
	};

	const onMouseMoveHandler = (event: MouseEvent) => {
		const percentage = getPercentageMouse(event);
		const realTime = (percentage * (videoNode as HTMLVideoElement).duration) / 100;
		setDataNavigation({
			time: formatTime(realTime),
			percentage: percentage.toFixed(2),
		});
	};

	useEffect(() => {
		const timeupdateHandler = () => {
			const video = videoNode as HTMLVideoElement;
			const currentTime = video.currentTime;
			if (Number.isNaN(currentTime)) return;
			const currentSecond = Math.floor(video.currentTime);
			if (currentSecond !== lastSecond) {
				setLastSecond(currentSecond);
				const duration = video.duration;
				const redPercentage = ((currentTime / duration) * 100).toFixed(2);
				setPercentageRed(redPercentage);
				const getTimeLeft = formatTime(duration - currentTime);
				setTimeLeft(getTimeLeft);
			}
		};

		videoNode!.addEventListener("timeupdate", timeupdateHandler);
		return () => {
			videoNode!.removeEventListener("timeupdate", timeupdateHandler);
		};
	}, []);

	return (
		<div class="flex justify-between items-center w-full gap-x-4">
			<div
				class="w-full pointer-events-auto h-[30px] flex justify-center items-center group hover:cursor-pointer"
				onClick={handleOnClickProgress}
				onMouseMove={onMouseMoveHandler}
				ref={refBar}
			>
				<div class="h-[6px] bg-white/30 rounded-[3px] relative w-full transition-all duration-200 group-hover:h-[10px]">
					<div
						class="h-full rounded-[3px] bg-white/65 opacity-0 absolute left-0 top-0 w-[250px] transition-opacity group-hover:opacity-[1] duration-300"
						style={{ width: `${dataNavigation.percentage}%` }}
					>
						<span class="absolute bottom-5 right-[-20px] text-white text-[20px] font-semibold">{dataNavigation.time}</span>
					</div>
					<div class="h-full rounded-[3px] bg-[#e50914] absolute left-0 top-0" style={{ width: `${percentageRed}%` }}>
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
