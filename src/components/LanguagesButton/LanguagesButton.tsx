import { Button } from "../Button";
import IconLanguages from '../../assets/languages.svg?react';
import { useCallback, useEffect, useRef, useState } from "preact/hooks";
import { getAudioTrackList, setAudioTrack, type IAudioTrack } from "../../services/Audio";

export const LanguagesButton = () => {
  const [showList, setShowList] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const [audioTrackList, setAudioTrackList] = useState<IAudioTrack[]>([]);
  const refDisplay = useRef<boolean>(false);

  const onClickHandler = () => {
    refDisplay.current = true;
    setShowList(true);
  }

  const setNewAudio = async (track: IAudioTrack) => {
    try {
      await setAudioTrack(track);
    } catch (error) {
      throw new Error('Ocurrió un error al cambiar de idioma');
    }
  }

  const handleClickOutside = useCallback((event: MouseEvent) => {
    if(!refDisplay.current) {
      return;
    };
    if (ref.current && !ref.current.contains(event.target as Node)) {
      refDisplay.current = false;
      setShowList(false);
    }
  }, [showList])

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  useEffect(() => {
    if (!audioTrackList.length && showList) {
      (async () => {
        try {
          const newList = await getAudioTrackList();
          setAudioTrackList(newList);
        } catch (error) {
          throw new Error('Error obteniendo el audio track list');
        }
      })();
    }
  }, [showList]);
  
  return (
    <>
      <div ref={ref} class={`absolute bottom-[115px] right-[80px] w-[500px] h-[260px] pointer-events-auto after:content-[''] after:block after:w-[0] after:h-[0] after:absolute after:bottom-[-16px] after:right-[18px] after:[border-left:14px_solid_transparent] after:[border-right:14px_solid_transparent] after:[border-top:16px_solid_rgba(63,65,69,0.90)] ${showList ? 'flex' : 'hidden'}`}>
        <div class="w-1/2 bg-[#27292D]/90 rounded-tl-md rounded-bl-md">
          <h5 class="mt-0 font-medium text-white text-xl px-6 py-4">Audio</h5>
          <ul class="text-[#A3A1A2] text-lx max-h-[180px] overflow-y-auto [&::-webkit-scrollbar]:[width:5px] [&::-webkit-scrollbar-thumb]:bg-white">
            {audioTrackList.map(track => (
              <li class="transition-colors py-2 hover:text-white hover:cursor-pointer hover:bg-[#27292D]/95 px-6" onClick={() => setNewAudio(track)}>{track.displayName}</li>
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
      </div>
      <Button SvgIco={IconLanguages} onClick={onClickHandler}/>
    </>
  );
}
