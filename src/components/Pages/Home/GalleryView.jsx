// src/components/gallery/GalleryView.js

import React from "react";
import { Box, ImageList, ImageListItem, useMediaQuery, useTheme } from "@mui/material";
import { motion } from "framer-motion";

// Import your images...
import Home_1 from "../../../assets/Home_1.jpg";
import Home_2 from "../../../assets/Home_2.jpg";
import Home_3 from "../../../assets/Home_3.png";
import Home_4 from "../../../assets/Home_4.jpg";
import Home_5 from "../../../assets/Home_5.jpeg";
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
		<Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', p: 2, width: '100%' }}>
			<ImageList
				// Use motion component directly for easy animation
				component={motion.div}
				variants={galleryContainerVariants}
				initial="hidden"
				whileInView="visible"
				viewport={{ once: true, amount: 0.1 }}
				sx={{ 
					width: "100%", 
					maxWidth: 700, 
					// IMPORTANT: Set overflow to 'visible' to allow hover scales to work without being cut off
					overflow: "visible" 
				}}
				variant="quilted"
				cols={isMobile ? 2 : 4}
				rowHeight={140}
				gap={12} // Increased gap for a cleaner look
			>
				{itemData.map((item) => (
					<ImageListItem
						// Animate the list item container
						component={motion.div}
						key={item.img}
						variants={imageItemVariants}
						cols={item.cols || 1}
						rows={item.rows || 1}
						// --- STEP 4: BEAUTIFY THE ITEMS ---
						sx={{ 
							borderRadius: '12px', 
							overflow: 'hidden', // Hides the parts of the image that scale outside the rounded border
							boxShadow: '0 8px 25px rgba(0,0,0,0.5)'
						}}
					>
						<motion.img
							src={item.img}
							alt={item.title}
							loading="lazy"
							whileHover={{ scale: 1.1, rotate: 2 }} // Adds a great hover effect
							transition={{ duration: 0.3 }}
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