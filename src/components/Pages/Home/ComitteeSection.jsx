import React from "react";
import { Stack, Box, Grid, useMediaQuery } from "@mui/material";
import ComitteeCard from "./CommitteeCard";
import { motion } from "framer-motion";
import AboutCommittee from "./AboutCommittee";

const ComitteeSection = React.memo(() => {
	const isMobile = useMediaQuery("(max-width:900px)");
	return (
		<Stack>
			<Box
				sx={{
					fontFamily: "Inria Sans",
					fontSize: isMobile?"3rem":"4rem",
					px: isMobile?0:8,
					textAlign: "center",
					m: isMobile?2:5,
					pl: isMobile?0:"15px",
					pr: isMobile?0:"40px",
				}}>
				About Our Committees
			</Box>
			<Grid
				container
				direction="row"
				justifyContent="center"
				alignItems="center"
				spacing={2}
				sx={{ px: 8, py: 6 }}>
				<AboutCommittee />
			</Grid>
		</Stack>
	);
});

export default ComitteeSection;
