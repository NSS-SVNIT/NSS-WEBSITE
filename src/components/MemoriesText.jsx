// src/components/MemoriesText.js

import React, { memo } from "react";
import { Box, Button, Stack, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

// Animation variants for each text block
const textBlockVariants = {
	hidden: { opacity: 0, y: 50 },
	visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } },
};

const Memories = memo(() => {
	return (
		<motion.div variants={textBlockVariants}>
			<Stack sx={{ px: { xs: 2, sm: 3, lg: 10 } }} spacing={{ xs: 3, md: 4 }}>
				{/* The Heading */}
				<Typography
					component="h2"
					sx={{
						fontSize: { xs: "1.8rem", sm: "2.5rem", md: "3.5rem" },
						fontFamily: "Poppins",
						fontWeight: 300,
						lineHeight: 1.2,
					}}
				>
					Collected awesome
					<Typography
						component="span"
						sx={{
							display: 'block', // Puts "Memories" on a new line
							fontWeight: "400",
							fontSize: { xs: "2.5rem", sm: "3.5rem", md: "6rem" },
							fontFamily: "Nothing You Could Do",
							color: 'primary.light', // Use a theme color
							textShadow: '0 0 15px rgba(13, 71, 161, 0.4)'
						}}
					>
						Memories
					</Typography>
					over the years...
				</Typography>

				{/* The Paragraph */}
				<Typography variant="body1" sx={{ color: 'grey.400', lineHeight: { xs: 1.6, md: 1.8 }, textAlign: 'justify', fontSize: { xs: '0.95rem', md: '1rem' } }}>
					NSS SVNIT organises various on-campus and off-campus activities aimed at
					the integration of the community and generating widespread awareness
					about prevailing social issues. We live by our motto{' '}
					<b>‘Not Me But You.’</b>
				</Typography>
				
				{/* The Button */}
				<Box>
					<Button
						component={Link}
						to="/gallery"
						variant="contained"
						size="large"
						endIcon={<ArrowForwardIcon />}
						sx={{
							borderRadius: '50px',
							textTransform: 'none',
							fontSize: { xs: '0.9rem', md: '1rem' },
							fontFamily: "DM Sans",
							fontWeight: 'bold',
							py: { xs: 1.2, md: 1.5 },
							px: { xs: 3, md: 4 },
							boxShadow: '0 4px 20px rgba(13, 71, 161, 0.5)',
							transition: 'transform 0.3s ease',
							'&:hover': {
								transform: 'translateY(-3px)',
								boxShadow: '0 6px 25px rgba(13, 71, 161, 0.7)',
							}
						}}
					>
						Explore Gallery
					</Button>
				</Box>
			</Stack>
		</motion.div>
	);
});

export default Memories;