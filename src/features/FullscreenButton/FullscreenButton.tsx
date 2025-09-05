import IconFullscreenExit from "@assets/exitFullscreen.svg?react";
import IconFullscreen from "@assets/fullscreen.svg?react";
import { Button } from "@components/Button";
import { type IMainContext, MainContext } from "@context/Main";
import { useCallback, useContext, useEffect, useState } from "preact/hooks";

export const FullscreenButton = () => {
	const { watchVideoNode } = useContext(MainContext) as IMainContext;
	const [inFullscreen, setInFullscreen] = useState(false);

	const onClickHandler = () => {
		const wrapperVideo = watchVideoNode as HTMLElement;
		if (!inFullscreen) {
			wrapperVideo.requestFullscreen();
		} else {
			document.exitFullscreen();
		}
	};

	const updateIconFullscreen = useCallback(() => {
		setInFullscreen(Boolean(document.fullscreenElement));
	}, []);

	const pressKeyF = useCallback((event: KeyboardEvent) => {
		if (event.repeat) return;
		if (event.code === "KeyF") onClickHandler();
	}, []);

	useEffect(() => {
		document.addEventListener("fullscreenchange", updateIconFullscreen);
		document.addEventListener("keydown", pressKeyF);

		return () => {
			document.removeEventListener("fullscreenchange", updateIconFullscreen);
			document.removeEventListener("keydown", pressKeyF);
		};
	}, []);

	return <Button SvgIco={inFullscreen ? IconFullscreenExit : IconFullscreen} onClick={onClickHandler} />;
};
