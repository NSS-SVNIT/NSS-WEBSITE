// Custom date-fns adapter to fix compatibility issues with MUI Date Picker
// Use AdapterDateFns for date-fns v2.x compatibility
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";

// Import all required functions from our compatibility layer
// This ensures proper named exports as expected by MUI
import {
	addDays,
	addMonths,
	addYears,
	differenceInDays,
	differenceInMonths,
	differenceInYears,
	eachDayOfInterval,
	endOfDay,
	endOfMonth,
	endOfWeek,
	endOfYear,
	format,
	formatDistance,
	formatISO,
	getDate,
	getDaysInMonth,
	getHours,
	getMinutes,
	getMonth,
	getSeconds,
	getWeek,
	getYear,
	isAfter,
	isBefore,
	isEqual,
	isSameDay,
	isSameMonth,
	isSameYear,
	isValid,
	isWithinInterval,
	parse,
	parseISO,
	setDate,
	setHours,
	setMinutes,
	setMonth,
	setSeconds,
	setYear,
	startOfDay,
	startOfMonth,
	startOfWeek,
	startOfYear,
} from "./dateFnsExports";

// Create a custom adapter class that extends the AdapterDateFns
// to properly work with date-fns v2.30.0
export class CustomDateFnsAdapter extends AdapterDateFns {
	constructor(options) {
		super(options);

		// Override methods to use our directly imported functions
		this.addDays = addDays;
		this.addMonths = addMonths;
		this.addYears = addYears;
		this.differenceInDays = differenceInDays;
		this.differenceInMonths = differenceInMonths;
		this.differenceInYears = differenceInYears;
		this.eachDayOfInterval = eachDayOfInterval;
		this.endOfDay = endOfDay;
		this.endOfMonth = endOfMonth;
		this.endOfWeek = endOfWeek;
		this.endOfYear = endOfYear;
		// Use a custom format function to handle format string escaping properly
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
		this.formatDistance = formatDistance;
		this.formatISO = formatISO;
		this.getDate = getDate;
		this.getDaysInMonth = getDaysInMonth;
		this.getHours = getHours;
		this.getMinutes = getMinutes;
		this.getMonth = getMonth;
		this.getSeconds = getSeconds;
		this.getWeek = getWeek;
		this.getYear = getYear;
		this.isAfter = isAfter;
		this.isBefore = isBefore;
		this.isEqual = isEqual;
		this.isSameDay = isSameDay;
		this.isSameMonth = isSameMonth;
		this.isSameYear = isSameYear;
		this.isValid = isValid;
		this.isWithinInterval = isWithinInterval;
		this.parse = parse;
		this.parseISO = parseISO;
		this.setDate = setDate;
		this.setHours = setHours;
		this.setMinutes = setMinutes;
		this.setMonth = setMonth;
		this.setSeconds = setSeconds;
		this.setYear = setYear;
		this.startOfDay = startOfDay;
		this.startOfMonth = startOfMonth;
		this.startOfWeek = startOfWeek;
		this.startOfYear = startOfYear;
	}
}

// Export a default instance for easier imports
export const DateFnsAdapter = CustomDateFnsAdapter;
