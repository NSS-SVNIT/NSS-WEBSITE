/**
 * This script creates a compatibility layer for date-fns imports
 * It modifies the node_modules to work with date-fns@2.30.0
 */

import { createRequire } from "module";
const require = createRequire(import.meta.url);
const fs = require("fs");
const path = require("path");
const glob = require("glob");

// Create directory if it doesn't exist
function ensureDirectoryExists(dirPath) {
	if (!fs.existsSync(dirPath)) {
		fs.mkdirSync(dirPath, { recursive: true });
	}
}

// Functions to fix different import patterns
function fixImports(filePath) {
	try {
		// Read the file content
		const content = fs.readFileSync(filePath, "utf8");

		// Skip files that don't import from date-fns
		if (!content.includes("date-fns")) {
			return false;
		}

		// Fix pattern: import { X } from 'date-fns/X'
		let fixedContent = content.replace(
			/import\s+{\s*([^}]+)\s*}\s+from\s+['"]date-fns\/([^'"]+)['"]/g,
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
		);

		// Fix pattern: import X from 'date-fns/esm/X'
		fixedContent = fixedContent.replace(
			/import\s+([^{}\s]+)\s+from\s+['"]date-fns\/esm\/([^'"]+)['"]/g,
			(match, importName, subpath) => {
				return `import ${importName} from 'date-fns/${subpath}'`;
			}
		);

		// Write the fixed content back to the file if changes were made
		if (content !== fixedContent) {
			fs.writeFileSync(filePath, fixedContent, "utf8");
			console.log(`Fixed imports in ${filePath}`);
			return true;
		}

		return false;
	} catch (error) {
		console.error(`Error processing ${filePath}:`, error);
		return false;
	}
}

// Create shim modules for subpath imports
function createShimModules() {
	// We're using date-fns v2.30.0, so we need to ensure compatibility
	// with MUI X Date Pickers which expects named exports
	const dateFnsFunctions = [
		"addDays",
		"addMonths",
		"addYears",
		"format",
		"getDaysInMonth",
		"getHours",
		"getMinutes",
		"getSeconds",
		"getMonth",
		"getYear",
		"isAfter",
		"isBefore",
		"isEqual",
		"isSameDay",
		"isSameMonth",
		"isSameYear",
		"isValid",
		"parse",
		"setHours",
		"setMinutes",
		"setSeconds",
		"setMonth",
		"setYear",
		"startOfDay",
		"startOfMonth",
		"startOfWeek",
		"startOfYear",
		"endOfDay",
		"endOfMonth",
		"endOfWeek",
		"endOfYear",
		"addSeconds",
		"formatDistance",
		"formatISO",
		"isSameHour",
		"differenceInDays",
		"differenceInMonths",
		"differenceInYears",
		"eachDayOfInterval",
		"isWithinInterval",
		"parseISO",
	];

	for (const funcName of dateFnsFunctions) {
		const dirPath = path.resolve(`./node_modules/date-fns/${funcName}`);
		ensureDirectoryExists(dirPath);

		// Create the index.js file that re-exports the function as both default and named export
		const indexPath = path.join(dirPath, "index.js");
		const content = `import ${funcName}Default from '../${funcName}';\nexport const ${funcName} = ${funcName}Default;\nexport default ${funcName}Default;\n`;

		fs.writeFileSync(indexPath, content, "utf8");
		console.log(`Created shim for date-fns/${funcName}`);
	}

	// Create esm directory shims too
	const esmDir = path.resolve("./node_modules/date-fns/esm");
	ensureDirectoryExists(esmDir);

	for (const funcName of dateFnsFunctions) {
		const dirPath = path.resolve(`./node_modules/date-fns/esm/${funcName}`);
		ensureDirectoryExists(dirPath);

		// Create the index.js file that re-exports the function as both default and named export
		const indexPath = path.join(dirPath, "index.js");
		const content = `import ${funcName}Default from '../../${funcName}';\nexport const ${funcName} = ${funcName}Default;\nexport default ${funcName}Default;\n`;
		fs.writeFileSync(indexPath, content, "utf8");
		console.log(`Created esm shim for date-fns/esm/${funcName}`);
	}
}

// Main function
async function main() {
	console.log("Starting date-fns compatibility patch...");

	// Create shim modules
	createShimModules();

	// Find all .js files in node_modules/@mui/x-date-pickers
	const files = glob.sync("./node_modules/@mui/x-date-pickers/**/*.js");

	let fixedCount = 0;
	for (const file of files) {
		if (fixImports(file)) {
			fixedCount++;
		}
	}

	console.log(`Patching complete. Fixed ${fixedCount} file(s).`);
}

// Execute the main function
main();
