import React, { useEffect } from 'react';
import Layout from '../Layout/Layout';
import HeroSection from './Home/HeroSection';
import CounterSection from './Home/CounterSection';
import AboutSection from './Home/AboutSection';
import GallerySection from './Home/GallerySection';
import Example from './Home/Carousel';

function App() {
  useEffect(() => {
    // Scroll to the top of the page when the component mounts
    window.scrollTo(0, 0);

    // Cleanup function to scroll to the top when the component unmounts
    return () => {
      window.scrollTo(0, 0);
    };
  }, []); // The empty dependency array ensures this effect runs only once when the component mounts

  return (
    <>
      <Layout>
        <HeroSection />
        <CounterSection />
        <AboutSection />
        <GallerySection />
        <Example />
        {/* <ComitteeSection />
        <DutySection /> */}
      </Layout>
    </>
  );
}

export default App;
