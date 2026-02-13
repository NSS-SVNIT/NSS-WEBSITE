// CloudinaryGallery.jsx - Gallery component using Cloudinary

import React, { useEffect, useState, useCallback } from "react";
import { 
  Box, 
  Typography, 
  Grid, 
  Container, 
  Skeleton, 
  Alert, 
  Fade, 
  Dialog, 
  AppBar, 
  Toolbar, 
  IconButton, 
  Slide, 
  Button,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Chip,
  TextField,
  InputAdornment
} from "@mui/material";
import { 
  organizeGalleryData, 
  getEventImages 
} from "../../services/cloudinaryGallery";
import Layout from "../Layout/Layout";
import PageHeader from "../UI/PageHeader";
import AlbumCard from "./AlbumCard";

// Import Icons
import CloseIcon from '@mui/icons-material/Close';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import SearchIcon from '@mui/icons-material/Search';
import PhotoLibraryIcon from '@mui/icons-material/PhotoLibrary';

// Transition for Dialog
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

// Skeleton loader
const AlbumCardSkeleton = () => (
  <Grid item xs={12} sm={6} md={4}>
    <Skeleton variant="rectangular" sx={{ borderRadius: 4, width: '100%', aspectRatio: '3 / 4' }} />
  </Grid>
);

const ITEMS_PER_PAGE = 12;

const CloudinaryGallery = () => {
  const [galleryData, setGalleryData] = useState({});
  const [years, setYears] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredData, setFilteredData] = useState({});
  
  // Lightbox state
  const [selectedAlbum, setSelectedAlbum] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  
  // Pagination state
  const [displayedAlbums, setDisplayedAlbums] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  // Load gallery data
  useEffect(() => {
    const loadGalleryData = async () => {
      try {
        setLoading(true);
        const data = await organizeGalleryData();
        setGalleryData(data.galleryData);
        setYears(data.years);
        setFilteredData(data.galleryData);
        
        // Display first batch
        const allAlbums = Object.values(data.galleryData).flatMap(year => year.events);
        setDisplayedAlbums(allAlbums.slice(0, ITEMS_PER_PAGE));
        setHasMore(allAlbums.length > ITEMS_PER_PAGE);
        setPage(2);
        
      } catch (err) {
        console.error("Error loading gallery:", err);
        setError("Failed to load gallery. Please try again later.");
      } finally {
        setLoading(false);
      }
    };
    
    loadGalleryData();
  }, []);

  // Search functionality
  useEffect(() => {
    if (!searchTerm) {
      setFilteredData(galleryData);
    } else {
      const filtered = {};
      Object.entries(galleryData).forEach(([year, yearData]) => {
        const filteredEvents = yearData.events.filter(event =>
          event.name.toLowerCase().includes(searchTerm.toLowerCase())
        );
        if (filteredEvents.length > 0) {
          filtered[year] = {
            ...yearData,
            events: filteredEvents
          };
        }
      });
      setFilteredData(filtered);
    }
    
    // Reset pagination
    setPage(1);
    setHasMore(true);
  }, [searchTerm, galleryData]);

  // Update displayed albums when filtered data changes
  useEffect(() => {
    const allAlbums = Object.values(filteredData).flatMap(year => year.events);
    setDisplayedAlbums(allAlbums.slice(0, (page - 1) * ITEMS_PER_PAGE + ITEMS_PER_PAGE));
    setHasMore(allAlbums.length > (page - 1) * ITEMS_PER_PAGE + ITEMS_PER_PAGE);
  }, [filteredData, page]);

  // Lightbox handlers
  const handleOpenAlbum = useCallback((album) => {
    setSelectedAlbum(album);
    setCurrentIndex(0);
  }, []);
  
  const handleCloseAlbum = useCallback(() => {
    setSelectedAlbum(null);
  }, []);
  
  const handleNext = useCallback(() => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % selectedAlbum.images.length);
  }, [selectedAlbum]);
  
  const handlePrev = useCallback(() => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + selectedAlbum.images.length) % selectedAlbum.images.length);
  }, [selectedAlbum]);
  
  const handleThumbnailClick = useCallback((index) => {
    setCurrentIndex(index);
  }, []);

  // Load more albums
  const loadMoreAlbums = useCallback(() => {
    setPage(prevPage => prevPage + 1);
  }, []);

  // Get total counts
  const totalEvents = Object.values(filteredData).reduce((sum, year) => sum + year.events.length, 0);
  const totalImages = Object.values(filteredData).reduce((sum, year) => 
    sum + year.events.reduce((eventSum, event) => eventSum + event.imageCount, 0), 0);

  return (
    <Layout>
      <PageHeader>
        Welcome to our stunning photo gallery! Browse through our events 
        organized by year, featuring memorable moments from our community service activities.
      </PageHeader>

      <Container maxWidth="lg" sx={{ py: 6 }}>
        {/* Search Bar */}
        <Box sx={{ mb: 4 }}>
          <TextField
            fullWidth
            placeholder="Search events..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
            sx={{ maxWidth: 600, mx: 'auto', display: 'block' }}
          />
        </Box>

        {/* Stats */}
        {!loading && !error && (
          <Box sx={{ mb: 4, textAlign: 'center' }}>
            <Chip 
              icon={<PhotoLibraryIcon />} 
              label={`${totalEvents} Events`} 
              color="primary" 
              sx={{ mr: 1 }} 
            />
            <Chip 
              icon={<PhotoLibraryIcon />} 
              label={`${totalImages} Photos`} 
              color="secondary" 
            />
          </Box>
        )}

        {loading && (
          <Grid container spacing={1}>
            {[...Array(12)].map((_, index) => <AlbumCardSkeleton key={index} />)}
          </Grid>
        )}

        {error && <Alert severity="error">{error}</Alert>}

        {!loading && !error && (
          <>
            {/* Year-wise Accordion */}
            {years.map((year) => (
              <Accordion key={year} sx={{ mb: 2 }}>
                <AccordionSummary 
                  expandIcon={<ExpandMoreIcon />}
                  sx={{ 
                    '& .MuiAccordionSummary-content': {
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center'
                    }
                  }}
                >
                  <Typography variant="h6" component="div">
                    {year}
                  </Typography>
                  <Chip 
                    label={`${filteredData[year]?.events.length || 0} events`}
                    size="small" 
                    color="primary"
                  />
                </AccordionSummary>
                <AccordionDetails>
                  <Grid container spacing={1} alignItems="stretch">
                    {filteredData[year]?.events.map((event, index) => (
                      <Fade in key={event.id} timeout={500} style={{ transitionDelay: `${index * 50}ms` }}>
                        <Grid item xs={12} sm={6} md={4} lg={3}>
                          <AlbumCard
                            albumName={event.name}
                            images={event.images.map(img => img.url)}
                            thumbnail={event.thumbnail}
                            imageCount={event.imageCount}
                            onOpen={() => handleOpenAlbum(event)}
                          />
                        </Grid>
                      </Fade>
                    ))}
                  </Grid>
                </AccordionDetails>
              </Accordion>
            ))}

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

      {/* Lightbox Dialog */}
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
                  <Typography variant="body2" color="grey.400">
                    {currentIndex + 1} / {selectedAlbum.images.length}
                  </Typography>
                </Box>
                <IconButton edge="end" color="inherit" onClick={handleCloseAlbum} aria-label="close">
                  <CloseIcon />
                </IconButton>
              </Toolbar>
            </AppBar>

            <Box sx={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', p: 1, position: 'relative' }}>
              {/* Previous Button */}
              <IconButton 
                onClick={handlePrev} 
                sx={{ 
                  position: 'absolute', 
                  left: { xs: 8, sm: 16 }, 
                  color: 'white', 
                  bgcolor: 'rgba(0,0,0,0.3)', 
                  '&:hover': { bgcolor: 'rgba(0,0,0,0.5)' } 
                }}
              >
                <ArrowBackIosNewIcon />
              </IconButton>
              
              {/* Main Image */}
              <Box 
                component="img" 
                src={selectedAlbum.images[currentIndex].url}
                sx={{ 
                  maxHeight: 'calc(100vh - 200px)', 
                  maxWidth: '100%', 
                  objectFit: 'contain' 
                }}
              />
              
              {/* Next Button */}
              <IconButton 
                onClick={handleNext} 
                sx={{ 
                  position: 'absolute', 
                  right: { xs: 8, sm: 16 }, 
                  color: 'white', 
                  bgcolor: 'rgba(0,0,0,0.3)', 
                  '&:hover': { bgcolor: 'rgba(0,0,0,0.5)' } 
                }}
              >
                <ArrowForwardIosIcon />
              </IconButton>
            </Box>

            {/* Thumbnails */}
            <Box sx={{ p: 2, overflowX: 'auto', textAlign: 'center', bgcolor: 'rgba(0,0,0,0.3)' }}>
              <Box sx={{ display: 'inline-flex', gap: 1.5 }}>
                {selectedAlbum.images.map((img, index) => (
                  <Box 
                    key={index} 
                    component="img" 
                    src={img.url}
                    onClick={() => handleThumbnailClick(index)}
                    sx={{
                      height: 60, 
                      width: 80, 
                      objectFit: 'cover', 
                      cursor: 'pointer', 
                      borderRadius: 1,
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

export default React.memo(CloudinaryGallery);
