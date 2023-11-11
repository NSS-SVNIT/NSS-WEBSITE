import React from 'react';
import { Typography, Grid, Slide, useScrollTrigger } from '@mui/material';

export default function HeadingSection() {
  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 100,
  });

  return (
    <Grid container spacing={2} sx={{ marginTop: '45px', marginLeft: '60px', marginBottom: '60px' }}>
      <Grid item xs={6} sm={6} md={5}>
        <Slide direction="right" in={true} timeout={1000} mountOnEnter>
        <Typography variant="h2" fontSize={'50px'} gutterBottom sx={{ marginTop: '100px' }}>
          Meet Our
        </Typography>
        </Slide>
        <Slide direction="right" in={true} timeout={1300} mountOnEnter>
          <Typography variant="h1" fontSize={'100px'} gutterBottom>
            Alumni
          </Typography>
        </Slide>
        <Slide direction="right" in={true} timeout={1500} mountOnEnter>
          <Typography variant="subtitle2" gutterBottom>
            Our alumni form an integral part of our community and have achieved great success in their respective fields. They are a testament to the quality of education and the skills they acquired during their time at our institution. Get to know some of our outstanding alumni from different batches below.
          </Typography>
        </Slide>
      </Grid>
      <Grid item xs={6} sm={6} md={6}>
        <Slide direction="left" in={true} timeout={1200} mountOnEnter>
          <img src="src/assets/bg.jpg" alt="Right Content" height="500px" />
        </Slide>
      </Grid>
    </Grid>
  );
}
