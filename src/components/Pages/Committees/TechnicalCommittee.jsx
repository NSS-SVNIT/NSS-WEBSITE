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
import CodeIcon from "@mui/icons-material/Code";
import LanguageIcon from "@mui/icons-material/Language";
import SchoolIcon from "@mui/icons-material/School";
import BuildIcon from "@mui/icons-material/Build";
import AssignmentIcon from "@mui/icons-material/Assignment";

const useStyles = makeStyles({
  gradientBackground: {
    background: "linear-gradient(135deg, #f0f4ff 0%, #ffffff 45%, #f0f8ff 100%)",
    minHeight: "100vh",
    position: "relative",
    overflow: "hidden",
  },

  /* Background animated icons */
  iconBg: {
    position: "absolute",
    opacity: 0.22,
    pointerEvents: "none",
    color: "#1a237e",
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
    fontSize: "100px",
    background: "linear-gradient(135deg, #1a237e 0%, #283593 30%, #1a237e 60%, #1a237e 100%)",
    backgroundSize: "250% 250%",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
    backgroundClip: "text",
    animation: "$gradientShift 5s ease infinite",
    letterSpacing: "-3px",
    marginBottom: "1rem",
    textShadow: "0 2px 10px rgba(26, 35, 126, 0.1)",
    lineHeight: 1.1,
    "@media (max-width:900px)": {
      fontSize: "56px",
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
    background: "linear-gradient(135deg, rgba(26, 35, 126, 0.05), rgba(40, 53, 147, 0.05))",
    borderRadius: "24px",
    padding: "3rem",
    marginBottom: "4rem",
    border: "2px solid rgba(26, 35, 126, 0.15)",
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
    border: "1px solid rgba(26, 35, 126, 0.1)",
    transition: "all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)",
    "&:hover": {
      transform: "translateY(-8px) scale(1.02)",
      boxShadow: "0 16px 40px rgba(26, 35, 126, 0.2)",
      borderColor: "rgba(26, 35, 126, 0.3)",
    },
  },

  infoIcon: {
    fontSize: "2.8rem",
    marginBottom: "0.8rem",
    color: "#1a237e",
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
    boxShadow: "0 18px 50px rgba(26, 35, 126, 0.18)",
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
    color: "#1a237e",
    fontSize: "1.4rem",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    "&:hover": {
      background: "#1a237e",
      color: "#fff",
      transform: "translateY(-50%) scale(1.15)",
      boxShadow: "0 8px 24px rgba(26, 35, 126, 0.4)",
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
      background: "#1a237e",
      transform: "scale(1.2)",
    },
  },

  roleCard: {
    background: "#ffffff",
    borderRadius: "26px",
    padding: "2.4rem",
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
      background: "linear-gradient(135deg, #fff, #f0f4ff)",
      boxShadow: "0 20px 50px rgba(26, 35, 126, 0.2)",
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
    fontSize: "2.1rem",
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
    transition: "all 0.4s ease",
    "&:hover": {
      background: "rgba(26, 35, 126, 0.15)",
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

const TechnicalCommittee = () => {
  const classes = useStyles();
  const navigate = useNavigate();
  const [currentSlide, setCurrentSlide] = useState(0);

  const handleBackToAbout = () => {
    navigate("/about");
  };

  const heroImages = [
    "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=1000&h=600&fit=crop",
    "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=1000&h=600&fit=crop",
    "https://images.unsplash.com/photo-1527014849847-b654de08e0fd?w=1000&h=600&fit=crop",
  ];

  const roleCards = [
    {
      number: "1",
      role: "Website Development",
      description:
        "Manages and maintains the NSS website, ensuring it's up-to-date with latest events, information, and volunteer details. Develops new features and improvements for better user experience.",
      image1: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=500&h=400&fit=crop",
      image2: "https://images.unsplash.com/photo-1555694352-0bfe6631-6b16-f7d51629c46f?w=500&h=400&fit=crop",
      color: "#5C6BC0",
      borderColor: "#1a237e",
    },
    {
      number: "2",
      role: "Industrial Visits",
      description:
        "Coordinates and organizes industrial visits for NSS volunteers. Establishes relationships with industries, manages logistics, and ensures enriching learning experiences.",
      image1: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=500&h=400&fit=crop",
      image2: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=500&h=400&fit=crop",
      color: "#5C6BC0",
      borderColor: "#283593",
    },
    {
      number: "3",
      role: "AI/ML Projects",
      description:
        "Guides and supervises mini projects in Artificial Intelligence and Machine Learning. Provides resources, mentorship, and hands-on experience in cutting-edge technologies.",
      image1: "https://images.unsplash.com/photo-1527014849847-b654de08e0fd?w=500&h=400&fit=crop",
      image2: "https://images.unsplash.com/photo-1531746790731-6c087fecd65b?w=500&h=400&fit=crop",
      color: "#5C6BC0",
      borderColor: "#1a237e",
    },
    {
      number: "4",
      role: "Certificates & Recognition",
      description:
        "Issues certificates to all volunteers recognizing their participation and contributions. Maintains records and ensures volunteers receive due recognition for their technical work.",
      image1: "https://images.unsplash.com/photo-1516321318423-f06f70d504f0?w=500&h=400&fit=crop",
      image2: "https://images.unsplash.com/photo-1450101499163-c8917c7b4c3e?w=500&h=400&fit=crop",
      color: "#5C6BC0",
      borderColor: "#283593",
    },
  ];

  const infoCards = [
    {
      title: "Website Management",
      text: "Maintains and develops the NSS website with latest updates, events, and volunteer information.",
      icon: LanguageIcon,
    },
    {
      title: "Industrial Visits",
      text: "Organizes industrial visits and establishes partnerships with leading organizations.",
      icon: BuildIcon,
    },
    {
      title: "AI/ML Projects",
      text: "Guides mini projects in Artificial Intelligence and Machine Learning for hands-on experience.",
      icon: CodeIcon,
    },
    {
      title: "Certificates",
      text: "Issues certificates and recognition to volunteers for their technical contributions.",
      icon: SchoolIcon,
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
        <CodeIcon
          className={classes.iconBg}
          style={{
            fontSize: "280px",
            top: "10%",
            right: "5%",
          }}
        />
        <LanguageIcon
          className={classes.iconBg}
          style={{
            fontSize: "280px",
            bottom: "15%",
            left: "3%",
          }}
        />
        <BuildIcon
          className={classes.iconBg}
          style={{
            fontSize: "280px",
            top: "50%",
            right: "2%",
          }}
        />
        <SchoolIcon
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
            <h1 className={classes.centeredTitle}>Technical</h1>
            <p className={classes.subtitleText}>
              Driving Innovation | Building Solutions | Empowering Through Technology
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
              About the Technical Committee
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
                alt="Technical Committee"
                className={classes.slideImage}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
              />
              <div className={classes.slideOverlay}>
                <Typography className={classes.mainTitle}>
                  Technical Committee
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
                          ? "#1a237e"
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
              <Grid item xs={12} sm={6} md={6} key={idx}>
                <motion.div
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ delay: idx * 0.15 }}>
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

export default TechnicalCommittee;
