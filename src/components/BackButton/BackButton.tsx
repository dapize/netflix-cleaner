import IconBack from "../../assets/back.svg?react";
import { Button } from "../Button";

export const BackButton = () => {
	const onClickHandler = () => {
		window.history.back();
	};

	return <Button SvgIco={IconBack} onClick={onClickHandler} />;
};
