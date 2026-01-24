import { Box, Stack, Typography } from "@mui/material"; // Import Stack and Typography
import React, { memo } from "react";
// No need to import "./HeroText.css" anymore

const HeroText = memo(() => {
	return (
		// Using a Stack component makes managing space between elements easy.
		// The glass effect is now defined directly in the sx prop.
		<Stack
			spacing={2} // Adds space between the heading and the paragraph
			sx={{
				// This replaces the .glass CSS class
				background: "rgba(0, 0, 0, 0.5)",
				backdropFilter: "blur(10px)",
				borderRadius: "15px",
				border: "1px solid rgba(255, 255, 255, 0.2)",
				boxShadow: "0 4px 30px rgba(0, 0, 0, 0.1)",
				p: { xs: 3, md: 4 }, // Responsive padding
				color: "white", // Set a base text color
			}}
		>
			{/* Use Typography for semantic and consistent text styling */}
			<Typography
				variant="h3"
				component="h1" // Good for SEO to have one h1 on the page
				sx={{
					fontWeight: "bold",
					textShadow: "2px 2px 4px rgba(0,0,0,0.4)",
				}}
			>
				{/* The colored span is replicated with a `span` and sx prop */}
				<span style={{ color: "#48a9e0" }}>NSS</span> SVNIT
			</Typography>

			<Typography
				variant="body1"
				sx={{
					lineHeight: 1.7,
					textShadow: "1px 1px 2px rgba(0,0,0,0.5)",
				}}
			>
				Serving our community for a year and counting signifies the
				commitment and dedication of the National Service Scheme (NSS)
				towards making a positive impact on the community.
			</Typography>
		</Stack>
	);
});

export default HeroText;