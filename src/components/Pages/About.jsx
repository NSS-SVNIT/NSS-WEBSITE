import React, { useEffect } from "react";
import Layout from "../Layout/Layout";
import ComitteeSection from "./Home/ComitteeSection";
import DutySection from "./Home/DutySection";
import { motion } from "framer-motion";
import { Typography, Box, Grid, Button, useMediaQuery } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { useState } from "react";
import { ref, getDownloadURL } from "firebase/storage";
import { storage } from "../../firebase";
import { Link } from "react-router-dom";
import nssBackground from "../../assets/nss_background.png";
import FormatQuoteIcon from "@mui/icons-material/FormatQuote";


const useStyles = makeStyles({
	gradientBackground: {
		background: "linear-gradient(to bottom, #ffffff, #ffffff)",
	},
});

const About = () => {
	const classes = useStyles();
	const isMobile = useMediaQuery("(max-width:900px)");
	const isLargeScreen = useMediaQuery("(min-width:1440px)");
	useEffect(() => {
		// Scroll to the top of the page when the component mounts
		window.scrollTo(0, 0);

		// Cleanup function to scroll to the top when the component unmounts
		return () => {
			window.scrollTo(0, 0);
		};
	}, []); // The empty dependency array ensures this effect runs only once when the component mounts

	const [url, setUrl] = useState("aaaa");
	const func = async () => {
		const reference = ref(storage, "aboutImages/nss_logo.jpg");
		await getDownloadURL(reference).then((x) => {
			setUrl(x);
		});
	};
	useEffect(() => {
		func();
	}, []);

	return (
		<Layout>
			<Typography
				variant="h1"
				sx={{
					fontFamily: "Inria Sans",
					// fontStyle: "oblique",
					fontSize: { xs: "24px", sm: "32px", md: "56px" },
					px: { xs: 2, sm: 5, md: 10 },
					pt: { xs: 3, md: 5 },
					fontWeight: 500,
					overflowX: "hidden",
					overflowY: "hidden",
					textAlign: isMobile ? "center" : "initial",
				}}>
				ABOUT NSS
			</Typography>
			<br />
			<Box>
				<motion.div>
					<Typography
						variant="h6"
						sx={{
							my: { xs: 2, sm: 3, md: 3 },
							mx: "auto",
							p: { xs: 2, sm: 3, md: 4 },
							width: { xs: "92%", sm: "90%", md: "85%", lg: "75%" },
							textAlign: "justify",
							bgcolor: "background.paper",
							borderRadius: "25px",
							display: "flex",
							justifyContent: "center",
							alignItems: "center",
							rows: "10",
							overflowX: "hidden",
							fontSize: { xs: "0.95rem", sm: "1rem", md: "1.1rem" },
						}}>
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
						the community's development is not halted.Our commitment
						to quality is all-encompassing, and it only gets
						stronger with time, as shown by the diversification that
						is occurring while simultaneously making sure that the
						core principles and concepts don't get lost in the
						process.
					</Typography>
				</motion.div>
			</Box>

			<Typography
				variant="h2"
				sx={{
					textAlign: isMobile ? "center" : "intial",
					px: { xs: 2, sm: 5, md: 10 },
					pt: { xs: 3, md: 5 },
					fontWeight: 400,
					overflowX: "hidden",
					fontFamily: "Inria Sans",
					fontSize: { xs: "22px", sm: "28px", md: "48px" },
				}}>
				ABOUT NSS INDIA
			</Typography>
			<br />
			<Box>
				<motion.div>
					<Typography
						variant="h6"
						sx={{
							my: { xs: 2, sm: 3, md: 3 },
							mx: "auto",
							p: { xs: 2, sm: 3, md: 4 },
							width: { xs: "92%", sm: "90%", md: "85%", lg: "75%" },
							textAlign: "justify",
							bgcolor: "background.paper",
							borderRadius: "25px",
							display: "flex",
							justifyContent: "center",
							alignItems: "center",
							rows: "10",
							overflowX: "hidden",
							fontFamily: "DM Sans",
							fontSize: { xs: "0.95rem", sm: "1rem", md: "1.1rem" },
						}}>
						The National Service Scheme (NSS) is a Central Sector
						Scheme of the Government of India, Ministry of Youth
						Affairs & Sports. It provides an opportunity to the
						student youth of 11th & 12th Class of schools at +2
						Board level and student youth of Technical Institution,
						Graduate & Post Graduate at colleges and University
						level of India to take part in various government-led
						community service activities & programmes. The sole aim
						of the NSS is to provide hands-on experience to young
						students in delivering community service.
					</Typography>
					<Link to="https://nss.gov.in/nss-detail-page">
						<Button
							color="primary"
							sx={{
								borderRadius: 0,
								height: "40px",
								mt: 2,
								color: "black",
								width: "150px",
								border: "2px black solid",
								fontSize: "1.1rem",
								fontFamily: "DM Sans",
								mx: { xs: "auto", md: 0 },
								display: "block",
							}}>
							READ MORE
						</Button>
					</Link>
				</motion.div>
			</Box>

			{/* LOGO SECTION - Refactored to separate Logo Image and Details */}
			<Box sx={{ flexGrow: 1, overflow: "hidden", px: isMobile ? 2 : 10, py: 5 }}>
				<Grid container spacing={4} alignItems="center" justifyContent="center">
					{/* Logo Text Side */}
					<Grid item xs={12} md={6}>
						<Typography
							variant="h4"
							sx={{
								textAlign: isMobile ? "center" : "left",
								mb: 3,
								fontFamily: "Inria Sans",
								fontSize: isMobile ? "28px" : "40px",
							}}>
							NSS LOGO 
						</Typography>
						<motion.div
							initial={{ opacity: 0, x: -50 }}
							whileInView={{ opacity: 1, x: 0 }}
							viewport={{ once: true, amount: 0.5 }}
							transition={{ duration: 0.8 }}
						>
							<Typography
								variant="h6"
								sx={{
									p: "25px",
									textAlign: "justify",
									bgcolor: "#fce3d8ff",
									borderRadius: "15px",
									fontFamily: "DM Sans",
									fontSize: isMobile ? "14px" : "18px",
									color: "#333",
									boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
								}}>
								<ul style={{ listStyleType: "none", padding: 0 }}>
									<li style={{ marginBottom: "12px" }}>
										<strong>The Konark Wheel:</strong> The wheel in the NSS badge having 8 bars signifies the 24 hours of the day, reminding the wearer to be ready for the service of the nation round the clock.
									</li>
									<li style={{ marginBottom: "12px" }}>
										<strong>Red Colour:</strong> The red colour in the badge signifies energy and spirit displayed by the NSS volunteers.
									</li>
									<li style={{ marginBottom: "12px" }}>
										<strong>Motto:</strong> Surrounding the wheel is the NSS motto: "Not Me But You," emphasizing selfless service to others.
									</li>
									<li>
										<strong>Blue Colour:</strong> The blue colour signifies the cosmos of which the NSS is a tiny part, ready to contribute its share for the welfare of mankind.
									</li>
								</ul>
							</Typography>
						</motion.div>
					</Grid>

					{/* Logo Image Side */}
					<Grid item xs={12} md={6} display="flex" justifyContent="center">
						<motion.div
							initial={{ opacity: 0, x: 100 }}
							whileInView={{ opacity: 1, x: 0 }}
							viewport={{ once: true, amount: 0.5 }}
							transition={{ duration: 0.8 }}
							style={{
								position: "relative",
								width: isMobile ? "280px" : "400px",
								height: isMobile ? "280px" : "400px",
								borderRadius: "50%",
								backgroundColor: "#ffffff",
								display: "flex",
								alignItems: "center",
								justifyContent: "center",
								boxShadow: "0 10px 30px rgba(0,0,0,0.1)",
							}}
						>
							<motion.img
								src={url}
								alt="NSS Logo"
								style={{
									width: "80%",
									height: "80%",
									objectFit: "contain",
									borderRadius: "50%",
								}}
							/>
						</motion.div>
					</Grid>
				</Grid>
			</Box>

			<div style={{ overflowX: "hidden" }}>
				<Grid
					container
					spacing={2}
					sx={{
						marginTop: { xs: "0px", md: "45px" },
						marginBottom: { xs: "40px", md: "60px" },
						paddingX: { xs: "16px", sm: "24px", md: "48px", lg: "80px" },
						justifyContent: "center",
						overflowX: "hidden",
					}}>
					<Grid item xs={12}>
						<motion.div
							initial={{ opacity: 0, y: 30 }}
							whileInView={{ opacity: 1, y: 0 }}
							viewport={{ once: true, amount: 0.5 }}
							transition={{ duration: 1 }}>
							<Typography
								variant="h3"
								gutterBottom
								sx={{
									fontFamily: "Inria Sans",
									textAlign: "center",
									fontSize: { xs: "24px", sm: "28px", md: "40px" },
								}}>
								About Our
							</Typography>
							<Typography
								variant="h1"
								gutterBottom
								sx={{
									fontFamily: "DM Sans",
									textAlign: "center",
									fontSize: { xs: "40px", sm: "48px", md: "80px" },
									fontWeight: "bold",
									color: "#2c3e50"
								}}>
								History
							</Typography>
						</motion.div>
						<motion.div
							initial={{ opacity: 0, y: 20 }}
							whileInView={{ opacity: 1, y: 0 }}
							viewport={{ once: true, amount: 0.5 }}
							transition={{ duration: 1, delay: 0.2 }}>
							<Typography
								variant="subtitle1"
								component="p"
								sx={{
									fontFamily: "DM Sans",
									textAlign: "justify",
									margin: "0 auto",
									maxWidth: "1000px",
									fontSize: { xs: "14px", sm: "16px", md: "20px" },
									lineHeight: 1.8,
									color: "#444"
								}}>
								The history of the National Service Scheme (NSS)
								unit at the Sardar Vallabhbhai National
								Institute of Technology (SVNIT) is a testament
								to the spirit of volunteerism and social
								responsibility among the students. The NSS unit
								at SVNIT was established in 2018, with the aim
								of fostering social welfare and community
								development through various initiatives. Over
								the years, the unit has played a vital role in
								organizing numerous activities and campaigns
								that have made a positive impact on the lives of
								people in and around the campus. From conducting
								blood donation drives, health camps, and
								awareness programs to promoting cleanliness,
								environmental conservation, and education, the
								NSS unit has actively engaged students in
								serving society and creating a better world.
								With a rich history of service and a strong
								commitment to social change, the NSS SVNIT unit
								continues to inspire and empower students to
								contribute to the betterment of society.
							</Typography>
						</motion.div>
					</Grid>
				</Grid>
			</div>

			<Grid
				container
				spacing={1}
				sx={{ overflowX: "hidden", display: "flex" }}>
				<Grid item lg={6} xs={12} sm={12} md={6} sx={{ px: 2 }}>
					<motion.div
						initial={{ opacity: 0, x: -100 }}
						whileInView={{ opacity: 1, x: 0 }}
						viewport={{ once: true, amount: 0.5 }}
						transition={{ duration: 1 }}>
						<Box
							sx={{
								fontFamily: "DM Sans",
								mx: "auto",
								mt: { xs: "24px", md: "50px" },
								mb: { xs: "24px", md: "50px" },
								display: "flex",
								flexDirection: "column",
								p: { xs: 3, sm: 4, md: 4 },
								boxSizing: "border-box",
								height: { xs: "auto", md: "300px" },
								width: { xs: "100%", md: "80%" },
								borderRadius: "5px",
								boxShadow: "0 4px 10px rgba(0,0,0,0.08)",
								alignItems: "center",
								justifyContent: "center",
								overflowX: "hidden",
							}}
							variant="outlined"
							className={classes.gradientBackground}>
							<Typography
								variant="h4"
								sx={{
									mb: { xs: 2, md: 3 },
									fontFamily: "Inria Sans",
									textAlign: "center",
								}}>
								OUR MISSION
							</Typography>
							<Typography
								sx={{
									fontFamily: "DM Sans",
									overflowX: "hidden",
									width: "100%",
									textAlign: "justify",
									fontSize: {
										xs: "10px",
										sm: "12px",
										md: "14px",
										lg: "15px",
									},
									lineHeight: 1.6,
								}}>
								Our mission is to transform volunteers into
								dedicated social servants, embodying the ethos
								of "not me but you." We prioritize their overall
								development while instilling a strong sense of
								social responsibility. Through diverse
								initiatives, we aim to raise awareness, address
								societal challenges, and empower marginalized
								communities. Together, we strive to create a
								network of changemakers committed to creating a
								better future.
							</Typography>
						</Box>
					</motion.div>
				</Grid>

				<Grid item lg={6} xs={12} sm={12} md={6} sx={{ px: 2 }}>
					<motion.div
						initial={{ opacity: 0, x: 100 }}
						whileInView={{ opacity: 1, x: 0 }}
						viewport={{ once: true, amount: 0.5 }}
						transition={{ duration: 1 }}>
						<Box
							sx={{
								fontFamily: "DM Sans",
								mx: "auto",
								mt: { xs: "24px", md: "50px" },
								mb: { xs: "24px", md: "50px" },
								display: "flex",
								flexDirection: "column",
								p: { xs: 3, sm: 4, md: 4 },
								boxSizing: "border-box",
								height: { xs: "auto", md: "300px" },
								width: { xs: "100%", md: "80%" },
								boxShadow: "0 4px 10px rgba(0,0,0,0.08)",
								borderRadius: "5px",
								alignItems: "center",
								justifyContent: "center",
								overflowX: "hidden",
							}}
							variant="outlined"
							className={classes.gradientBackground}>
							<Typography
								variant="h4"
								sx={{
									mb: { xs: 2, md: 3 },
									fontFamily: "Inria Sans",
									textAlign: "center",
								}}>
								OUR VISION
							</Typography>
							<Typography
								sx={{
									fontFamily: "DM Sans",
									overflowX: "hidden",
									width: "100%",
									textAlign: "justify",
									fontSize: {
										xs: "10px",
										sm: "12px",
										md: "14px",
										lg: "15px",
									},
									lineHeight: 1.6,
								}}>
								Our vision is a society where individuals
								embrace empathy and actively contribute to
								positive change. We strive to foster inclusivity
								and empower volunteers to make a meaningful
								impact in their communities. By promoting social
								awareness, we aim to create a more compassionate
								and equitable world for all.
							</Typography>
						</Box>
					</motion.div>
				</Grid>
			</Grid>
			<Box
				sx={{
					backgroundImage: `linear-gradient(rgba(0,0,0,0.35), rgba(0,0,0,0.35)), url(${nssBackground})`,
					backgroundSize: "cover",
					backgroundPosition: "center",
					backgroundRepeat: "no-repeat",
					backgroundColor: "#000",
					backgroundAttachment: "fixed",
					py: 10,
					px: 2,
					position: "relative",
					zIndex: 0,
				}}>
				<Grid
					container
					spacing={4}
					direction="column" // Vertical Stack
					sx={{
						position: "relative",
						zIndex: 1,
						px: { xs: 0, md: 5 }, // Add padding on desktop for better spacing
						alignItems: "center" // Center all children
					}}>

					{/* PLEDGE SECTION - Centered */}
					<Grid
						item
						xs={12}
						sx={{
                            width: { xs: "95%", md: "70%", lg: "60%" }, // Reduced width for better readability
                            mb: { xs: 4, md: 6 },
                            mx: 'auto' // Center the component
                        }}
					>
						<motion.div
							initial={{ opacity: 0, x: -100 }}
							whileInView={{ opacity: 1, x: 0 }}
							viewport={{ once: true, amount: 0.3 }}
							transition={{ duration: 0.8 }}
						>
							<Box
								sx={{
									background: "rgba(255, 255, 255, 0.1)", // Transparent Glass
									backdropFilter: "blur(16px)", // Stronger blur
									WebkitBackdropFilter: "blur(16px)",
									border: "1px solid rgba(255, 255, 255, 0.6)", // Crisp glass border
									borderRadius: isMobile ? "20px" : "30px",
									p: { xs: 3, md: 5 },
									textAlign: "center",
									color: "#ffffff", // Pure White Text
									boxShadow: "0 4px 30px rgba(0, 0, 0, 0.1)", // Glass shadow
									transition: "transform 0.3s ease-in-out",
									"&:hover": {
										transform: "translateY(-10px)",
										boxShadow: "0 15px 50px rgba(0,0,0,0.15)",
									}
								}}>
								{/* Icon Removed as requested */}
								<Typography
									variant="h4"
									sx={{
										fontFamily: "Inria Sans",
										mb: 3,
										fontWeight: "700",
										color: "#ffffff", // White Header
										fontSize: { xs: "28px", md: "38px" },
										letterSpacing: "1.5px",
										textTransform: "uppercase"
									}}>
									NSS PLEDGE
								</Typography>
								<Typography
									sx={{
										fontFamily: "DM Sans",
										fontSize: { xs: "16px", md: "20px" },
										lineHeight: 2,
										fontStyle: "italic",
										color: "#f0f0f0", // Off-white Body
										fontWeight: 400
									}}>
									"I solemnly pledge myself to work with
									dedication to serve and strengthen the
									freedom and integrity of the nation. I
									further affirm that I shall never resort to
									violence and that all differences and
									disputes relating to religion, language,
									region or political or economic grievances
									shall be settled by peaceful and
									constitutional means"
								</Typography>
							</Box>
						</motion.div>
					</Grid>

					{/* NSS SONG SECTION - Centered */}
					<Grid
						item
						xs={12}
						sx={{
							width: { xs: "100%", md: "85%", lg: "80%" } // Wider centered card
						}}
					>
						<motion.div
							initial={{ opacity: 0, x: 100 }}
							whileInView={{ opacity: 1, x: 0 }}
							viewport={{ once: true, amount: 0.3 }}
							transition={{ duration: 0.8, delay: 0.2 }}
						>
							<Box
								sx={{
									background: "rgba(255, 255, 255, 0.1)", // Transparent Glass
									backdropFilter: "blur(16px)",
									WebkitBackdropFilter: "blur(16px)",
									border: "1px solid rgba(255, 255, 255, 0.6)",
									borderRadius: isMobile ? "20px" : "30px",
									p: { xs: 3, md: 5 },
									textAlign: "center",
									color: "#ffffff",
									boxShadow: "0 4px 30px rgba(0, 0, 0, 0.1)",
									transition: "transform 0.3s ease-in-out",
									"&:hover": {
										transform: "translateY(-10px)",
										boxShadow: "0 30px 60px rgba(0,0,0,0.4)",
									}
								}}>
								<Typography
									variant="h4"
									sx={{
										fontFamily: "Inria Sans",
										mb: 3,
										fontWeight: "700",
										color: "#ffffff", // White Header
										fontSize: { xs: "28px", md: "38px" },
										letterSpacing: "1.5px",
										textTransform: "uppercase"
									}}>
									NSS LAKSHYA GEET
								</Typography>

								{/* AUDIO PLAYER */}
								<Box sx={{ mb: 3, display: 'flex', justifyContent: 'center' }}>
									<audio controls style={{ borderRadius: '25px', width: '80%' }}>
										<source src="/assets/nss_song.mp3.mp3" type="audio/mp3" />
										Your browser does not support the audio element.
									</audio>
								</Box>
								<Typography
									component="div"
									sx={{
										fontFamily: "DM Sans",
										fontSize: { xs: "15px", md: "18px" },
										lineHeight: 1.8,
										whiteSpace: "pre-line",
										color: "#f0f0f0", // Off-white Body
										fontWeight: 400
									}}>

									उठें समाज के लिए उठें-उठें,
									<br />
									जगे स्वराष्ट्र के लिए जगे-जगे।
									<br />
									स्वयं सजे वसुंधरा संवार दें - २
									<br />
									<br />
									हम उठें उठेगा जग हमारे संग साथियों,
									<br />
									हम बढ़ें तो सब बढ़ेंगे अपने आप साथियों।
									<br />
									जमीं पे आसमान को उतार दें - २<br />
									स्वयं सजे वसुंधरा संवार दें - २
									<br />
									<br />
									उदासियों को दूर कर ख़ुशी को बाँटते चलें,
									<br />
									गाँव और शहर की दूरियों को पाटते चलें।
									<br />
									ज्ञान को प्रचार दें प्रसार दें, विज्ञानं को
									प्रचार दें प्रसार दें।
									<br />
									स्वयं सजे वसुंधरा संवार दें - २
									<br />
									<br />
									समर्थ बाल वृद्ध और नारियां रहें सदा,
									<br />
									हरे भरे वनों की शाल ओढ़ती रहे धरा।
									<br />
									तरक्कियों की एक नई कतार दें - २<br />
									स्वयं सजे वसुंधरा संवार दें - २
									<br />
									<br />
									ये जाति धर्म बोलियां बनें न शूल राह की,
									<br />
									बढ़ाएं बेल प्रेम की अखंडता की चाह की।
									<br />
									सद्भावना से ये चमन निखार दें, सद्भावना से ये
									चमन निखार दें।
									<br />
									स्वयं सजे वसुंधरा संवार दें - २
									<br />
									<br />
									उठें समाज के लिए उठें-उठें,
									<br />
									जगे स्वराष्ट्र के लिए जगे-जगे।
									<br />
									स्वयं सजे वसुंधरा संवार दें - २
								</Typography>
							</Box>
						</motion.div>
					</Grid>
				</Grid>
			</Box>
			<DutySection />
			<ComitteeSection />

			<div
				style={{
					overflowX: "hidden",
					display: "flex",
					alignItems: "center",
					justifyContent: "center",
				}}></div>
		</Layout>
	);
};

export default React.memo(About);
