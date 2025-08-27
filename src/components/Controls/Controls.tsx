import { memo } from "preact/compat"
import { BackButton } from "../BackButton"
import { FullscreenButton } from "../FullscreenButton"
import { PlayPauseButton } from "../PlayPauseButton"
import { ProgressBar } from "../ProgressBar"
import { Metadata } from "../Metadata"

export const Controls = memo(() => {
  return (
    <>
      <div class="absolute p-[30px] top-0 left-0 w-full">
        <BackButton />
      </div>
      <div class="absolute p-[30px] bottom-0 left-0 w-full">
        <ProgressBar />
        <div class="flex justify-start items-center mx-[-20px]">
          <PlayPauseButton />
          <Metadata />
          <FullscreenButton />
        </div>
      </div>
    </>
  )
})
