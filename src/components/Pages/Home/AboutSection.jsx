// src/components/sections/AboutSection.js

import { Box, Button, Divider, Stack, Typography } from "@mui/material"; // Import Button
import React from "react";
import { Link } from "react-router-dom"; // Import Link for navigation
import { motion } from "framer-motion";
import ArrowForwardIcon from '@mui/icons-material/ArrowForward'; // Icon for the button

import imageUrl from "../../../assets/55.jpg"; // Import the background image

const SECTION_BG = 'linear-gradient(180deg, #fdeeff 0%, #fff9ff 100%)';

// The internal parallax component remains unchanged.
const AboutParallaxContent = () => (
	<Stack
		justifyContent="center"
		alignItems="center"
		sx={{
			backgroundImage: `linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.6)), url(${imageUrl})`,
			backgroundAttachment: { xs: "scroll", md: "fixed" },
			backgroundPosition: "center",
			backgroundSize: "cover",
			color: "white",
			py: { xs: 6, sm: 8, md: 20, lg: 30 },
		}}
	>
		<Box
			sx={{
				width: '100%',
				maxWidth: '800px',
				px: { xs: 2, sm: 3, md: 4 },
			}}
		>
			<motion.div
				initial={{ opacity: 0, y: 50 }}
				whileInView={{ opacity: 1, y: 0, transition: { duration: 0.8 } }}
				viewport={{ once: true, amount: 0.4 }}
			>
				<Typography sx={{ fontFamily: "DM Sans", fontSize: { xs: "1rem", sm: "1.1rem", md: "1.25rem" }, textAlign: "justify", lineHeight: { xs: 1.6, md: 1.8 } }}>
					The Motto of NSS <b>"Not Me But You"</b>, reflects the essence of
					democratic living and upholds the need for self-less service. NSS
					helps the student's development & appreciation of other person's
					point of view and also shows consideration towards other living beings.
				</Typography>
			</motion.div>
		</Box>
	</Stack>
);

// The main component that frames the parallax section.
const AboutSection = React.memo(() => {
	return (
		<React.Fragment>
			
			{/* TOP WHITE SECTION WITH HEADING AND NEW BUTTON */}
			<Stack 
				alignItems="center" 
				spacing={{ xs: 3, md: 4 }} // Responsive spacing
				sx={{ 
					background: SECTION_BG,
					pt: { xs: 4, sm: 6, md: 10 },
					pb: { xs: 4, sm: 6, md: 8 },
					px: { xs: 2, sm: 3 }, // Add horizontal padding
				}} 
			>
				<Box textAlign="center" sx={{ px: { xs: 2, sm: 0 } }}>
					<Typography sx={{ fontFamily: "Poppins", fontWeight: 300, fontSize: { xs: "1.5rem", sm: "2rem", md: "3rem" }, color: 'text.secondary' }}>
						Celebrating our Motto...
					</Typography>
					<Typography sx={{ fontFamily: "Nothing You Could Do", fontSize: { xs: "2.5rem", sm: "3.5rem", md: "5rem" }, color: 'text.primary', lineHeight: 1.2 }}>
						Not Me, But You!
					</Typography>
				</Box>
				{/* --- NEW BUTTON ADDED HERE --- */}
				<motion.div
					initial={{ opacity: 0, y: 20 }}
					whileInView={{ opacity: 1, y: 0, transition: { duration: 0.5, delay: 0.2 } }}
					viewport={{ once: true }}
				>
					<Button
						component={Link}
						to="/about"
						variant="contained"
						size="large"
						endIcon={<ArrowForwardIcon />}
						sx={{
							borderRadius: '50px', // Pill shape
							fontWeight: 'bold',
							textTransform: 'none',
							fontSize: { xs: '0.9rem', sm: '1rem', md: '1.1rem' },
							px: { xs: 3, sm: 4, md: 5 },
							py: { xs: 1.2, md: 1.5 },
						}}
					>
						Know More About Us
					</Button>
				</motion.div>
			<Stack 
				alignItems="center" 
				spacing={{ xs: 3, md: 4 }} // Responsive spacing
				sx={{ 
					background: SECTION_BG,
					pt: { xs: 4, sm: 6, md: 10 },
					pb: { xs: 4, sm: 6, md: 8 },
					px: { xs: 2, sm: 3 }, // Add horizontal padding
				}} 
			></Stack>

				
			</Stack>

			{/* THE MIDDLE PARALLAX SECTION */}
			<AboutParallaxContent />

			{/* BOTTOM BLANK WHITE SECTION */}
			<Box 
				sx={{ 
					background: SECTION_BG,
					py: { xs: 6, md: 10 } 
				}} 
			/>

		</React.Fragment>
	);
});

export default AboutSection;
