import React, { useEffect } from 'react';
import Layout from '../../Layout/Layout';
import AlumniBatch from './AlumniBatch';
import * as Data from './AlumniData';
import HeadingSection from './HeadingSection';

const Alumni = () => {
  return (
    <Layout>
      <HeadingSection />
      <AlumniBatch year={2019} alumniList={Data.alumni2019} />
      <AlumniBatch year={2018} alumniList={Data.alumni2018} />
      {/* Add more AlumniBatch components for different years */}
    </Layout>
  );
};

export default Alumni;
