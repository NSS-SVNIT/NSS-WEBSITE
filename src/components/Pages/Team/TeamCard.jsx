import React, { useState } from 'react';
import { Typography, Card, CardContent, CardMedia, Link, Box } from '@mui/material';
import { LinkedIn, GitHub, Email } from '@mui/icons-material';

// Card component for displaying Team information
const TeamCard = React.memo(({ name, position, linkedin, github, gmail, firebase }) => {
  const [isHovered, setIsHovered] = useState(false);
  const hasLinkedIn = !!linkedin; // Check if the LinkedIn link is provided
  const hasGitHub = !!github; // Check if the GitHub link is provided
  const hasGmail = !!gmail; // Check if the Gmail link is provided

  const handleHover = () => {
    setIsHovered(true);
  };

  const handleLeave = () => {
    setIsHovered(false);
  };

  const handleEmailClick = () => {
    window.location.href = `mailto:${gmail}`;
  };

  return (
    <Card
      sx={{
        width: '200px',
        maxHeight:'375px',
        borderRadius: '16px',
        transition: 'transform 0.3s ease',
        overflow: 'hidden',
        '&:hover': {
          transform: 'scale(1.05)',
        },
      }}
      onMouseEnter={handleHover}
      onMouseLeave={handleLeave}
    >
      <CardMedia
        component="img"
        height={isHovered ? '200px' : '260px'}
        image={firebase}
        alt={name}
        sx={{
          transition: 'height 0.3s ease',
        }}
      />
      <CardContent
        sx={{
          transition: 'transform 0.3s ease',
          transform: isHovered ? 'translateY(-10px)' : 'translateY(0)',
        }}
      >
        <Typography variant="subtitle1" color="textSecondary" sx={{ fontSize: '12', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          {position}
        </Typography>
        <Typography variant="h6" sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          {name}
        </Typography>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            marginTop: '10px',
            opacity: isHovered ? 1 : 0,
            transition: 'opacity 0.3s ease',
          }}
        >
          {hasLinkedIn && (
            <Link
              href={linkedin}
              target="_blank"
              rel="noopener noreferrer"
              color="inherit"
              sx={{
                marginTop:'10px',
                marginRight: '10px',
                transition: 'color 0.3s ease',
                '&:hover': {
                  color: '#0077B5', // Change to desired LinkedIn color
                },
              }}
            >
              <LinkedIn fontSize="large" sx={{ fontSize: '38px' }} />
            </Link>
          )}
          {hasGitHub && (
            <Link
              href={github}
              target="_blank"
              rel="noopener noreferrer"
              color="inherit"
              sx={{
                marginTop:'10px',
                marginRight: '10px',
                transition: 'color 0.3s ease',
                '&:hover': {
                  color: '#6f42c1', // Change to desired GitHub color
                },
              }}
            >
              <GitHub fontSize="large" sx={{ fontSize: '38px' }} />
            </Link>
          )}
          {hasGmail && (
            <Link
              href={`mailto:${gmail}`}
              target="_blank"
              rel="noopener noreferrer"
              color="inherit"
              onClick={handleEmailClick}
              sx={{
                marginTop:'10px',
                marginLeft: '3px',
                transition: 'color 0.3s ease',
                '&:hover': {
                  color: '#D44638', // Change to desired Gmail color
                },
              }}
            >
              <Email fontSize="large" sx={{ fontSize: '38px' }} />
            </Link>
          )}
        </Box>
      </CardContent>
    </Card>
  );
});

export default TeamCard;
