import { memo } from "preact/compat";
import { BackButton } from "../BackButton";
import { FullscreenButton } from "../FullscreenButton";
import { Metadata } from "../Metadata";
import { PlayPauseButton } from "../PlayPauseButton";
import { ProgressBar } from "../ProgressBar";
import { SkipButtons } from "../SkipButtons";

export const Controls = memo(() => {
	return (
		<>
			<div class="absolute p-[30px] top-0 left-0 w-full">
				<BackButton />
			</div>
			<div class="absolute p-[30px] bottom-0 left-0 w-full">
				<ProgressBar />
				<div class="flex justify-start items-center mx-[-20px] gap-x-2">
					<PlayPauseButton />
					<SkipButtons />
					<Metadata />
					<FullscreenButton />
				</div>
			</div>
		</>
	);
});
