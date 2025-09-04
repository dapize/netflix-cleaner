import { render } from "preact";
import appRawCss from "./app.css?inline";
import { App } from "./app.tsx";
import { MainProvider } from "./context/Main";
import { removeOverlay } from "./helpers/removeOverlay.ts";
import indexRawCss from "./index.css?inline";
import { injectStyle } from "./utils/injectStyle.ts";

removeOverlay();

const container = document.createElement("div");
container.id = "netflix-cleaner";
document.body.appendChild(container);

const shadowRoot = container.attachShadow({ mode: "open" });

injectStyle(indexRawCss, document.body);
injectStyle(appRawCss, shadowRoot);

window.addEventListener("message", (event) => {
  if (event.source !== window) return;
  if (event.data.type === "NETFLIX_DATA") {
    console.log("Netflix data recibida:", event.data.value);
    (window as any).pv = event.data.value;
  }
});

render(
	<MainProvider>
		<App />
	</MainProvider>,
	shadowRoot,
);
