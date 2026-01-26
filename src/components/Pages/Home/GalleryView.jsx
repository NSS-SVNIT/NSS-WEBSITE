// src/components/gallery/GalleryView.js

import React from "react";
import { Box, ImageList, ImageListItem, useMediaQuery, useTheme } from "@mui/material";
import { motion } from "framer-motion";

// Import your images...
import Home_1 from "../../../assets/Home_1.jpg";
import Home_2 from "../../../assets/Home_2.jpg";
import Home_3 from "../../../assets/Home_3.jpg";
import Home_4 from "../../../assets/Home_4.jpg";
import Home_5 from "../../../assets/Home_5.jpg";
import Home_6 from "../../../assets/Home_6.jpg";
import Home_7 from "../../../assets/Home_7.jpg";
import Home_8 from "../../../assets/Home_8.jpg";
import Home_9 from "../../../assets/Home_9.jpg";
import Home_10 from "../../../assets/Home_10.jpg";
import Home_11 from "../../../assets/Home_11.jpg";
import Home_12 from "../../../assets/Home_12.jpg";
import Home_13 from "../../../assets/Home_13.jpg";

const itemData = [
  // This data structure is correct and remains the same.
  { img: Home_1, title: "Group Photo", rows: 1, cols: 2 },
  { img: Home_3, title: "DSP", rows: 2, cols: 1 },
  { img: Home_4, title: "Flag", rows: 2, cols: 1 },
  { img: Home_5, title: "Lucky", rows: 2, cols: 1 },
  { img: Home_13, title: "Group Flag", rows: 2, cols: 1 },
  { img: Home_2, title: "Aditi & Anjali", rows: 1, cols: 2 },
  { img: Home_6, title: "Kalash Yatra", rows: 1, cols: 2 },
  { img: Home_7, title: "BMS", rows: 3, cols: 2 },
  { img: Home_8, title: "Fern", rows: 2, cols: 2 },
  { img: Home_9, title: "Tree Planting", rows: 2, cols: 1 },
  { img: Home_10, title: "Orphanage", rows: 1, cols: 1 },
  { img: Home_11, title: "Blind Fold", rows: 1, cols: 2 },
  { img: Home_12, title: "Camp Sitting", rows: 1, cols: 3 },
];

// --- STEP 1: REMOVE THE `srcset` FUNCTION ENTIRELY ---
// It was causing the layout issues.

// --- STEP 2: DEFINE CLEAN ANIMATION VARIANTS ---

// This variant is for the grid container. It orchestrates the animation of its children.
const galleryContainerVariants = {
	hidden: { opacity: 0 },
	visible: {
		opacity: 1,
		transition: {
			staggerChildren: 0.1, // Each child will animate 0.1s after the previous one
		},
	},
};

// This variant is for each individual image.
const imageItemVariants = {
	hidden: { opacity: 0, y: 50, scale: 0.9 },
	visible: {
		opacity: 1,
		y: 0,
		scale: 1,
		transition: {
			duration: 0.5,
			ease: "easeOut",
		},
	},
};

const GalleryView = React.memo(() => {
	const theme = useTheme();
	const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
	
	// --- STEP 3: SIMPLIFY THE COMPONENT ---
	// No more `useEffect`, `useAnimation`, or manual IntersectionObserver needed.
	
	return (
		// A wrapping Box to control alignment and padding
		<Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', p: { xs: 1, sm: 2 }, width: '100%' }}>
			<ImageList
				// Use motion component directly for easy animation
				component={motion.div}
				variants={galleryContainerVariants}
				initial="hidden"
				whileInView="visible"
				viewport={{ once: true, amount: 0.1 }}
				sx={{ 
					width: "100%", 
					maxWidth: { xs: '100%', sm: 600, md: 700 }, 
					overflow: "hidden" // Changed to hidden to prevent layout issues
				}}
				variant="quilted"
				cols={isMobile ? 2 : 4}
				rowHeight={isMobile ? 100 : 140}
				gap={isMobile ? 8 : 12} // Responsive gap
			>
				{itemData.map((item, index) => (
					<ImageListItem
						// Animate the list item container
						component={motion.div}
						key={item.img}
						variants={imageItemVariants}
						cols={item.cols || 1}
						rows={item.rows || 1}
						// --- STEP 4: BEAUTIFY THE ITEMS ---
						sx={{ 
							borderRadius: { xs: '8px', md: '12px' }, 
							overflow: 'hidden', // Keep overflow hidden for rounded corners
							boxShadow: { xs: '0 4px 15px rgba(0,0,0,0.4)', md: '0 8px 25px rgba(0,0,0,0.5)' }
						}}
					>
						<motion.img
							src={item.img}
							alt={item.title}
							loading="lazy"
							// Desktop: hover effect
							whileHover={!isMobile ? { scale: 1.05 } : {}}
							// Mobile: tap effect with brightness change
							whileTap={isMobile ? { scale: 0.95, filter: "brightness(0.8)" } : {}}
							// Add a subtle continuous animation on mobile for interactivity
							animate={isMobile ? {
								boxShadow: [
									"0 4px 15px rgba(0,0,0,0.4)",
									"0 6px 20px rgba(72, 169, 224, 0.3)",
									"0 4px 15px rgba(0,0,0,0.4)"
								]
							} : {}}
							transition={
								isMobile 
									? { 
										boxShadow: { duration: 3, repeat: Infinity, ease: "easeInOut", delay: index * 0.2 },
										scale: { duration: 0.2 },
										filter: { duration: 0.2 }
									}
									: { duration: 0.3 }
							}
							// --- THIS IS THE KEY FIX ---
							// This style makes the image perfectly fill its container without distortion.
							style={{
								width: '100%',
								height: '100%',
								objectFit: 'cover',
								display: 'block', // Removes any extra space below the image
							}}
						/>
					</ImageListItem>
				))}
			</ImageList>
		</Box>
	);
});

export default GalleryView;