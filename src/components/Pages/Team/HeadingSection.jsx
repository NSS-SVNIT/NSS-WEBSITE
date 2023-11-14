import React from 'react';
import { Typography, Grid, Slide, useScrollTrigger } from '@mui/material';

export default function HeadingSection() {
  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 100,
  });

  return (
    <div style={{ overflowX: 'hidden' }}>
    <Grid container spacing={2} sx={{ marginTop: '45px', marginLeft: '60px', marginBottom: '60px' }}>
      <Grid item xs={6} sm={6} md={5}>
        <Slide direction="right" in={true} timeout={1000} mountOnEnter>
        <Typography variant="h2" fontSize={'50px'} gutterBottom sx={{ marginTop: '100px' }}>
          Meet Our
        </Typography>
        </Slide>
        <Slide direction="right" in={true} timeout={1300} mountOnEnter>
          <Typography variant="h1" fontSize={'100px'} gutterBottom>
            Team
          </Typography>
        </Slide>
        <Slide direction="right" in={true} timeout={1500} mountOnEnter>
          <Typography variant="subtitle2" gutterBottom>
          Unleash the power of change with NSS SVNIT's extraordinary team. Dedicated to making a delta change every day, we combine passion, expertise, and unwavering commitment. Join us on our journey to create a better tomorrow, one impactful step at a time. Together, let's make a lasting difference and inspire a wave of positive transformation.
          </Typography>
        </Slide>
      </Grid>
      <Grid item xs={6} sm={6} md={6}>
        <Slide direction="left" in={true} timeout={1200} mountOnEnter>
          <img src="src/components/Pages/Home/photos/team.jpg" alt="Right Content" height="500px" />
        </Slide>
      </Grid>
    </Grid>
    </div>
  );
}
