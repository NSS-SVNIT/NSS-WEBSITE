/**
 * This script directly patches the MUI X Date Pickers adapter for date-fns
 * to make it compatible with date-fns@2.30.0
 */
import { createRequire } from "module";
const require = createRequire(import.meta.url);
const fs = require("fs");
const path = require("path");
const glob = require("glob");

// Patch MUI's AdapterDateFns directly
function patchMuiAdapter() {
	// Find all potential paths to the AdapterDateFns (V2 for date-fns v2.x)
	const adapterPaths = [
		...glob.sync("./node_modules/@mui/x-date-pickers/**/AdapterDateFns.js"),
		...glob.sync(
			"./node_modules/@mui/x-date-pickers/**/AdapterDateFnsV2/**/*.js"
		),
	];

	if (adapterPaths.length === 0) {
		console.error("Could not find MUI AdapterDateFns file to patch");
		return false;
	}

	let patchedCount = 0;

	for (const adapterPath of adapterPaths) {
		console.log(`Processing ${adapterPath}...`);

		try {
			// Read the file
			const content = fs.readFileSync(adapterPath, "utf8");

			// Replace the problematic import patterns
			const importPattern =
				/import\s+{\s*([^}]+)\s*}\s+from\s+['"]date-fns\/([^'"]+)['"]/g;

			const fixedContent = content.replace(
				importPattern,
				(match, imports, subpath) => {
					// Handle multiple imports on a single line
					const importParts = imports
						.split(",")
						.map((part) => part.trim());

					// Convert to multiple import statements with default imports
					return importParts
						.map((part) => {
							// Handle aliased imports
							const importName = part.includes(" as ")
								? part.split(" as ")[0].trim()
								: part;
							const alias = part.includes(" as ")
								? part.split(" as ")[1].trim()
								: importName;

							return `import ${importName}_default from 'date-fns/${subpath}';\nconst ${alias} = ${importName}_default;`;
						})
						.join("\n");
				}
			);

			// Replace ESM imports too
			const esmImportPattern =
				/import\s+{\s*([^}]+)\s*}\s+from\s+['"]date-fns\/esm\/([^'"]+)['"]/g;

			const finalContent = fixedContent.replace(
				esmImportPattern,
				(match, imports, subpath) => {
					// Handle multiple imports on a single line
					const importParts = imports
						.split(",")
						.map((part) => part.trim());

					// Convert to multiple import statements with default imports
					return importParts
						.map((part) => {
							// Handle aliased imports
							const importName = part.includes(" as ")
								? part.split(" as ")[0].trim()
								: part;
							const alias = part.includes(" as ")
								? part.split(" as ")[1].trim()
								: importName;

							return `import ${importName}_default from 'date-fns/${subpath}';\nconst ${alias} = ${importName}_default;`;
						})
						.join("\n");
				}
			);

			if (content !== finalContent) {
				fs.writeFileSync(adapterPath, finalContent, "utf8");
				console.log(`Successfully patched ${adapterPath}`);
				patchedCount++;
			} else {
				console.log(`No changes needed for ${adapterPath}`);
			}
		} catch (error) {
			console.error(`Error processing ${adapterPath}:`, error);
		}
	}

	return patchedCount > 0;
}

// Execute the function
console.log("Starting MUI adapter patch...");
const result = patchMuiAdapter();
console.log(`Patching complete. Success: ${result}`);
