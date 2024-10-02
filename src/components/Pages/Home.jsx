import React, { useEffect, useState, lazy } from "react";
import Layout from "../Layout/Layout";
import AboutSection from "./Home/AboutSection";
import CounterSection from "./Home/CounterSection";
import Example from "./Home/Carousel";
import GallerySection from "./Home/GallerySection";
import HeroSection from "./Home/HeroSection";
import { Suspense } from "react";

// const GallerySection = lazy(()=>import('./Home/GallerySection'))
// const AboutSection = lazy(()=>import('./Home/AboutSection'))

// Apply React.memo to functional components to memoize them
const MemoizedHeroSection = HeroSection;
const MemoizedCounterSection = CounterSection;
const MemoizedAboutSection = AboutSection;
const MemoizedGallerySection = GallerySection;
const MemoizedExample = Example;

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
    <Suspense fallback={<div></div>}>
			<Layout>
				{/* Use the memoized components */}
				<MemoizedHeroSection />
				<MemoizedCounterSection />
				<MemoizedAboutSection/>
				<MemoizedGallerySection />
				<MemoizedExample />
			</Layout>
      </Suspense>
		</>
	);
}

export default App;
