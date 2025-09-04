import type { IAudioTrack } from "./Audio.d";

export const getAudioTrackList = (): Promise<IAudioTrack[]> => {
  return new Promise((resolve) => {
    const getTrackList = (event: CustomEvent<IAudioTrack[]>) => {
      window.removeEventListener('netflixCCleaner:set:audioTrackList', getTrackList as EventListener);
      resolve(event.detail);
    }
    window.addEventListener('netflixCCleaner:set:audioTrackList', getTrackList as EventListener);
    window.dispatchEvent(new CustomEvent("netflixCCleaner:get:audioTrackList"));
  });
}

export const setAudioTrack = async (track: IAudioTrack): Promise<void> => {
  return new Promise((resolve) => {
    const getTrack = () => {
      window.removeEventListener('netflixCCleaner:get:audioTrack', getTrack as EventListener);
      resolve();
    }
    window.addEventListener('netflixCCleaner:get:audioTrack', getTrack as EventListener);
    window.dispatchEvent(new CustomEvent("netflixCCleaner:set:audioTrack", { detail: track }));
  });
}