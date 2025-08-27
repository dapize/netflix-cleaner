import type { ComponentType, JSX } from "preact";

export interface ButtonProps extends JSX.HTMLAttributes<HTMLButtonElement> {
	SvgIco: ComponentType<JSX.SVGAttributes<SVGSVGElement>>;
}
