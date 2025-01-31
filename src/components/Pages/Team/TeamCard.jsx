import React, { useState } from 'react';
import { Typography, Card, CardContent, CardMedia, Link, Box } from '@mui/material';
import { LinkedIn, GitHub, Email } from '@mui/icons-material';
import { useMediaQuery } from '@material-ui/core';

const TeamCard = React.memo(({ name, position, linkedin, github, gmail, firebase }) => {
  const isMobile = useMediaQuery("(max-width:600px)");
  const isTablet = useMediaQuery("(max-width:900px)");
  const [isHovered, setIsHovered] = useState(false);
  const hasLinkedIn = !!linkedin;
  const hasGitHub = !!github;
  const hasGmail = !!gmail;

  const cardWidth ={
    xs: '190px',  // Mobile
    sm: '190px',  // Tablet
    md: '190px',  // Desktop
  };

  const cardHeight = {
    xs: '375px',  // Mobile
    sm: '375px',  // Tablet
    md: '375px',  // Desktop
  };

  const imageHeight = isHovered ? {
    xs: '200px',
    sm: '200px',
    md: '200px'
  } : {
    xs: '260px',
    sm: '260px',
    md: '260px'
  };

  return (
    <Card
      sx={{
        width: cardWidth,
        height: cardHeight,
        borderRadius: '16px',
        transition: 'transform 0.3s ease, box-shadow 0.3s ease',
        overflow: 'hidden',
        '&:hover': {
          transform: 'scale(1.02)',
          boxShadow: '0 8px 40px -12px rgba(0,0,0,0.3)'
        },
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <CardMedia
        component="img"
        loading='lazy'
        image={firebase}
        alt={name}
        sx={{
          height: imageHeight,
          transition: 'height 0.3s ease',
          objectFit: 'cover',
          objectPosition: 'center',
        }}
      />
      <CardContent
        sx={{
          height: isHovered ? '120px' : '80px',
          transition: 'height 0.3s ease, transform 0.3s ease',
          transform: isHovered ? 'translateY(-10px)' : 'translateY(0)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          p: { xs: 1.5, sm: 2 },
          '&:last-child': { pb: { xs: 1.5, sm: 2 } },
        }}
      >
        <Typography 
          variant="subtitle1" 
          color="textSecondary" 
          sx={{ 
            fontSize: { xs: '0.8rem', sm: '0.875rem', md: '1rem' },
            textAlign: 'center',
            mb: 0.5
          }}
        >
          {position}
        </Typography>
        <Typography 
          variant="h6" 
          sx={{ 
            fontSize: { xs: '1rem', sm: '1.1rem', md: '1.2rem' },
            textAlign: 'center',
            fontWeight: 500,
            mb: 1
          }}
        >
          {name}
        </Typography>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            gap: '8px',
            opacity: isHovered ? 1 : 0,
            transition: 'opacity 0.3s ease',
            mt: 'auto'
          }}
        >
          {hasLinkedIn && (
            <Link
              href={linkedin}
              target="_blank"
              rel="noopener noreferrer"
              color="inherit"
              sx={{
                transition: 'color 0.2s ease, transform 0.2s ease',
                '&:hover': {
                  color: '#0077B5',
                  transform: 'scale(1.1)'
                },
              }}
            >
              <LinkedIn sx={{ fontSize: { xs: '20px', sm: '24px', md: '28px' } }} />
            </Link>
          )}
          {hasGitHub && (
            <Link
              href={github}
              target="_blank"
              rel="noopener noreferrer"
              color="inherit"
              sx={{
                transition: 'color 0.2s ease, transform 0.2s ease',
                '&:hover': {
                  color: '#6f42c1',
                  transform: 'scale(1.1)'
                },
              }}
            >
              <GitHub sx={{ fontSize: { xs: '20px', sm: '24px', md: '28px' } }} />
            </Link>
          )}
          {hasGmail && (
            <Link
              href={`mailto:${gmail}`}
              color="inherit"
              sx={{
                transition: 'color 0.2s ease, transform 0.2s ease',
                '&:hover': {
                  color: '#D44638',
                  transform: 'scale(1.1)'
                },
              }}
            >
              <Email sx={{ fontSize: { xs: '20px', sm: '24px', md: '28px' } }} />
            </Link>
          )}
        </Box>
      </CardContent>
    </Card>
  );
});

export default TeamCard;