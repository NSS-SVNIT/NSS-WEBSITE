// src/components/sections/GallerySection.js

import React from "react";
import { Grid, Box } from "@mui/material";
import { motion } from "framer-motion";
import GalleryView from "./GalleryView";
import Memories from "../../MemoriesText";

// Animation variant for the container to stagger its children's animations
const sectionVariants = {
	hidden: { opacity: 0 },
	visible: {
		opacity: 1,
		transition: {
			duration: 0.5,
			staggerChildren: 0.3, // This will animate children one after the other
		},
	},
};

const GallerySection = React.memo(() => {
	return (
		<Box
			sx={{
				bgcolor: "#111", // A softer, modern black
				color: "white",
				overflow: "hidden",
				py: { xs: 4, sm: 6, md: 10, lg: 12 },
				minHeight: { xs: 'auto', md: '100vh' },
			}}
		>
			<motion.div
				variants={sectionVariants}
				initial="hidden"
				whileInView="visible"
				viewport={{ once: true, amount: 0.2 }}
				style={{ width: '100%' }}
			>
				<Grid container alignItems="center" spacing={{ xs: 4, sm: 6, lg: 2 }} sx={{ minHeight: { xs: 'auto', md: '100vh' } }}>
					{/* Left Side: The Text */}
					<Grid item xs={12} lg={5}>
						<Memories />
					</Grid>
					{/* Right Side: The Image Gallery */}
					<Grid item xs={12} lg={7}>
						<GalleryView />
					</Grid>
				</Grid>
			</motion.div>
		</Box>
	);
});

export default GallerySection;