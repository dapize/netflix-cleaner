chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
	if (tab.url?.startsWith("https://www.netflix.com") && changeInfo.status === "complete") {
		chrome.scripting.executeScript({
			target: { tabId },
			world: "MAIN",
			func: () => {
				if (window.netflix && !window.netflixAttached) {
					window.netflixAttached = true;

					const getPlayerVideo = () => {
						const playerApp = window.netflix.appContext.state.playerApp;
						const playerAPI = playerApp.getAPI().videoPlayer;
						const sessionId = playerAPI.getAllPlayerSessionIds()[0];
						return playerAPI.getVideoPlayerBySessionId(sessionId);
					};

					window.addEventListener("nc:get:audioTrackList:request", () => {
						const videoPlayer = getPlayerVideo();
						const currentTrack = videoPlayer.getAudioTrack();
						const trackList = videoPlayer.getAudioTrackList().map((track) => ({
							...track,
							active: track.trackId === currentTrack.trackId,
						}));
						window.dispatchEvent(new CustomEvent("nc:get:audioTrackList:response", { detail: trackList }));
					});

					window.addEventListener("nc:set:audioTrack:request", (event) => {
						const trackId = event.detail;
						const trackList = getPlayerVideo().getAudioTrackList();
						const findTrack = trackList.find((track) => track.trackId === trackId);
						getPlayerVideo().setAudioTrack(findTrack);
					});
				}
			},
		});
	}
});
