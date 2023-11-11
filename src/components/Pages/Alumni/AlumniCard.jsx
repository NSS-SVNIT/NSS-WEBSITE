import React from 'react'
import { Typography, Card, CardContent, CardMedia, Link } from '@mui/material';
import { LinkedIn, GitHub } from '@mui/icons-material';

// Card component for displaying alumni information
const AlumniCard = ({ image, name, position, linkedin, github }) => {
  return (
    <Card sx={{ width: '300px', borderRadius: '16px' }}>
      <CardMedia component="img" height="200"  image={image} alt={name} />
      <CardContent>
      <Typography variant="subtitle1" color="textSecondary" sx={{ fontSize:'12' }}>{position}</Typography>
        <Typography variant="h6" sx={{ alignItem: 'centre' }}>{name}</Typography>
        <Link href={linkedin} target="_blank" rel="noopener noreferrer" color="inherit" sx={{ marginRight:'10px' }}>
          <LinkedIn fontSize="large" />
        </Link>
        <Link href={github} target="_blank" rel="noopener noreferrer" color="inherit" sx={{ marginRight:'10px' }}>
          <GitHub fontSize="large" />
        </Link>
      </CardContent>
    </Card>
  );
};

export default AlumniCard;