export const Seek = (ms: number) => {
	window.dispatchEvent(new CustomEvent("nc:set:seek:request", { detail: ms }));
};
