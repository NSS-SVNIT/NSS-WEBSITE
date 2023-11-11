import React from 'react'
import { Typography, Grid } from '@mui/material';
import AlumniCard from './AlumniCard';

// Component for displaying a batch of alumni
const AlumniBatch = ({ year, alumniList }) => {
    return (
      <div>
        <Typography variant="h4" gutterBottom sx={{ marginTop: '45px', marginLeft: '60px' }}>
          Batch of {year}
        </Typography>
        <Grid container spacing={2} sx={{ marginTop: '20px', marginLeft: '60px', marginBottom: '60px' }}>
          {alumniList.map((alumni) => (
            <Grid item xs={4} sm={6} md={4} key={alumni.name}>
              <AlumniCard {...alumni} />
            </Grid>
          ))}
        </Grid>
      </div>
    );
  };
export default AlumniBatch;
