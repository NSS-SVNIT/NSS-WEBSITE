import NavBar from "../Layout/NavBar";
import bg from "../../assets/bg.jpg";
import HeroText from "../HeroText";
import UpdateCard from "../UpdateCard";
import { Box, Stack } from "@mui/material";
import GalleryView from "./Home/GalleryView";
import Counter from "../UI/counter";
import Divider from "@mui/material/Divider";
import Memories from "../MemoriesText";
import Footer from "../Layout/Footer";
import Layout from "../Layout/Layout";
import { motion } from "framer-motion";
import ComitteeCard from "./Home/CommitteeCard";
import ImageGrid from "./Home/ImageGrid";
import ComitteeSection from "./Home/ComitteeSection";
import CounterSection from "./Home/CounterSection";
import GallerySection from "./Home/GallerySection";
import DutySection from "./Home/DutySection";
import HeroSection from "./Home/HeroSection";
import AboutSection from "./Home/AboutSection";
import Example from "./Home/Carousel";

function App() {
  const isPhone = false;
  return (
    <>
      <Layout>
        <HeroSection />
        <CounterSection />
        <AboutSection />
        <GallerySection />
        <Example/>
        {/* <ComitteeSection />
        <DutySection /> */}
      </Layout>
    </>
  );
}

export default App;
