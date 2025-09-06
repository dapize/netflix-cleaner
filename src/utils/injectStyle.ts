export const injectStyle = (content: string, target: HTMLElement | HTMLDocument | ShadowRoot) => {
	const style = document.createElement("style");
	style.textContent = content;
	target.appendChild(style);
};
