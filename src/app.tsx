import { useContext, useEffect, useRef, useState } from "preact/hooks";
import { MainContext, type IMainContext } from "./context/Main";
import { observerNode } from "./utils/observerNode";
import { overPlayVideo } from "./helpers/overPlayVideo";
import { Controls } from "./components/Controls";

export const App = () => {
  const { setWatchVideoNode, setVideoNode, videoNode, watchVideoNode, setMetadata } = useContext(
    MainContext
  ) as IMainContext;
  const [inWatchPage, setInWatchPage] = useState(false);
  const [visible, setVisible] = useState(false);
  const controlsTimeout = useRef<null | number>(null);

  const showControls = () => {
    setVisible(true);
    if (controlsTimeout.current) {
      clearTimeout(controlsTimeout.current)
    }
    controlsTimeout.current = setTimeout(() => {
      if (!videoNode?.paused) {
        setVisible(false)
      }
    }, 3000)
  }

  useEffect(() => {
    const updateInWatch = () => {
      setTimeout(() => {
        const isInWatchPage = document.location.href.includes("watch");
        setInWatchPage(isInWatchPage);
      }, 250)
    }

    setInWatchPage(document.location.href.includes("watch"));
    (window as any).navigation.addEventListener("navigate", updateInWatch);

    return () => {
      (window as any).navigation.removeEventListener("navigate", updateInWatch);
    }
  }, []);

  useEffect(() => {
    if (inWatchPage) {
      (async () => {
        const findWatchVideo = await observerNode('#appMountPoint .watch-video');
        setWatchVideoNode(findWatchVideo);
        const findVideoNode = await observerNode('#appMountPoint .watch-video video');
        const videoNodeRaw = findVideoNode as HTMLVideoElement;
        setVideoNode(videoNodeRaw);
        overPlayVideo(videoNodeRaw);
      })();
    } else {
      setVideoNode(undefined);
    }
  }, [inWatchPage]);

  useEffect(() => {
    document.addEventListener("mousemove", showControls);
    document.addEventListener("mouseenter", showControls);

    return () => {
      document.removeEventListener("mousemove", showControls);
      document.removeEventListener("mouseenter", showControls);
    }
  }, []);

  useEffect(() => {
    (async () => {
      const nodeTitle = await observerNode('h3.title');
      setMetadata(currentState => ({
        subTitle: currentState?.subTitle as string,
        title: nodeTitle.textContent
      }))
    })();
    (async () => {
      const nodeSubTitle = await observerNode('h4.playable-title');
      setMetadata(currentState => ({
        subTitle: nodeSubTitle.textContent,
        title: currentState?.title as string
      }))
    })();
  }, [])

  if (!watchVideoNode || !videoNode || !inWatchPage) {
    return;
  }

  return (
    <div class={`fixed top-0 left-0 h-screen w-screen pointer-events-none z-999 bg-[linear-gradient(to_bottom,rgba(0,0,0,0.7)_0%,rgba(0,0,0,0)_20%,rgba(0,0,0,0)_80%,rgba(0,0,0,0.7)_100%)] delay-300 transition-opacity opacity-0 ${visible ? "opacity-[1]" : ''}`}>
      <Controls />
    </div>
  );
};
