import IconClose from "@assets/close.svg?react";
import type { FunctionComponent, JSX } from "preact";

export const CloseButton: FunctionComponent<JSX.HTMLAttributes<HTMLButtonElement>> = (props) => {
	return (
		<button
			type="button"
			class="bg-white border-0 outline-0 w-[30px] h-[30px] flex justify-center items-center absolute top-[-12px] right-[-12px] rounded-[50%] cursor-pointer opacity-95"
			{...props}
		>
			<IconClose class="w-[16px] h-[16px]" fill="black" />
		</button>
	);
};
