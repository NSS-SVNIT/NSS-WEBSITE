import react from "@vitejs/plugin-react";
import path from "path";
import { defineConfig } from "vite";
import dateFnsImportResolver from "./src/utils/dateFnsPlugin";

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [react(), dateFnsImportResolver()],
	resolve: {
		alias: {
			// Fix for date-fns imports - prioritize our adapter exports
			"date-fns/esm": path.resolve(__dirname, "node_modules/date-fns"),
			"date-fns": path.resolve(__dirname, "node_modules/date-fns"),
			// Add aliases for problematic subpath imports
			"date-fns/addDays": path.resolve(
				__dirname,
				"src/utils/dateFnsExports.js"
			),
			"date-fns/setHours": path.resolve(
				__dirname,
				"src/utils/dateFnsExports.js"
			),
			"date-fns/setMinutes": path.resolve(
				__dirname,
				"src/utils/dateFnsExports.js"
			),
		},
	},
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
