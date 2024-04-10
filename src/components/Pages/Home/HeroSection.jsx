import React from "react";
import { Grid } from "@mui/material";
import HeroText from "../../HeroText";
import UpdateCard from "../../UpdateCard";

const HeroSection = React.memo(() => {
	const isPhone = false;
	return (
		<div
			style={{
				marginTop: "-64px",
				backgroundImage: `url(https://firebasestorage.googleapis.com/v0/b/nss-svnit.appspot.com/o/aboutImages%2Fbg1.jpg?alt=media&token=b828c754-67a8-476d-8423-614817a3b1eb)`,
				height: "100vh",
				backgroundSize: "cover", // Adjust the background size property
				backgroundPosition: "center", // Center the background image
			}}>
			<Grid
				container
				lg={12}
				height="100%"
				direction="row"
				justifyContent="space-between"
				sx={{ px: 10 }}
				gap={6}
				alignItems={"center"}>
				<Grid item lg={7} sx={12}>
					<HeroText />
				</Grid>
				<Grid item lg={4} sx={12}>
					<UpdateCard />
				</Grid>
			</Grid>
		</div>
	);
});

export default HeroSection;
