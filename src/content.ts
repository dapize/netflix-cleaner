const cleanNetflixOverlay = (): void => {
	const overlay = document.querySelector(".interstitial-full-screen");
	if (overlay) {
		overlay.remove();
		console.log("cleanNetflixOverlay executed!");
	}
};

const generateRandomId = (length = 8): string => {
	return Math.random()
		.toString(36)
		.substring(2, length + 2);
};

const createCustomControls = (video: HTMLVideoElement): void => {
	console.log("createCustomControls!");

	const container = document.createElement("div");
	const videoId = video.dataset.videoId!;
	container.dataset.controlsId = videoId;
	container.id = "custom-netflix-controls";
	container.style.position = "fixed";
	container.style.bottom = "0";
	container.style.left = "0";
	container.style.width = "calc(100% - 40px)";
	container.style.background = "linear-gradient(to top, rgba(0,0,0,0.7) 60%, transparent)";
	container.style.padding = "20px";
	container.style.display = "flex";
	container.style.justifyContent = "space-between";
	container.style.alignItems = "center";
	container.style.opacity = "0";
	container.style.transition = "opacity 0.3s ease";
	container.style.zIndex = "9999";
	container.style.color = "white";
	container.style.fontFamily = "Arial, sans-serif";

	const leftControls = document.createElement("div");
	const centerControls = document.createElement("div");
	const rightControls = document.createElement("div");

	leftControls.style.display = "flex";
	leftControls.style.alignItems = "center";
	leftControls.style.gap = "10px";

	centerControls.style.flex = "1";
	centerControls.style.margin = "0 20px";

	rightControls.style.display = "flex";
	rightControls.style.alignItems = "center";
	rightControls.style.gap = "10px";

	// Volver flecha
	const backBtn = document.createElement("div");
	backBtn.textContent = "←";
	backBtn.title = "Volver";
	backBtn.style.fontSize = "24px";
	backBtn.style.cursor = "pointer";
	backBtn.onclick = () => window.history.back();

	// Play/Pause
	const playPauseBtn = document.createElement("button");
	playPauseBtn.textContent = "⏯️";
	playPauseBtn.style.fontSize = "16px";
	playPauseBtn.style.cursor = "pointer";
	playPauseBtn.onclick = () => {
		video.paused ? video.play() : video.pause();
	};

	// Barra de progreso
	const progress = document.createElement("input");
	progress.type = "range";
	progress.min = "0";
	progress.max = "100";
	progress.value = "0";
	progress.style.width = "100%";
	progress.oninput = () => {
		const value = parseFloat(progress.value);
		video.currentTime = (video.duration * value) / 100;
	};

	setInterval(() => {
		if (!video.duration) return;
		progress.value = ((video.currentTime / video.duration) * 100).toString();
	}, 500);

	// Fullscreen
	const fullscreenBtn = document.createElement("div");
	fullscreenBtn.title = "Pantalla completa";
	fullscreenBtn.innerHTML = "⛶";
	fullscreenBtn.style.fontSize = "24px";
	fullscreenBtn.style.cursor = "pointer";
	fullscreenBtn.onclick = () => {
		if (!document.fullscreenElement) {
			video.requestFullscreen().catch(() => {});
		} else {
			document.exitFullscreen();
		}
	};

	leftControls.appendChild(backBtn);
	leftControls.appendChild(playPauseBtn);
	centerControls.appendChild(progress);
	rightControls.appendChild(fullscreenBtn);

	container.appendChild(leftControls);
	container.appendChild(centerControls);
	container.appendChild(rightControls);
	document.body.appendChild(container);

	// Hover visibility logic
	let timeout: number;
	const showControls = (): void => {
		container.style.opacity = "1";
		clearTimeout(timeout);
		timeout = window.setTimeout(() => {
			container.style.opacity = "0";
		}, 3000);
	};

	document.addEventListener("mousemove", showControls);
	document.addEventListener("keydown", showControls);
	showControls();
};

window.addEventListener("popstate", () => {
	if (!document.location.href.includes("watch")) {
		const customNetflixControls = document.getElementById("custom-netflix-controls");
		if (customNetflixControls) {
			console.log("custom controls removed!");
			customNetflixControls.remove();
		}
	}
});

const observer = new MutationObserver(() => {
	cleanNetflixOverlay();

	const video = document.querySelector("#appMountPoint video") as HTMLVideoElement | null;
	if (!video) return;

	let videoId = video.dataset.videoId;
	if (!videoId) {
		videoId = generateRandomId();
		video.dataset.videoId = videoId;
	}

	video.addEventListener("click", (event: MouseEvent) => {
		event.preventDefault();
		video.paused ? video.play() : video.pause();
	});

	video
		.play()
		.then(() => {
			if (!document.location.href.includes("watch")) return;

			const customNetflixControls = document.getElementById("custom-netflix-controls");
			if (!customNetflixControls) {
				createCustomControls(video);
				return;
			}

			const controlsId = customNetflixControls.dataset.controlsId;
			if (controlsId !== videoId) {
				customNetflixControls.remove();
				createCustomControls(video);
			}
		})
		.catch(() => {});
});

observer.observe(document.body, { childList: true, subtree: true });
