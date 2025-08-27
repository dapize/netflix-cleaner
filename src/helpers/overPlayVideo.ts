import { isVideoPlaying } from "../utils/isVideoPlaying";

export const overPlayVideo = (video: HTMLVideoElement) => {
	if (!isVideoPlaying(video)) {
		video.play();
		return;
	}
	let times = 0;
	const rePlayInterval = setInterval(() => {
		video.play();
		if (times >= 3) {
			clearInterval(rePlayInterval);
			return;
		}
		times += 1;
	}, 500);
};
