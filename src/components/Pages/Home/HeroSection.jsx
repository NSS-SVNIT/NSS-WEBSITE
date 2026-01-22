import { Box, Grid } from "@mui/material";
import React from "react";
import HeroText from "../../HeroText";
import Background from "../../../assets/33.jpg";

const HeroSection = React.memo(() => {
	return (
		<Box
			sx={{
				height: "100vh",
				width: "100%",
				display: "flex",
				backgroundImage: `url(${Background})`,
				backgroundSize: "cover",
				backgroundPosition: "center",
			}}
		>
			<Grid
				container
				height="100%"
				alignItems="flex-end"
				justifyContent="center"
				sx={{
					px: { xs: 3, sm: 10 },
					// --- CHANGE IS HERE ---
					// Increased the padding-bottom to move the text further up.
					// Old values were { xs: 4, md: 8 }.
					pb: { xs: 8, md: 12 }, // <-- Increased values
				}}
			>
				<Grid item lg={12} xs={12}>
					<HeroText />
				</Grid>
			</Grid>
		</Box>
	);
});

export default HeroSection;