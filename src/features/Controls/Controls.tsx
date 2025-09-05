import { AudioAndSubtitles } from "@features/AudioAndSubtitles";
import { BackButton } from "@features/BackButton";
import { FullscreenButton } from "@features/FullscreenButton";
import { Metadata } from "@features/Metadata";
import { PlayPauseButton } from "@features/PlayPauseButton";
import { ProgressBar } from "@features/ProgressBar";
import { SkipButtons } from "@features/SkipButtons";
import { VolumeButton } from "@features/VolumeButton";
import { memo } from "preact/compat";

export const Controls = memo(() => {
	return (
		<>
			<div class="absolute p-[30px] top-0 left-0 w-full">
				<BackButton />
			</div>
			<div class="absolute p-[30px] bottom-0 left-0 w-full">
				<ProgressBar />
				<div class="flex justify-start items-center mx-[-20px] gap-x-1">
					<PlayPauseButton />
					<VolumeButton />
					<SkipButtons />
					<Metadata />
					<div class="mr-auto"></div>
					<AudioAndSubtitles />
					<FullscreenButton />
				</div>
			</div>
		</>
	);
});
