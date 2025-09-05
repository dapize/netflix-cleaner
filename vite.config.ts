import fs from "node:fs";
import path from "node:path";
import preact from "@preact/preset-vite";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "vite";
import svgr from "vite-plugin-svgr";

const removeIndexHtml = () => {
	return {
		name: "remove-index-html",
		closeBundle() {
			const file = path.resolve(__dirname, "package/index.html");
			if (fs.existsSync(file)) {
				fs.unlinkSync(file);
			}
		},
	};
};

// https://vite.dev/config/
export default defineConfig({
	plugins: [
		preact(),
		tailwindcss(),
		svgr({
			svgrOptions: { icon: true },
		}),
		removeIndexHtml(),
	],
	build: {
		outDir: "package",
		emptyOutDir: false,
		rollupOptions: {
			output: {
				entryFileNames: "content.js",
			},
		},
	},
	resolve: {
		alias: {
			"@": path.resolve(__dirname, "./src"),
			"@assets": path.resolve(__dirname, "./src/assets"),
			"@components": path.resolve(__dirname, "./src/components"),
			"@context": path.resolve(__dirname, "./src/context"),
			"@features": path.resolve(__dirname, "./src/features"),
			"@helpers": path.resolve(__dirname, "./src/helpers"),
			"@services": path.resolve(__dirname, "./src/services"),
			"@utils": path.resolve(__dirname, "./src/utils"),
		},
	},
});
