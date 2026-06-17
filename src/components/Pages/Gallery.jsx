// Gallery.jsx

import React, { useEffect, useState, useCallback } from "react";
import { Box, Typography, Grid, Container, Skeleton, Alert, Fade, Dialog, AppBar, Toolbar, IconButton, Slide, Button } from "@mui/material";
import { getDocs, collection } from "firebase/firestore";
import { firestore } from "../../firebase";
import Layout from "../Layout/Layout";
import PageHeader from "../UI/PageHeader";
import AlbumCard from "./AlbumCard"; // Import our new AlbumCard

// Import Icons for the Lightbox
import CloseIcon from '@mui/icons-material/Close';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

// --- A transition for the Dialog to slide up ---
const Transition = React.forwardRef(function Transition(props, ref) {
	return <Slide direction="up" ref={ref} {...props} />;
});

// Skeleton loader for a polished loading state
const AlbumCardSkeleton = () => (
	<Grid item xs={6} sm={4} md={3}>
		<Skeleton variant="rectangular" sx={{ borderRadius: 4, width: '100%', aspectRatio: '3 / 4' }} />
	</Grid>
);

const ITEMS_PER_PAGE = 12; // Load 12 albums at a time

const getTimestampMs = (value) => {
	if (!value) return 0;
	if (typeof value?.toMillis === "function") return value.toMillis();
	if (value instanceof Date) return value.getTime();
	if (typeof value === "number") return value;
	if (typeof value === "string") {
		const parsed = Date.parse(value);
		return Number.isNaN(parsed) ? 0 : parsed;
	}
	return 0;
};

const Gallery = () => {
	const [albums, setAlbums] = useState([]);
	const [displayedAlbums, setDisplayedAlbums] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);
	const [page, setPage] = useState(1);
	const [hasMore, setHasMore] = useState(true);

	// --- State for our custom lightbox ---
	const [selectedAlbum, setSelectedAlbum] = useState(null);
	const [currentIndex, setCurrentIndex] = useState(0);
	
	const handleOpenAlbum = useCallback((album) => {
		setSelectedAlbum(album);
		setCurrentIndex(0);
	}, []);
	
	const handleCloseAlbum = useCallback(() => {
		setSelectedAlbum(null);
	}, []);
	
	const handleNext = useCallback(() => {
		setCurrentIndex((prevIndex) => (prevIndex + 1) % selectedAlbum.image_links.length);
	}, [selectedAlbum]);
	
	const handlePrev = useCallback(() => {
		setCurrentIndex((prevIndex) => (prevIndex - 1 + selectedAlbum.image_links.length) % selectedAlbum.image_links.length);
	}, [selectedAlbum]);
	
	const handleThumbnailClick = useCallback((index) => {
		setCurrentIndex(index);
	}, []);

	// Load more albums function
	const loadMoreAlbums = useCallback(() => {
		const startIndex = (page - 1) * ITEMS_PER_PAGE;
		const endIndex = startIndex + ITEMS_PER_PAGE;
		const newDisplayedAlbums = albums.slice(0, endIndex);
		
		setDisplayedAlbums(newDisplayedAlbums);
		setHasMore(endIndex < albums.length);
		setPage(page + 1);
	}, [albums, page]);

	useEffect(() => {
		const fetchAlbums = async () => {
			try {
				setLoading(true);
				const querySnapshot = await getDocs(collection(firestore, "images"));
				const newData = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
				newData.sort((a, b) => {
					const tsB = getTimestampMs(b.event_timestamp);
					const tsA = getTimestampMs(a.event_timestamp);
					if (tsB !== tsA) return tsB - tsA; // latest first
					return (a.name || "").localeCompare(b.name || "");
				});
				setAlbums(newData);
				// Display first batch
				setDisplayedAlbums(newData.slice(0, ITEMS_PER_PAGE));
				setHasMore(newData.length > ITEMS_PER_PAGE);
				setPage(2);
			} catch (err) {
				console.error("Error fetching albums:", err);
				setError("Failed to load the gallery. Please try again later.");
			} finally {
				setLoading(false);
			}
		};
		fetchAlbums();
	}, []);

	useEffect(() => {
		window.scrollTo(0, 0);
	}, []);

	return (
		<Layout>
			<PageHeader>
				Welcome to our stunning photo gallery! Each photograph has been
				carefully curated to capture unique emotions, inspire wanderlust,
				and celebrate the joy of community service.
			</PageHeader>

			<Container maxWidth="lg" sx={{ py: 6 }}>
				{loading && (
					<Grid container spacing={1}>
						{[...Array(12)].map((_, index) => <AlbumCardSkeleton key={index} />)}
					</Grid>
				)}

				{error && <Alert severity="error">{error}</Alert>}

				{!loading && !error && (
					<>
						<Grid container spacing={{ xs: 1.5, sm: 2 }} alignItems="stretch">
							{displayedAlbums.map((album, index) => (
								<Fade in key={album.id} timeout={500} style={{ transitionDelay: `${index * 100}ms` }}>
									<Grid item xs={6} sm={4} md={3}>
										<AlbumCard
											albumName={album.name}
											images={album.image_links}
											onOpen={() => handleOpenAlbum(album)}
										/>
									</Grid>
								</Fade>
							))}
						</Grid>

						{/* Load More Button */}
						{hasMore && (
							<Box sx={{ mt: 4, display: 'flex', justifyContent: 'center' }}>
								<Button 
									variant="contained" 
									onClick={loadMoreAlbums}
									sx={{ px: 4, py: 1.5, fontSize: '1rem' }}
								>
									Load More
								</Button>
							</Box>
						)}
					</>
				)}
			</Container>

			{/* --- The Custom MUI Dialog Lightbox --- */}
			<Dialog
				fullScreen
				open={Boolean(selectedAlbum)}
				onClose={handleCloseAlbum}
				TransitionComponent={Transition}
				PaperProps={{ sx: { bgcolor: 'rgba(0,0,0,0.9)' } }}
			>
				{selectedAlbum && (
					<>
						<AppBar sx={{ position: 'relative', bgcolor: 'transparent', boxShadow: 'none' }}>
							<Toolbar>
								<Box sx={{ flex: 1 }}>
									<Typography variant="h6" color="white">{selectedAlbum.name}</Typography>
									<Typography variant="body2" color="grey.400">{currentIndex + 1} / {selectedAlbum.image_links.length}</Typography>
								</Box>
								<IconButton edge="end" color="inherit" onClick={handleCloseAlbum} aria-label="close">
									<CloseIcon />
								</IconButton>
							</Toolbar>
						</AppBar>

						<Box sx={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', p: 1, position: 'relative' }}>
							{/* Previous Button */}
							<IconButton onClick={handlePrev} sx={{ position: 'absolute', left: { xs: 8, sm: 16 }, color: 'white', bgcolor: 'rgba(0,0,0,0.3)', '&:hover': { bgcolor: 'rgba(0,0,0,0.5)' } }}>
								<ArrowBackIosNewIcon />
							</IconButton>
							
							{/* Main Image */}
							<Box component="img" src={selectedAlbum.image_links[currentIndex]}
								sx={{ maxHeight: 'calc(100vh - 200px)', maxWidth: '100%', objectFit: 'contain' }}/>
							
							{/* Next Button */}
							<IconButton onClick={handleNext} sx={{ position: 'absolute', right: { xs: 8, sm: 16 }, color: 'white', bgcolor: 'rgba(0,0,0,0.3)', '&:hover': { bgcolor: 'rgba(0,0,0,0.5)' } }}>
								<ArrowForwardIosIcon />
							</IconButton>
						</Box>

						{/* Thumbnails */}
						<Box sx={{ p: 2, overflowX: 'auto', textAlign: 'center', bgcolor: 'rgba(0,0,0,0.3)' }}>
							<Box sx={{ display: 'inline-flex', gap: 1.5 }}>
								{selectedAlbum.image_links.map((img, index) => (
									<Box key={index} component="img" src={img}
										onClick={() => handleThumbnailClick(index)}
										sx={{
											height: 60, width: 80, objectFit: 'cover', cursor: 'pointer', borderRadius: 1,
											border: currentIndex === index ? '3px solid' : '3px solid transparent',
											borderColor: 'primary.main',
											opacity: currentIndex === index ? 1 : 0.6,
											transition: 'opacity 0.3s, border-color 0.3s',
											'&:hover': { opacity: 1 }
										}}
									/>
								))}
							</Box>
						</Box>
					</>
				)}
			</Dialog>
		</Layout>
	);
};

export default React.memo(Gallery);
