import { type IMainContext, MainContext } from "@context/Main";
import { Seek } from "@services/Seek";
import { getTimeCodes, type ITimeCodes } from "@services/TimeCodes";
import { useContext, useEffect, useState } from "preact/hooks";

export const SkipIntro = () => {
	const { videoNode } = useContext(MainContext) as IMainContext;
	const [show, setShow] = useState(false);
	const [timeCodes, setTimeCodes] = useState<ITimeCodes | null>(null);

	const handleOnClick = () => {
		setShow(false);
		Seek(timeCodes!.skip_credits.endOffsetMs);
	};

	useEffect(() => {
		const timeupdateHandler = () => {
			if (!timeCodes) return;
			const video = videoNode as HTMLVideoElement;
			const msCurrentTime = video.currentTime * 1000;
			const msToShowButton = timeCodes.skip_credits.startOffsetMs;
			const msToHideButton = timeCodes.skip_credits.endOffsetMs;
			if (msCurrentTime >= msToShowButton && msCurrentTime <= msToHideButton) {
				setShow(true);
			}

			if (msCurrentTime >= msToHideButton) {
				setShow(false);
			}
		};

		videoNode!.addEventListener("timeupdate", timeupdateHandler);
		return () => {
			videoNode!.removeEventListener("timeupdate", timeupdateHandler);
		};
	}, [timeCodes]);

	useEffect(() => {
		(async () => {
			const rawTimeCodes = await getTimeCodes();
			setTimeCodes(rawTimeCodes);
		})();
	}, []);

	if (!show) {
		return undefined;
	}

	return (
		<button
			type="button"
			class="bg-white py-[10px] px-[20px] text-[18px] rounded-xs fixed right-[50px] bottom-[150px] text-black font-medium z-999 hover:cursor-pointer"
			onClick={handleOnClick}
		>
			Omitir Intro
		</button>
	);
};
