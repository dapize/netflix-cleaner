export const observerNode = (match: string): Promise<Element> => {
	return new Promise((resolve) => {
		let findNode = document.querySelector(match);
		if (findNode) {
			resolve(findNode);
		}
		const observer = new MutationObserver(() => {
			findNode = document.querySelector(match);
			if (findNode) {
				observer.disconnect();
				resolve(findNode);
			}
		});

		observer.observe(document.body, { childList: true, subtree: true });
	});
};
