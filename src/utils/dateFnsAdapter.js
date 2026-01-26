// Custom date-fns adapter to fix compatibility issues with MUI Date Picker
// Use AdapterDateFns for date-fns v2.x compatibility
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";

// Import directly from date-fns to avoid circular dependencies
import { format } from "date-fns";

// Create a custom adapter class that extends the AdapterDateFns
// to properly work with date-fns v2.30.0
export class CustomDateFnsAdapter extends AdapterDateFns {
	constructor(options) {
		super(options);
		// Only override the format function to handle MUI-specific format identifiers
		this.format = (date, formatString) => {
			// Check if formatString is undefined or null
			if (!formatString) {
				return format(date, "PPP"); // Default format if none provided
			}

			// Handle MUI-specific format identifiers that are not valid date-fns patterns
			const muiFormatMappings = {
				dayOfMonthFull: "dd", // Full day with leading zero
				dayOfMonth: "d", // Day without leading zero
				month: "MMMM", // Full month name
				monthShort: "MMM", // Short month name
				monthNumber: "M", // Month number
				year: "yyyy", // Full year
				yearShort: "yy", // Short year
				weekday: "EEEE", // Full weekday name
				weekdayShort: "EEE", // Short weekday name
				hours: "HH", // 24-hour format
				hours12: "h", // 12-hour format
				minutes: "mm", // Minutes
				seconds: "ss", // Seconds
				meridiem: "a", // AM/PM
			};

			// Check if this is a MUI format identifier
			if (muiFormatMappings[formatString]) {
				return format(date, muiFormatMappings[formatString]);
			}

			try {
				// First try the format string as-is - it might be valid
				return format(date, formatString);
			} catch (error) {
				// If it fails, try common pattern fixes
				const patternFixes = {
					// Common MUI patterns that cause issues
					"dd/MM/yyyy": "dd/MM/yyyy",
					"MM/dd/yyyy": "MM/dd/yyyy",
					"yyyy-MM-dd": "yyyy-MM-dd",
					"MMMM d, yyyy": "MMMM d, yyyy",
					"MMM d, yyyy": "MMM d, yyyy",
					"d MMMM yyyy": "d MMMM yyyy",
					"EEEE, MMMM d, yyyy": "EEEE, MMMM d, yyyy",
					"MMMM yyyy": "MMMM yyyy",
					"MMM yyyy": "MMM yyyy",
					yyyy: "yyyy",
					MMMM: "MMMM",
					MMM: "MMM",
					dd: "dd",
					d: "d",
				};

				// Check if we have a direct mapping
				if (patternFixes[formatString]) {
					try {
						return format(date, patternFixes[formatString]);
					} catch (e) {
						// Continue to fallback logic
					}
				}

				// As a last resort, escape the entire string and return a simple format
				console.warn(
					`Unknown format string "${formatString}", using fallback format`
				);
				return format(date, "dd/MM/yyyy");
			}
		};
	}
}

// Export a default instance for easier imports
export const DateFnsAdapter = CustomDateFnsAdapter;
