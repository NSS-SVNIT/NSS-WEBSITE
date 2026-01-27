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
import PaletteIcon from "@mui/icons-material/Palette";
import CreateIcon from "@mui/icons-material/Create";
import PhotoCameraIcon from "@mui/icons-material/PhotoCamera";
import DesignServicesIcon from "@mui/icons-material/DesignServices";
import BrushIcon from "@mui/icons-material/Brush";
import EmojiObjectsIcon from "@mui/icons-material/EmojiObjects";

const useStyles = makeStyles({
  gradientBackground: {
    background: "linear-gradient(135deg, #e0f7ff 0%, #ffffff 45%, #f0f8ff 100%)",
    minHeight: "100vh",
    position: "relative",
    overflow: "hidden",
  },

  /* Background animated icons */
  iconBg: {
    position: "absolute",
    opacity: 0.22,
    pointerEvents: "none",
    color: "#5B7CFF",
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
    background: "linear-gradient(135deg, #5B7CFF 0%, #FF6B9D 30%, #5B7CFF 60%, #5B7CFF 100%)",
    backgroundSize: "250% 250%",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
    backgroundClip: "text",
    animation: "$gradientShift 5s ease infinite",
    letterSpacing: "-3px",
    marginBottom: "1rem",
    textShadow: "0 2px 10px rgba(91, 124, 255, 0.1)",
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
    background: "linear-gradient(135deg, rgba(91, 124, 255, 0.05), rgba(255, 107, 157, 0.05))",
    borderRadius: "24px",
    padding: "3rem",
    marginBottom: "4rem",
    border: "2px solid rgba(91, 124, 255, 0.15)",
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
    border: "1px solid rgba(91, 124, 255, 0.1)",
    transition: "all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)",
    "&:hover": {
      transform: "translateY(-8px) scale(1.02)",
      boxShadow: "0 16px 40px rgba(91, 124, 255, 0.2)",
      borderColor: "rgba(91, 124, 255, 0.3)",
    },
  },

  infoIcon: {
    fontSize: "2.8rem",
    marginBottom: "0.8rem",
    color: "#5B7CFF",
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
    boxShadow: "0 18px 50px rgba(91, 124, 255, 0.18)",
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
    color: "#5B7CFF",
    fontSize: "1.4rem",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    "&:hover": {
      background: "#5B7CFF",
      color: "#fff",
      transform: "translateY(-50%) scale(1.15)",
      boxShadow: "0 8px 24px rgba(91, 124, 255, 0.4)",
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
      background: "#5B7CFF",
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
      background: "linear-gradient(135deg, #fff, #f0f8ff)",
      boxShadow: "0 20px 50px rgba(91, 124, 255, 0.2)",
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
      background: "rgba(91, 124, 255, 0.15)",
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

const CreativeCommittee = () => {
  const classes = useStyles();
  const navigate = useNavigate();
  const [currentSlide, setCurrentSlide] = useState(0);

  const handleBackToAbout = () => {
    navigate("/about");
  };

  const heroImages = [
    "https://images.unsplash.com/photo-1561070791-2526d30994b5",
    "https://images.unsplash.com/photo-1561070791-2526d30994b5",
    "https://images.unsplash.com/photo-1561070791-2526d30994b5",
  ];

  const roleColors = ["#5B7CFF", "#FF6B9D", "#00D4FF", "#FFB84D"];

  const committeeInfo = [
    {
      icon: <PaletteIcon className={classes.infoIcon} />,
      title: "Creative Design",
      desc: "Bringing visual innovation and artistic excellence to NSS campaigns and initiatives.",
    },
    {
      icon: <CreateIcon className={classes.infoIcon} />,
      title: "Content Creation",
      desc: "Designing compelling visual content that inspires action and engagement.",
    },
    {
      icon: <PhotoCameraIcon className={classes.infoIcon} />,
      title: "Media Production",
      desc: "Capturing moments and creating multimedia content for social impact stories.",
    },
    {
      icon: <DesignServicesIcon className={classes.infoIcon} />,
      title: "Brand Building",
      desc: "Developing cohesive visual identity for NSS projects and community programs.",
    },
  ];

  const roles = [
    {
      title: "Role",
      desc:
        "Brings innovation to NSS activities and events through creative solutions and artistic excellence.",
      img1: heroImages[0],
      img2: heroImages[1],
    },
    {
      title: "Content Creation",
      desc:
        "Designs posters, banners and digital content for promotions that effectively communicate NSS messages.",
      img1: heroImages[1],
      img2: heroImages[2],
    },
    {
      title: "Social Media",
      desc:
        "Creates engaging content to boost participation and extend the reach of NSS initiatives.",
      img1: heroImages[2],
      img2: heroImages[0],
    },
    {
      title: "Skills Development",
      desc:
        "Enhances volunteers' artistic and design abilities through training and hands-on creative projects.",
      img1: heroImages[0],
      img2: heroImages[2],
    },
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroImages.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <Layout>
      <Box className={classes.gradientBackground}>
        {/* Background static icons */}
        <div
          className={classes.iconBg}
          style={{ top: "5%", left: "5%", fontSize: "240px" }}>
          <BrushIcon sx={{ fontSize: "240px" }} />
        </div>

        <div
          className={classes.iconBg}
          style={{ top: "60%", right: "3%", fontSize: "200px" }}>
          <PaletteIcon sx={{ fontSize: "200px" }} />
        </div>

        <div
          className={classes.iconBg}
          style={{ bottom: "8%", left: "8%", fontSize: "180px" }}>
          <DesignServicesIcon sx={{ fontSize: "180px" }} />
        </div>

        <div
          className={classes.iconBg}
          style={{ top: "15%", right: "10%", fontSize: "160px" }}>
          <EmojiObjectsIcon sx={{ fontSize: "160px" }} />
        </div>

        <Container maxWidth="lg" sx={{ py: 6, position: "relative", zIndex: 2 }}>
          <Box sx={{ display: "flex", justifyContent: "flex-start", mb: 2 }}>
            <Button variant="outlined" startIcon={<ArrowBackIcon />} onClick={handleBackToAbout}>
              Back to About
            </Button>
          </Box>
          {/* Hero Section with Centered Title */}
          <motion.div className={classes.heroSection}
            initial={{ opacity: 0, y: -40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}>
            <Typography className={classes.centeredTitle}>
              Creative Committee
            </Typography>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.6 }}>
              <Typography className={classes.subtitleText}>
                Bringing Innovation to Life | Designing Excellence | Creating Visual Impact
              </Typography>
            </motion.div>
          </motion.div>

          {/* Committee Information Section */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}>
            <Box className={classes.committeeInfoSection}>
              <Typography sx={{ fontSize: "2rem", fontWeight: 700, color: "#222", textAlign: "center", marginBottom: "2rem", fontStyle: "italic" }}>
                About the Creative Committee
              </Typography>
              <Box className={classes.infoGrid}>
                {committeeInfo.map((info, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.15, duration: 0.5 }}
                    viewport={{ once: true }}>
                    <Box className={classes.infoCard}>
                      <motion.div
                        whileHover={{ scale: 1.2, rotate: 10 }}
                        transition={{ duration: 0.3 }}>
                        {info.icon}
                      </motion.div>
                      <Typography className={classes.infoTitle}>
                        {info.title}
                      </Typography>
                      <Typography className={classes.infoText}>
                        {info.desc}
                      </Typography>
                    </Box>
                  </motion.div>
                ))}
              </Box>
            </Box>
          </motion.div>

          {/* Slideshow with Heading Overlay */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}>
            <Box className={classes.slideContainer}>
              <motion.img
                key={currentSlide}
                src={heroImages[currentSlide]}
                className={classes.slideImage}
                initial={{ opacity: 0.6, scale: 1.05 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6 }}
              />

              <Box className={classes.slideOverlay}>
                <motion.div
                  initial={{ opacity: 0, x: -40 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6 }}>
                  <Typography className={classes.mainTitle}>
                    Our Initiatives
                  </Typography>
                </motion.div>
              </Box>

              {/* Slide indicator dots */}
              <Box className={classes.slideIndicator}>
                {heroImages.map((_, idx) => (
                  <motion.div
                    key={idx}
                    className={classes.indicatorDot}
                    animate={{
                      scale: idx === currentSlide ? 1.4 : 1,
                      backgroundColor: idx === currentSlide ? "#5B7CFF" : "rgba(255, 255, 255, 0.6)",
                    }}
                    transition={{ duration: 0.3 }}
                    onClick={() => setCurrentSlide(idx)}
                  />
                ))}
              </Box>

              <motion.button
                className={classes.slideButton}
                style={{ left: 15 }}
                onClick={() =>
                  setCurrentSlide(
                    (currentSlide - 1 + heroImages.length) % heroImages.length
                  )
                }
                whileHover={{ scale: 1.15 }}
                whileTap={{ scale: 0.95 }}>
                <ArrowBackIcon />
              </motion.button>

              <motion.button
                className={classes.slideButton}
                style={{ right: 15 }}
                onClick={() =>
                  setCurrentSlide((currentSlide + 1) % heroImages.length)
                }
                whileHover={{ scale: 1.15 }}
                whileTap={{ scale: 0.95 }}>
                <ArrowForwardIcon />
              </motion.button>
            </Box>
          </motion.div>

          {/* Roles */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            variants={{
              hidden: { opacity: 0 },
              visible: {
                opacity: 1,
                transition: {
                  staggerChildren: 0.2,
                },
              },
            }}
            viewport={{ once: true }}>
            <Grid container spacing={4}>
              {roles.map((role, i) => (
                <Grid item xs={12} md={6} key={i} sx={{ display: "flex" }}>
                  <motion.div
                    variants={{
                      hidden: { opacity: 0, y: 40, rotateX: -20 },
                      visible: {
                        opacity: 1,
                        y: 0,
                        rotateX: 0,
                        transition: {
                          type: "spring",
                          stiffness: 100,
                          damping: 15,
                        },
                      },
                    }}
                    style={{ height: "100%" }}>
                    <Box
                      className={classes.roleCard}
                      style={{ borderLeftColor: roleColors[i] }}>
                      <Box className={classes.roleHeader}>
                        <motion.div
                          className={classes.roleNumber}
                          style={{ background: roleColors[i] }}
                          whileHover={{ rotateZ: 360, scale: 1.1 }}
                          transition={{ duration: 0.6 }}>
                          {i + 1}
                        </motion.div>
                        <Typography className={classes.roleTitle}>
                          {role.title}
                        </Typography>
                      </Box>

                      <Box
                        className={`${classes.imageWrapper} ${classes.imageWrapperHover}`}>
                        <img src={role.img1} className={classes.imageBase} />
                        <img
                          src={role.img2}
                          className={`${classes.imageBase} ${classes.imageHover}`}
                        />
                      </Box>

                      <Typography className={classes.roleDescription}>
                        {role.desc}
                      </Typography>
                    </Box>
                  </motion.div>
                </Grid>
              ))}
            </Grid>
          </motion.div>

          <CommitteeTeamSection />
        </Container>
      </Box>
    </Layout>
  );
};

export default CreativeCommittee;
