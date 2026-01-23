// ImageGrid.js
import React, { useState, useEffect } from 'react';
import { styled } from '@mui/material/styles';
import { Box, Typography, Container, Skeleton } from '@mui/material';
import { getStorage, ref, getDownloadURL } from 'firebase/storage';
import { motion } from 'framer-motion';

// --- Data Configuration ---
// The span property is now primarily for the desktop (lg) view.
const imageMetadata = [
  { title: "Cultural Activities", path: 'aboutImages/Cultural.jpg', span: 2 },
  { title: "Parade", path: 'aboutImages/Parade.jpg', span: 2 },
  { title: "Industrial Visits", path: 'aboutImages/Industrial.jpg', span: 2 },
  { title: "Cleanliness Drives", path: 'aboutImages/Cleanliness.jpg', span: 2 },
  { title: "Camps", path: 'aboutImages/Camp.jpg', span: 2 },
  { title: "Yoga Sessions", path: 'aboutImages/MorningRoutine.jpg', span: 2 },
  { title: "Workshops", path: 'aboutImages/workshops.jpg', span: 2 },
  { title: "Awareness Campaigns", path: 'aboutImages/Awareness.jpg', span: 2 },
  { title: "Plantation Drives", path: 'aboutImages/Plantation.jpg', span: 2 }, 
];

// --- Styled Components ---
const ImageCard = styled(motion.div)(({ theme }) => ({
  position: 'relative',
  display: 'block',
  overflow: 'hidden',
  borderRadius: theme.shape.borderRadius * 2,
  cursor: 'pointer',
  // Responsive height for the cards
  height: '300px', // Default height for desktop
  [theme.breakpoints.down('md')]: {
    height: '240px', // Shorter height for tablet and mobile
  },
  boxShadow: '0px 10px 30px rgba(0, 0, 0, 0.1)',
  '&:hover .imageSrc': {
    transform: 'scale(1.05)',
  },
  '&:hover .imageBackdrop': {
    opacity: 1,
  },
}));

const ImageSrc = styled('span')({
  position: 'absolute',
  left: 0,
  right: 0,
  top: 0,
  bottom: 0,
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  transition: 'transform 0.4s ease-in-out',
});

const ImageBackdrop = styled('span')(({ theme }) => ({
  position: 'absolute',
  left: 0,
  right: 0,
  top: 0,
  bottom: 0,
  background: 'linear-gradient(to top, rgba(90, 42, 122, 0.8) 0%, rgba(90, 42, 122, 0) 60%)',
  opacity: 0,
  transition: 'opacity 0.3s ease-in-out',
}));

const ImageTitle = styled(Typography)(({ theme }) => ({
  position: 'absolute',
  left: theme.spacing(3),
  bottom: theme.spacing(2),
  color: theme.palette.common.white,
  fontFamily: "'DM Sans', sans-serif",
  fontWeight: 'bold',
  textShadow: '0px 1px 3px rgba(0,0,0,0.5)',
  // Responsive font size for the title
  fontSize: theme.typography.h5.fontSize,
  [theme.breakpoints.down('md')]: {
    fontSize: theme.typography.h6.fontSize,
    left: theme.spacing(2),
    bottom: theme.spacing(1.5),
  },
}));

// --- Framer Motion Variants ---
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.6,
      ease: 'easeOut',
    },
  },
};

const ImageGrid = React.memo(() => {
  const [images, setImages] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchImages = async () => {
      setIsLoading(true);
      try {
        const storage = getStorage();
        const promises = imageMetadata.map(async (meta) => {
          const url = await getDownloadURL(ref(storage, meta.path));
          return { ...meta, url };
        });
        const fetchedImages = await Promise.all(promises);
        setImages(fetchedImages);
      } catch (error) {
        console.error("Failed to fetch images from Firebase:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchImages();
  }, []);

  const renderSkeletons = () => (
    <Box
      sx={{
        display: 'grid',
        // Responsive gap
        gap: { xs: 2, md: 2.5 }, 
        // Responsive grid columns
        gridTemplateColumns: {
          xs: 'repeat(1, 1fr)', // 1 column on mobile
          md: 'repeat(2, 1fr)', // 2 columns on tablet
          lg: 'repeat(4, 1fr)', // 4 columns on desktop
        },
      }}
    >
      {imageMetadata.map((meta) => (
        <Skeleton 
          key={meta.path}
          variant="rectangular" 
          sx={{ 
            borderRadius: 2,
            // Responsive height to match the ImageCard
            height: { xs: '240px', md: '300px'},
            // Responsive column span to match the final layout
            gridColumn: {
              xs: 'span 1',
              md: 'span 1',
              lg: `span ${meta.span}`,
            }
          }} 
        />
      ))}
    </Box>
  );

  return (
    <Container maxWidth="lg" sx={{ py: { xs: 6, md: 8 } }}>
      {isLoading ? renderSkeletons() : (
        <Box
          component={motion.div}
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          sx={{
            display: 'grid',
            // Responsive gap
            gap: { xs: 2, md: 2.5 },
            // Responsive grid columns
            gridTemplateColumns: {
              xs: 'repeat(1, 1fr)', // 1 column on mobile
              md: 'repeat(2, 1fr)', // 2 columns on tablet
              lg: 'repeat(4, 1fr)', // 4 columns on desktop
            },
          }}
        >
          {images.map((image) => (
            <ImageCard
              key={image.title}
              variants={itemVariants}
              sx={{ 
                // Responsive column span logic
                gridColumn: {
                  xs: 'span 1',        // Each card takes 1 column on mobile
                  md: 'span 1',        // Each card takes 1 column on tablet
                  lg: `span ${image.span}`, // Each card uses its defined span on desktop
                } 
              }}
            >
              <ImageSrc className="imageSrc" style={{ backgroundImage: `url(${image.url})` }} />
              <ImageBackdrop className="imageBackdrop" />
              <ImageTitle>{image.title}</ImageTitle>
            </ImageCard>
          ))}
        </Box>
      )}
    </Container>
  );
});

export default ImageGrid;