import type { FunctionComponent } from "preact";
import type { ButtonProps } from './Button.d';

export const Button: FunctionComponent<ButtonProps> = ({ SvgIco, class: extraClass, ...props }) => {
  return (
    <button class={`flex justify-center items-center w-[70px] h-[70px] border-none bg-transparent rounded-[50%] text-white pointer-events-auto outline-white hover:bg-white/20 hover:cursor-pointer ${extraClass ?? ''}`} {...props}>
      <SvgIco class="w-[50px] h-[50px]" />
    </button>
  )
}
