import React from 'react';
import { Typography, Grid, Card, CardContent, CardMedia, Link } from '@mui/material';
import Layout from '../../Layout/Layout';
import AlumniBatch from './AlumniBatch';
import alumni2019 from './AlumniData';
import HeadingSection from './HeadingSection';

const Alumni = () => {

  return (
    <Layout>
      <HeadingSection />
      <AlumniBatch year={2019} alumniList={alumni2019} />
      {/* Add more AlumniBatch components for different years */}
    </Layout>
  );
};

export default Alumni;
