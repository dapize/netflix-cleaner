import type { ITimeCodes } from "./TimeCodes.d";

export const getTimeCodes = (): Promise<ITimeCodes> => {
	return new Promise((resolve) => {
		const getTimeCodes = (event: CustomEvent<ITimeCodes>) => {
			window.removeEventListener("nc:get:timeCodes:response", getTimeCodes as EventListener);
			resolve(event.detail);
		};
		window.addEventListener("nc:get:timeCodes:response", getTimeCodes as EventListener);
		window.dispatchEvent(new CustomEvent("nc:get:timeCodes:request"));
	});
};
