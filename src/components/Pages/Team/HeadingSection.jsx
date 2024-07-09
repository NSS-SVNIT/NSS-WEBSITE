import React from "react";
import { Typography, Grid, Slide, useScrollTrigger,useMediaQuery } from "@mui/material";

const HeadingSection = React.memo(() => {
	const isMobile = useMediaQuery("(max-width:600px)");
	const trigger = useScrollTrigger({
		disableHysteresis: true,
		threshold: 100,
	});

	return (
		<div style={{ overflowX: "hidden" }}>
			<Grid
				container
				spacing={2}
				sx={{
					marginTop: isMobile?0:"45px",
					marginLeft: isMobile?"10px":"60px",
					marginBottom:"60px",
				}}>
				<Grid item xs={isMobile?11:6} sm={6} md={5}>
					<Slide
						direction="right"
						in={true}
						timeout={500}
						mountOnEnter>
						<Typography
							variant="h2"
							fontSize={isMobile?"3rem":"70px"}
							gutterBottom
							sx={{
								marginLeft: "10px",
								marginTop: isMobile?0:"40px",
								fontWeight: "400",
								marginBottom: "-20px",
							}}>
							Meet Our
						</Typography>
					</Slide>
					<Slide
						direction="right"
						in={true}
						timeout={800}
						mountOnEnter>
						<Typography
							variant="h1"
							fontSize={isMobile?"7rem":"160px"}
							gutterBottom={isMobile?false:true}>
							Team
						</Typography>
					</Slide>
					<Slide
						direction="right"
						in={true}
						timeout={800}
						mountOnEnter>
						<Typography
							variant="subtitle2"
							gutterBottom
							style={{
								textAlign: "justify",
								fontFamily: "DM Sans",
								fontSize: "18px",
								marginRight: "20px",
							}}>
							Embark on a transformative journey with the
							extraordinary team at NSS SVNIT. Dedicated to making
							a delta change every day, we combine passion,
							expertise, and unwavering commitment. Let's create a
							better tomorrow by taking one impactful step at a
							time. Together, let's make a lasting difference and
							inspire a wave of positive transformation.
						</Typography>
					</Slide>
				</Grid>
				<Grid item xs={6} sm={6} md={6}>
					<Slide
						direction="left"
						in={true}
						timeout={1200}
						mountOnEnter>
						<img
							src="https://firebasestorage.googleapis.com/v0/b/nss-svnit.appspot.com/o/team%20page%2Fteam.jpg?alt=media&token=250a96b8-c607-44f3-a1c7-d10c7072c89f"
							alt="Right Content"
							height={isMobile?"200x":"500px"}
							style={{ borderRadius: "10px" }}
						/>
					</Slide>
				</Grid>
			</Grid>
		</div>
	);
});

export default HeadingSection;
