// src/utils.ts
var generateRandomId = (length = 8) => {
  return Math.random().toString(36).substring(2, length + 2);
};
var formatTime = (seconds) => {
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins}:${secs.toString().padStart(2, "0")}`;
};

// src/content.ts
var cleanNetflixOverlay = () => {
  const overlay = document.querySelector(".interstitial-full-screen");
  if (overlay) {
    overlay.remove();
  }
};
var svgIcons = {
  play: `<svg width="50" height="50" viewBox="0 0 24 24" fill="currentColor">
                <path d="M8 5v14l11-7z"/>
            </svg>`,
  pause: `<svg width="50" height="50" viewBox="0 0 24 24" fill="currentColor">
                <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/>
            </svg>`,
  back: `<svg width="50" height="50" viewBox="0 0 24 24" fill="currentColor">
                <path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z"/>
            </svg>`,
  fullscreen: `<svg width="50" height="50" viewBox="0 0 24 24" fill="currentColor">
                <path d="M7 14H5v5h5v-2H7v-3zm-2-4h2V7h3V5H5v5zm12 7h-3v2h5v-5h-2v3zM14 5v2h3v3h2V5h-5z"/>
            </svg>`,
  exitFullscreen: `<svg width="50" height="50" viewBox="0 0 24 24" fill="currentColor">
                <path d="M5 16h3v3h2v-5H5v2zm3-8H5v2h5V5H8v3zm6 11h2v-3h3v-2h-5v5zm2-11V5h-2v5h5V8h-3z"/>
            </svg>`
};
var cssStyles = `
    .controls-overlay {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: linear-gradient(to bottom, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0) 20%, rgba(0,0,0,0) 80%, rgba(0,0,0,0.7) 100%);
        opacity: 0;
        transition: opacity 0.3s ease;
        pointer-events: none;
        z-index: 10;
    }

    .controls-overlay.visible {
        opacity: 1;
    }

    .back-button {
        position: absolute;
        top: 30px;
        left: 30px;
        background: none;
        border: none;
        color: white;
        cursor: pointer;
        padding: 10px;
        border-radius: 50%;
        transition: background-color 0.2s ease;
        pointer-events: auto;
        display: flex;
        align-items: center;
        justify-content: center;
        width: 70px;
        height: 70px;
    }

    .back-button:hover {
        background-color: rgba(255,255,255,0.2);
    }

    .back-button svg {
        width: 50px;
        height: 50px;
    }

    .bottom-controls {
        position: absolute;
        bottom: 0;
        left: 0;
        right: 0;
        padding: 30px;
        pointer-events: auto;
    }

    .progress-section {
        margin-bottom: 20px;
    }

    .progress-container {
        width: 100%;
        height: 6px;
        background: rgba(255,255,255,0.3);
        border-radius: 3px;
        cursor: pointer;
        position: relative;
        transition: height 0.2s ease;
    }

    .progress-container:hover {
        height: 8px;
    }

    .progress-bar {
        height: 100%;
        background: #e50914;
        border-radius: 3px;
        width: 0%;
        transition: width 0.1s ease;
    }

    .progress-thumb {
        position: absolute;
        top: 50%;
        transform: translateY(-50%);
        width: 16px;
        height: 16px;
        background: #e50914;
        border-radius: 50%;
        left: 0%;
        opacity: 0;
        transition: opacity 0.2s ease;
    }

    .progress-container:hover .progress-thumb {
        opacity: 1;
    }

    .controls-row {
        display: flex;
        align-items: center;
        justify-content: space-between;
    }

    .left-controls {
        display: flex;
        align-items: center;
        gap: 25px;
    }

    .right-controls {
        display: flex;
        align-items: center;
        gap: 25px;
    }

    .play-pause-button {
        background: none;
        border: none;
        color: white;
        cursor: pointer;
        padding: 10px;
        border-radius: 50%;
        transition: background-color 0.2s ease;
        display: flex;
        align-items: center;
        justify-content: center;
        width: 70px;
        height: 70px;
    }

    .play-pause-button:hover {
        background-color: rgba(255,255,255,0.2);
    }

    .play-pause-button svg {
        width: 50px;
        height: 50px;
    }

    .time-display {
        color: white;
        font-size: 18px;
        font-weight: 500;
        min-width: 120px;
        margin-left: 10px;
    }

    .fullscreen-button {
        background: none;
        border: none;
        color: white;
        cursor: pointer;
        padding: 10px;
        border-radius: 50%;
        transition: background-color 0.2s ease;
        display: flex;
        align-items: center;
        justify-content: center;
        width: 70px;
        height: 70px;
    }

    .fullscreen-button:hover {
        background-color: rgba(255,255,255,0.2);
    }

    .fullscreen-button svg {
        width: 50px;
        height: 50px;
    }

    .click-overlay {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        z-index: 5;
        cursor: pointer;
    }

    /* Ensure SVG icons inherit color */
    svg {
        pointer-events: none;
    }
`;
var injectStyles = () => {
  const styleElement = document.createElement("style");
  styleElement.id = "controlsStyles";
  styleElement.textContent = cssStyles;
  document.head.appendChild(styleElement);
};
var createPlayerElements = (video) => {
  const controlsOverlay = document.createElement("div");
  controlsOverlay.id = "controlsOverlay";
  controlsOverlay.className = "controls-overlay";
  const videoId = video.dataset.videoId;
  controlsOverlay.dataset.controlsId = videoId;
  const backBtn = document.createElement("button");
  backBtn.id = "backBtn";
  backBtn.className = "back-button";
  backBtn.innerHTML = svgIcons.back;
  const bottomControls = document.createElement("div");
  bottomControls.className = "bottom-controls";
  const progressSection = document.createElement("div");
  progressSection.className = "progress-section";
  const progressContainer = document.createElement("div");
  progressContainer.id = "progressContainer";
  progressContainer.className = "progress-container";
  const progressBar = document.createElement("div");
  progressBar.id = "progressBar";
  progressBar.className = "progress-bar";
  const progressThumb = document.createElement("div");
  progressThumb.id = "progressThumb";
  progressThumb.className = "progress-thumb";
  const controlsRow = document.createElement("div");
  controlsRow.className = "controls-row";
  const leftControls = document.createElement("div");
  leftControls.className = "left-controls";
  const playPauseBtn = document.createElement("button");
  playPauseBtn.id = "playPauseBtn";
  playPauseBtn.className = "play-pause-button";
  playPauseBtn.innerHTML = svgIcons.pause;
  const timeDisplay = document.createElement("span");
  timeDisplay.id = "timeDisplay";
  timeDisplay.className = "time-display";
  timeDisplay.textContent = "0:00 / 0:00";
  const rightControls = document.createElement("div");
  rightControls.className = "right-controls";
  const fullscreenBtn = document.createElement("button");
  fullscreenBtn.id = "fullscreenBtn";
  fullscreenBtn.className = "fullscreen-button";
  fullscreenBtn.innerHTML = svgIcons.fullscreen;
  progressContainer.appendChild(progressBar);
  progressContainer.appendChild(progressThumb);
  progressSection.appendChild(progressContainer);
  leftControls.appendChild(playPauseBtn);
  leftControls.appendChild(timeDisplay);
  rightControls.appendChild(fullscreenBtn);
  controlsRow.appendChild(leftControls);
  controlsRow.appendChild(rightControls);
  bottomControls.appendChild(progressSection);
  bottomControls.appendChild(controlsRow);
  controlsOverlay.appendChild(backBtn);
  controlsOverlay.appendChild(bottomControls);
  document.body.appendChild(controlsOverlay);
  return {
    controlsOverlay,
    playPauseBtn,
    progressContainer,
    progressBar,
    progressThumb,
    timeDisplay,
    fullscreenBtn,
    backBtn
  };
};
var showControls;
var initializePlayer = (video) => {
  if (!document.getElementById("controlsStyles"))
    injectStyles();
  const elements = createPlayerElements(video);
  const {
    controlsOverlay,
    playPauseBtn,
    progressContainer,
    progressBar,
    progressThumb,
    timeDisplay,
    fullscreenBtn,
    backBtn
  } = elements;
  let controlsTimeout = null;
  const hideControls = () => {
    if (!video.paused) {
      controlsOverlay.classList.remove("visible");
    }
  };
  showControls = () => {
    console.log("showControls!");
    controlsOverlay.classList.add("visible");
    if (controlsTimeout)
      clearTimeout(controlsTimeout);
    controlsTimeout = setTimeout(hideControls, 3000);
  };
  const togglePlayPause = () => {
    if (video.paused) {
      video.play();
      playPauseBtn.innerHTML = svgIcons.pause;
    } else {
      video.pause();
      playPauseBtn.innerHTML = svgIcons.play;
    }
  };
  const updateProgress = () => {
    const progress = video.currentTime / video.duration * 100;
    progressBar.style.width = `${progress}%`;
    progressThumb.style.left = `${progress}%`;
    const currentTime = formatTime(video.currentTime);
    const duration = formatTime(video.duration);
    timeDisplay.textContent = `${currentTime} / ${duration}`;
  };
  const seek = (event) => {
    const rect = progressContainer.getBoundingClientRect();
    const clickX = event.clientX - rect.left;
    const width = rect.width;
    const percentage = clickX / width;
    video.currentTime = percentage * video.duration;
  };
  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen();
      fullscreenBtn.innerHTML = svgIcons.exitFullscreen;
    } else {
      document.exitFullscreen();
      fullscreenBtn.innerHTML = svgIcons.fullscreen;
    }
  };
  video.addEventListener("loadedmetadata", updateProgress);
  video.addEventListener("timeupdate", updateProgress);
  playPauseBtn.addEventListener("click", togglePlayPause);
  progressContainer.addEventListener("click", seek);
  fullscreenBtn.addEventListener("click", toggleFullscreen);
  document.addEventListener("mousemove", showControls);
  document.addEventListener("mouseenter", showControls);
  backBtn.addEventListener("click", () => {
    window.history.back();
  });
};
var removeControlsOverlay = () => {
  const controlsOverlay = document.getElementById("controlsOverlay");
  if (controlsOverlay) {
    if (showControls) {
      document.removeEventListener("mousemove", showControls);
      document.removeEventListener("mouseenter", showControls);
    }
    controlsOverlay.remove();
  }
};
window.addEventListener("popstate", () => {
  if (!document.location.href.includes("watch")) {
    removeControlsOverlay();
  }
});
var timeOutPlay;
var observer = new MutationObserver(() => {
  cleanNetflixOverlay();
  const video = document.querySelector("#appMountPoint video");
  if (!video)
    return;
  let videoId = video.dataset.videoId;
  if (!videoId) {
    videoId = generateRandomId();
    video.dataset.videoId = videoId;
  } else {
    return;
  }
  if (timeOutPlay)
    clearTimeout(timeOutPlay);
  timeOutPlay = setTimeout(() => {
    video.play().then(() => {
      if (!document.location.href.includes("watch"))
        return;
      const controlsOverlay = document.getElementById("controlsOverlay");
      if (!controlsOverlay) {
        initializePlayer(video);
        return;
      }
      const controlsId = controlsOverlay.dataset.controlsId;
      if (controlsId !== videoId) {
        removeControlsOverlay();
        initializePlayer(video);
      }
    }).catch(() => {
      console.log("Ocurrió un error al darle play!");
    });
  }, 1000);
});
observer.observe(document.body, { childList: true, subtree: true });
