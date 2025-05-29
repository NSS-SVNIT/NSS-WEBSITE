# NSS-WEBSITE

## Running the Website

To run the NSS-WEBSITE, follow these steps:

1. Clone the repository to your local machine.
2. Navigate to the project directory: `cd /path/to/project`.
3. Install the required dependencies: `yarn install` if Yarn is already installed.
4. Start the development server: `npm run dev` (or `yarn run dev` if Yarn is already installed).
5. Open your web browser and visit `http://localhost:5173` to view the website.

That's it! You should now have the NSS-WEBSITE up and running locally on your machine.

## Installing Yarn

If you don't have Yarn installed on your machine, you can install it using npm by following these steps:

1. Check if Yarn is already installed by running the command `yarn --version` in your terminal or command prompt.
2. If Yarn is not installed, you can install it using npm by running the command `npm install --global yarn`.
3. After installing Yarn, you can proceed with the remaining steps mentioned above to run the NSS-WEBSITE.

That's it! You should now have Yarn installed on your machine and be able to run the NSS-WEBSITE locally.

## Deployment Notes

### Date-fns Compatibility Fix

This project uses date-fns v2.30.0 and includes a compatibility layer for the MUI Date Picker which requires specific imports. If you encounter errors related to date-fns during build or deployment (particularly on Vercel), please refer to the [DATE_FNS_FIX_DOCUMENTATION.md](./DATE_FNS_FIX_DOCUMENTATION.md) file.

The fix includes:

1. A custom date-fns adapter in `src/utils/dateFnsAdapter.js`
2. A patch script that runs before build in `scripts/patch-date-fns.js`
3. Custom Vite configuration in `vite.config.js`
4. Vercel-specific build commands in `vercel.json`

To use the custom DateFnsAdapter in your components:

```jsx
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { CustomDateFnsAdapter } from "../path/to/utils/dateFnsAdapter";

// Then in your component:
<LocalizationProvider dateAdapter={CustomDateFnsAdapter}>
	<DatePicker />
</LocalizationProvider>;
```
