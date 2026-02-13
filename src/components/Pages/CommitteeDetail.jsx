import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { Box, Button, Chip, Container, Divider, Grid, Paper, Stack, Typography } from "@mui/material";
import Carousel from "react-material-ui-carousel";
import { motion } from "framer-motion";
import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import Layout from "../Layout/Layout";
import coin from "./Home/coin.gif";
import creative from "./Home/creative.gif";
import culture from "./Home/culture.gif";
import document from "./Home/document.gif";
import social from "./Home/social.gif";
import sports from "./Home/sports.gif";
import technical from "./Home/technical.gif";
import Home_1 from "../../assets/Home_1.jpg";
import Home_2 from "../../assets/Home_2.jpg";
import Home_3 from "../../assets/Home_3.png";
import Home_4 from "../../assets/Home_4.jpg";
import Home_5 from "../../assets/Home_5.jpeg";
import Home_6 from "../../assets/Home_6.jpg";
import Home_7 from "../../assets/Home_7.jpg";
import Home_8 from "../../assets/Home_8.jpg";
import Home_9 from "../../assets/Home_9.jpg";
import Home_10 from "../../assets/Home_10.jpg";
import Home_11 from "../../assets/Home_11.jpg";
import Home_12 from "../../assets/Home_12.jpg";
import Home_13 from "../../assets/Home_13.jpg";

const COMMITTEE_DETAILS = {
	technical: {
		title: "Technical",
		icon: technical,
		tagline: "Build. Learn. Solve.",
		role: "Drives technical initiatives in NSS through digital products, skill-building workshops, projects and industry exposure.",
		heroImage: Home_2,
		overview:
			"The NSS Technical Committee facilitates student engagement in engineering and technology by organizing projects, workshops, and industrial trips, promoting practical experiences to enhance technical skills and address societal challenges.",
		focus: ["NSS Website", "Workshops", "Industrial Visits", "Mini Projects", "Certificates"],
		initiatives: [
			{
				title: "NSS Website",
				description: "Builds and maintains the NSS website to showcase events, updates, and the unit’s work.",
				image: Home_1,
			},
			{
				title: "Workshops",
				description: "Conducts sessions like Git & GitHub, resume building and internship guidance to upskill volunteers.",
				image: Home_3,
			},
			{
				title: "Industrial Visit",
				description: "Organizes visits to industries for practical exposure and learning beyond the classroom.",
				image: Home_6,
			},
			{
				title: "Mini Projects",
				description: "Encourages mini-projects (Android, AI, robotics, etc.) to promote hands-on learning and innovation.",
				image: Home_7,
			},
			{
				title: "NSS Certificate",
				description: "Supports the process and structure of certificate-related work for volunteers and events.",
				image: Home_10,
			},
		],
		gallery: [Home_4, Home_5, Home_8, Home_9, Home_11, Home_12, Home_13],
		team: {
			members: [
				"Member Name",
				"Member Name",
				"Member Name",
				"Member Name",
				"Member Name",
				"Member Name",
				"Member Name",
				"Member Name",
			],
		},
		responsibilities: [
			{
				title: "NSS Website",
				description: "Builds and maintains the NSS website to showcase events, updates, and the unit’s work.",
			},
			{
				title: "Workshops",
				description: "Conducts sessions like Git & GitHub, resume building and internship guidance to upskill volunteers.",
			},
			{
				title: "Industrial Visit",
				description: "Organizes visits to industries for practical exposure and learning beyond the classroom.",
			},
			{
				title: "Mini Projects",
				description: "Encourages mini-projects (Android, AI, robotics, etc.) to promote hands-on learning and innovation.",
			},
			{
				title: "NSS Certificate",
				description: "Supports the process and structure of certificate-related work for volunteers and events.",
			},
		],
	},
	sports: {
		title: "Sports",
		icon: sports,
		tagline: "Discipline. Fitness. Team Spirit.",
		overview:
			"The NSS Sports Committee prioritizes volunteers' physical health through morning routines and organizes sporting events. It manages discipline at NSS events and trains volunteers for the NSS parade, ensuring their overall well-being.",
		focus: ["Fitness", "Events", "Parade Training"],
	},
	social: {
		title: "Social",
		icon: social,
		tagline: "Serve the community, create impact.",
		role: "Leads initiatives addressing social issues and community welfare.",
		overview:
			"The Social Committee organizes diverse events and campaigns, promoting social engagement, personal development, and community service. From orphanage visits to awareness campaigns, the committee fosters connections with other NSS units and NGOs, utilizing social media for effective communication.",
		focus: ["Community Outreach", "NGO Collaboration", "Volunteer Engagement"],
		responsibilities: [
			{
				title: "Community Outreach",
				description: "Organizes health drives, education programs, and awareness campaigns.",
			},
			{
				title: "NGO Collaboration",
				description: "Partners with NGOs and government bodies for social projects.",
			},
			{
				title: "Volunteer Engagement",
				description: "Trains and motivates volunteers for effective community service.",
			},
		],
	},
	finance: {
		title: "Finance",
		icon: coin,
		tagline: "Transparency. Planning. Accountability.",
		role: "Manages NSS finances with transparency and efficiency.",
		overview:
			"The Finance Committee handles all financial aspects, managing bills and obtaining admin approval. It educates volunteers on finance and money management, playing a crucial role in ensuring financial transparency within the NSS SVNIT Unit.",
		focus: ["Budgeting", "Approvals", "Transparency"],
		responsibilities: [
			{
				title: "Budget",
				description: "Plans and prepares budgets for events and projects.",
			},
			{
				title: "Expense Tracking",
				description: "Monitors and manages financial records.",
			},
			{
				title: "Resource Allocation",
				description: "Distributes funds to committees based on needs.",
			},
		],
	},
	documentation: {
		title: "Documentation",
		icon: document,
		tagline: "Record, report, and communicate.",
		role: "Records and reports NSS activities.",
		overview:
			"The Documentation Committee maintains detailed records of event planning, meeting minutes, and creates reports. Their meticulous documentation fosters effective communication with the faculty advisor, promoting transparency and informed decision-making within the unit.",
		focus: ["Minutes", "Reports", "Records"],
		responsibilities: [
			{
				title: "Event Documentation",
				description: "Maintains written records of events and projects.",
			},
			{
				title: "Report Creation",
				description: "Prepares detailed reports on NSS initiatives.",
			},
			{
				title: "Permissions",
				description: "Handles venue and event permissions from the college administration.",
			},
		],
	},
	creative: {
		title: "Creative",
		icon: creative,
		tagline: "Design that drives change.",
		role: "Brings innovation to NSS activities and events.",
		overview:
			"The NSS Creative Committee utilizes creative abilities for the greater good, engaging in tasks from designing posters to video editing. It channels creativity to effectively promote welfare initiatives and spread messages that resonate with the audience.",
		focus: ["Design", "Media", "Promotion"],
		responsibilities: [
			{
				title: "Content Creation",
				description: "Designs posters, banners and digital content for promotions.",
			},
			{
				title: "Social Media",
				description: "Creates engaging content to boost participation.",
			},
			{
				title: "Skills Development",
				description: "Enhances volunteers' artistic and design abilities.",
			},
		],
	},
	cultural: {
		title: "Cultural",
		icon: culture,
		tagline: "Celebrate heritage, express talent.",
		role: "Organizes and promotes cultural activities for NSS.",
		overview:
			"The NSS Cultural Committee organizes diverse cultural events, providing a platform for talent expression in music, dance, and art. It promotes and preserves cultural heritage, encouraging student participation in celebrations that showcase their cultural identity.",
		focus: ["Events", "Talent", "Heritage"],
		responsibilities: [
			{
				title: "Event Planning",
				description: "Hosts music, dance, drama, and performing arts events.",
			},
			{
				title: "Awareness & Engagement",
				description: "Manages NSS participation in cultural festivals.",
			},
			{
				title: "Talent Promotion",
				description: "Encourages volunteers to showcase their creative skills.",
			},
		],
	},
};

export default function CommitteeDetail() {
	const { slug } = useParams();
	const navigate = useNavigate();
	const initiativesRef = React.useRef(null);
	const galleryRef = React.useRef(null);
	const teamRef = React.useRef(null);
	const containerVariants = {
		hidden: { opacity: 0 },
		visible: { opacity: 1, transition: { staggerChildren: 0.08 } },
	};
	const cardVariants = {
		hidden: { opacity: 0, y: 14 },
		visible: { opacity: 1, y: 0, transition: { duration: 0.45, ease: "easeOut" } },
	};

	React.useEffect(() => {
		window.scrollTo(0, 0);
	}, [slug]);

	const data = slug ? COMMITTEE_DETAILS[slug] : undefined;
	const isTechnical = true;
	const pageSx = { py: { xs: 6, md: 10 }, bgcolor: "white" };

	const heroImage = data?.heroImage ?? Home_2;
	const initiatives =
		(data?.initiatives ?? []).length > 0
			? data.initiatives
			: (data?.focus ?? []).slice(0, 5).map((f, idx) => ({
					title: f,
					description: data?.tagline ?? "",
					image: [Home_1, Home_3, Home_6, Home_7, Home_10][idx % 5],
				}));
	const gallery =
		(data?.gallery ?? []).length > 0
			? data.gallery
			: [Home_4, Home_5, Home_8, Home_9, Home_11, Home_12, Home_13];
	const members =
		(data?.team?.members ?? []).length > 0
			? data.team.members
			: [
					"Member Name",
					"Member Name",
					"Member Name",
					"Member Name",
					"Member Name",
					"Member Name",
				];

	const scrollTo = (ref) => {
		if (!ref?.current) return;
		ref.current.scrollIntoView({ behavior: "smooth", block: "start" });
	};

	return (
		<Layout>
			<Box sx={pageSx}>
				<Container maxWidth="lg">
					<Stack spacing={3}>
						<Button
							onClick={() => navigate(-1)}
							startIcon={<ArrowBackIcon />}
							variant="text"
							sx={{
								width: "fit-content",
								color: "#5A2A7A",
								fontWeight: 700,
							}}
						>
							Back
						</Button>

						{!data ? (
							<Paper
								elevation={2}
								sx={{ p: { xs: 3, md: 5 }, borderRadius: 4 }}
							>
								<Typography
									variant="h4"
									sx={{
										fontFamily: "'Inria Sans', serif",
										fontWeight: 800,
										color: "#5A2A7A",
										mb: 1,
									}}
								>
									Committee not found
								</Typography>
								<Typography sx={{ color: "text.secondary" }}>
									Please go back and open a committee from the list.
								</Typography>
							</Paper>
						) : isTechnical ? (
							<>
								<Paper
									component={motion.div}
									initial={{ opacity: 0, y: 16 }}
									animate={{ opacity: 1, y: 0 }}
									transition={{ duration: 0.6, ease: "easeOut" }}
									elevation={2}
									sx={{ p: { xs: 3, md: 5 }, borderRadius: 4, overflow: "hidden" }}
								>
									<Grid container spacing={{ xs: 3, md: 5 }} alignItems="center">
										<Grid item xs={12} md={7}>
											<Typography
												variant="h2"
												sx={{
													fontFamily: "'Inria Sans', serif",
													fontWeight: 900,
													color: "#5A2A7A",
													fontSize: { xs: "2.4rem", md: "3.6rem" },
													lineHeight: 1.05,
												}}
											>
												{data.title}
											</Typography>
											<Typography
												sx={{
													mt: 1.5,
													color: "text.secondary",
													fontFamily: "'DM Sans', sans-serif",
													fontSize: { xs: "1rem", md: "1.1rem" },
													maxWidth: 680,
												}}
											>
												{data.overview}
											</Typography>

											<Stack direction="row" spacing={2} sx={{ mt: 3, flexWrap: "wrap" }}>
												<Button
													variant="contained"
													onClick={() => scrollTo(initiativesRef)}
													sx={{
														bgcolor: "#5A2A7A",
														fontWeight: 800,
														borderRadius: 3,
														px: 4,
														py: 1.2,
														"&:hover": { bgcolor: "#4a2265" },
													}}
												>
													INITIATIVES
												</Button>
												<Button
													variant="outlined"
													onClick={() => scrollTo(teamRef)}
													sx={{
														color: "#5A2A7A",
														borderColor: "rgba(90, 42, 122, 0.5)",
														fontWeight: 800,
														borderRadius: 3,
														px: 4,
														py: 1.2,
														"&:hover": { borderColor: "#5A2A7A", bgcolor: "rgba(90, 42, 122, 0.06)" },
													}}
												>
													TEAM
												</Button>
											</Stack>
										</Grid>

										<Grid item xs={12} md={5}>
											<motion.div
												initial={{ opacity: 0, scale: 0.96 }}
												animate={{ opacity: 1, scale: 1 }}
												transition={{ duration: 0.6, ease: "easeOut", delay: 0.08 }}
											>
												<Box
													sx={{
														width: "100%",
														height: { xs: 220, md: 320 },
													borderRadius: 4,
													overflow: "hidden",
													boxShadow: "0 18px 45px rgba(0,0,0,0.12)",
													border: "1px solid rgba(0,0,0,0.06)",
												}}
												>
													<img
														src={heroImage}
														alt={`${data.title} committee`}
														style={{ width: "100%", height: "100%", objectFit: "cover" }}
													/>
												</Box>
											</motion.div>
										</Grid>
									</Grid>
								</Paper>

								<Box ref={initiativesRef} />
								<Box sx={{ pt: 2 }}>
									<Typography
										variant="h3"
										sx={{
											fontFamily: "'Inria Sans', serif",
											fontWeight: 900,
											color: "#5A2A7A",
											fontSize: { xs: "2rem", md: "2.6rem" },
											mb: 2,
										}}
									>
										Initiatives
									</Typography>
									<Carousel
										autoPlay={false}
										animation="slide"
										duration={700}
										navButtonsAlwaysVisible
										cycleNavigation
										height={420}
									>
										{initiatives.map((item, index) => (
											<Paper
												key={index}
												elevation={2}
												sx={{
													borderRadius: 4,
													overflow: "hidden",
													background: "white",
													border: "1px solid rgba(0,0,0,0.06)",
												}}
											>
												<Grid container>
													<Grid item xs={12} md={7}>
														<Box sx={{ height: { xs: 220, md: 420 } }}>
															<img
																src={item.image}
																alt={item.title}
																style={{ width: "100%", height: "100%", objectFit: "cover" }}
															/>
														</Box>
													</Grid>
													<Grid item xs={12} md={5}>
														<Box sx={{ p: { xs: 2.5, md: 3 } }}>
															<Typography
																variant="h5"
																sx={{
																	fontFamily: "'DM Sans', sans-serif",
																	fontWeight: 900,
																	color: "#0d1b2a",
																	mb: 1,
																}}
															>
																{item.title}
															</Typography>
															<Typography sx={{ color: "text.secondary" }}>
																{item.description}
															</Typography>
														</Box>
													</Grid>
												</Grid>
											</Paper>
										))}
									</Carousel>
								</Box>

								<Box ref={galleryRef} />
								<Box sx={{ pt: 3 }}>
									<Typography
										variant="h3"
										sx={{
											fontFamily: "'Inria Sans', serif",
											fontWeight: 900,
											color: "#5A2A7A",
											fontSize: { xs: "2rem", md: "2.6rem" },
											mb: 2,
										}}
									>
										Gallery
									</Typography>
									<Carousel
										autoPlay={false}
										animation="slide"
										duration={650}
										navButtonsAlwaysVisible
										cycleNavigation
										height={420}
									>
										{gallery.map((img, idx) => (
											<Box
												key={idx}
												sx={{
													borderRadius: 4,
													overflow: "hidden",
													border: "1px solid rgba(0,0,0,0.06)",
													boxShadow: "0 18px 45px rgba(0,0,0,0.10)",
												}}
											>
												<img
													src={img}
													alt={`Gallery ${idx + 1}`}
													style={{ width: "100%", height: 420, objectFit: "cover", display: "block" }}
												/>
											</Box>
										))}
									</Carousel>
								</Box>

								<Box ref={teamRef} />
								<Box sx={{ pt: 3 }}>
									<Typography
										variant="h3"
										sx={{
											fontFamily: "'Inria Sans', serif",
											fontWeight: 900,
											color: "#5A2A7A",
											fontSize: { xs: "2rem", md: "2.6rem" },
											mb: 2,
										}}
									>
										Our Team
									</Typography>
									<Paper elevation={2} sx={{ p: { xs: 3, md: 4 }, borderRadius: 4 }}>
										<Typography
											textAlign="center"
											sx={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 900, color: "#5A2A7A", mb: 2 }}
										>
											Committee Members
										</Typography>
										<Grid container spacing={2}>
											{members.map((name, i) => (
												<Grid item xs={12} sm={6} md={4} key={`${name}-${i}`}>
													<Paper
														elevation={0}
														sx={{
															p: 1.5,
															borderRadius: 3,
															border: "1px solid rgba(90, 42, 122, 0.16)",
															bgcolor: "rgba(90, 42, 122, 0.04)",
														}}
													>
														<Typography sx={{ fontWeight: 800, textAlign: "center" }}>{name}</Typography>
													</Paper>
												</Grid>
											))}
										</Grid>
									</Paper>
								</Box>
							</>
						) : (
							<>
								<Paper
									component={motion.div}
									initial={{ opacity: 0, y: 16 }}
									animate={{ opacity: 1, y: 0 }}
									transition={{ duration: 0.6, ease: "easeOut" }}
									elevation={2}
									sx={{
										p: { xs: 3, md: 5 },
										borderRadius: 4,
										overflow: "hidden",
										position: "relative",
									}}
								>
									<Box
										sx={{
											position: "absolute",
											inset: 0,
											background:
												"radial-gradient(800px 200px at 20% 0%, rgba(90, 42, 122, 0.12), transparent 70%)",
											pointerEvents: "none",
										}}
									/>

									<Stack
										direction={{ xs: "column", md: "row" }}
										spacing={3}
										alignItems={{ xs: "flex-start", md: "center" }}
										sx={{ position: "relative" }}
									>
										<Box
											sx={{
												width: { xs: 110, md: 140 },
												height: { xs: 110, md: 140 },
												display: "flex",
												alignItems: "center",
												justifyContent: "center",
												borderRadius: 3,
												bgcolor: "rgba(255,255,255,0.7)",
												boxShadow: "0 10px 24px rgba(0,0,0,0.08)",
											}}
										>
											<img
												src={data.icon}
												alt={`${data.title} icon`}
												style={{ maxWidth: "75%", maxHeight: "75%" }}
											/>
										</Box>

										<Box sx={{ flex: 1 }}>
											<Typography
												variant="h2"
												sx={{
													fontFamily: "'Inria Sans', serif",
													fontWeight: 800,
													color: "#5A2A7A",
													fontSize: { xs: "2.2rem", md: "3.2rem" },
													lineHeight: 1.1,
												}}
											>
												{data.title} Committee
											</Typography>
											<Typography
												sx={{
													mt: 1,
													color: "text.secondary",
													fontFamily: "'DM Sans', sans-serif",
													fontSize: { xs: "1rem", md: "1.15rem" },
												}}
											>
												{data.tagline}
											</Typography>

											<Stack direction="row" spacing={1} sx={{ mt: 2, flexWrap: "wrap" }}>
												{data.focus.map((f) => (
													<Chip
														key={f}
														label={f}
														size="small"
														sx={{
															bgcolor: "rgba(90, 42, 122, 0.08)",
															color: "#5A2A7A",
															fontWeight: 700,
															mb: 1,
														}}
													/>
												))}
											</Stack>
										</Box>
									</Stack>
								</Paper>

								<Paper
									component={motion.div}
									initial={{ opacity: 0, y: 16 }}
									animate={{ opacity: 1, y: 0 }}
									transition={{ duration: 0.6, ease: "easeOut", delay: 0.08 }}
									elevation={2}
									sx={{ p: { xs: 3, md: 5 }, borderRadius: 4 }}
								>
									<Typography
										variant="h4"
										sx={{
											fontFamily: "'Inria Sans', serif",
											fontWeight: 800,
											color: "#5A2A7A",
											mb: 1.5,
										}}
									>
										Overview
									</Typography>
									<Divider sx={{ mb: 2 }} />
									<Typography sx={{ textAlign: "justify" }}>
										{data.overview}
									</Typography>

									<Box sx={{ mt: 4 }}>
										<Typography
											variant="h4"
											sx={{
												fontFamily: "'Inria Sans', serif",
												fontWeight: 800,
												color: "#5A2A7A",
												mb: 1.5,
											}}
										>
											Role & Responsibilities
										</Typography>
										<Divider sx={{ mb: 2 }} />
										<Typography
											sx={{
												fontFamily: "'DM Sans', sans-serif",
												fontWeight: 700,
												mb: 3,
											}}
										>
											{data.role ?? ""}
										</Typography>

										<Grid
											container
											spacing={2}
											component={motion.div}
											variants={containerVariants}
											initial="hidden"
											whileInView="visible"
											viewport={{ once: true, amount: 0.2 }}
										>
											{(data.responsibilities ?? []).length === 0 ? (
												<Grid item xs={12}>
													<Typography sx={{ color: "text.secondary" }}>
														More details will be added soon.
													</Typography>
												</Grid>
											) : (
												(data.responsibilities ?? []).map((r, idx) => (
													<Grid item xs={12} sm={6} md={4} key={`${r.title}-${idx}`}>
														<Paper
															component={motion.div}
															variants={cardVariants}
															whileHover={{ y: -6 }}
															transition={{ duration: 0.2 }}
															elevation={0}
															sx={{
																p: 2.5,
																borderRadius: 3,
																border: "1px solid rgba(90, 42, 122, 0.18)",
																background:
																	"linear-gradient(180deg, rgba(255,255,255,0.95) 0%, rgba(90, 42, 122, 0.06) 100%)",
																height: "100%",
															}}
														>
															<Stack direction="row" spacing={1.5} alignItems="flex-start">
																<Box
																	sx={{
																	width: 34,
																	height: 34,
																	borderRadius: 99,
																	bgcolor: "rgba(90, 42, 122, 0.14)",
																	color: "#5A2A7A",
																	fontWeight: 900,
																	display: "flex",
																	alignItems: "center",
																	justifyContent: "center",
																	flexShrink: 0,
																}}
																>
																	{idx + 1}
																</Box>

																<Box>
																	<Typography
																		variant="h6"
																		sx={{
																			fontFamily: "'DM Sans', sans-serif",
																			fontWeight: 900,
																			color: "#0d1b2a",
																			mb: 0.5,
																		}}
																	>
																		{r.title}
																	</Typography>
																	<Typography sx={{ color: "text.secondary" }}>
																		{r.description}
																	</Typography>
																</Box>
															</Stack>
														</Paper>
													</Grid>
												))
											)
											}
										</Grid>
									</Box>
								</Paper>
							</>
						)}
					</Stack>
				</Container>
			</Box>
		</Layout>
	);
}
