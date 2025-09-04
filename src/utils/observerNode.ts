export const observerNode = (match: string, timeOut?: number): Promise<Element> => {
	return new Promise((resolve, reject) => {
		let idTimeOut: ReturnType<typeof setTimeout>;

		if (timeOut) {
			idTimeOut = setTimeout(() => {
				reject();
			}, timeOut)
		}

		let findNode = document.querySelector(match);
		if (findNode) {
			resolve(findNode);
		}

		const observer = new MutationObserver(() => {
			findNode = document.querySelector(match);
			if (findNode) {
				observer.disconnect();
				clearTimeout(idTimeOut);
				resolve(findNode);
			}
		});

		observer.observe(document.body, { childList: true, subtree: true });
	});
};
