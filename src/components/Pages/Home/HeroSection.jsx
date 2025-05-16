import React from "react";
import { Grid } from "@mui/material";
import HeroText from "../../HeroText";
import UpdateCard from "../../UpdateCard";
import Background from "./backgroundHeroSection.jpg";

const HeroSection = React.memo(() => {
	const isPhone = false;
	return (
		<div
			style={{
				marginTop: "-64px",
				backgroundImage: `url(${Background})`,
				height: "100vh",
				backgroundSize: "cover", // Adjust the background size property
				backgroundPosition: "center", // Center the background image
			}}>
			<Grid
				container
				lg={12}
				height="100%"
				direction={{ sm: "row"}}
				justifyContent="space-between"
				sx={{ px: {xs:3,sm:10}}}
				gap={6}
				alignItems={"center"}
				>
				<Grid item lg={7} xs={12}>
					<HeroText />
				</Grid>
				<Grid item lg={4} xs={12}>
					<UpdateCard />
				</Grid>
			</Grid>
		</div>
	);
});

export default HeroSection;
