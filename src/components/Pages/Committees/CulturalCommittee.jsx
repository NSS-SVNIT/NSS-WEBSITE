import React, { useEffect, useState } from "react";
import Layout from "../../Layout/Layout";
import { motion } from "framer-motion";
import {
  Typography,
  Box,
  Grid,
  Container,
  Button,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import { useNavigate } from "react-router-dom";
import CommitteeTeamSection from "./CommitteeTeamSection";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import MusicNoteIcon from "@mui/icons-material/MusicNote";
import TheaterComedyIcon from "@mui/icons-material/TheaterComedy";
import MicIcon from "@mui/icons-material/Mic";
import StarIcon from "@mui/icons-material/Star";
import AssignmentIcon from "@mui/icons-material/Assignment";

const useStyles = makeStyles({
  gradientBackground: {
    background: "linear-gradient(135deg, #fce4ec 0%, #ffffff 45%, #f3e5f5 100%)",
    minHeight: "100vh",
    position: "relative",
    overflow: "hidden",
  },

  /* Background animated icons */
  iconBg: {
    position: "absolute",
    opacity: 0.22,
    pointerEvents: "none",
    color: "#E84C3D",
  },

  heroSection: {
    position: "relative",
    textAlign: "center",
    paddingTop: "2rem",
    paddingBottom: "4rem",
    marginBottom: "2rem",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },

  centeredTitle: {
    fontFamily: "'Poppins', 'Inria Sans', sans-serif",
    fontWeight: 500,
    fontSize: "100px !important",
    background: "linear-gradient(135deg, #E84C3D 0%, #C71585 30%, #E84C3D 60%, #E84C3D 100%)",
    backgroundSize: "250% 250%",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
    backgroundClip: "text",
    animation: "$gradientShift 5s ease infinite",
    letterSpacing: "-3px",
    marginBottom: "1rem",
    textShadow: "0 2px 10px rgba(232, 76, 61, 0.1)",
    lineHeight: 1.1,
    "@media (max-width:900px)": {
      fontSize: "56px !important",
      letterSpacing: "-2px",
    },
  },

  "@keyframes gradientShift": {
    "0%": {
      backgroundPosition: "0% 50%",
    },
    "50%": {
      backgroundPosition: "100% 50%",
    },
    "100%": {
      backgroundPosition: "0% 50%",
    },
  },

  subtitleText: {
    fontSize: "1.3rem",
    color: "#555",
    fontWeight: 500,
    maxWidth: "600px",
    margin: "0 auto",
    letterSpacing: "0.5px",
  },

  committeeInfoSection: {
    background: "linear-gradient(135deg, rgba(232, 76, 61, 0.05), rgba(199, 21, 133, 0.05))",
    borderRadius: "24px",
    padding: "3rem",
    marginBottom: "4rem",
    border: "2px solid rgba(232, 76, 61, 0.15)",
    backdropFilter: "blur(10px)",
  },

  infoGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
    gap: "1.5rem",
    marginTop: "2rem",
  },

  infoCard: {
    background: "#ffffff",
    padding: "1.8rem",
    borderRadius: "16px",
    textAlign: "center",
    minHeight: "280px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    boxShadow: "0 8px 24px rgba(0, 0, 0, 0.08)",
    border: "1px solid rgba(232, 76, 61, 0.1)",
    transition: "all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)",
    "&:hover": {
      transform: "translateY(-8px) scale(1.02)",
      boxShadow: "0 16px 40px rgba(232, 76, 61, 0.2)",
      borderColor: "rgba(232, 76, 61, 0.3)",
    },
  },

  infoIcon: {
    fontSize: "2.8rem",
    marginBottom: "0.8rem",
    color: "#E84C3D",
  },

  infoTitle: {
    fontSize: "1.2rem",
    fontWeight: 700,
    color: "#222",
    marginBottom: "0.5rem",
  },

  infoText: {
    fontSize: "0.95rem",
    color: "#666",
    lineHeight: 1.6,
  },

  slideContainer: {
    position: "relative",
    borderRadius: "26px",
    overflow: "hidden",
    boxShadow: "0 18px 50px rgba(232, 76, 61, 0.18)",
    marginBottom: "4rem",
    background: "#fff",
  },

  slideImage: {
    width: "100%",
    height: "400px",
    objectFit: "cover",
    "@media (max-width:900px)": {
      height: "260px",
    },
  },

  slideOverlay: {
    position: "absolute",
    inset: 0,
    background:
      "linear-gradient(to right, rgba(0,0,0,0.55), rgba(0,0,0,0.15))",
    display: "flex",
    alignItems: "flex-end",
    justifyContent: "flex-start",
    paddingLeft: "3rem",
    paddingBottom: "3rem",
  },

  mainTitle: {
    fontFamily: "'Poppins', 'Inria Sans', sans-serif",
    fontWeight: 800,
    fontSize: "80px",
    color: "#fff",
    letterSpacing: "-1px",
    lineHeight: 1.1,
    "@media (max-width:900px)": {
      fontSize: "48px",
    },
  },

  slideButton: {
    position: "absolute",
    top: "50%",
    transform: "translateY(-50%)",
    background: "rgba(255,255,255,0.95)",
    border: "none",
    borderRadius: "50%",
    padding: "12px",
    cursor: "pointer",
    transition: "all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)",
    zIndex: 5,
    color: "#E84C3D",
    fontSize: "1.4rem",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    "&:hover": {
      background: "#E84C3D",
      color: "#fff",
      transform: "translateY(-50%) scale(1.15)",
      boxShadow: "0 8px 24px rgba(232, 76, 61, 0.4)",
    },
  },

  slideIndicator: {
    position: "absolute",
    bottom: "20px",
    left: "50%",
    transform: "translateX(-50%)",
    display: "flex",
    gap: "10px",
    zIndex: 5,
  },

  indicatorDot: {
    width: "12px",
    height: "12px",
    borderRadius: "50%",
    cursor: "pointer",
    background: "rgba(255, 255, 255, 0.6)",
    transition: "all 0.4s ease",
    "&:hover": {
      background: "#E84C3D",
      transform: "scale(1.2)",
    },
  },

  roleCard: {
    background: "#ffffff",
    borderRadius: "26px",
    padding: "2.4rem",
    height: "100%",
    minHeight: "560px",
    display: "flex",
    flexDirection: "column",
    boxShadow: "0 10px 28px rgba(0,0,0,0.08)",
    transition: "all 0.5s cubic-bezier(0.34, 1.56, 0.64, 1)",
    borderLeft: "6px solid",
    position: "relative",
    overflow: "hidden",
    "&::before": {
      content: '""',
      position: "absolute",
      top: "0",
      left: "0",
      width: "100%",
      height: "3px",
      background: "linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.8), transparent)",
      opacity: 0,
      transition: "opacity 0.6s ease",
    },
    "&:hover": {
      transform: "translateY(-10px) scale(1.02)",
      background: "linear-gradient(135deg, #fff, #fce4ec)",
      boxShadow: "0 20px 50px rgba(232, 76, 61, 0.2)",
      "&::before": {
        opacity: 1,
      },
    },
  },

  roleHeader: {
    display: "flex",
    alignItems: "center",
    gap: "1.3rem",
    marginBottom: "1.6rem",
  },

  roleNumber: {
    width: "60px",
    height: "60px",
    borderRadius: "50%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontWeight: 700,
    fontSize: "1.6rem",
    color: "#fff",
    boxShadow: "0 8px 20px rgba(0, 0, 0, 0.15)",
    transition: "all 0.4s ease",
    position: "relative",
    overflow: "hidden",
    "&::before": {
      content: '""',
      position: "absolute",
      top: "0",
      left: "-100%",
      width: "100%",
      height: "100%",
      background: "rgba(255, 255, 255, 0.3)",
      transition: "left 0.6s ease",
    },
  },

  roleTitle: {
    fontSize: "2.1rem !important",
    fontWeight: 700,
    color: "#222",
    transition: "color 0.4s ease",
  },

  roleDescription: {
    fontSize: "1.05rem",
    lineHeight: 2,
    color: "#555",
    textAlign: "justify",
    padding: "0.3rem 0.4rem",
    flexGrow: 1,
    maxHeight: "180px",
    overflowY: "auto",
    transition: "all 0.4s ease",
    "&:hover": {
      background: "rgba(232, 76, 61, 0.15)",
      borderRadius: "6px",
    },
  },

  imageWrapper: {
    position: "relative",
    height: "260px",
    borderRadius: "18px",
    overflow: "hidden",
    marginBottom: "1.4rem",
    boxShadow: "0 8px 24px rgba(0, 0, 0, 0.12)",
  },

  imageBase: {
    width: "100%",
    height: "100%",
    objectFit: "cover",
    position: "absolute",
    top: 0,
    left: 0,
    transition: "opacity 0.6s ease, transform 0.6s ease",
  },

  imageHover: {
    opacity: 0,
    transform: "scale(1.08)",
  },

  imageWrapperHover: {
    "&:hover $imageBase": {
      opacity: 0,
    },
    "&:hover $imageHover": {
      opacity: 1,
      transform: "scale(1)",
    },
  },
});

const CulturalCommittee = () => {
  const classes = useStyles();
  const navigate = useNavigate();
  const [currentSlide, setCurrentSlide] = useState(0);

  const handleBackToAbout = () => {
    navigate("/about");
  };

  const heroImages = [
    "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=1000&h=600&fit=crop",
    "https://images.unsplash.com/photo-1511379938547-c1f69b13d835?w=1000&h=600&fit=crop",
    "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=1000&h=600&fit=crop",
  ];

  const roleCards = [
    {
      number: "1",
      role: "ROLE",
      description:
        "Organizes and promotes cultural activities for NSS.",
      image1: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=500&h=400&fit=crop",
      image2: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=500&h=400&fit=crop",
      color: "#FFB366",
      borderColor: "#E84C3D",
    },
    {
      number: "2",
      role: "Event Planning",
      description:
        "Hosts music, dance, drama, and performing arts events.",
      image1: "https://images.unsplash.com/photo-1511379938547-c1f69b13d835?w=500&h=400&fit=crop",
      image2: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=500&h=400&fit=crop",
      color: "#FFB366",
      borderColor: "#C71585",
    },
    {
      number: "3",
      role: "Awareness & Engagement",
      description:
        "Manages NSS participation in cultural festivals.",
      image1: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=500&h=400&fit=crop",
      image2: "https://images.unsplash.com/photo-1519671482749-fd09be7ccebf?w=500&h=400&fit=crop",
      color: "#FFB366",
      borderColor: "#E84C3D",
    },
    {
      number: "4",
      role: "Talent Promotion",
      description:
        "Encourages volunteers to showcase their creative skills.",
      image1: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=500&h=400&fit=crop",
      image2: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=500&h=400&fit=crop",
      color: "#FFB366",
      borderColor: "#C71585",
    },
  ];

  const infoCards = [
    {
      title: "Cultural Celebrations",
      text: "Organizes and promotes cultural activities that showcase NSS's commitment.",
      icon: MusicNoteIcon,
    },
    {
      title: "Event Planning",
      text: "Hosts music, dance, drama, and performing arts events.",
      icon: TheaterComedyIcon,
    },
    {
      title: "Awareness & Engagement",
      text: "Manages NSS participation in cultural festivals.",
      icon: MicIcon,
    },
    {
      title: "Talent Promotion",
      text: "Encourages volunteers to showcase their creative skills.",
      icon: StarIcon,
    },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroImages.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <Layout>
      <motion.div
        className={classes.gradientBackground}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}>
        {/* Background Icons */}
        <MusicNoteIcon
          className={classes.iconBg}
          style={{
            fontSize: "280px",
            top: "10%",
            right: "5%",
          }}
        />
        <MicIcon
          className={classes.iconBg}
          style={{
            fontSize: "280px",
            bottom: "15%",
            left: "3%",
          }}
        />
        <TheaterComedyIcon
          className={classes.iconBg}
          style={{
            fontSize: "280px",
            top: "50%",
            right: "2%",
          }}
        />
        <StarIcon
          className={classes.iconBg}
          style={{
            fontSize: "280px",
            bottom: "5%",
            right: "15%",
          }}
        />

        <Container maxWidth="lg">
          <Box sx={{ display: "flex", justifyContent: "flex-start", mb: 2 }}>
            <Button variant="outlined" startIcon={<ArrowBackIcon />} onClick={handleBackToAbout}>
              Back to About
            </Button>
          </Box>
          {/* Hero Section */}
          <motion.div
            className={classes.heroSection}
            initial={{ opacity: 0, y: -40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}>
            <h1 className={classes.centeredTitle}>Cultural</h1>
            <p className={classes.subtitleText}>
              Celebrating Arts | Promoting Culture | Creating Moments
            </p>
          </motion.div>

          {/* Committee Info Cards */}
          <motion.div
            className={classes.committeeInfoSection}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6, delay: 0.2 }}>
            <Typography sx={{ fontSize: "2rem", fontWeight: 700, color: "#222", textAlign: "center", marginBottom: "2rem", fontStyle: "italic" }}>
              About the Cultural Committee
            </Typography>
            <Box className={classes.infoGrid}>
              {infoCards.map((card, idx) => {
                const IconComponent = card.icon;
                return (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: idx * 0.1 }}>
                    <Box className={classes.infoCard}>
                      <IconComponent className={classes.infoIcon} />
                      <Typography className={classes.infoTitle}>
                        {card.title}
                      </Typography>
                      <Typography className={classes.infoText}>
                        {card.text}
                      </Typography>
                    </Box>
                  </motion.div>
                );
              })}
            </Box>
          </motion.div>

          {/* Carousel Slide */}
          <motion.div
            className={classes.slideContainer}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, amount: 0.3 }}>
            <div style={{ position: "relative" }}>
              <motion.img
                key={currentSlide}
                src={heroImages[currentSlide]}
                alt="Cultural Committee"
                className={classes.slideImage}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
              />
              <div className={classes.slideOverlay}>
                <Typography className={classes.mainTitle}>
                  Cultural Committee
                </Typography>
              </div>

              {/* Navigation Buttons */}
              <button
                className={classes.slideButton}
                onClick={() =>
                  setCurrentSlide(
                    (prev) =>
                      (prev - 1 + heroImages.length) % heroImages.length
                  )
                }
                style={{ left: "20px" }}>
                <ArrowBackIcon />
              </button>
              <button
                className={classes.slideButton}
                onClick={() =>
                  setCurrentSlide((prev) => (prev + 1) % heroImages.length)
                }
                style={{ right: "20px" }}>
                <ArrowForwardIcon />
              </button>

              {/* Indicator Dots */}
              <div className={classes.slideIndicator}>
                {heroImages.map((_, idx) => (
                  <div
                    key={idx}
                    className={classes.indicatorDot}
                    onClick={() => setCurrentSlide(idx)}
                    style={{
                      background:
                        idx === currentSlide
                          ? "#E84C3D"
                          : "rgba(255, 255, 255, 0.6)",
                    }}
                  />
                ))}
              </div>
            </div>
          </motion.div>

          {/* Role Cards */}
          <Grid container spacing={3} sx={{ marginBottom: "4rem" }}>
            {roleCards.map((card, idx) => (
              <Grid item xs={12} sm={6} md={6} key={idx} sx={{ display: "flex" }}>
                <motion.div
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ delay: idx * 0.15 }}
                  style={{ height: "100%" }}>
                  <Box
                    className={classes.roleCard}
                    sx={{ borderLeftColor: card.borderColor }}>
                    <Box className={classes.roleHeader}>
                      <Box
                        className={classes.roleNumber}
                        sx={{
                          background: `linear-gradient(135deg, ${card.borderColor}, ${card.color})`,
                        }}>
                        {card.number}
                      </Box>
                      <Typography className={classes.roleTitle}>
                        {card.role}
                      </Typography>
                    </Box>

                    <Box className={classes.imageWrapper}>
                      <img
                        src={card.image1}
                        alt="Base"
                        className={classes.imageBase}
                      />
                      <img
                        src={card.image2}
                        alt="Hover"
                        className={classes.imageHover}
                      />
                    </Box>

                    <Typography className={classes.roleDescription}>
                      {card.description}
                    </Typography>
                  </Box>
                </motion.div>
              </Grid>
            ))}
          </Grid>

          <CommitteeTeamSection />
        </Container>
      </motion.div>
    </Layout>
  );
};

export default CulturalCommittee;
