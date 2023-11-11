import React from 'react';
import Layout from '../../Layout/Layout';
import AlumniBatch from './AlumniBatch';
import * as Data from '../../../../TeamData';
import HeadingSection from './HeadingSection';

const Alumni = () => {
  return (
    <Layout>
      <HeadingSection />
      <AlumniBatch year={2000} alumniList={Data.sir} /> {/* If year is 2000 it means its for Faculty Advisor */}
      <AlumniBatch year={2019} alumniList={Data.Team2019} />
      <AlumniBatch year={2018} alumniList={Data.Team2018} />
      {/* Add more Team components for different years */}
    </Layout>
  );
};

export default Alumni;
