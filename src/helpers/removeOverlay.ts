export const removeOverlay = () => {
  const observer = new MutationObserver(() => {
    const overlay = document.querySelector(".interstitial-full-screen");
    if (overlay) overlay.remove();
  });

  observer.observe(document.body, { childList: true, subtree: true });
  return observer;
};
