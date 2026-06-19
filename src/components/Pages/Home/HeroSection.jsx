import { Box, Grid } from "@mui/material";
import React from "react";
import HeroText from "../../HeroText";
import Background from "../../../assets/33.jpg";

const HeroSection = React.memo(() => {
	return (
		<Box
			sx={{
				height: { xs: "100vh", md: "100vh" },
				minHeight: { xs: "600px", md: "700px" },
				width: "100%",
				display: "flex",
				backgroundImage: `url(${Background})`,
				backgroundSize: "cover",
				backgroundPosition: "center",
				backgroundAttachment: { xs: "scroll", md: "fixed" },
			}}
		>
			<Grid
				container
				height="100%"
				alignItems="flex-end"
				justifyContent="center"
				sx={{
					px: { xs: 2, sm: 4, md: 10 },
					// --- CHANGE IS HERE ---
					// Increased the padding-bottom to move the text further up.
					// Old values were { xs: 4, md: 8 }.
					pb: { xs: 6, sm: 8, md: 12 }, // <-- Increased values
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