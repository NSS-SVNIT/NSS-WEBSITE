import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [react()],
	optimizeDeps: {
		include: ["date-fns/format", "date-fns/addDays", "date-fns/locale"],
		esbuildOptions: {
			resolveExtensions: [".js", ".jsx"],
		},
	},
	build: {
		commonjsOptions: {
			transformMixedEsModules: true,
		},
	},
});
