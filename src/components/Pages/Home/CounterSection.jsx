// src/components/sections/CounterSection.js

import { Box, Divider, Stack, Typography } from "@mui/material";
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
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
const ParallaxContent = () => {
	const [indices, setIndices] = useState([0, 0, 0, 0]);
	
	useEffect(() => {
		const interval = setInterval(() => {
			setIndices(prev => prev.map(i => (i + 1) % 3));
		}, 3000);
		return () => clearInterval(interval);
	}, []);
	
	return (
		<Stack
			justifyContent="center"
			alignItems="center"
			// --- The main change is here: increase the gap to space out the new button ---
			gap={{ xs: 4, sm: 6, md: 8 }} 
			sx={{
				backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0.5)), url(${BackgroundImage})`,
				backgroundAttachment: { xs: "scroll", md: "fixed" },
				backgroundPosition: "center",
				backgroundSize: "cover",
				py: { xs: 6, sm: 8, md: 12, lg: 16 }, // More responsive padding
				color: 'white',
			}}
		>
			{/* The Stack for the counters */}
			<Stack
				direction={{ xs: "column", sm: "row" }}
				justifyContent="center"
				alignItems="center"
				gap={{ xs: 4, sm: 6, md: 8 }}
				px={{ xs: 2, sm: 3 }}
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
		</Stack>
	);
};

// The main component that frames the parallax content
const CounterSection = React.memo(() => {
	// ... (This part remains unchanged)
	return (
		<React.Fragment>
			<Stack 
				alignItems="center"
				sx={{ 
					bgcolor: 'background.default', 
					pt: { xs: 4, sm: 6, md: 10 },
					pb: { xs: 3, sm: 4, md: 6 },
					px: { xs: 2, sm: 3 },
				}} 
			>
				<Typography
					component="h2"
					sx={{ 
						fontWeight: 'bold',
						fontSize: { xs: '2rem', sm: '2.5rem', md: '3rem' },
					}} 
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