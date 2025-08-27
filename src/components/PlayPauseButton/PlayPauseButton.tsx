import { useContext, useEffect, useState } from "preact/hooks";
import IconPause from "../../assets/pause.svg?react";
import IconPlay from "../../assets/play.svg?react";
import { type IMainContext, MainContext } from "../../context/Main";
import { Button } from "../Button";

export const PlayPauseButton = () => {
	const { videoNode } = useContext(MainContext) as IMainContext;
	const [playing, setPlaying] = useState(true);

	const onClickHandler = () => {
		const video = videoNode as HTMLVideoElement;
		if (video.paused) {
			video.play();
		} else {
			video.pause();
		}
	};

	const pressSpaceKey = (event: KeyboardEvent) => {
		if (event.code === "Space") {
			onClickHandler();
		}
	};

	useEffect(() => {
		const video = videoNode as HTMLVideoElement;

		const setPlayToFalse = () => {
			setPlaying(false);
		};

		const setPlayToTrue = () => {
			setPlaying(true);
		};

		video.addEventListener("pause", setPlayToFalse);
		video.addEventListener("play", setPlayToTrue);
		document.addEventListener("keydown", pressSpaceKey);

		return () => {
			video.removeEventListener("pause", setPlayToFalse);
			video.removeEventListener("play", setPlayToTrue);
			document.removeEventListener("keydown", pressSpaceKey);
		};
	}, []);

	return <Button SvgIco={playing ? IconPause : IconPlay} onClick={onClickHandler} />;
};
