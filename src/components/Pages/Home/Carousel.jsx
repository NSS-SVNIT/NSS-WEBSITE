import FormatQuoteIcon from "@mui/icons-material/FormatQuote";
import NavigateBeforeIcon from "@mui/icons-material/NavigateBefore";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import PauseIcon from "@mui/icons-material/Pause";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import {
	Avatar,
	Box,
	Card,
	Chip,
	Fade,
	IconButton,
	Paper,
	Stack,
	Tooltip,
	Typography,
	useMediaQuery,
	useTheme,
} from "@mui/material";
import React, { useRef, useState } from "react";
import Carousel from "react-material-ui-carousel";
import photo2018 from "./2018.jpg";
import photo2019 from "./2019.jpg";
import photo2020 from "./2020.jpg";
import founder from "./founder.jpg";

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
		imageUrl:
			"https://firebasestorage.googleapis.com/v0/b/nss-svnit.appspot.com/o/team%20page%2F2021%2FShubham.jpg?alt=media&token=162ebe8b-3068-46ba-861a-f98823c12647",
		role: "Convenor",
		year: "Batch 2021",
	},
];

// Custom Navigation Button component for better accessibility
const NavButton = ({ direction, onClick, label }) => {
	const Icon = direction === "next" ? NavigateNextIcon : NavigateBeforeIcon;
	return (
		<IconButton
			onClick={onClick}
			aria-label={label}
			color="primary"
			sx={{
				position: "absolute",
				[direction === "next" ? "right" : "left"]: { xs: 4, sm: 16 },
				top: "50%",
				transform: "translateY(-50%)",
				backgroundColor: "rgba(255, 255, 255, 0.7)",
				"&:hover": {
					backgroundColor: "rgba(255, 255, 255, 0.9)",
					transform: "translateY(-50%) scale(1.1)",
				},
				zIndex: 2,
				transition: "all 0.3s ease",
			}}>
			<Icon fontSize="medium" />
		</IconButton>
	);
};

export default function CarouselResponsive() {
	const theme = useTheme();
	const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
	const isTablet = useMediaQuery(theme.breakpoints.between("sm", "md"));
	const [autoPlay, setAutoPlay] = useState(true);
	const [activeStep, setActiveStep] = useState(0);
	const [touchStartY, setTouchStartY] = useState(null);
	const contentRefs = useRef(
		Array(5)
			.fill(null)
			.map(() => React.createRef())
	);
	const [isScrolling, setIsScrolling] = useState(false);

	// Handle pause/play toggle
	const handlePlayPauseToggle = () => {
		setAutoPlay(!autoPlay);
	};

	// Track the active step when it changes
	const handleChange = (now) => {
		setActiveStep(now);
	};

	// Touch handlers to differentiate between scrolling and swiping
	const handleTouchStart = (e, index) => {
		// Save the initial touch position
		setTouchStartY(e.touches[0].clientY);
		setIsScrolling(false);
	};

	const handleTouchMove = (e, index) => {
		if (!touchStartY) return;

		const currentY = e.touches[0].clientY;
		const deltaY = Math.abs(currentY - touchStartY);

		// If vertical movement is significant, mark as scrolling
		if (deltaY > 10) {
			setIsScrolling(true);
		}
	};

	return (
		<Card
			elevation={3}
			sx={{
				p: { xs: 2, sm: 3 },
				m: { xs: "16px auto", sm: "32px auto" },
				width: { xs: "95%", sm: "90%", md: "80%", lg: "70%" },
				height: { xs: "auto" },
				minHeight: { xs: "50vh", sm: "50vh" },
				maxHeight: { xs: "none", sm: "none", md: "none" },
				borderRadius: 3,
				bgcolor: "background.paper",
				overflow: "visible",
				display: "flex",
				flexDirection: "column",
				position: "relative",
				boxShadow: "0 8px 24px rgba(0, 0, 0, 0.12)",
			}}
			component="section"
			aria-label="Messages from NSS leadership">
			<Box
				sx={{
					display: "flex",
					justifyContent: "space-between",
					alignItems: "center",
					mb: 2,
				}}>
				<Typography
					variant="h5"
					component="h2"
					textAlign="center"
					sx={{
						flex: 1,
						fontWeight: 700,
						color: theme.palette.primary.main,
						borderBottom: `2px solid ${theme.palette.primary.light}`,
						paddingBottom: 1,
					}}>
					Words of Wisdom
				</Typography>

				<Tooltip title={autoPlay ? "Pause" : "Play"}>
					<IconButton
						onClick={handlePlayPauseToggle}
						color="primary"
						aria-label={
							autoPlay ? "Pause carousel" : "Play carousel"
						}
						sx={{
							ml: 2,
							backgroundColor: "rgba(0, 0, 0, 0.04)",
							"&:hover": {
								backgroundColor: "rgba(0, 0, 0, 0.08)",
							},
						}}>
						{autoPlay ? <PauseIcon /> : <PlayArrowIcon />}
					</IconButton>
				</Tooltip>
			</Box>

			<Carousel
				autoPlay={autoPlay}
				animation="fade"
				duration={1000}
				interval={15000}
				swipe={!isMobile} // Disable swipe on mobile devices
				navButtonsAlwaysVisible
				indicators={true}
				cycleNavigation
				fullHeightHover
				onChange={handleChange}
				index={activeStep}
				stopAutoPlayOnHover
				navButtonsProps={{
					style: {
						display: "none", // Hide default buttons, we'll use our custom ones
					},
				}}
				indicatorContainerProps={{
					style: {
						marginTop: "16px",
						textAlign: "center",
					},
				}}
				indicatorIconButtonProps={{
					style: {
						padding: "3px",
						margin: "0 4px",
						color: theme.palette.grey[400],
					},
				}}
				activeIndicatorIconButtonProps={{
					style: {
						color: theme.palette.primary.main,
					},
				}}
				NextIcon={<NavButton direction="next" label="Next message" />}
				PrevIcon={
					<NavButton direction="prev" label="Previous message" />
				}>
				{items.map((item, index) => {
					const isLong = item.description.length > 300;

					return (
						<Paper
							elevation={0}
							key={index}
							sx={{
								display: "flex",
								flexDirection: { xs: "column", md: "row" },
								alignItems: { xs: "center", md: "flex-start" },
								textAlign: { xs: "center", md: "left" },
								overflow: "visible",
								height: "100%",
								backgroundColor: "transparent",
								pb: 4,
							}}>
							{/* Left side - Person Info */}
							<Box
								sx={{
									flexShrink: 0,
									p: { xs: 1, sm: 2 },
									display: "flex",
									flexDirection: "column",
									justifyContent: "center",
									alignItems: "center",
									width: { xs: "100%", md: "30%" },
								}}>
								<Avatar
									src={item.imageUrl}
									alt={`Photo of ${item.name}`}
									variant="rounded"
									sx={{
										width: { xs: 130, sm: 160, md: 180 },
										height: { xs: 130, sm: 160, md: 180 },
										mb: 2,
										boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
										border: `3px solid ${theme.palette.primary.light}`,
										transition: "transform 0.3s ease",
										"&:hover": {
											transform: "scale(1.05)",
										},
									}}
								/>
								<Typography
									variant={
										isMobile ? "h6" : isTablet ? "h5" : "h4"
									}
									component="h3"
									sx={{ fontWeight: 700 }}>
									{item.name}
								</Typography>

								<Chip
									label={`${item.role} | ${item.year}`}
									color="primary"
									size={isMobile ? "small" : "medium"}
									sx={{ mt: 1 }}
								/>
							</Box>

							{/* Right side - Message */}
							<Box
								sx={{
									flex: 1,
									p: { xs: 1, sm: 2, md: 3 },
									position: "relative",
									width: { xs: "100%", md: "70%" },
									display: "flex",
									flexDirection: "column",
									justifyContent: "center",
									mt: { xs: 2, md: 0 },
								}}>
								<FormatQuoteIcon
									sx={{
										fontSize: { xs: 30, sm: 40 },
										opacity: 0.2,
										color: theme.palette.primary.main,
										position: "absolute",
										top: 0,
										left: 0,
									}}
								/>

								<Fade in={true} timeout={1000}>
									<Stack
										ref={(el) =>
											(contentRefs.current[index] = el)
										}
										onTouchStart={
											isMobile
												? (e) =>
														handleTouchStart(
															e,
															index
														)
												: undefined
										}
										onTouchMove={
											isMobile
												? (e) =>
														handleTouchMove(
															e,
															index
														)
												: undefined
										}
										spacing={2}
										className="scrollable-content"
										sx={{
											maxHeight: {
												xs: "40vh",
												sm: "40vh",
												md: "40vh",
											},
											overflowY: "auto",
											pr: 1,
											pl: { xs: 0, md: 2 },
											pt: { xs: 3, md: 2 },
											pb: 2,
											WebkitOverflowScrolling: "touch", // Enable momentum scrolling on iOS
											touchAction: "pan-y", // Allow vertical scrolling
											"&::-webkit-scrollbar": {
												width: "6px",
												borderRadius: "8px",
											},
											"&::-webkit-scrollbar-thumb": {
												backgroundColor:
													theme.palette.primary.light,
												borderRadius: "8px",
											},
											"&::-webkit-scrollbar-track": {
												backgroundColor:
													"rgba(0,0,0,0.05)",
												borderRadius: "8px",
											},
										}}>
										<Box
											className="message-content"
											sx={{
												backgroundColor:
													"rgba(0, 0, 0, 0.02)",
												borderRadius: 2,
												p: 2,
												borderLeft: `4px solid ${theme.palette.primary.light}`,
												position: "relative", // Added to ensure proper containment
											}}>
											<Typography
												variant={
													isMobile ? "body2" : "body1"
												}
												textAlign={"justify"}
												sx={{
													lineHeight: 1.7,
													fontStyle: "italic",
													color: theme.palette.text
														.primary,
												}}>
												{item.description}
											</Typography>
										</Box>
									</Stack>
								</Fade>
							</Box>
						</Paper>
					);
				})}
			</Carousel>

			{isMobile && (
				<Box
					sx={{
						width: "100%",
						textAlign: "center",
						mt: 1,
						color: "text.secondary",
						fontSize: "0.75rem",
					}}>
					<Typography variant="caption">
						Tap the navigation arrows to change slides
					</Typography>
				</Box>
			)}
		</Card>
	);
}
