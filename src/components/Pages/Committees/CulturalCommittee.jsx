import React, { useEffect, useState } from "react";
import Layout from "../../Layout/Layout";
import { motion } from "framer-motion";
import {
  Typography,
  Box,
  Grid,
  Container,
  Button,
  useTheme,
  useMediaQuery,
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

const useStyles = makeStyles({
  gradientBackground: {
    background: "linear-gradient(135deg, #fce4ec 0%, #ffffff 45%, #f3e5f5 100%)",
    minHeight: "100vh",
    position: "relative",
    overflow: "hidden",
    paddingBottom: "2rem",
  },

  /* Background animated icons - Hidden on mobile */
  iconBg: {
    position: "absolute",
    opacity: 0.15,
    pointerEvents: "none",
    color: "#E84C3D",
    zIndex: 0,
    "@media (max-width: 900px)": {
        opacity: 0.08,
        transform: "scale(0.6)",
    },
    "@media (max-width: 600px)": {
        display: "none", // Hide entirely on mobile to prevent clutter
    },
  },

  heroSection: {
    position: "relative",
    textAlign: "center",
    paddingTop: "2rem",
    paddingBottom: "2rem",
    marginBottom: "1rem",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 1,
  },

  centeredTitle: {
    fontFamily: "'Poppins', 'Inria Sans', sans-serif",
    fontWeight: 500,
    // FLUID TYPOGRAPHY: Scales between 2.5rem and 6rem
    fontSize: "clamp(2.5rem, 8vw, 6rem) !important",
    background: "linear-gradient(135deg, #E84C3D 0%, #C71585 30%, #E84C3D 60%, #E84C3D 100%)",
    backgroundSize: "250% 250%",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
    backgroundClip: "text",
    animation: "$gradientShift 5s ease infinite",
    letterSpacing: "-1px",
    marginBottom: "1rem",
    textShadow: "0 2px 10px rgba(232, 76, 61, 0.1)",
    lineHeight: 1.1,
    width: "100%",
    padding: "0 10px",
  },

  "@keyframes gradientShift": {
    "0%": { backgroundPosition: "0% 50%" },
    "50%": { backgroundPosition: "100% 50%" },
    "100%": { backgroundPosition: "0% 50%" },
  },

  subtitleText: {
    fontSize: "clamp(1rem, 2vw, 1.3rem)",
    color: "#555",
    fontWeight: 500,
    maxWidth: "600px",
    width: "90%",
    margin: "0 auto",
    letterSpacing: "0.5px",
  },

  committeeInfoSection: {
    background: "linear-gradient(135deg, rgba(232, 76, 61, 0.05), rgba(199, 21, 133, 0.05))",
    borderRadius: "24px",
    padding: "clamp(1.5rem, 4vw, 3rem)",
    marginBottom: "4rem",
    border: "2px solid rgba(232, 76, 61, 0.15)",
    backdropFilter: "blur(10px)",
    position: "relative",
    zIndex: 1,
  },

  infoGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
    gap: "1.5rem",
    marginTop: "2rem",
    "@media (max-width: 600px)": {
      gridTemplateColumns: "1fr",
    },
  },

  infoCard: {
    background: "#ffffff",
    padding: "1.8rem",
    borderRadius: "16px",
    textAlign: "center",
    height: "100%",
    minHeight: "220px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
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
    height: "auto",
    aspectRatio: "16/9",
    zIndex: 1,
    "@media (max-width: 600px)": {
        aspectRatio: "1/1",
        borderRadius: "16px",
    }
  },

  slideImage: {
    width: "100%",
    height: "100%",
    objectFit: "cover",
  },

  slideOverlay: {
    position: "absolute",
    inset: 0,
    background: "linear-gradient(to top, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0.2) 50%, transparent 100%)",
    display: "flex",
    alignItems: "flex-end",
    justifyContent: "flex-start",
    padding: "clamp(1.5rem, 5vw, 3rem)",
  },

  mainTitle: {
    fontFamily: "'Poppins', 'Inria Sans', sans-serif",
    fontWeight: 800,
    fontSize: "clamp(1.8rem, 5vw, 5rem) !important",
    color: "#fff",
    letterSpacing: "-1px",
    lineHeight: 1.1,
    textShadow: "0 2px 10px rgba(0,0,0,0.5)",
  },

  slideButton: {
    position: "absolute",
    top: "50%",
    transform: "translateY(-50%)",
    background: "rgba(255,255,255,0.7)",
    border: "none",
    borderRadius: "50%",
    padding: "10px",
    cursor: "pointer",
    transition: "all 0.3s ease",
    zIndex: 5,
    color: "#E84C3D",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    "&:hover": {
      background: "#E84C3D",
      color: "#fff",
      boxShadow: "0 8px 24px rgba(232, 76, 61, 0.4)",
    },
    "@media (max-width: 600px)": {
        padding: "8px",
        "& svg": { fontSize: "1rem" }
    }
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
    width: "10px",
    height: "10px",
    borderRadius: "50%",
    cursor: "pointer",
    transition: "all 0.4s ease",
  },

  roleCard: {
    background: "#ffffff",
    borderRadius: "26px",
    padding: "clamp(1.5rem, 3vw, 2.4rem)",
    height: "100%",
    display: "flex",
    flexDirection: "column",
    boxShadow: "0 10px 28px rgba(0,0,0,0.08)",
    transition: "all 0.5s cubic-bezier(0.34, 1.56, 0.64, 1)",
    borderLeft: "6px solid",
    position: "relative",
    overflow: "hidden",
    zIndex: 1,
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
    gap: "1rem",
    marginBottom: "1.5rem",
    "@media (max-width: 400px)": {
        flexDirection: "column",
        alignItems: "flex-start",
        gap: "0.5rem"
    }
  },

  roleNumber: {
    minWidth: "50px",
    width: "50px",
    height: "50px",
    borderRadius: "50%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontWeight: 700,
    fontSize: "1.4rem",
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
    fontSize: "clamp(1.2rem, 2.5vw, 2.1rem) !important",
    fontWeight: 700,
    color: "#222",
    lineHeight: 1.2,
    transition: "color 0.4s ease",
  },

  roleDescription: {
    fontSize: "1rem",
    lineHeight: 1.8,
    color: "#555",
    textAlign: "justify",
    padding: "0.3rem 0",
    flexGrow: 1,
    marginBottom: "1rem",
    transition: "all 0.4s ease",
    "&:hover": {
      background: "rgba(232, 76, 61, 0.15)",
      borderRadius: "6px",
    },
  },

  imageWrapper: {
    position: "relative",
    height: "240px",
    width: "100%",
    borderRadius: "18px",
    overflow: "hidden",
    marginBottom: "1.4rem",
    boxShadow: "0 8px 24px rgba(0, 0, 0, 0.12)",
    flexShrink: 0,
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
    width: "100%",
    height: "100%",
    objectFit: "cover",
    position: "absolute",
    top: 0,
    left: 0,
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
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const [currentSlide, setCurrentSlide] = useState(0);

  const handleBackToAbout = () => {
    navigate("/about");
  };

  const heroImages = [
    "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=1000&h=600&fit=crop",
    "https://images.pexels.com/photos/19915775/pexels-photo-19915775.jpeg",
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
      image1: "https://images.pexels.com/photos/19915775/pexels-photo-19915775.jpeg",
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
        
        {/* Background Icons - conditionally rendered */}
        {!isMobile && (
          <>
            <MusicNoteIcon className={classes.iconBg} style={{ fontSize: "280px", top: "10%", right: "5%" }} />
            <MicIcon className={classes.iconBg} style={{ fontSize: "280px", bottom: "15%", left: "3%" }} />
            <TheaterComedyIcon className={classes.iconBg} style={{ fontSize: "280px", top: "50%", right: "2%" }} />
            <StarIcon className={classes.iconBg} style={{ fontSize: "280px", bottom: "5%", right: "15%" }} />
          </>
        )}

        <Container maxWidth="lg" sx={{ px: { xs: 2, md: 3 } }}>
          <Box sx={{ display: "flex", justifyContent: "flex-start", mb: 2, pt: 2 }}>
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
            <Typography sx={{ 
                fontSize: { xs: "1.5rem", md: "2rem" }, 
                fontWeight: 700, 
                color: "#222", 
                textAlign: "center", 
                marginBottom: "2rem", 
                fontStyle: "italic" 
            }}>
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
            <div style={{ position: "relative", height: "100%" }}>
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
                style={{ left: "10px" }}>
                <ArrowBackIcon />
              </button>
              <button
                className={classes.slideButton}
                onClick={() =>
                  setCurrentSlide((prev) => (prev + 1) % heroImages.length)
                }
                style={{ right: "10px" }}>
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
              <Grid item xs={12} md={6} key={idx} sx={{ display: "flex" }}>
                <motion.div
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ delay: idx * 0.15 }}
                  style={{ width: "100%", display: "flex" }}>
                  <Box
                    className={classes.roleCard}
                    sx={{ borderLeftColor: card.borderColor, width: "100%" }}>
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

          <CommitteeTeamSection committeeKey="Cultural" />
        </Container>
      </motion.div>
    </Layout>
  );
};

export default CulturalCommittee;