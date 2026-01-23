// ArticleCard.jsx

import React from 'react';
import { Box, Card, CardContent, CardMedia, Typography, Stack, Button, Link } from "@mui/material";
import DownloadIcon from '@mui/icons-material/Download';
import AutoStoriesIcon from '@mui/icons-material/AutoStories';

const ArticleCard = React.memo(({ name, description, image, download, flipbook }) => {
	return (
		<Card
			component={Link}
			href={flipbook || download}
			target="_blank"
			sx={{
				position: 'relative',
				display: 'block',
				height: '100%',
				borderRadius: 4,
				overflow: 'hidden',
				textDecoration: 'none',
				transition: 'transform 0.4s ease, box-shadow 0.4s ease',
				boxShadow: '0 8px 24px rgba(0,0,0,0.12)',
				// Enforce a consistent aspect ratio for a uniform grid
				aspectRatio: '3 / 4',
				'&:hover': {
					transform: 'translateY(-8px)',
					boxShadow: '0 16px 32px rgba(0,0,0,0.15)',
					// Target the media component inside for the zoom effect
					'.card-media': {
						transform: 'scale(1.1)',
					},
				},
			}}
		>
			{/* Background Image */}
			<CardMedia
				className="card-media"
				component="img"
				image={image}
				alt={name}
				sx={{
					position: 'absolute',
					top: 0,
					left: 0,
					width: '100%',
					height: '100%',
					objectFit: 'cover',
					zIndex: 1,
					transition: 'transform 0.5s ease-in-out',
				}}
			/>

			{/* Gradient Overlay for Text Readability */}
			<Box
				sx={{
					position: 'absolute',
					top: 0,
					left: 0,
					width: '100%',
					height: '100%',
					zIndex: 2,
					background: 'linear-gradient(to top, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0.6) 40%, transparent 80%)',
				}}
			/>

			{/* Content layered on top */}
			<CardContent
				sx={{
					position: 'relative',
					zIndex: 3,
					color: 'white',
					height: '100%',
					display: 'flex',
					flexDirection: 'column',
					justifyContent: 'flex-end', // Aligns content to the bottom
					p: 3,
				}}
			>
				<Typography variant="h5" component="div" sx={{ fontWeight: 'bold', mb: 1, textShadow: '1px 1px 3px rgba(0,0,0,0.7)' }}>
					{name}
				</Typography>
				<Typography variant="body2" sx={{ mb: 3, opacity: 0.9 }}>
					{description}
				</Typography>

				<Stack direction="row" spacing={2}>
					{download && (
						<Button
							href={download}
							target="_blank"
							variant="contained"
							startIcon={<DownloadIcon />}
							onClick={(e) => e.stopPropagation()} // Prevent card link from firing
						>
							Download
						</Button>
					)}
					{flipbook && (
						<Button
							href={flipbook}
							target="_blank"
							variant="outlined"
							startIcon={<AutoStoriesIcon />}
							onClick={(e) => e.stopPropagation()} // Prevent card link from firing
							sx={{ color: 'white', borderColor: 'rgba(255,255,255,0.5)', '&:hover': { borderColor: 'white', bgcolor: 'rgba(255,255,255,0.1)' } }}
						>
							Read E-Book
						</Button>
					)}
				</Stack>
			</CardContent>
		</Card>
	);
});

export default ArticleCard;