// BlogCard.jsx

import React from 'react';
import { Box, Card, CardContent, CardMedia, Typography, Link, Icon } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

const BlogCard = React.memo(({ title, to, image }) => {
	return (
		<Card
			component={RouterLink}
			to={to}
			sx={{
				display: 'flex',
				flexDirection: 'column', // This is the key change for the new layout
				height: '100%',
				borderRadius: 4,
				overflow: 'hidden',
				textDecoration: 'none',
				backgroundColor: 'background.paper',
				transition: 'transform 0.4s ease, box-shadow 0.4s ease',
				boxShadow: '0 8px 24px rgba(0,0,0,0.12)',
				'&:hover': {
					transform: 'translateY(-8px)',
					boxShadow: '0 16px 32px rgba(0,0,0,0.15)',
					'.card-media': {
						transform: 'scale(1.1)',
					},
					'.card-title': {
						color: 'primary.main',
					},
					'.read-more-icon': {
						transform: 'translateX(5px)',
					}
				},
			}}
		>
			{/* Image Container */}
			<Box
				sx={{
					// This container is crucial for the zoom effect without breaking layout
					overflow: 'hidden',
					position: 'relative',
					// Sets a professional widescreen aspect ratio for the image
					aspectRatio: '1/1',
				}}
			>
				<CardMedia
					className="card-media"
					component="img"
					image={image}
					alt={title}
					sx={{
						width: '100%',
						height: '100%',
						objectFit: 'cover',
						transition: 'transform 0.5s ease-in-out',
					}}
				/>
			</Box>

			{/* Content Below Image */}
			<CardContent
				sx={{
					p: 3,
					flexGrow: 1, // This makes the content area fill the remaining space
					display: 'flex',
					flexDirection: 'column',
					justifyContent: 'space-between', // Pushes title up and "Read More" down
				}}
			>
				<Typography
					className="card-title"
					variant="h6" // h6 is a better fit for this smaller layout
					sx={{
						fontWeight: 'bold',
						transition: 'color 0.3s ease',
						// --- This is important for handling long titles ---
						overflow: 'hidden',
						textOverflow: 'ellipsis',
						display: '-webkit-box',
						WebkitLineClamp: '2', // Clamp to 2 lines
						WebkitBoxOrient: 'vertical',
						minHeight: '3em', // Reserve space for 2 lines to prevent layout shifts
					}}
				>
					{title}
				</Typography>

				{/* Animated "Read More" Link */}
				<Link
					component="span"
					sx={{
						display: 'flex',
						alignItems: 'center',
						color: 'primary.main',
						fontWeight: 500,
						textDecoration: 'none',
						mt: 2, // Margin top for spacing
					}}
				>
					Read More
					<Icon
						className="read-more-icon"
						component={ArrowForwardIcon}
						sx={{ ml: 1, transition: 'transform 0.3s ease' }}
					/>
				</Link>
			</CardContent>
		</Card>
	);
});

export default BlogCard;