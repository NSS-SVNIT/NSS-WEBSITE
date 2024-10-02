import React, { useEffect } from 'react';
import Layout from '../Layout/Layout';
import AboutSection from './Home/AboutSection';
import CounterSection from './Home/CounterSection';
import Example from './Home/Carousel';
import GallerySection from './Home/GallerySection';
import HeroSection from './Home/HeroSection';

// Apply React.memo to functional components to memoize them
const MemoizedHeroSection = React.memo(HeroSection);
const MemoizedCounterSection = React.memo(CounterSection);
const MemoizedAboutSection = React.memo(AboutSection);
const MemoizedGallerySection = React.memo(GallerySection);
const MemoizedExample = React.memo(Example);

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
        {/* Use the memoized components */}
        <MemoizedHeroSection />
        <MemoizedCounterSection />
        <MemoizedAboutSection />
        <MemoizedGallerySection />
        <MemoizedExample />
      </Layout>
    </>
  );
}

export default App;
