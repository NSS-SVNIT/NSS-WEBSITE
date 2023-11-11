import React from "react";
import { Typography, Grid, Box, Button, Grow, useScrollTrigger } from "@mui/material";
import AlumniCard from "./AlumniCard";
import { Link } from 'react-router-dom';

// Component for displaying a batch of alumni
const AlumniBatch = ({ year, alumniList }) => {
  const displayedAlumni = alumniList.slice(0, 6); // Get the first six alumni from the list
  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 100,
  });
  const [animateHeading, setAnimateHeading] = React.useState(false);

  React.useEffect(() => {
    if (trigger) {
      setAnimateHeading(true);
    }
  }, [trigger]);

  let headingText;
  let headingColor;
  if (year === 2000) {
    headingText = "Faculty";
    headingColor = "grey";
  } else {
    headingText = `Team of`;
    headingColor = "grey";
  }

  let coordinatorText;
  let coordinatorColor;
  if (year === 2000) {
    coordinatorText = "Advisor";
    coordinatorColor = "white";
  } else {
    coordinatorText = year;
    coordinatorColor = "white";
  }

  return (
    <>
      <div style={{ fontFamily: "DM Sans" }}>
        <Box
          sx={{
            my: 2,
            px: 8,
            py: 4,
            fontSize: "3rem",
            backgroundColor: "black",
            display: "inline-block",
            fontFamily: "DM Sans",
            color: headingColor,
          }}
        >
          {headingText}{" "}
          <span style={{ fontWeight: 400, color: coordinatorColor }}>
            {coordinatorText}
          </span>
        </Box>
        <Grid container spacing={0.5} rowSpacing={0.25} sx={{ marginTop: "20px", marginLeft: "40px", marginBottom: "60px" }}>
          {displayedAlumni.map((alumni, index) => (
            <Grow
              key={alumni.name}
              in={trigger}
              timeout={1000 + index * 300}
              style={{ transformOrigin: "150px 168px 0" }}
            >
              <Grid item xs={4} sm={4} md={2} lg={2} xl={2}>
                <Box>
                  <AlumniCard {...alumni} />
                </Box>
              </Grid>
            </Grow>
          ))}
        </Grid>
      </div>
      {alumniList.length > 6 && (
        <Grow in={trigger} timeout={3000}>
          <Button
            component={Link}
            to={`/alumni/${year}`}
            variant="outlined"
            color="inherit"
            sx={{ bottom: '20px', left: '1414px', borderRadius: 0, fontFamily: "DM Sans", }}
          >
            See More
          </Button>
        </Grow>
      )}
    </>
  );
};

export default AlumniBatch;
