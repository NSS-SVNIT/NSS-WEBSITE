import { Box, Stack, Typography } from "@mui/material"; // Import Stack and Typography
import React, { memo } from "react";
// No need to import "./HeroText.css" anymore

const HeroText = memo(() => {
	return (
		// Using a Stack component makes managing space between elements easy.
		// The glass effect is now defined directly in the sx prop.
		<Stack
			spacing={{ xs: 1.5, md: 2 }}
			sx={{
				position: 'relative',
				width: '100%',
				overflow: 'hidden',
				borderRadius: '1.5rem',
				boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
				p: { xs: 4, md: 6 },
				backdropFilter: 'blur(10px)',
				border: '1px solid rgba(255, 255, 255, 0.1)',
				color: 'white',
			}}
		>
			{/* Use Typography for semantic and consistent text styling */}
			<Typography
				component="h1" // Good for SEO to have one h1 on the page
				sx={{
					fontWeight: "bold",
					fontSize: { xs: "2rem", sm: "3rem", md: "3.5rem" },
					textShadow: "2px 2px 4px rgba(0,0,0,0.4)",
					lineHeight: 1.2,
				}}
			>
				NSS SVNIT
			</Typography>

			<Typography
				sx={{
					fontSize: { xs: "0.9rem", sm: "1rem", md: "1.1rem" },
					lineHeight: 1.7,
					textShadow: "1px 1px 2px rgba(0,0,0,0.5)",
					textAlign: "justify",
				}}
			>
				Empowering Society, Transforming Lives. Serving 
				our community with unwavering commitment and a 
				dedication to making a lasting positive impact.
			</Typography>
		</Stack>
	);
});

export default HeroText;