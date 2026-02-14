import { Grid, Slide, Typography, Box, Fade } from "@mui/material";
import React from "react";

// A new component for a subtle, animated background element.
const BackgroundBlob = () => (
	<Fade in={true} timeout={2000}>
		<Box
			sx={{
				position: 'absolute',
				top: '50%',
				left: '25%',
				width: { xs: 300, md: 700 },
				height: { xs: 300, md: 700 },
				// A soft radial gradient using our new color palette
				background: 'radial-gradient(circle, rgba(0, 180, 216, 0.1) 0%, rgba(0, 180, 216, 0) 70%)',
				transform: 'translate(-50%, -50%)',
				zIndex: -1, // Places it behind all other content
				filter: 'blur(80px)', // Creates the soft, blurry effect
			}}
		/>
	</Fade>
);

// The image is enhanced with an interactive hover effect and a new entry animation.
const HeroImage = () => (
	<Box
		component="img"
		src="https://res.cloudinary.com/dh0zqs0nw/image/upload/v1771061624/team_gokc1o.jpg"
		alt="NSS Team"
		sx={{
			width: '100%',
			height: 'auto',
			borderRadius: '24px',
			objectFit: 'cover',
			maxHeight: { xs: 380, md: 580 },
			// A colored shadow matching our new theme for a professional 'lifted' look
			boxShadow: '0 20px 40px -10px rgba(0, 119, 182, 0.4)',
			// The interactive hover effect!
			transition: 'transform 0.4s ease-in-out, box-shadow 0.4s ease-in-out',
			'&:hover': {
				transform: 'scale(1.03) translateY(-10px)',
				boxShadow: '0 30px 50px -15px rgba(0, 119, 182, 0.5)',
			},
		}}
	/>
);

const HeadingSection = React.memo(() => {
	return (
		// The main container needs position: 'relative' for the blob to be positioned correctly.
		<Box sx={{ position: 'relative', overflow: 'hidden', py: { xs: 6, md: 10 } }}>
			<BackgroundBlob />
			<Grid container spacing={{ xs: 4, md: 2 }} alignItems="center" justifyContent="center">
				{/* Text Content Column */}
				<Grid item xs={12} md={6} sx={{ order: { xs: 2, md: 1 }, textAlign: { xs: 'center', md: 'left' } }}>
					<Box sx={{ px: { xs: 3, md: 0 }, pl: { md: 10 } }}>
						<Slide direction="right" in={true} timeout={500} mountOnEnter>
							<Typography
								variant="h2"
								sx={{
									fontSize: { xs: "2.5rem", md: "4rem" },
									fontWeight: 300,
									color: 'text.secondary', // Softer color to make the main title pop
								}}
							>
								Meet Our
							</Typography>
						</Slide>

						<Slide direction="right" in={true} timeout={700} mountOnEnter>
							<Typography
								variant="h1"
								sx={{
									fontSize: { xs: "5.5rem", sm: "7rem", md: "9.5rem" },
									fontWeight: 800, // Bolder for more impact
									lineHeight: 1,
									// A beautiful new blue/teal gradient
									background: 'linear-gradient(45deg, #0077B6 30%, #00B4D8 90%)',
									WebkitBackgroundClip: 'text',
									WebkitTextFillColor: 'transparent',
									mb: 4,
								}}
							>
								Team
							</Typography>
						</Slide>

						<Fade in={true} timeout={1200} mountOnEnter>
							<Typography
								variant="body1"
								sx={{
									textAlign: 'justify',
									fontFamily: "DM Sans, sans-serif",
									fontSize: { xs: '1rem', md: '1.125rem' },
									lineHeight: 1.7,
									maxWidth: '520px',
									mx: { xs: 'auto', md: 0 },
									color: 'text.primary',
								}}
							>
								Embark on a transformative journey with the extraordinary team
								at NSS SVNIT. Dedicated to making a delta change every day, we
								combine passion, expertise, and unwavering commitment to create a
								better tomorrow, one impactful step at a time.
							</Typography>
						</Fade>
					</Box>
				</Grid>

				{/* Image Column */}
				<Grid item xs={11} sm={8} md={5} sx={{ order: { xs: 1, md: 2 } }}>
					{/* New animation combo: Fades in while sliding up */}
					<Fade in={true} timeout={1000}>
						<Slide direction="up" in={true} timeout={1000} mountOnEnter>
							<div>
								<HeroImage />
							</div>
						</Slide>
					</Fade>
				</Grid>
			</Grid>
		</Box>
	);
});

export default HeadingSection;