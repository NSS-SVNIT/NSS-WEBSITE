// AlbumCard.jsx

import React from 'react';
import { Box, Typography, Card, CardMedia, CardActionArea } from '@mui/material';

const AlbumCard = React.memo(({ albumName, images = [], onOpen }) => {
	const coverImage = images.length > 0 ? images[0] : 'https://via.placeholder.com/600x800.png?text=No+Image';

	return (
		<Card
			sx={{
				position: 'relative',
				display: 'block',
				height: '100%',
				borderRadius: 4,
				overflow: 'hidden',
				transition: 'transform 0.4s ease, box-shadow 0.4s ease',
				boxShadow: '0 8px 24px rgba(0,0,0,0.12)',
				aspectRatio: '3 / 4',
				'&:hover': {
					transform: 'translateY(-8px)',
					boxShadow: '0 16px 32px rgba(0,0,0,0.15)',
					'.card-media': {
						transform: 'scale(1.1)',
					},
				},
			}}
		>
			<CardActionArea onClick={onOpen} sx={{ height: '100%' }}>
				<CardMedia
					className="card-media"
					component="img"
					image={coverImage}
					alt={albumName}
					sx={{
						position: 'absolute', top: 0, left: 0, width: '100%', height: '100%',
						objectFit: 'cover', zIndex: 1, transition: 'transform 0.5s ease-in-out',
					}}
				/>
				<Box sx={{
					position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: 2,
					background: 'linear-gradient(to top, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0.5) 30%, transparent 60%)',
				}}/>
				<Box sx={{
					position: 'relative', zIndex: 3, color: 'white', height: '100%',
					display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', p: 3,
				}}>
					<Typography variant="h5" sx={{ fontWeight: 'bold', textShadow: '1px 1px 3px rgba(0,0,0,0.7)' }}>
						{albumName}
					</Typography>
					<Typography variant="body2" sx={{ opacity: 0.9 }}>
						{images.length} photos
					</Typography>
				</Box>
			</CardActionArea>
		</Card>
	);
});

export default AlbumCard;