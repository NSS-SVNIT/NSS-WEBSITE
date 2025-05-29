/**
 * This is a Vite plugin to handle date-fns imports
 * It transforms imports like 'date-fns/subpath' to direct imports
 * and also transforms named import patterns to default import patterns
 */
function dateFnsImportResolver() {
	// Match both named and default imports from date-fns subpaths
	const namedImportRegex =
		/import\s+{\s*([^}]+)\s*}\s+from\s+['"]date-fns\/([^"']+)['"]/g;
	const defaultImportRegex = /from ['"]date-fns\/([^"']+)['"]/g;

	return {
		name: "date-fns-import-resolver",
		transform(code, id) {
			// Only apply this to specific modules that cause problems
			if (
				id.includes("node_modules") &&
				(id.includes("@mui/x-date-pickers") || id.includes("date-fns"))
			) {
				// First fix named imports from subpaths
				let modified = code.replace(
					namedImportRegex,
					(match, imports, subpath) => {
						// Handle multi-line imports
						const importParts = imports
							.split(",")
							.map((part) => part.trim());
						const fixedImports = importParts
							.map((part) => {
								// Handle imports with aliases: "import { X as Y } from 'date-fns/X'"
								const name = part.split(" as ")[0].trim();
								const alias = part.includes(" as ")
									? part.split(" as ")[1].trim()
									: name;
								return `import ${name}_default from 'date-fns/${subpath}'; const ${alias} = ${name}_default;`;
							})
							.join("\n");

						return fixedImports;
					}
				); // Redirect remaining imports directly to our exports file for critical functions
				if (id.includes("AdapterDateFns")) {
					modified = modified.replace(
						defaultImportRegex,
						(match, subpath) => {
							if (
								["addDays", "setHours", "setMinutes"].includes(
									subpath
								)
							) {
								return `from 'date-fns/${subpath}'`;
							}
							return `from 'date-fns/${subpath}'`;
						}
					);
				}

				if (modified !== code) {
					return {
						code: modified,
						map: null,
					};
				}
			}
			return null;
		},
	};
}

export default dateFnsImportResolver;
