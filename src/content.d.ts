export interface ISvgIcons {
  play: string;
  pause: string;
  back: string;
  fullscreen: string;
  exitFullscreen: string;
}

export interface IPlayerElements {
  controlsOverlay: HTMLDivElement;
  playPauseBtn: HTMLButtonElement;
  progressContainer: HTMLDivElement;
  progressBar: HTMLDivElement;
  progressThumb: HTMLDivElement;
  timeDisplay: HTMLSpanElement;
  fullscreenBtn: HTMLButtonElement;
  backBtn: HTMLButtonElement;
}
