import { Box, Stack, Typography } from "@mui/material"; // Import Stack and Typography
import React, { memo } from "react";
// No need to import "./HeroText.css" anymore

const HeroText = memo(() => {
	return (
		// Using a Stack component makes managing space between elements easy.
		// The glass effect is now defined directly in the sx prop.
		<Stack
			spacing={{ xs: 1.5, md: 2 }} // Responsive spacing
			sx={{
<<<<<<< HEAD
				position: 'relative',
				width: '100%',
				// maxWidth: '32rem',
				overflow: 'hidden',
				borderRadius: '1.5rem',
				boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
				// background: 'linear-gradient(to right, rgba(26, 35, 126, 0.5), rgba(198, 40, 40, 0.5))',
				p: { xs: 4, md: 6 },
				backdropFilter: 'blur(10px)',
				border: '1px solid rgba(255, 255, 255, 0.1)',
=======
				// This replaces the .glass CSS class
				background: "rgba(0, 0, 0, 0.8)",
				backdropFilter: "blur(10px)",
				borderRadius: { xs: "10px", md: "15px" },
				border: "1px solid rgba(255, 255, 255, 0.2)",
				boxShadow: "0 4px 30px rgba(0, 0, 0, 0.1)",
				p: { xs: 2, sm: 3, md: 4 }, // More responsive padding
				color: "white", // Set a base text color
				maxWidth: "100%",
>>>>>>> beccea9bd0b392c8c4802e7bcdeeec9113ae7b62
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