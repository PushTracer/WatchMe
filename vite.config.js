import { fileURLToPath, URL } from "node:url";

import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import vuetify from "vite-plugin-vuetify";
import vueJsx from "@vitejs/plugin-vue-jsx";
import vueDevTools from "vite-plugin-vue-devtools";

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
	const plugins = [vue(), vuetify({ autoImport: true }), vueJsx()];
	if (mode === "development") {
		plugins.push(vueDevTools());
	}
	return {
		build: {
			chunkSizeWarningLimit: 2500,
		},
		plugins,
		base: "./",
		resolve: {
			alias: {
				"@": fileURLToPath(new URL("./src", import.meta.url)),
			},
		},
	};
});
