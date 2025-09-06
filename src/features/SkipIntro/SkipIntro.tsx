import { type IMainContext, MainContext } from "@context/Main";
import { Seek } from "@services/Seek";
import { getTimeCodes, type ITimeCodes } from "@services/TimeCodes";
import { useContext, useEffect, useRef, useState } from "preact/hooks";

export const SkipIntro = () => {
	const { videoNode } = useContext(MainContext) as IMainContext;
	const [show, setShow] = useState(false);
	const timeCodesRef = useRef<ITimeCodes | null>(null);

	const handleOnClick = () => {
		setShow(false);
		const timeCodes = timeCodesRef.current!;
		const msToGo = timeCodes.skip_credits ? timeCodes.skip_credits.endOffsetMs : timeCodes.recap!.endOffsetMs;
		Seek(msToGo);
	};

	useEffect(() => {
		const timeupdateHandler = () => {
			const timeCodes = timeCodesRef.current;
			if (!timeCodes) return;
			const video = videoNode as HTMLVideoElement;
			const msCurrentTime = video.currentTime * 1000;
			const msToShowButton = timeCodes.skip_credits ? timeCodes.skip_credits.startOffsetMs : timeCodes.recap!.startOffsetMs;
			const msToHideButton = timeCodes.skip_credits ? timeCodes.skip_credits.endOffsetMs : timeCodes.recap!.endOffsetMs;

			if (msCurrentTime >= msToShowButton && msCurrentTime <= msToHideButton) {
				setShow(true);
			}

			if (msCurrentTime >= msToHideButton || msCurrentTime <= msToShowButton) {
				setShow(false);
			}
		};

		videoNode!.addEventListener("timeupdate", timeupdateHandler);
		return () => {
			videoNode!.removeEventListener("timeupdate", timeupdateHandler);
		};
	}, []);

	useEffect(() => {
		(async () => {
			const timeCodes = await getTimeCodes();
			timeCodesRef.current = timeCodes;
		})();
	}, []);

	if (!show) {
		return undefined;
	}

	return (
		<button
			type="button"
			class="bg-white hover:bg-white/95 py-[10px] px-[20px] text-[18px] rounded-xs fixed right-[50px] bottom-[150px] text-black font-medium z-999 hover:cursor-pointer"
			onClick={handleOnClick}
		>
			Omitir Intro
		</button>
	);
};
