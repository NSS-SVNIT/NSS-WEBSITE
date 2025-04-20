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

// Component for displaying a batch of Team
const TeamBatch = React.memo(({ year, TeamList }) => {
	const isMobile = useMediaQuery("(max-width:600px)");
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
	if (year === 2000) headingText = "PROGRAM";
	else if (year === 2001) headingText = "OUR";
	else if (year === 2002) headingText = "CO -";
	else if (year === 2003) headingText = "PROGRAM";
	else headingText = "TEAM OF";
	headingColor = "grey";

	let coordinatorText;
	let coordinatorColor = "white";
	if (year === 2000) coordinatorText = "COORDINATOR";
	else if (year === 2001) coordinatorText = "FOUNDER";
	else if (year === 2002) coordinatorText = "FOUNDERS";
	else if (year === 2003) coordinatorText = "OFFICERS";
	else coordinatorText = year;

	return (
		<>
			<div style={{ fontFamily: "DM Sans", overflowX: "hidden" }}>
				<Box sx={{ textAlign: "center", mb: { xs: 3, md: 6 } }}>
					<Box
						sx={{
							mx: isMobile ? 0 : 8,
							my: isMobile ? 0 : 2,
							px: isMobile ? 4 : 8,
							py: 4,
							fontSize: isMobile ? "2rem" : "3rem",
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
				</Box>

				<Grid
					container
					spacing={2}
					justifyContent="center"
					sx={{
						mt: 3,
						mb: 6,
					}}>
					{displayedTeam.map((Team, index) => (
						<Grow
							key={Team.name}
							in={trigger}
							timeout={500 + index * 200}
							style={{ transformOrigin: "center bottom" }}>
							<Grid
								item
								xs={12}
								sm={6}
								md={3}
								lg={2}
								sx={{
									display: "flex",
									justifyContent: "center",
								}}>
								<Box sx={{ my: 1 }}>
									<TeamCard {...Team} />
								</Box>
							</Grid>
						</Grow>
					))}
				</Grid>
			</div>
			{TeamList.length > 6 && (
				<Grow in={trigger} timeout={1000}>
					<Box
						sx={{
							display: "flex",
							justifyContent: "center",
							mb: 4,
						}}>
						<Button
							component={Link}
							to={`/team/${year}`}
							variant="outlined"
							color="inherit"
							sx={{
								borderRadius: 0,
								fontFamily: "DM Sans",
								px: 4,
								py: 1.5,
							}}>
							See More
						</Button>
					</Box>
				</Grow>
			)}
		</>
	);
});

export default TeamBatch;
