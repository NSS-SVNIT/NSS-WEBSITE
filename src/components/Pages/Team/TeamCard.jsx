import React from 'react';
import { Typography, Card, CardMedia, Link, Box, CardContent } from '@mui/material';
import { LinkedIn, GitHub, Email } from '@mui/icons-material';

const TeamCard = React.memo(({ name, position, linkedin, github, gmail, firebase }) => {

  const iconStyle = {
    fontSize: '24px',
    transition: 'transform 0.2s ease-in-out',
    '&:hover': {
      transform: 'scale(1.25)',
    },
  };

  return (
    <Card
      sx={{
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
        maxWidth: '300px',
        borderRadius: '20px',
        overflow: 'hidden',
        transition: 'transform 0.4s ease, box-shadow 0.4s ease',
        boxShadow: '0 8px 16px rgba(0,0,0,0.08)',
        
        '&:hover': {
          transform: 'translateY(-10px)',
          boxShadow: '0 12px 24px rgba(0,0,0,0.15)',
          '.card-media': {
            transform: 'scale(1.1)',
          },
          '.social-icons': {
            transform: 'translateY(0)',
            opacity: 1,
            height: 'auto',
            marginTop: '16px',
          },
        },
      }}
    >
      {/* ===== IMAGE CONTAINER ===== */}
      <Box
        sx={{
          width: '100%',
          aspectRatio: '4 / 5',
          overflow: 'hidden',
          position: 'relative', // This is required for the absolute positioning of the gradient
        }}
      >
        <CardMedia
          className="card-media"
          component="img"
          loading="lazy"
          image={firebase}
          alt={name}
          sx={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            objectPosition: 'center top',
            transform: 'scale(1)',
            transition: 'transform 0.5s ease-in-out',
          }}
        />

        {/* --- NEW GRADIENT OVERLAY --- */}
        {/* This Box sits on top of the image to apply the gradient effect. */}
        <Box
          sx={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            width: '100%',
            height: '35%',
            // The gradient starts black at the bottom and fades to transparent.
            background: 'linear-gradient(to top, rgba(0, 0, 0, 0.75) 10%, transparent 100%)',
            // This is crucial! It allows mouse events (like hover) to pass through the gradient to the elements underneath.
            pointerEvents: 'none',
          }}
        />
        {/* --- END OF GRADIENT OVERLAY --- */}

      </Box>

      {/* ===== TEXT & SOCIALS CONTENT AREA ===== */}
      <CardContent
        sx={{
          textAlign: 'center',
          p: 2.5,
          backgroundColor: 'background.paper',
        }}
      >
        <Typography 
          variant="h6" 
          sx={{ fontWeight: '600', lineHeight: 1.2 }}
        >
          {name}
        </Typography>
        <Typography 
          variant="body2" 
          color="text.secondary"
        >
          {position}
        </Typography>

        <Box
          className="social-icons"
          sx={{
            display: 'flex',
            justifyContent: 'center',
            gap: 2.5,
            opacity: 0,
            height: 0,
            transform: 'translateY(10px)',
            transition: 'all 0.4s ease',
          }}
        >
          {linkedin && (
            <Link href={linkedin} target="_blank" color="inherit">
              <LinkedIn sx={{ ...iconStyle, '&:hover': { ...iconStyle['&:hover'], color: '#0077B5' } }} />
            </Link>
          )}
          {github && (
            <Link href={github} target="_blank" color="inherit">
              <GitHub sx={{ ...iconStyle, '&:hover': { ...iconStyle['&:hover'], color: '#333' } }} />
            </Link>
          )}
          {gmail && (
            <Link href={`mailto:${gmail}`} color="inherit">
              <Email sx={{ ...iconStyle, '&:hover': { ...iconStyle['&:hover'], color: '#EA4335' } }} />
            </Link>
          )}
        </Box>
      </CardContent>
    </Card>
  );
});

export default TeamCard;