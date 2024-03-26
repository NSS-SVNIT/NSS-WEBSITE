import React, { useEffect } from 'react';
import Layout from '../../Layout/Layout';
import TeamBatch from './TeamBatch';
import * as Data from './TeamData';
import HeadingSection from './HeadingSection';

const Team = React.memo(() => {
  const years = Object.keys(Data)
    .filter(key => key.startsWith('Team'))
    .map(year => parseInt(year.replace('Team', '')))
    .sort((a, b) => b - a); // Sort the years in descending order

  useEffect(() => {
    // Scroll to the top of the page when the component mounts
    window.scrollTo(0, 0);

    // Cleanup function to scroll to the top when the component unmounts
    return () => {
      window.scrollTo(0, 0);
    };
  }, []); // The empty dependency array ensures this effect runs only once when the component mounts

  return (
    <Layout>
      <HeadingSection />
      <TeamBatch year={2000} TeamList={Data.Sir} /> {/* If year is 2000, it means it's for Faculty Advisor */}
      <TeamBatch year={2003} TeamList={Data.ProgramCoordinators} /> {/* If year is 2003, it means it's for Program Coordinators */}
      <TeamBatch year={2001} TeamList={Data.Founder} /> {/* If year is 2001, it means it's for Founders */}
      <TeamBatch year={2002} TeamList={Data.CoFounder} /> {/* If year is 2002, it means it's for Co-Founders */}
      {years.map(year => (
        <TeamBatch key={year} year={year} TeamList={Data[`Team${year}`]} />
      ))}
    </Layout>
  );
});

export default Team;
