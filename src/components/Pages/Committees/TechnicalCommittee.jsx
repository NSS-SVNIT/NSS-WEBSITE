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
import CodeIcon from "@mui/icons-material/Code";
import LanguageIcon from "@mui/icons-material/Language";
import SchoolIcon from "@mui/icons-material/School";
import BuildIcon from "@mui/icons-material/Build";

const useStyles = makeStyles({
  gradientBackground: {
    background: "linear-gradient(135deg, #f0f4ff 0%, #ffffff 45%, #f0f8ff 100%)",
    minHeight: "100vh",
    position: "relative",
    overflow: "hidden",
    paddingBottom: "2rem", // Added padding for mobile scroll
  },

  /* Background animated icons - Hidden on mobile to prevent clutter */
  iconBg: {
    position: "absolute",
    opacity: 0.22,
    pointerEvents: "none",
    color: "#1a237e",
    "@media (max-width: 900px)": {
        opacity: 0.1,
        transform: "scale(0.5)",
    },
    "@media (max-width: 600px)": {
        display: "none", // Remove noise on small screens
    },
  },

  heroSection: {
    position: "relative",
    textAlign: "center",
    paddingTop: "2rem",
    paddingBottom: "2rem", // Reduced from 4rem
    marginBottom: "1rem",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },

  centeredTitle: {
    fontFamily: "'Poppins', 'Inria Sans', sans-serif",
    fontWeight: 500,
    // FLUID TYPOGRAPHY: Scales between 40px and 100px depending on viewport
    fontSize: "clamp(2.5rem, 8vw, 6rem) !important", 
    background: "linear-gradient(135deg, #1a237e 0%, #283593 30%, #1a237e 60%, #1a237e 100%)",
    backgroundSize: "250% 250%",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
    backgroundClip: "text",
    animation: "$gradientShift 5s ease infinite",
    letterSpacing: "-1px", // Reduced spacing for mobile fit
    marginBottom: "1rem",
    textShadow: "0 2px 10px rgba(26, 35, 126, 0.1)",
    lineHeight: 1.1,
    width: "100%",
    padding: "0 10px", // Prevent edge touching
  },

  "@keyframes gradientShift": {
    "0%": { backgroundPosition: "0% 50%" },
    "50%": { backgroundPosition: "100% 50%" },
    "100%": { backgroundPosition: "0% 50%" },
  },

  subtitleText: {
    fontSize: "clamp(1rem, 2vw, 1.3rem)", // Fluid font size
    color: "#555",
    fontWeight: 500,
    maxWidth: "600px",
    width: "90%", // Ensure it doesn't touch edges on mobile
    margin: "0 auto",
    letterSpacing: "0.5px",
  },

  committeeInfoSection: {
    background: "linear-gradient(135deg, rgba(26, 35, 126, 0.05), rgba(40, 53, 147, 0.05))",
    borderRadius: "24px",
    padding: "clamp(1.5rem, 4vw, 3rem)", // Responsive padding
    marginBottom: "4rem",
    border: "2px solid rgba(26, 35, 126, 0.15)",
    backdropFilter: "blur(10px)",
  },

  infoGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
    gap: "1.5rem",
    marginTop: "2rem",
    "@media (max-width: 600px)": {
      gridTemplateColumns: "1fr", // Stack deeply on mobile
    },
  },

  infoCard: {
    background: "#ffffff",
    padding: "1.8rem",
    borderRadius: "16px",
    textAlign: "center",
    height: "100%", // changed from minHeight to flex height
    minHeight: "220px", // Reduced minimum
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center", // Center content vertically
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
    height: "auto",
    aspectRatio: "16/9", // Enforce aspect ratio
    "@media (max-width: 600px)": {
        aspectRatio: "1/1", // Square on mobile for better visibility
        borderRadius: "16px",
    }
  },

  slideImage: {
    width: "100%",
    height: "100%", // Fill container
    objectFit: "cover",
  },

  slideOverlay: {
    position: "absolute",
    inset: 0,
    background: "linear-gradient(to top, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0.2) 50%, transparent 100%)", // Darker bottom for text readability
    display: "flex",
    alignItems: "flex-end",
    justifyContent: "flex-start",
    padding: "clamp(1.5rem, 5vw, 3rem)", // Responsive padding
  },

  mainTitle: {
    fontFamily: "'Poppins', 'Inria Sans', sans-serif",
    fontWeight: 800,
    fontSize: "clamp(1.8rem, 5vw, 5rem) !important", // Massive reduction for mobile
    color: "#fff",
    letterSpacing: "-1px",
    lineHeight: 1.1,
    textShadow: "0 2px 10px rgba(0,0,0,0.5)",
  },

  slideButton: {
    position: "absolute",
    top: "50%",
    transform: "translateY(-50%)",
    background: "rgba(255,255,255,0.7)", // More transparent
    border: "none",
    borderRadius: "50%",
    padding: "10px", // Smaller padding
    cursor: "pointer",
    transition: "all 0.3s ease",
    zIndex: 5,
    color: "#1a237e",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    "&:hover": {
      background: "#1a237e",
      color: "#fff",
    },
    "@media (max-width: 600px)": {
        padding: "8px",
        "& svg": { fontSize: "1rem" } // Smaller icons
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
    padding: "clamp(1.5rem, 3vw, 2.4rem)", // Responsive padding
    height: "100%", 
    // Removed fixed minHeight to prevent gaps or overflows
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
    gap: "1rem",
    marginBottom: "1.5rem",
    "@media (max-width: 400px)": {
        flexDirection: "column",
        alignItems: "flex-start",
        gap: "0.5rem"
    }
  },

  roleNumber: {
    minWidth: "50px", // Use minWidth to prevent squishing
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
    fontSize: "clamp(1.2rem, 2.5vw, 2.1rem) !important", // Fluid font size
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
    flexGrow: 1, // Pushes content to fill space naturally
    marginBottom: "1rem",
    transition: "all 0.4s ease",
    "&:hover": {
      background: "rgba(26, 35, 126, 0.05)",
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
    // Ensure image container doesn't break layout
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
    objectFit: "cover", // Added missing object fit
    position: "absolute", // Added positioning
    top: 0, // Added positioning
    left: 0, // Added positioning
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
  const theme = useTheme();
  // Standard MUI Hook for mobile detection
  const isMobile = useMediaQuery(theme.breakpoints.down("sm")); 

  const [currentSlide, setCurrentSlide] = useState(0);

  const handleBackToAbout = () => {
    navigate("/about");
  };

  const heroImages = [
    "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=1000&h=600&fit=crop",
    "https://contentstatic.techgig.com/thumb/msid-115055298,width-800,resizemode-4/Top-10-Open-source-AI-projects-that-every-developer-should-know-about.jpg?57882",
    "https://images.pexels.com/photos/2391/dirty-industry-stack-factory.jpg",
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
      image1: "https://images.pexels.com/photos/2391/dirty-industry-stack-factory.jpg",
      image2: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=500&h=400&fit=crop",
      color: "#5C6BC0",
      borderColor: "#283593",
    },
    {
      number: "3",
      role: "AI/ML Projects",
      description:
        "Guides and supervises mini projects in Artificial Intelligence and Machine Learning. Provides resources, mentorship, and hands-on experience in cutting-edge technologies.",
      image1: "https://contentstatic.techgig.com/thumb/msid-115055298,width-800,resizemode-4/Top-10-Open-source-AI-projects-that-every-developer-should-know-about.jpg?57882",
      image2: "https://images.unsplash.com/photo-1531746790731-6c087fecd65b?w=500&h=400&fit=crop",
      color: "#5C6BC0",
      borderColor: "#1a237e",
    },
    {
      number: "4",
      role: "Certificates & Recognition",
      description:
        "Issues certificates to all volunteers recognizing their participation and contributions. Maintains records and ensures volunteers receive due recognition for their technical work.",
      image1: "https://plus.unsplash.com/premium_vector-1720939039468-8e71e7e80fd6?q=80&w=880&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
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
        
        {/* Background Icons - conditionally rendered or CSS hidden on mobile */}
        {!isMobile && (
          <>
            <CodeIcon className={classes.iconBg} style={{ fontSize: "280px", top: "10%", right: "5%" }} />
            <LanguageIcon className={classes.iconBg} style={{ fontSize: "280px", bottom: "15%", left: "3%" }} />
            <BuildIcon className={classes.iconBg} style={{ fontSize: "280px", top: "50%", right: "2%" }} />
            <SchoolIcon className={classes.iconBg} style={{ fontSize: "280px", bottom: "5%", right: "15%" }} />
          </>
        )}

        <Container maxWidth="lg" sx={{ px: { xs: 2, md: 3 } }}> {/* Added horizontal padding */}
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
            <Typography sx={{ 
                fontSize: { xs: "1.5rem", md: "2rem" }, 
                fontWeight: 700, 
                color: "#222", 
                textAlign: "center", 
                marginBottom: "2rem", 
                fontStyle: "italic" 
            }}>
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
            <div style={{ position: "relative", height: "100%" }}>
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

          <CommitteeTeamSection committeeKey="technical"  />
        </Container>
      </motion.div>
    </Layout>
  );
};

export default TechnicalCommittee;