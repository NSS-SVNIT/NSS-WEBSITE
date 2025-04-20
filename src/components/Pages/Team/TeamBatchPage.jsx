import React, { useEffect } from "react";
import { Typography, Button, Grow, Grid, Box, useTheme } from "@mui/material";
import TeamCard from "./TeamCard";
import { Link, useParams } from "react-router-dom";
import * as Data from "./TeamData";
import Layout from "../../Layout/Layout";
import { useMediaQuery } from "@material-ui/core";

const TeamBatchPage = React.memo(() => {
  const isMobile = useMediaQuery("(max-width:600px)");
  const { year } = useParams();
  const TeamList = React.useMemo(() => {
    if (year === "2002") return Data.CoFounder || [];
    if (year === "2001") return Data.Founder || [];
    if (year === "2000") return Data.Sir || [];
    if (year === "2003") return Data.ProgramCoordinators || [];
    const dataKey = `Team${year}`;
    return Data[dataKey] || [];
  }, [year]);

  const [animateCards, setAnimateCards] = React.useState(false);

  useEffect(() => {
    setAnimateCards(true);
    window.scrollTo(0, 0);
  }, []);

  const titleText = year === "2002" ? "Co-Founders" : `TEAM OF ${year}`;

  return (
    <Layout>
      <Box sx={{ overflowX: "hidden", px: { xs: 2, sm: 4, md: 6 }, py: { xs: 3, md: 6 } }}>
        <Box sx={{ textAlign: 'center', mb: { xs: 3, md: 6 } }}>
          <Typography
            variant="h4"
            component="h1"
            sx={{
              fontFamily: "DM Sans",
              color: "grey.700",
              fontSize: { xs: '2rem', sm: '2.5rem', md: '3rem' },
              display: 'inline-block',
              backgroundColor: 'grey.900',
              px: isMobile ? 4 : 8,
              py: 4,
              transform: animateCards ? 'translateY(0)' : 'translateY(20px)',
              opacity: animateCards ? 1 : 0,
              transition: 'transform 0.5s ease-in-out, opacity 0.5s ease-in-out'
            }}
          >
            {titleText.split(' ').map((word, idx) => (
              <Box
                key={idx}
                component="span"
                sx={{ color: idx === 2 ? 'common.white' : 'grey.500', ml: idx === 1 ? 1 : 0 }}
              >
                {word}{idx == titleText.split(' ').length - 2 ? ' ' : ''}
              </Box>
            ))}
          </Typography>
        </Box>

        <Grid
          container
          spacing={{ xs: 2, sm: 3, md: 4 }}
          justifyContent="center"
        >
          {TeamList.map((team, index) => (
            <Grow
              key={team.name}
              in={animateCards}
              timeout={1000 + index * 150}
              style={{ transformOrigin: "center bottom" }}
            >
              <Grid item xs={12} sm={6} md={4} lg={3} xl={2}>
                <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                  <TeamCard {...team} />
                </Box>
              </Grid>
            </Grow>
          ))}
        </Grid>

        <Box sx={{ textAlign: 'center', mt: { xs: 4, md: 6 } }}>
          <Button
            component={Link}
            to="/team"
            variant="outlined"
            color="inherit"
            sx={{
              fontFamily: "DM Sans",
              borderRadius: 0,
              px: 4,
              py: 1.5,
            }}
          >
            Back
          </Button>
        </Box>
      </Box>
    </Layout>
  );
});

export default TeamBatchPage;
