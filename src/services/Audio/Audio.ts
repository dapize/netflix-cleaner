import type { IAudioTrack } from "./Audio.d";

export const getAudioTrack = (): Promise<IAudioTrack["trackId"]> => {
	return new Promise((resolve) => {
		const getTrack = (event: CustomEvent<string>) => {
			window.removeEventListener("nc:get:audioTrack:response", getTrack as EventListener);
			resolve(event.detail);
		};
		window.addEventListener("nc:get:audioTrack:response", getTrack as EventListener);
		window.dispatchEvent(new CustomEvent("nc:get:audioTrack:request"));
	});
};

export const getAudioTrackList = (): Promise<IAudioTrack[]> => {
	return new Promise((resolve) => {
		const getTrackList = (event: CustomEvent<IAudioTrack[]>) => {
			window.removeEventListener("nc:get:audioTrackList:response", getTrackList as EventListener);
			resolve(event.detail);
		};
		window.addEventListener("nc:get:audioTrackList:response", getTrackList as EventListener);
		window.dispatchEvent(new CustomEvent("nc:get:audioTrackList:request"));
	});
};

export const setAudioTrack = async (trackId: string): Promise<void> => {
	return new Promise((resolve) => {
		window.dispatchEvent(new CustomEvent("nc:set:audioTrack:request", { detail: trackId }));
		resolve();
	});
};
