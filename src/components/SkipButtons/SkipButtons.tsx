import { useCallback, useContext, useEffect } from "preact/hooks";
import IconGoLeft from "../../assets/goLeft.svg?react";
import IconGoRight from "../../assets/goRight.svg?react";
import { type IMainContext, MainContext } from "../../context/Main";
import { Button } from "../Button";

export const SkipButtons = () => {
	const { videoNode } = useContext(MainContext) as IMainContext;

	const handleOnClick = (direction: "right" | "left") => {
		const video = videoNode as HTMLVideoElement;
		if (direction === "right") {
			video.currentTime += 10;
		} else {
			video.currentTime -= 10;
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
		document.addEventListener("keyup", pressArrowKey);
		return () => {
			document.removeEventListener("keyup", pressArrowKey);
		};
	}, []);

	return (
		<>
			<Button SvgIco={IconGoLeft} onClick={() => handleOnClick("left")} />
			<Button SvgIco={IconGoRight} onClick={() => handleOnClick("right")} />
		</>
	);
};
