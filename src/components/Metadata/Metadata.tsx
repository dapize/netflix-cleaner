import { useContext } from "preact/hooks"
import { MainContext, type IMainContext, type IMetadata } from "../../context/Main";

export const Metadata = () => {
  const { metadata } = useContext(MainContext) as IMainContext;
  const { title, subTitle } = metadata as IMetadata;

  return (
    <div class="h-[70px] flex items-center justify-center text-white gap-x-5 ml-8">
      <span class="text-[24px] leading-[30px] font-bold">{title}</span> <span class="text-[22px] opacity-75 h-[32px] flex justify-center items-end">{subTitle}</span>
    </div>
  )
}
