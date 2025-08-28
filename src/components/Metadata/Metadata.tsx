import { useContext } from "preact/hooks";
import { type IMainContext, MainContext } from "../../context/Main";

export const Metadata = () => {
	const { metadata } = useContext(MainContext) as IMainContext;

	if (!metadata) {
		return;
	}

	return (
		<div class="h-[70px] flex items-center justify-center text-white gap-x-5 ml-8">
			<span class="text-[24px] font-medium">{metadata.title}</span>{" "}
			<span class="text-[22px] opacity-75 h-[36px] flex justify-center items-end">{metadata.subTitle}</span>
		</div>
	);
};
