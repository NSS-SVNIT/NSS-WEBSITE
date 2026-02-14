import FormatQuoteIcon from "@mui/icons-material/FormatQuote";
import PauseIcon from "@mui/icons-material/Pause";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import {
	Avatar,
	Box,
	Card,
	Chip,
	Grid,
	IconButton,
	Stack,
	Tooltip,
	Typography,
	alpha,
	useTheme,
} from "@mui/material";
import React, { useState } from "react";
import Carousel from "react-material-ui-carousel";
import { motion } from "framer-motion";

// --- All Image Imports ---
import photo2018 from "./2018.jpg";
import photo2019 from "./2019.jpg";
import photo2020 from "./2020.jpg";
import photo2021 from "./2021.jpg";
import photo2022 from "./2022.jpg";
import founder from "./founder.jpg";

// --- Testimonial Data Array ---
const items = [
	{
		title: "Message From Our Founder",
		name: "Gulshan Rana",
		description:
			"Embrace every challenge as an opportunity to learn and grow. Our commitment to service is a powerful force for good, and it has the potential to create a lasting impact on the lives of those we serve. Each small act of kindness, every initiative we take, contributes to the greater good. Our team is our support system, and together, we can overcome any hurdle. Be open to new ideas, perspectives, and collaborations, for it is in diversity that we find our greatest strength. Stay motivated, stay passionate, and always keep the purpose of service at the forefront of our actions. Our dedication has the power to inspire others to follow in our footsteps and create a ripple effect of positive change. Carry the torch of service with pride and let it illuminate the path towards a better tomorrow.",
		imageUrl: founder,
		role: "Founder",
		year: "NSS SVNIT",
	},
	{
		title: "Message From Our Convenor Batch 2018",
		name: "Tushar Sanwarey",
		description:
			"To all the volunteers of NSS SVNIT always remember the cause you are working for i.e towards the betterment for our society and finding a better version of ourselves. Always aspire for Dreaming More! Learning More! Doing More! Becoming More",
		imageUrl: photo2018,
		role: "Convenor",
		year: "Batch 2018",
	},
	{
		title: "Message From Our Convenor Batch 2019",
		name: "Hiren Vaghela",
		description:
			"To the NSS volunteers, your commitment to service is a beacon of inspiration. In the tapestry of community, each stitch you weave contributes to a brighter, compassionate world. Embrace challenges as opportunities to sow seeds of positive change i.e the delta change as we know it. Your collective impact is immeasurable. Keep shining your light of selflessness; the world is brighter because of you.",
		imageUrl: photo2019,
		role: "Convenor",
		year: "Batch 2019",
	},
	{
		title: "Message From Our Convenor Batch 2020",
		name: "Saurav Singh",
		description:
			"To my dear family, continue to flourish and reach new pinnacles as you are currently doing. Looking at each of you dedicating yourselves to the betterment of society and those around you is truly inspiring and that's what we are always known for. Our journey from a small group to a dedicated force within a few years has been remarkable, yet there is a lot to do. Strive for transformative progress, and the outcomes will undoubtedly follow. Just Believe in yourself.",
		imageUrl: photo2020,
		role: "Convenor",
		year: "Batch 2020",
	},
	{
		title: "Message From Our Convenor Batch 2021",
		name: "Shubham Chandak",
		description:
			"Dear Readers, I hope this message finds you in the best of spirits. It is with immense gratitude that I reflect on my journey with the NSS Unit SVNIT, an organization that has truly become a second family to me. The NSS Unit SVNIT has consistently dedicated itself to community service, all while ensuring the holistic development of its volunteers. Our guiding motto, 'NOT ME BUT YOU' is a testament to the selflessness and commitment that each volunteer embodies.To the current batch of volunteers, I extend my heartfelt best wishes for your ongoing NSS activities. Your dedication and hard work continue to raise the bar and inspire all of us. Keep up the excellent work, and continue to make a difference in the community and yourselves.",
		imageUrl: photo2021,
		role: "Convenor",
		year: "Batch 2021",
	},
	{
		title: "Message From Our Convenor Batch 2022",
		name: "Shrishti Arya",
		description: `As I look back on our journey so far, I am filled with a sense of pride and appreciation for the incredible work we've done together. Each step we’ve taken, every challenge we’ve faced, and all the moments of success reflect our dedication and hard work. The NSS Unit SVNIT has been more than just an organization – it's a family that thrives on compassion, empathy, and service. Through our diverse activities and outreach programs, we've not only made a difference in the lives of many but also grown as individuals, learning leadership, teamwork, and community spirit. Our motto, "NOT ME BUT YOU," serves as a constant reminder of the selfless spirit that drives us. It’s not just a motto; it’s a way of life that we carry in every action, every programs, and every interaction. Dedication, devotion, and discipline are the three pillars on which our unit stands, together, these principles have empowered us to bring delta change, not just in the communities we serve, but also within ourselves. To the team, I offer my sincerest appreciation for the tireless efforts you all are putting to take NSS SVNIT beyond the limits. Keep Going, Keep Shining!!!`,
		imageUrl: photo2022,
		role: "Convenor",
		year: "Batch 2022",
	},
];

// --- Internal Component for a Single Carousel Slide ---
const containerVariants = {
	hidden: { opacity: 0 },
	visible: {
		opacity: 1,
		transition: { staggerChildren: 0.15, delayChildren: 0.1 },
	},
};

const itemVariants = {
	hidden: { opacity: 0, y: 20 },
	visible: {
		opacity: 1,
		y: 0,
		transition: { duration: 0.6, ease: [0.43, 0.13, 0.23, 0.96] },
	},
};

const CarouselItem = ({ item }) => {
	const theme = useTheme();

	return (
		<motion.div variants={containerVariants} initial="hidden" animate="visible" exit="hidden">
			<Grid container spacing={{ xs: 3, sm: 4, md: 6 }} alignItems="center">
				{/* Left Side: Photo and Name */}
				<Grid item xs={12} md={4}>
					<motion.div variants={itemVariants}>
						<Stack alignItems="center" spacing={{ xs: 1.5, md: 2.5 }}>
							<Avatar
								src={item.imageUrl}
								alt={`Photo of ${item.name}`}
								sx={{
									width: { xs: 120, sm: 160, md: 220 },
									height: { xs: 120, sm: 160, md: 220 },
									border: { xs: `2px solid ${theme.palette.primary.light}`, md: `3px solid ${theme.palette.primary.light}` },
									boxShadow: `0 10px 30px ${alpha(theme.palette.primary.main, 0.2)}`,
								}}
							/>
							<Box textAlign="center">
								<Typography sx={{ fontWeight: 700, color: 'text.primary', fontSize: { xs: '1.1rem', sm: '1.3rem', md: '1.5rem' } }}>
									{item.name}
								</Typography>
								<Chip
									label={`${item.role} | ${item.year}`}
									size="medium"
									sx={{
										mt: 1,
										fontWeight: 500,
										fontSize: { xs: '0.75rem', sm: '0.85rem' },
										color: 'primary.dark',
									}}
								/>
							</Box>
						</Stack>
					</motion.div>
				</Grid>

				{/* Right Side: The Message */}
				<Grid item xs={12} md={8}>
					<motion.div variants={itemVariants} style={{ position: "relative" }}>
						<FormatQuoteIcon
							sx={{
								fontSize: { xs: 90, md: 140 },
								color: theme.palette.grey[100],
								position: "absolute",
								top: { xs: -40, md: -60 },
								left: { xs: -20, md: -40 },
								zIndex: 0,
								transform: 'rotate(180deg)',
							}}
						/>
						
						{/* --- UPDATE: Fixed Height Box with Scrolling --- */}
						<Box
							sx={{
								// 1. Fix the height so the carousel doesn't jump
								height: { xs: '250px', sm: '220px', md: '280px' }, 
								
								// 2. Enable scrolling for overflow content
								overflowY: 'auto', 
								
								// 3. Add padding right to prevent text from touching scrollbar
								pr: 2, 
								
								position: "relative",
								zIndex: 1,

								// 4. Custom Scrollbar Styling (optional but recommended)
								'&::-webkit-scrollbar': {
									width: '6px',
								},
								'&::-webkit-scrollbar-track': {
									background: 'transparent',
								},
								'&::-webkit-scrollbar-thumb': {
									backgroundColor: theme.palette.grey[300],
									borderRadius: '10px',
								},
								'&::-webkit-scrollbar-thumb:hover': {
									backgroundColor: theme.palette.grey[400],
								},
							}}
						>
							<Typography
								variant="body1"
								sx={{
									textAlign: "justify",
									lineHeight: 1.8,
									color: "text.secondary",
									fontWeight: 400,
									fontSize: { xs: '1rem', md: '1.1rem' },
								}}
							>
								{item.description}
							</Typography>
						</Box>
						{/* --- End of Update --- */}
						
					</motion.div>
				</Grid>
			</Grid>
		</motion.div>
	);
};

// --- Main Exported Component ---
export default function CarouselResponsive() {
	const theme = useTheme();
	const [autoPlay, setAutoPlay] = useState(true);

	return (
		<Box sx={{
			bgcolor: alpha(theme.palette.primary.main, 0.03),
			py: { xs: 4, sm: 6, md: 10 }
		}}>
			<Stack spacing={{ xs: 1.5, md: 2 }} alignItems="center" textAlign="center" sx={{ mb: { xs: 4, md: 6 }, px: 2 }}>
				<Typography component="h2" sx={{ fontWeight: 'bold', color: 'text.primary', fontSize: { xs: '2rem', sm: '2.5rem', md: '3rem' } }}>
					Words of Wisdom
				</Typography>
				<Typography component="p" sx={{ color: 'text.secondary', maxWidth: '600px', fontWeight: 300, fontSize: { xs: '0.95rem', sm: '1rem', md: '1.1rem' } }}>
					Inspiring messages from the leaders who have shaped our journey.
				</Typography>
			</Stack>

			<Card
				elevation={0}
				sx={{
					p: { xs: 2, sm: 4, md: 5 },
					mx: "auto",
					width: { xs: "95%", sm: "90%", lg: "80%" },
					maxWidth: '1200px',
					borderRadius: 4,
					background: `linear-gradient(145deg, ${theme.palette.background.paper}, ${alpha(theme.palette.grey[100], 0.5)})`,
					overflow: "hidden",
					position: "relative",
					boxShadow: "0 20px 50px -10px rgba(0, 0, 0, 0.1)",
					border: `1px solid ${theme.palette.grey[200]}`,
				}}
			>
				<Box sx={{ position: 'absolute', top: 16, right: 16, zIndex: 10 }}>
					<Tooltip title={autoPlay ? "Pause Autoplay" : "Resume Autoplay"}>
						<IconButton onClick={() => setAutoPlay(!autoPlay)} color="primary">
							{autoPlay ? <PauseIcon /> : <PlayArrowIcon />}
						</IconButton>
					</Tooltip>
				</Box>

				<Carousel
					autoPlay={autoPlay}
					animation="slide"
					duration={700}
					interval={8000}
					navButtonsAlwaysVisible
					cycleNavigation
					// Added height prop to the Carousel itself for extra stability
					height={{xs: 500, sm: 400, md: 350}} 
					indicatorContainerProps={{ style: { marginTop: "32px" } }}
					indicatorIconButtonProps={{ style: { padding: "4px", color: theme.palette.grey[300] } }}
					activeIndicatorIconButtonProps={{ style: { color: theme.palette.primary.main } }}
					navButtonsProps={{
						style: {
							backgroundColor: alpha(theme.palette.primary.main, 0.6),
							color: "white",
							boxShadow: '0 4px 15px rgba(0,0,0,0.2)',
						},
					}}
				>
					{items.map((item, index) => (
						<CarouselItem key={index} item={item} />
					))}
				</Carousel>
			</Card>
		</Box>
	);
}