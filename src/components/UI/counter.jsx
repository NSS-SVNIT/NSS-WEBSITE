// src/UI/Counter.js

import { Box, Stack, Typography } from "@mui/material";
import CountUp from "react-countup";

// 1. The component now accepts an `icon` prop. Props `start` and `duration` are removed for simplicity.
const Counter = ({ icon, end, title }) => {
	return (
		<Stack spacing={1.5} alignItems="center">
			
			{/* 2. Box to display the icon with a styled background */}
			<Box
				sx={{
					// Semi-transparent white background for the icon
					bgcolor: 'rgba(255, 255, 255, 0.2)',
					borderRadius: '50%',
					p: 1.5,
					display: 'flex',
					mb: 1,
					// Style the SVG icon itself
					'& .MuiSvgIcon-root': {
						fontSize: { xs: '2rem', md: '2.5rem' },
					}
				}}
			>
				{icon}
			</Box>
			
			<Typography
				sx={{
					fontSize: { xs: "2rem", md: "2.5rem" },
					fontWeight: "bold",
					fontFamily: "Poppins, sans-serif",
					// 3. Color is removed to be inherited from the parent. Text shadow is added.
					textShadow: "1px 1px 4px rgba(0, 0, 0, 0.5)",
				}}
			>
				{/* 4. Added separator for numbers like 2,000 */}
				<CountUp start={0} end={end} duration={2.5} enableScrollSpy separator="," />
			</Typography>

			<Typography
				variant="body1"
				sx={{ 
					fontWeight: 500,
					// 3. Color is removed. Text shadow is added.
					textShadow: "1px 1px 4px rgba(0, 0, 0, 0.5)",
				}}
			>
				{title}
			</Typography>
		</Stack>
	);
};

export default Counter;