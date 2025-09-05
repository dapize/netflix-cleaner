import IconLanguages from "@assets/languages.svg?react";
import { Button } from "@components/Button";
import { getAudioTrackList, getSubtitleTrackList, type ILanguageTrack, setAudioTrack, setSubtitleTrack } from "@services/LanguageTracks";
import { useEffect, useRef, useState } from "preact/hooks";
import { CloseButton } from "./components/CloseButton";
import { LanguagesList } from "./components/LanguagesList";

export const AudioAndSubtitles = () => {
	const [showList, setShowList] = useState(false);
	const [audioTrackList, setAudioTrackList] = useState<ILanguageTrack[]>([]);
	const [subtitleTrackList, setSubtitleTrackList] = useState<ILanguageTrack[]>([]);
	const refDisplay = useRef<boolean>(false);

	const closeLanguages = () => {
		refDisplay.current = false;
		setShowList(false);
	};

	const setTrackAudio = async (trackId: string) => {
		setAudioTrack(trackId);
		setAudioTrackList((list) => list.map((item) => ({ ...item, active: item.trackId === trackId })));
		closeLanguages();
	};

	const setTrackSubtitle = async (trackId: string) => {
		setSubtitleTrack(trackId);
		setSubtitleTrackList((list) => list.map((item) => ({ ...item, active: item.trackId === trackId })));
		closeLanguages();
	};

	const onClickHandler = () => {
		refDisplay.current = true;
		setShowList(true);
	};

	useEffect(() => {
		if (!audioTrackList.length && showList) {
			(async () => {
				const newList = await getAudioTrackList();
				setAudioTrackList(newList);
			})();
		}
	}, [showList]);

	useEffect(() => {
		if (!subtitleTrackList.length && showList) {
			(async () => {
				const newList = await getSubtitleTrackList();
				setSubtitleTrackList(newList);
			})();
		}
	}, [showList]);

	return (
		<>
			<div
				class={`absolute bottom-[113px] right-[80px] w-[520px] h-[260px] pointer-events-auto after:content-[''] after:block after:w-[0] after:h-[0] after:absolute after:bottom-[-16px] after:right-[18px] after:[border-left:14px_solid_transparent] after:[border-right:14px_solid_transparent] after:[border-top:16px_solid_rgba(63,65,69,0.90)] ${showList ? "flex" : "hidden"}`}
			>
				<LanguagesList title="Audio" bgColor="bg-[#27292D]/90" items={audioTrackList} onClickItem={setTrackAudio} />
				<LanguagesList title="Subtitulos" bgColor="bg-[#3F4145]/90" items={subtitleTrackList} onClickItem={setTrackSubtitle} />
				<CloseButton onClick={closeLanguages} />
			</div>
			<Button SvgIco={IconLanguages} onClick={onClickHandler} />
		</>
	);
};
