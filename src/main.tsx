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

render(
	<MainProvider>
		<App />
	</MainProvider>,
	shadowRoot,
);
