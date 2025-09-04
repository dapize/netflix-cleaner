chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  if (tab.url && tab.url.startsWith("https://www.netflix.com") && changeInfo.status === "complete") {
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
          }

          window.addEventListener("netflixCCleaner:get:audioTrackList", () => {
            const detail = getPlayerVideo().getAudioTrackList();
            const eventSetAudioTrackList = new CustomEvent("netflixCCleaner:set:audioTrackList", { detail });
            window.dispatchEvent(eventSetAudioTrackList);
          });
        }
      }
    });
  }
});

