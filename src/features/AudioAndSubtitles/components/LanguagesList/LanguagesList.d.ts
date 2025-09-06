import type { ILanguageTrack } from "@services/LanguageTracks";

export interface LanguagesListProps {
	title: string;
	items: ILanguageTrack[];
	onClickItem: (trackId: string) => void;
	bgColor: string;
}
