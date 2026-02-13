import React, { useEffect, useMemo, useState } from "react";
import { Typography, IconButton, Grow, Grid, Box, Tooltip, Fade } from "@mui/material"; // Added Fade
import { Link, useParams } from "react-router-dom";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import PeopleOutlineIcon from '@mui/icons-material/PeopleOutline';

import TeamCard from "./TeamCard";
import * as Data from "./TeamData";
import Layout from "../../Layout/Layout";

// A small, reusable component for the animated character effect in the title.
const AnimatedChar = ({ char, delay }) => (
  <Box
    component="span"
    sx={{
      display: 'inline-block',
      opacity: 0,
      transform: 'translateY(30px) scale(0.8)',
      animation: `reveal 0.8s cubic-bezier(0.2, 0.8, 0.2, 1) forwards`,
      animationDelay: `${delay}ms`,
      '@keyframes reveal': {
        '0%': {
          opacity: 0,
          transform: 'translateY(30px) scale(0.8)',
        },
        '100%': {
          opacity: 1,
          transform: 'translateY(0) scale(1)',
        },
      },
    }}
  >
    {char === ' ' ? '\u00A0' : char} {/* Render space correctly */}
  </Box>
);

const TeamBatchPage = React.memo(() => {
  const { year } = useParams();
  const [isMounted, setIsMounted] = useState(false);

  // Memoize team data lookup for performance
  const TeamList = useMemo(() => {
    if (year === "2002") return Data.CoFounder || [];
    if (year === "2001") return Data.Founder || [];
    if (year === "2000") return Data.Sir || [];
    if (year === "2003") return Data.ProgramCoordinators || [];
    const dataKey = `Team${year}`;
    return Data[dataKey] || [];
  }, [year]);

  // Handle animations and scroll position on component mount
  useEffect(() => {
    setIsMounted(true);
    window.scrollTo(0, 0);
  }, []);

  // Dynamically create the title text
  const titleText = useMemo(() => {
    if (year === "2002") return "Co-Founders";
    if (year === "2001") return "Founders";
    if (year === "2000") return "Faculty Advisor";
    if (year === "2003") return "Program Coordinators";
    return `TEAM OF ${year}`;
  }, [year]);

  return (
    <Layout>
      {/* Main container with relative positioning for background elements */}
      <Box sx={{ position: 'relative', overflowX: 'hidden', px: { xs: 2, sm: 4, md: 6 }, py: { xs: 4, md: 8 } }}>
        
        {/* Subtle background gradient for depth */}
        <Box sx={{
          position: 'absolute', top: 0, left: '50%', transform: 'translateX(-50%)',
          width: '100%', maxWidth: '1200px', height: '500px',
          background: 'radial-gradient(circle, rgba(0, 119, 182, 0.05) 0%, rgba(0, 119, 182, 0) 70%)',
          zIndex: -1,
        }} />

        {/* Back Button - Floating with Glassmorphism Effect */}
        <Tooltip title="Back to Teams" placement="right">
          <IconButton
            component={Link}
            to="/team"
            sx={{
              position: 'fixed',
              top: { xs: '80px', sm: '100px' },
              left: { xs: '15px', sm: '30px' },
              zIndex: 1000,
              backgroundColor: 'rgba(255, 255, 255, 0.5)',
              backdropFilter: 'blur(8px)',
              border: '1px solid rgba(0, 0, 0, 0.1)',
              transition: 'transform 0.2s ease, background-color 0.2s ease',
              '&:hover': {
                transform: 'scale(1.1)',
                backgroundColor: 'rgba(255, 255, 255, 0.8)',
              }
            }}
          >
            <ArrowBackIcon />
          </IconButton>
        </Tooltip>

        {/* Animated Title */}
        <Box sx={{ textAlign: 'center', mb: { xs: 5, md: 8 } }}>
          <Typography
            variant="h1" // Semantically it's the main heading
            component="h1"
            sx={{
              fontFamily: "DM Sans, sans-serif",
              fontWeight: 700,
              color: 'text.primary',
              fontSize: { xs: '2.5rem', sm: '3.5rem', md: '4.5rem' },
            }}
          >
            {titleText.split('').map((char, index) => (
              <AnimatedChar key={index} char={char} delay={index * 30} />
            ))}
          </Typography>
        </Box>

        {/* Grid for Team Cards */}
        <Grid container spacing={{ xs: 3, sm: 4 }} justifyContent="center">
          {TeamList.length > 0 ? (
            TeamList.map((team, index) => (
              <Grow
                key={team.name}
                in={isMounted}
                timeout={500 + index * 100} // Snappier staggered animation
                style={{ transformOrigin: "center bottom" }}
              >
                {/* 
                  --- THIS IS THE MODIFIED LINE ---
                  I've added xl={2} to show 6 cards per row on extra-large screens (12 / 2 = 6).
                  I've also adjusted `lg` to 3 for a smoother responsive transition (4 cards per row).
                */}
                <Grid item xs={12} sm={6} md={4} lg={3} xl={2} display="flex" justifyContent="center">
                  <TeamCard {...team} />
                </Grid>
              </Grow>
            ))
          ) : (
            // Robust Empty State when no team members are found
            <Grid item xs={12}>
              <Fade in={isMounted} timeout={1000}>
                <Box sx={{ textAlign: 'center', py: 8, color: 'text.secondary' }}>
                  <PeopleOutlineIcon sx={{ fontSize: '4rem', mb: 2, opacity: 0.5 }} />
                  <Typography variant="h6">No Team Members Found</Typography>
                  <Typography>This batch either has no members listed or doesn't exist.</Typography>
                </Box>
              </Fade>
            </Grid>
          )}
        </Grid>
      </Box>
    </Layout>
  );
});

export default TeamBatchPage;