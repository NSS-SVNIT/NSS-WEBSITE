import { Box, Stack, Typography } from "@mui/material"; // Import Stack and Typography
import React from "react";
// No need to import "./HeroText.css" anymore

const HeroText = () => {
	return (
		// Using a Stack component makes managing space between elements easy.
		// The glass effect is now defined directly in the sx prop.
		<Stack
			sx={{
				position: 'relative',
				width: '100%',
				// maxWidth: '32rem',
				overflow: 'hidden',
				borderRadius: '1.5rem',
				boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
				// background: 'linear-gradient(to right, rgba(26, 35, 126, 0.5), rgba(198, 40, 40, 0.5))',
				p: { xs: 4, md: 6 },
				backdropFilter: 'blur(4px)',
				border: '1px solid rgba(255, 255, 255, 0.1)',
			}}
		>
			{/* Use Typography for semantic and consistent text styling */}
			<Typography
				variant="h3"
				component="h1" // Good for SEO to have one h1 on the page
				sx={{
					fontSize: { xs: '2.25rem', md: '3rem' },
					fontWeight: 'bold',
					color: 'white',
					mb: 2,
					letterSpacing: '-0.025em',
				}}
			>
				NSS SVNIT
			</Typography>

			<Typography
				variant="body1"
				sx={{
					color: 'rgba(255, 255, 255, 0.9)',
					fontSize: '1.125rem',
					// lineHeight: 1.625,
					fontWeight: 'medium',
				}}
			>
				Empowering Society, Transforming Lives. Serving 
				our community with unwavering commitment and a 
				dedication to making a lasting positive impact.
			</Typography>
		</Stack>
	);
};

export default HeroText;