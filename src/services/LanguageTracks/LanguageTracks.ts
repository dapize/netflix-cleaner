import type { ILanguageTrack } from "./LanguageTracks.d";

export const getAudioTrackList = (): Promise<ILanguageTrack[]> => {
	return new Promise((resolve) => {
		const getTrackList = (event: CustomEvent<ILanguageTrack[]>) => {
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

export const getSubtitleTrackList = (): Promise<ILanguageTrack[]> => {
	return new Promise((resolve) => {
		const getTrackList = (event: CustomEvent<ILanguageTrack[]>) => {
			window.removeEventListener("nc:get:subtitleTrackList:response", getTrackList as EventListener);
			resolve(event.detail);
		};
		window.addEventListener("nc:get:subtitleTrackList:response", getTrackList as EventListener);
		window.dispatchEvent(new CustomEvent("nc:get:subtitleTrackList:request"));
	});
};

export const setSubtitleTrack = async (trackId: string): Promise<void> => {
	return new Promise((resolve) => {
		window.dispatchEvent(new CustomEvent("nc:set:subtitleTrack:request", { detail: trackId }));
		resolve();
	});
};
