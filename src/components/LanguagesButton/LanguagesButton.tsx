/** biome-ignore-all lint/a11y/useKeyWithClickEvents: No necesario */
import { useEffect, useRef, useState } from "preact/hooks";
import IconCheck from "../../assets/check.svg?react";
import IconClose from "../../assets/close.svg?react";
import IconLanguages from "../../assets/languages.svg?react";
import { getAudioTrackList, type IAudioTrack, setAudioTrack } from "../../services/Audio";
import { Button } from "../Button";

export const LanguagesButton = () => {
	const [showList, setShowList] = useState(false);
	const [audioTrackList, setAudioTrackList] = useState<IAudioTrack[]>([]);
	const refDisplay = useRef<boolean>(false);

	const onClickHandler = () => {
		refDisplay.current = true;
		setShowList(true);
	};

	const close = () => {
		refDisplay.current = false;
		setShowList(false);
	};

	const setNewAudio = async (trackId: string) => {
		setAudioTrack(trackId);
		setAudioTrackList((list) => list.map((item) => ({ ...item, active: item.trackId === trackId })));
		close();
	};

	useEffect(() => {
		if (!audioTrackList.length && showList) {
			(async () => {
				const newList = await getAudioTrackList();
				setAudioTrackList(newList);
			})();
		}
	}, [showList]);

	return (
		<>
			<div
				class={`absolute bottom-[115px] right-[80px] w-[520px] h-[260px] pointer-events-auto after:content-[''] after:block after:w-[0] after:h-[0] after:absolute after:bottom-[-16px] after:right-[18px] after:[border-left:14px_solid_transparent] after:[border-right:14px_solid_transparent] after:[border-top:16px_solid_rgba(63,65,69,0.90)] ${showList ? "flex" : "hidden"}`}
			>
				<div class="w-1/2 bg-[#27292D]/90 rounded-tl-md rounded-bl-md">
					<h5 class="mt-0 font-medium text-white text-xl! pr-5 pl-[48px] py-3">Audio</h5>
					<ul class="max-h-[180px] overflow-y-auto [&::-webkit-scrollbar]:[width:5px] [&::-webkit-scrollbar-thumb]:bg-[#787878]">
						{audioTrackList.map((track) => (
							<li
								class={`text-base transition-colors py-1.5 hover:text-white hover:cursor-pointer hover:bg-[#27292D]/95 px-5 flex justify-start items-center gap-x-3 ${track.active ? "text-white" : "text-[#A3A1A2]"}`}
								onClick={() => setNewAudio(track.trackId)}
							>
								{track.active ? <IconCheck /> : <span class="h-[16px] w-[16px]"></span>}
								{track.displayName}
							</li>
						))}
					</ul>
				</div>

				<div class="w-1/2 bg-[#3F4145]/90 px-6 py-4 rounded-tr-md rounded-br-md">
					<h5 class="mb-4 mt-0 font-medium text-white text-xl">Subtitulos</h5>
					<ul class="text-[#A3A1A2] text-lg flex flex-col justify-start items-start gap-y-2">
						<li>Ingles</li>
						<li>Español</li>
						<li>Portugues</li>
					</ul>
				</div>

				<button
					type="button"
					class="bg-white border-0 outline-0 w-[30px] h-[30px] flex justify-center items-center absolute top-[-12px] right-[-12px] rounded-[50%] cursor-pointer opacity-95"
					onClick={close}
				>
					<IconClose class="w-[16px] h-[16px]" fill="black" />
				</button>
			</div>
			<Button SvgIco={IconLanguages} onClick={onClickHandler} />
		</>
	);
};
