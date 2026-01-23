import React from "react";
import { Typography, Grid, Box, Button, useMediaQuery } from "@mui/material";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import TeamCard from "./TeamCard"; // Assuming TeamCard component is in the same directory

// --- Animation Variants for Framer Motion ---

// Parent container variant to orchestrate staggered animations
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1, // Stagger delay between each child
    },
  },
};

// Child item (card) variant for a "fade in and slide up" effect
const cardVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut",
    },
  },
};

// --- Helper for Heading Logic ---

// Configuration for heading text based on the year. More scalable than if/else.
const headingConfig = {
  2000: { primary: "PROGRAM", secondary: "COORDINATOR" },
  2001: { primary: "OUR", secondary: "FOUNDER" },
  2002: { primary: "CO -", secondary: "FOUNDERS" },
  2003: { primary: "PROGRAM", secondary: "OFFICERS" },
  default: { primary: "TEAM OF", secondary: "" }, // secondary will be the year
};

const getHeadingDetails = (year) => {
  const config = headingConfig[year] || headingConfig.default;
  return {
    primaryText: config.primary,
    secondaryText: config.secondary || year,
  };
};


// --- The Main Component ---

const TeamBatch = React.memo(({ year, TeamList }) => {
  const isMobile = useMediaQuery("(max-width:600px)");
  const displayedTeam = TeamList.slice(0, 6);
  const { primaryText, secondaryText } = getHeadingDetails(year);

  return (
    // The main container with overflow hidden to prevent animation artifacts
    <Box sx={{ fontFamily: "DM Sans", overflowX: "hidden", py: { xs: 4, md: 8 } }}>
      
      {/* --- Animated Heading --- */}
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.5 }} // Trigger animation when 50% is visible
        variants={cardVariants} // Re-using card variant for a simple fade-up
      >
        <Box
          sx={{
            display: 'flex',
            flexDirection: { xs: 'column', sm: 'row' },
            justifyContent: 'center',
            alignItems: 'center',
            gap: { xs: 0, sm: 2 },
            mb: { xs: 5, md: 8 },
            textAlign: 'center',
          }}
        >
          <Typography
            variant="h2"
            sx={{
              color: 'text.secondary',
              fontWeight: 300,
              fontSize: { xs: '2.5rem', sm: '3rem', md: '4rem' },
            }}
          >
            {primaryText}
          </Typography>
          <Typography
            variant="h2"
            sx={{
              color: 'text.primary',
              fontWeight: 700,
              fontSize: { xs: '2.5rem', sm: '3rem', md: '4rem' },
            }}
          >
            {secondaryText}
          </Typography>
        </Box>
      </motion.div>

      {/* --- Animated Grid of Team Cards --- */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }} // Trigger when 10% of the grid is visible
      >
        <Grid container spacing={isMobile ? 3 : 4} justifyContent="center">
          {displayedTeam.map((teamMember) => (
            <Grid
              item
              xs={12}
              sm={6}
              md={4}
              lg={2}
              key={teamMember.name}
              sx={{ display: "flex", justifyContent: "center" }}
            >
              {/* Each card is a motion component with its own animation variant */}
              <motion.div variants={cardVariants} style={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
                <TeamCard {...teamMember} />
              </motion.div>
            </Grid>
          ))}
        </Grid>
      </motion.div>

      {/* --- "See More" Button with Animation --- */}
      {TeamList.length > 6 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          <Box sx={{ display: "flex", justifyContent: "center", mt: { xs: 6, md: 8 } }}>
            <Button
              component={Link}
              to={`/team/${year}`}
              variant="outlined"
              color="inherit"
              sx={{
                fontFamily: "DM Sans",
                fontWeight: 500,
                fontSize: '1rem',
                borderRadius: '50px', // A more modern pill shape
                px: 5,
                py: 1.5,
                borderColor: 'rgba(0, 0, 0, 0.3)',
                color: 'text.secondary',
                transition: 'all 0.3s ease',
                '&:hover': {
                  backgroundColor: 'primary.main', // Example hover color
                  color: 'white',
                  borderColor: 'primary.main',
                  transform: 'translateY(-3px)',
                  boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                },
              }}
            >
              See More
            </Button>
          </Box>
        </motion.div>
      )}
    </Box>
  );
});

export default TeamBatch;