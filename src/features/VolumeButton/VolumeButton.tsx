import IconVolume from "@assets/volume.svg?react";
import IconVolumeMuted from "@assets/volume-muted.svg?react";
import { Button } from "@components/Button";
import { type IMainContext, MainContext } from "@context/Main";
import { useContext, useEffect, useState } from "preact/hooks";

export const VolumeButton = () => {
	const { videoNode } = useContext(MainContext) as IMainContext;
	const [muted, setMuted] = useState(false);

	const handleOnClick = () => {
		const video = videoNode as HTMLVideoElement;
		const newMutedState = !video.muted;
		video.muted = newMutedState;
		setMuted(newMutedState);
	};

	useEffect(() => {
		const video = videoNode as HTMLVideoElement;
		setMuted(video.muted);
	}, []);

	return <Button SvgIco={muted ? IconVolumeMuted : IconVolume} onClick={handleOnClick} />;
};
