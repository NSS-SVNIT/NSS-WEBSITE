// src/components/sections/CounterSection.js

import { Box, Button, Divider, Stack, Typography } from "@mui/material"; // Import Button
import React from "react";
import { Link } from "react-router-dom"; // Import Link for navigation
import { motion } from "framer-motion"; // Import motion for animation
import Counter from "../../UI/Counter";

// Import icons and background image...
import PeopleIcon from '@mui/icons-material/People';
import ChildFriendlyIcon from '@mui/icons-material/ChildFriendly';
import LocalActivityIcon from '@mui/icons-material/LocalActivity';
import RssFeedIcon from '@mui/icons-material/RssFeed';
import BackgroundImage from "../../../assets/44.jpg";

// Data remains the same
const countersData = [
	{ icon: <PeopleIcon />, end: 500, title: "Volunteers" },
	{ icon: <LocalActivityIcon />, end: 50, title: "Activities" },
	{ icon: <ChildFriendlyIcon />, end: 7, title: "Camps" },
	{ icon: <RssFeedIcon />, end: 1600, title: "Followers" },
];

// The internal component for the parallax section
const ParallaxContent = () => (
	<Stack
		justifyContent="center"
		alignItems="center"
		// --- The main change is here: increase the gap to space out the new button ---
		gap={{ xs: 6, md: 8 }} 
		sx={{
			backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0.5)), url(${BackgroundImage})`,
			backgroundAttachment: "fixed",
			backgroundPosition: "center",
			backgroundSize: "cover",
			py: { xs: 10, md: 16 }, // Adjusted padding for more space
			color: 'white',
		}}
	>
		{/* The Stack for the counters */}
		<Stack
			direction={{ xs: "column", sm: "row" }}
			justifyContent="center"
			alignItems="center"
			gap={{ xs: 5, sm: 8 }}
			px={2}
		>
			{countersData.map((counter, index) => (
				<React.Fragment key={counter.title}>
					<Counter {...counter} />
					{index < countersData.length - 1 && (
						<Divider
							orientation={{ xs: "horizontal", sm: "vertical" }}
							flexItem
							sx={{ width: { xs: '50%', sm: 'auto' }, borderColor: 'rgba(255, 255, 255, 0.25)' }}
						/>
					)}
				</React.Fragment>
			))}
		</Stack>

		{/* --- NEW BUTTON ADDED HERE --- */}
		<motion.div
			initial={{ opacity: 0, y: 20 }}
			whileInView={{ opacity: 1, y: 0, transition: { duration: 0.5, delay: 0.2 } }}
			viewport={{ once: true }}
		>
			<Button
				component={Link}
				to="/events"
				variant="contained" // Solid, attention-grabbing style
				size="large"
				sx={{
					// Style the button to stand out
					py: 1.5,
					px: 4,
					fontSize: '1rem',
					fontWeight: 'bold',
					borderRadius: '50px', // Pill-shaped button
				}}
			>
				Explore our Events
			</Button>
		</motion.div>
	</Stack>
);

// The main component that frames the parallax content
const CounterSection = React.memo(() => {
	// ... (This part remains unchanged)
	return (
		<React.Fragment>
			<Stack 
				alignItems="center"
				sx={{ 
					bgcolor: 'background.default', 
					pt: { xs: 6, md: 10 },
					pb: { xs: 4, md: 6 },
				}} 
			>
				<Typography
					variant="h2"
					component="h2"
					sx={{ fontWeight: 'bold' }} 
				>
					Our Reach
				</Typography>
			</Stack>
			<ParallaxContent />
			<Box 
				sx={{ 
					bgcolor: 'background.default', 
					py: { xs: 6, md: 10 } 
				}} 
			/>
		</React.Fragment>
	);
});

export default CounterSection;