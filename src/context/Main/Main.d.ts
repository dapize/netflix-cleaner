import type { Dispatch, StateUpdater } from "preact/hooks";

export interface IMetadata {
	title: string;
	subTitle: string;
}

export interface IMainContext {
	watchVideoNode: undefined | Element;
	setWatchVideoNode: Dispatch<StateUpdater<undefined | Element>>;
	videoNode: undefined | HTMLVideoElement;
	setVideoNode: Dispatch<StateUpdater<undefined | HTMLVideoElement>>;
	metadata: undefined | IMetadata;
	setMetadata: Dispatch<StateUpdater<undefined | IMetadata>>;
}
