import { SkipIntro } from "@features/SkipIntro";
import { useContext, useEffect, useRef, useState } from "preact/hooks";
import { type IMainContext, MainContext } from "./context/Main";
import { Controls } from "./features/Controls";
import { overPlayVideo } from "./helpers/overPlayVideo";
import { observerNode } from "./utils/observerNode";

export const App = () => {
	const { setWatchVideoNode, setVideoNode, videoNode, watchVideoNode, setMetadata, showControls, setShowControls } = useContext(
		MainContext,
	) as IMainContext;
	const [inWatchPage, setInWatchPage] = useState(false);
	const controlsTimeout = useRef<null | ReturnType<typeof setTimeout>>(null);

	const handleShowControls = () => {
		setShowControls(true);
		if (controlsTimeout.current) {
			clearTimeout(controlsTimeout.current);
		}
		controlsTimeout.current = setTimeout(() => {
			if (!videoNode?.paused) {
				setShowControls(false);
			}
		}, 3000);
	};

	useEffect(() => {
		const updateInWatch = () => {
			setTimeout(() => {
				const isInWatchPage = document.location.href.includes("watch");
				setInWatchPage(isInWatchPage);
			}, 250);
		};

		setInWatchPage(document.location.href.includes("watch"));
		// biome-ignore lint/suspicious/noExplicitAny: Experimental API
		(window as any).navigation.addEventListener("navigate", updateInWatch);

		return () => {
			// biome-ignore lint/suspicious/noExplicitAny: Experimental API
			(window as any).navigation.removeEventListener("navigate", updateInWatch);
		};
	}, []);

	useEffect(() => {
		if (inWatchPage) {
			(async () => {
				const findWatchVideo = await observerNode("#appMountPoint .watch-video");
				setWatchVideoNode(findWatchVideo);
				const findVideoNode = await observerNode("#appMountPoint .watch-video video");
				const videoNodeRaw = findVideoNode as HTMLVideoElement;
				setVideoNode(videoNodeRaw);
				overPlayVideo(videoNodeRaw);
				document.body.style.overflowY = "auto";
			})();
		} else {
			setVideoNode(undefined);
		}
	}, [inWatchPage]);

	useEffect(() => {
		if (!inWatchPage) {
			setMetadata(undefined);
			return;
		}
		(async () => {
			try {
				const nodeTitle = await observerNode("h3.title", 15000);
				setMetadata((currentState) => ({
					subTitle: currentState?.subTitle as string,
					title: nodeTitle?.textContent,
				}));
			} finally {
			}
		})();
		(async () => {
			try {
				const nodeSubTitle = await observerNode("h4.playable-title", 15000);
				setMetadata((currentState) => ({
					subTitle: nodeSubTitle?.textContent,
					title: currentState?.title as string,
				}));
			} finally {
			}
		})();
	}, [inWatchPage]);

	useEffect(() => {
		document.addEventListener("mousemove", handleShowControls);
		document.addEventListener("mouseenter", handleShowControls);

		return () => {
			document.removeEventListener("mousemove", handleShowControls);
			document.removeEventListener("mouseenter", handleShowControls);
		};
	}, []);

	if (!watchVideoNode || !videoNode || !inWatchPage) {
		return;
	}

	return (
		<>
			<div
				class={`fixed top-0 left-0 h-screen w-screen pointer-events-none z-999 bg-[linear-gradient(to_bottom,rgba(0,0,0,0.7)_0%,rgba(0,0,0,0)_20%,rgba(0,0,0,0)_80%,rgba(0,0,0,0.7)_100%)] delay-300 transition-opacity opacity-0 ${showControls ? "opacity-[1]" : ""}`}
			>
				<Controls />
			</div>
			<SkipIntro />
		</>
	);
};
