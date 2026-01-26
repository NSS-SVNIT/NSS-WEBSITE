import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [react()],
	optimizeDeps: {
		include: [
			"date-fns/format", 
			"date-fns/addDays", 
			"date-fns/locale",
			"@mui/x-date-pickers",
			"@mui/x-date-pickers/AdapterDateFns",
		],
		esbuildOptions: {
			resolveExtensions: [".js", ".jsx"],
		},
	},
	resolve: {
		alias: {
			"@mui/material/version": path.resolve(__dirname, "./src/mui-version-fix.js"),
		},
	},
	build: {
		commonjsOptions: {
			transformMixedEsModules: true,
		},
	},
});
