import React from 'react'
import { Typography, Grid } from '@mui/material';
import { Height } from '@mui/icons-material';

export default function HeadingSection() {
  return (
    <Grid container spacing={2} sx={{ marginTop: '45px', marginLeft: '60px', marginBottom: '60px' }}>
  <Grid item xs={6} sm={6} md={6}>
    <Typography variant="h4" gutterBottom>
      Meet Our
    </Typography>
    <Typography variant="h1" gutterBottom>
      Alumni
    </Typography>
    <Typography variant="subtitle2" gutterBottom>
      Our alumni form an integral part of our community and have achieved great success in their respective fields. They are a testament to the quality of education and the skills they acquired during their time at our institution. Get to know some of our outstanding alumni from different batches below.
    </Typography>
  </Grid>
  <Grid item xs={6} sm={6} md={6}>
    <img src="src/assets/bg.jpg" alt="Right Content" />
  </Grid>
</Grid>
  )
}
