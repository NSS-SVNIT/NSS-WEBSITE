import { Box } from "@mui/material";
import React, { memo } from "react";
import "./HeroText.css";

const HeroText = memo(() => {
	return (
		<Box sx={{ flexBasis: "60%" }}>
			<div className="glass">
				<h3 className="hero-text">
					<span>NSS SVNIT</span>
				</h3>

				<p className="hero-para">
					Serving our community for a year and counting signifies the
					commitment and dedication of the National Service Scheme
					(NSS) towards making a positive impact on the community.
				</p>
			</div>
		</Box>
	);
});

export default HeroText;
