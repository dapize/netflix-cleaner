import IconGoLeft from "@assets/goLeft.svg?react";
import IconGoRight from "@assets/goRight.svg?react";
import { Button } from "@components/Button";
import { type IMainContext, MainContext } from "@context/Main";
import { Seek } from "@services/Seek";
import { useCallback, useContext, useEffect } from "preact/hooks";

export const SkipButtons = () => {
	const { videoNode } = useContext(MainContext) as IMainContext;

	const handleOnClick = (direction: "right" | "left") => {
		const video = videoNode as HTMLVideoElement;
		const ms = video.currentTime * 1000;
		if (direction === "right") {
			Seek(ms + 10 * 1000);
		} else {
			Seek(ms - 10 * 1000);
		}
	};

	const pressArrowKey = useCallback((event: KeyboardEvent) => {
		if (event.code === "ArrowRight") {
			handleOnClick("right");
		}
		if (event.code === "ArrowLeft") {
			handleOnClick("left");
		}
	}, []);

	useEffect(() => {
		document.addEventListener("keydown", pressArrowKey);
		return () => {
			document.removeEventListener("keydown", pressArrowKey);
		};
	}, []);

	return (
		<>
			<Button SvgIco={IconGoLeft} onClick={() => handleOnClick("left")} />
			<Button SvgIco={IconGoRight} onClick={() => handleOnClick("right")} />
		</>
	);
};
