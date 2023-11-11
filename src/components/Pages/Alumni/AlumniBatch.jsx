import React from "react";
import { Typography, Grid, Box, Button, Grow, useScrollTrigger } from "@mui/material";
import AlumniCard from "./AlumniCard";
import { Link } from 'react-router-dom';

// Component for displaying a batch of alumni
const AlumniBatch = ({ year, alumniList }) => {
  const displayedAlumni = alumniList.slice(0, 4); // Get the first four alumni from the list
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

  return (
    <>
      <div>
        <Box
          sx={{
            marginTop: "45px",
            marginLeft: "60px",
            backgroundColor: "#e0e0e0",
            padding: "10px",
            borderRadius: "8px",
            display: "inline-block",
            boxShadow: "0 0 10px 0 rgba(0, 0, 0, 0.2)",
            justifyContent: "center",
            alignContent: "center",
            transition: "transform 0.5s ease-in-out, opacity 0.5s ease-in-out",
            transform: animateHeading ? "translateY(0)" : "translateY(20px)",
            opacity: animateHeading ? 1 : 0,
          }}
        >
          <Typography variant="h4">
            Batch of {year}
          </Typography>
        </Box>
        <Grid container spacing={1} rowSpacing={4} sx={{ marginTop: "20px", marginLeft: "60px", marginBottom: "60px" }}>
          {displayedAlumni.map((alumni, index) => (
            <Grow
              key={alumni.name}
              in={trigger}
              timeout={1000 + index * 300}
              style={{ transformOrigin: "150px 168px 0" }}
            >
              <Grid item xs={4} sm={6} md={2.8}>
                <Box>
                  <AlumniCard {...alumni} />
                </Box>
              </Grid>
            </Grow>
          ))}
        </Grid>
      </div>
      {alumniList.length > 4 && (
        <Grow in={trigger} timeout={3000}>
          <Button
            component={Link}
            to={`/alumni/${year}`}
            variant="outlined"
            color="inherit"
            sx={{ bottom: '20px', left: '1334px' }}
          >
            See More
          </Button>
        </Grow>
      )}
    </>
  );
};

export default AlumniBatch;
