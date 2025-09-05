/** biome-ignore-all lint/a11y/useKeyWithClickEvents: No es necesario */
import IconCheck from "@assets/check.svg?react";
import type { FunctionComponent } from "preact";
import type { LanguagesListProps } from "./LanguagesList.d";

export const LanguagesList: FunctionComponent<LanguagesListProps> = ({ title, items, onClickItem, bgColor }) => {
	return (
		<div class={`w-1/2 ${bgColor}`}>
			<h5 class="mt-0 font-medium text-white text-[20px]! pr-5 pl-[48px] py-3">{title}</h5>
			<ul class="max-h-[180px] overflow-y-auto [&::-webkit-scrollbar]:[width:5px] [&::-webkit-scrollbar-thumb]:bg-[#787878]">
				{items.map((track) => (
					<li
						class={`text-base transition-colors py-1.5 hover:text-white hover:cursor-pointer hover:bg-[#27292D]/95 px-5 flex justify-start items-center gap-x-3 ${track.active ? "text-white" : "text-[#A3A1A2]"}`}
						onClick={() => onClickItem(track.trackId)}
					>
						{track.active ? <IconCheck /> : <span class="h-[16px] w-[16px]"></span>}
						{track.displayName}
					</li>
				))}
			</ul>
		</div>
	);
};
