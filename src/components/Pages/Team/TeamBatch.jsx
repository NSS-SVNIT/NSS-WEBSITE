import React from "react";
import {
  Grid,
  Box,
  Button,
  Grow,
  useScrollTrigger,
  useMediaQuery,
} from "@mui/material";
import TeamCard from "./TeamCard";
import { Link } from "react-router-dom";

const TeamBatch = React.memo(({ year, TeamList }) => {
  const isMobile = useMediaQuery("(max-width:600px)");
  const isTablet = useMediaQuery("(max-width:900px)");
  const displayedTeam = TeamList.slice(0, 6);
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
		headingText = "PROGRAM";
		headingColor = "grey";
	} else if (year === 2001) {
		headingText = "OUR";
		headingColor = "grey";
	} else if (year === 2002) {
		headingText = "CO -";
		headingColor = "grey";
	} else if (year === 2003) {
		headingText = "PROGRAM";
		headingColor = "grey";
	} else {
		headingText = `TEAM OF`;
		headingColor = "grey";
	}

	let coordinatorText;
	let coordinatorColor;
	if (year === 2000) {
		coordinatorText = "COORDINATOR";
		coordinatorColor = "white";
	} else if (year === 2001) {
		coordinatorText = "FOUNDER";
		coordinatorColor = "white";
	} else if (year === 2002) {
		coordinatorText = "CO-FOUNDERS";
		coordinatorColor = "white";
	} else if (year === 2003) {
		coordinatorText = "OFFICERS";
		coordinatorColor = "white";
	} else {
		coordinatorText = year;
		coordinatorColor = "white";
	}

	
	return (
		<Box 
		  sx={{ 
			width: '100%',
			display: 'flex',
			flexDirection: 'column',
			alignItems: 'center',
			px: { xs: 2, sm: 4, md: 6 },
			py: { xs: 2, sm: 3, md: 4 }
		  }}
		>
		  <Box 
			sx={{
			  width: '100%',
			  display: 'flex',
			  justifyContent: 'center',
			  mb: { xs: 4, sm: 5, md: 6 }
			}}
		  >
			<Box
			  sx={{
				px: { xs: 3, sm: 4, md: 6 },
				py: { xs: 2, sm: 3, md: 4 },
				fontSize: { xs: "1.5rem", sm: "2rem", md: "3rem" },
				backgroundColor: "black",
				color: headingColor,
				fontFamily: "DM Sans",
				whiteSpace: "nowrap",
				textAlign: "center"
			  }}
			>
			  {headingText}{" "}
			  <span style={{ fontWeight: 400, color: coordinatorColor }}>
				{coordinatorText}
			  </span>
			</Box>
		  </Box>
	
		  <Grid
			container
			spacing={{ xs: 2, sm: 3, md: 4 }}
			sx={{
			  maxWidth: '1600px',
			  justifyContent: "center",
			  mb: 4,
			  mx: 'auto'
			}}
		  >
			{displayedTeam.map((Team, index) => (
			  <Grid 
				item 
				key={Team.name}
				xs={12}
				sm={6}
				md={4}
				lg={2}
				sx={{
				  display: 'flex',
				  justifyContent: 'center'
				}}
			  >
				<Grow
				  in={trigger}
				  timeout={500 + index * 200}
				>
				  <div>
					<TeamCard {...Team} />
				  </div>
				</Grow>
			  </Grid>
			))}
		  </Grid>
		

		  {TeamList.length > 6 && (
			<Box sx={{ display: 'flex', justifyContent: 'center', mb: 4 }}>
			  <Grow in={trigger} timeout={1000}>
				<Button
				  component={Link}
				  to={`/team/${year}`}
				  variant="outlined"
				  color="inherit"
				  sx={{
					borderRadius: 0,
					fontFamily: "DM Sans",
				  }}
				>
				  See More
				</Button>
			  </Grow>
			</Box>
		  )}
		</Box>
	  );
	});

export default TeamBatch;