import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getStorage, ref, getDownloadURL } from "firebase/storage";
import { motion } from "framer-motion";

// MUI Components
import {
	Typography,
	Box,
	Grid,
	Button,
	Container,
	Paper,
	styled,
} from "@mui/material";
import {
	TrackChanges as TrackChangesIcon,
	Visibility as VisibilityIcon,
} from "@mui/icons-material";

// Local Components
import Layout from "../Layout/Layout";
import ComitteeSection from "./Home/ComitteeSection";
import DutySection from "./Home/DutySection";

// Styled Components for a cleaner and more reusable approach
const PageContainer = styled("div")(({ theme }) => ({
	background: " linear-gradient(180deg, #f5faff 0%, #eef6ff 100%)",
	overflow: "hidden", // Prevents horizontal scroll on the main container
}));

const HeroSection = styled(Box)(({ theme }) => ({
	textAlign: "center",
	padding: theme.spacing(12, 2, 8),
	[theme.breakpoints.down("sm")]: {
		padding: theme.spacing(8, 2, 6),
	},
}));

const InfoCard = styled(Paper)(({ theme }) => ({
	padding: theme.spacing(4),
	textAlign: "justify",
	borderRadius: theme.shape.borderRadius * 2,
	background: "#ffffff",
	border: "1px solid #e0cce0",
	boxShadow: "0px 8px 24px rgba(149, 157, 165, 0.1)",
	height: "100%",
}));

const HistoryImageCircle = styled(Box)(({ theme }) => ({
	position: "relative",
	width: "100%",
	paddingTop: "100%", // Creates a perfect circle aspect ratio
	borderRadius: "50%",
	background: "linear-gradient(145deg, #ffe0ff, #f8c7f8)",
	boxShadow: "0px 20px 40px -10px rgba(204, 153, 204, 0.5)",
	display: "flex",
	alignItems: "center",
	justifyContent: "center",
	[theme.breakpoints.down("md")]: {
		width: "70%",
		paddingTop: "70%",
		margin: "auto",
		marginTop: theme.spacing(4),
	},
	[theme.breakpoints.down("sm")]: {
		width: "80%",
		paddingTop: "80%",
	},
}));

// Framer Motion Variants
const sectionVariants = {
	hidden: { opacity: 0, y: 50 },
	visible: {
		opacity: 1,
		y: 0,
		transition: {
			duration: 0.7,
			ease: "easeOut",
		},
	},
};

const About = () => {
	const [imageUrl, setImageUrl] = useState("");

	// Scroll to top on mount
	useEffect(() => {
		window.scrollTo(0, 0);
	}, []);

	// Fetch image from Firebase
	useEffect(() => {
		const fetchImage = async () => {
			try {
				const storage = getStorage();
				const reference = ref(storage, "aboutImages/nss_logo.jpg");
				const url = await getDownloadURL(reference);
				setImageUrl(url);
			} catch (error) {
				console.error("Error fetching image from Firebase:", error);
				// Optionally set a placeholder image URL
			}
		};
		fetchImage();
	}, []);

	return (
		<Layout>
			<PageContainer>
				<Container maxWidth="lg">
					{/* HERO SECTION */}
					<HeroSection
						component={motion.div}
						initial={{ opacity: 0, y: -50 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.8 }}>
						<Typography
							variant="h1"
							component="h1"
							sx={{
								fontFamily: "'Inria Sans', serif",
								fontWeight: 700,
								color: "#4a0e4a",
								fontSize: { xs: "3rem", sm: "4.5rem", md: "6rem" },
							}}>
							ABOUT NSS SVNIT
						</Typography>
						<Typography
							variant="h6"
							color="text.secondary"
							sx={{
								mt: 2,
								maxWidth: "700px",
								mx: "auto",
								fontFamily: "'DM Sans', sans-serif",
							}}>
							Dedicated to community service, social welfare, and fostering responsible citizenship.
						</Typography>
					</HeroSection>

					{/* ABOUT NSS SVNIT SECTION */}
					<motion.div
						variants={sectionVariants}
						initial="hidden"
						whileInView="visible"
						viewport={{ once: true }}>
						<InfoCard elevation={0}>
							<Typography
								variant="body1"
								sx={{ fontFamily: "'DM Sans', sans-serif", fontSize: "1.1rem" }}>
								NSS Unit SVNIT has been trying to realise its aim of
								bringing the community along with it to prosperity in a
								rising India. Comprehensive and long-term development
								models have always been prioritised by NSS Unit SVNIT,
								which is composed of motivated volunteers who are
								expertly advised by eminent professors. NSS aims to
								instill service values in students in addition to its
								core objective of community development. This will help
								students become aware and responsible citizens who care
								about their country and the entire world. Through
								several campus-wide initiatives like cleanliness drives,
								we tirelessly work to not only improve the lives of the
								underprivileged and oppressed but also to ensure that
								the community's development is not halted.
							</Typography>
						</InfoCard>
					</motion.div>
					
					{/* ABOUT NSS INDIA SECTION */}
					<motion.div
						variants={sectionVariants}
						initial="hidden"
						whileInView="visible"
						viewport={{ once: true }}
						style={{ marginTop: "4rem" }}>
						<InfoCard elevation={0}>
							<Typography variant="h4" component="h2" sx={{ fontFamily: "'Inria Sans', serif", fontWeight: 500, mb: 2, color: "#4a0e4a"}}>
								ABOUT NSS INDIA
							</Typography>
							<Typography
								variant="body1"
								sx={{ fontFamily: "'DM Sans', sans-serif", fontSize: "1.1rem", mb: 3 }}>
								The National Service Scheme (NSS) is a Central Sector
								Scheme of the Government of India, Ministry of Youth
								Affairs & Sports. It provides an opportunity to the
								student youth of India to take part in various government-led
								community service activities & programmes. The sole aim
								of the NSS is to provide hands-on experience to young
								students in delivering community service.
							</Typography>
							<Button
								component={Link}
								to="https://nss.gov.in/nss-detail-page"
								target="_blank"
								rel="noopener noreferrer"
								variant="outlined"
								color="primary"
								sx={{
									fontFamily: "'DM Sans', sans-serif",
									fontWeight: 700,
									borderColor: "#8e24aa",
									color: "#8e24aa",
									borderRadius: '50px',
									px: 3,
									py: 1,
									'&:hover': {
										backgroundColor: 'rgba(142, 36, 170, 0.08)',
										borderColor: '#6a1b9a',
									}
								}}>
								READ MORE
							</Button>
						</InfoCard>
					</motion.div>


					{/* HISTORY SECTION */}
					<Grid container spacing={6} sx={{ my: { xs: 6, md: 10 }, alignItems: "center" }}>
						<Grid item xs={12} md={6}>
							<motion.div
								initial={{ opacity: 0, x: -100 }}
								whileInView={{ opacity: 1, x: 0 }}
								viewport={{ once: true }}
								transition={{ duration: 1 }}>
								<Typography
									variant="h4"
									component="h3"
									sx={{
										fontFamily: "'Inria Sans', serif",
										color: "text.secondary",
										fontWeight: 400,
									}}>
									About Our
								</Typography>
								<Typography
									variant="h2"
									component="h2"
									sx={{
										fontFamily: "'DM Sans', sans-serif",
										fontWeight: 700,
										color: "#4a0e4a",
										fontSize: { xs: "3rem", md: "4.5rem" },
										lineHeight: 1.1,
										mb: 3,
									}}>
									History
								</Typography>
								<Typography
									variant="body1"
									sx={{
										textAlign: "justify",
										fontFamily: "'DM Sans', sans-serif",
										fontSize: "1.1rem",
									}}>
									The NSS unit at SVNIT, established in 2018, is a testament to the spirit
									of volunteerism and social responsibility. Over the years, the unit has
									organized numerous activities—from blood drives and health camps to environmental
									and educational initiatives—making a positive impact on the community.
									With a rich history of service, the NSS SVNIT unit continues to inspire students
									to contribute meaningfully to society.
								</Typography>
							</motion.div>
						</Grid>
						<Grid item xs={12} md={6}>
							<motion.div
								initial={{ opacity: 0, scale: 0.8 }}
								whileInView={{ opacity: 1, scale: 1 }}
								viewport={{ once: true }}
								transition={{ duration: 1.2, ease: "circOut" }}>
								<HistoryImageCircle>
									{imageUrl && (
										<motion.img
											src={imageUrl}
											alt="NSS SVNIT Logo"
											style={{
												position: "absolute",
												top: "8%",
												
												width: "85%",
												height: "85%",
												borderRadius: "50%",
												objectFit: "cover",
												boxShadow: "inset 0 0 15px rgba(0,0,0,0.2)",
											}}
											initial={{ scale: 1.1, opacity: 0 }}
											animate={{ scale: 1, opacity: 1 }}
											transition={{ duration: 0.8, delay: 0.5 }}
										/>
									)}
								</HistoryImageCircle>
							</motion.div>
						</Grid>
					</Grid>

					{/* MISSION & VISION SECTION */}
					<Grid container spacing={4} sx={{ mb: { xs: 8, md: 12 } }}>
						<Grid item xs={12} md={6}>
							<motion.div variants={sectionVariants} initial="hidden" whileInView="visible" viewport={{ once: true }} style={{height: '100%'}}>
								<InfoCard elevation={0} >
									<Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
										<TrackChangesIcon sx={{ color: '#8e24aa', fontSize: 40, mr: 2 }}/>
										<Typography variant="h4" component="h3" sx={{ fontFamily: "'Inria Sans', serif", color: "#4a0e4a", fontWeight: 500 }}>
											OUR MISSION
										</Typography>
									</Box>
									<Typography variant="body1" sx={{ fontFamily: "'DM Sans', sans-serif" }}>
										To transform volunteers into dedicated social servants, embodying the ethos
										of "not me but you." We prioritize their overall development while instilling
										a strong sense of social responsibility to create a network of changemakers
										committed to building a better future.
									</Typography>
								</InfoCard>
							</motion.div>
						</Grid>
						<Grid item xs={12} md={6}>
							<motion.div variants={sectionVariants} initial="hidden" whileInView="visible" viewport={{ once: true, delay: 0.2 }} style={{height: '100%'}}>
								<InfoCard elevation={0}>
									<Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
										<VisibilityIcon sx={{ color: '#8e24aa', fontSize: 40, mr: 2 }}/>
										<Typography variant="h4" component="h3" sx={{ fontFamily: "'Inria Sans', serif", color: "#4a0e4a", fontWeight: 500 }}>
											OUR VISION
										</Typography>
									</Box>
									<Typography variant="body1" sx={{ fontFamily: "'DM Sans', sans-serif" }}>
										A society where individuals embrace empathy and actively contribute to
										positive change. We strive to foster inclusivity, empower volunteers
										to make a meaningful impact, and promote social awareness to create a
										more compassionate and equitable world for all.
									</Typography>
								</InfoCard>
							</motion.div>
						</Grid>
					</Grid>
				</Container>

				{/* Sections from other components */}
				<DutySection />
				<ComitteeSection />
			</PageContainer>
		</Layout>
	);
};

export default React.memo(About);