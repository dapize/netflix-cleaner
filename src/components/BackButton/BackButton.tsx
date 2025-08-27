import { Button } from "../Button";
import IconBack from '../../assets/back.svg?react';

export const BackButton = () => {
  const onClickHandler = () => {
    window.history.back();
  }

  return (
    <Button SvgIco={IconBack} onClick={onClickHandler} />
  )
}
