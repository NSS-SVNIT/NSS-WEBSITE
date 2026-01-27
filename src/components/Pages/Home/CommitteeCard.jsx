// CommitteeCard.js
import React from "react";
import { Box, Typography, Paper } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import ButtonReadMore from "./ButtonReadMore"; // Assuming this is your styled button

// Framer motion variant for each card to animate in
const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: { y: 0, opacity: 1, transition: { duration: 0.6, ease: 'easeOut' } },
};

const CommitteeCard = React.memo(({ title, icon, about, route }) => {
	const navigate = useNavigate();

	// Function to restart GIF on hover for a cool effect
	const reloadGif = (e) => {
		e.target.src = e.target.src;
	};

	const handleReadMore = () => {
		navigate(route);
	};

	return (
		<Paper
			component={motion.div}
			variants={itemVariants}
			elevation={2}
			sx={{
				p: { xs: 1.5, sm: 3 },
				textAlign: 'center',
				borderRadius: 4,
				width: '100%',
				height: '100%',
				minHeight: { xs: 220, sm: 300, md: 320 },
				display: 'flex',
				flexDirection: 'column',
				transition: 'transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out',
				'&:hover': {
					transform: 'translateY(-8px)',
					boxShadow: '0px 16px 32px rgba(90, 42, 122, 0.2)',
				}
			}}
		>
			<Box
				sx={{
					height: { xs: 120, sm: 180 },
					display: 'flex',
					alignItems: 'center',
					justifyContent: 'center',
					mb: 2,
				}}
			>
				<img
					src={icon}
					alt={`${title} committee icon`}
					onMouseEnter={reloadGif}
					style={{ maxHeight: '100%', maxWidth: '100%' }}
				/>
			</Box>
			
			<Typography
				variant="h5"
				component="h3"
				sx={{
					fontFamily: "'DM Sans', sans-serif",
					fontWeight: 'bold',
					fontSize: { xs: '1rem', sm: '1.25rem', md: '1.5rem' },
					lineHeight: 1.2,
					overflowWrap: 'anywhere',
					wordBreak: 'break-word',
					display: '-webkit-box',
					WebkitBoxOrient: 'vertical',
					WebkitLineClamp: 2,
					overflow: 'hidden',
					minHeight: '2.4em',
					mb: 2,
				}}
			>
				{title}
			</Typography>

			<Box sx={{ mt: 'auto' }}>
				<ButtonReadMore onClick={handleReadMore} text="Read More" />
			</Box>
		</Paper>
	);
});

export default CommitteeCard;
