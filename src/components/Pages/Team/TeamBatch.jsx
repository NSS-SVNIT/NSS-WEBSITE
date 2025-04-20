import React from "react";
import {
	Typography,
	Grid,
	Box,
	Button,
	Grow,
	useScrollTrigger,
	useMediaQuery,
} from "@mui/material";
import TeamCard from "./TeamCard";
import { Link } from "react-router-dom";
import { CenterFocusStrong } from "@mui/icons-material";

// Component for displaying a batch of Team
const TeamBatch = React.memo(({ year, TeamList }) => {
	const isMobile = useMediaQuery("(max-width:600px)");
	const displayedTeam = TeamList.slice(0, 6); // Get the first six Team from the list
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
		coordinatorText = "FOUNDERS";
		coordinatorColor = "white";
	} else if (year === 2003) {
		coordinatorText = "OFFICERS";
		coordinatorColor = "white";
	} else {
		coordinatorText = year;
		coordinatorColor = "white";
	}

	return (
		<>
			<div style={{ fontFamily: "DM Sans", overflowX: "hidden" }}>
				<Box
					sx={{
						mx: isMobile
							? coordinatorText === "COORDINATOR"
								? 3 //This is margin for Program Coordinator
								: coordinatorText === "OFFICERS" &&
								  headingText === "PROGRAM"
								? 6 //this is margin for Program Officers
								: 10
							: //this is margin for Founder
							coordinatorText === "COORDINATOR"
							? 50 //This is margin for Program Coordinator
							: coordinatorText === "OFFICERS" &&
							  headingText === "PROGRAM"
							? 56 //this is margin for Program Officers
							: 65, //this is margin for Founder
						my: isMobile ? 1 : 2,
						px: isMobile ? 2 : 8,
						py: 4,
						fontSize: isMobile ? "1.5rem" : "3rem",
						backgroundColor: "black",
						display: "inline-block",
						fontFamily: "DM Sans",
						color: headingColor,
						whiteSpace: "nowrap",
					}}>
					{headingText}{" "}
					<span
						style={{
							fontWeight: 400,
							color: coordinatorColor,
						}}>
						{coordinatorText}
					</span>
				</Box>
				<Grid
					container
					spacing={0.5}
					rowSpacing={0.25}
					sx={{
						marginTop: "20px",
						marginLeft:
							year === 2000 || year === 2001 || year === 2003
								? isMobile
									? "50px"
									: "auto"
								: "50px", // Center align if year is 2000 or 2001 or 2003
						marginBottom: "60px",
						justifyContent: "center",
						display: isMobile ? "flex" : "",
						flexDirection: isMobile ? "column" : "",
					}}>
					{displayedTeam.map((Team, index) => (
						<Grow
							key={Team.name}
							in={trigger}
							timeout={500 + index * 200}
							style={{ transformOrigin: "150px 168px 0" }}>
							<Grid item xs={6} sm={6} md={2} lg={2} xl={2}>
								<Box
									sx={{
										my: "10px",
										mx: isMobile ? "30px" : "-20px",
									}}>
									<TeamCard {...Team} />
								</Box>
							</Grid>
						</Grow>
					))}
				</Grid>
			</div>
			{TeamList.length > 6 && (
				<Grow in={trigger} timeout={1000}>
					<Button
						component={Link}
						to={`/team/${year}`}
						variant="outlined"
						color="inherit"
						sx={{
							bottom: "20px",
							left: isMobile ? "5%" : "1397px",
							borderRadius: 0,
							fontFamily: "DM Sans",
						}}>
						See More
					</Button>
				</Grow>
			)}
		</>
	);
});

export default TeamBatch;
