import React, { useEffect } from "react";
import Layout from "../Layout/Layout";
import ComitteeSection from "./Home/ComitteeSection";
import DutySection from "./Home/DutySection";
import { motion } from "framer-motion";
import { Typography, Box, Grid, Button, useMediaQuery } from "@mui/material";
import { makeStyles } from "@material-ui/core/styles";
import { useState } from "react";
import { getStorage, ref, getDownloadURL } from "@firebase/storage";
import { Link } from "react-router-dom";

const useStyles = makeStyles({
	gradientBackground: {
		background: "linear-gradient(to bottom, #ffebff, #FFE6FF)",
	},
});

const About = () => {
	const classes = useStyles();
	const isMobile =useMediaQuery('(max-width:900px)');
	const isLargeScreen = useMediaQuery('(min-width:1440px)');
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
		const storage = getStorage();
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
					fontSize: isMobile?"44px":'96px',
					px: 10,
					pt: 5,
					fontWeight: 500,
					overflowX: "hidden",
					overflowY: "hidden",
					textAlign: isMobile?"center":"initial",
				}}>
				ABOUT NSS
			</Typography>
			<br />
			<Box>
				<motion.div>
					<Typography
						variant="h6"
						sx={{
							m: "23px",
							p: "25px",
							textAlign: "justify",
							bgcolor: "#ffebff",
							borderRadius: "25px",
							display: "flex",
							justifyContent: "center",
							alignItems: "center",
							rows: "10",
							overflowX: "hidden",
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
					textAlign: isMobile?"center":"intial",
					px: isMobile?5:10,
					pt: isMobile?3:5,
					fontWeight: 400,
					overflowX: "hidden",
					fontFamily: "Inria Sans",
					fontSize: isMobile?"36px":'76px'
				}}>
				ABOUT NSS INDIA
			</Typography>
			<br />
			<Box>
				<motion.div>
					<Typography
						variant="h6"
						sx={{
							m: "23px",
							p: "25px",
							textAlign: "justify",
							bgcolor: "#ffebff",
							borderRadius: "25px",
							display: "flex",
							justifyContent: "center",
							alignItems: "center",
							rows: "10",
							overflowX: "hidden",
							fontFamily: "DM Sans",
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
							style={{
								borderRadius: 0,
								height: "40px",
								marginTop: "1rem",
								color: "black",
								width: "150px",
								border: "2px black solid",
								fontSize: "1.1rem",
								fontFamily: "DM Sans",
								marginLeft: "50px",
								overflowX: "hidden",
								overflowY: "hidden",
							}}>
							READ MORE
						</Button>
					</Link>
				</motion.div>
			</Box>

			<div style={{ overflowX: "hidden" }}>
				<Grid
					container
					spacing={2}
					sx={{
						marginTop: isMobile?"0px":"45px",
						marginLeft: isMobile?"30px":"60px",
						marginBottom: "60px",
						overflowX: "hidden",
						overflowY: "hidden",
					}}>
					<Grid item xs={9} sm={6} md={5}>
						<motion.div
							initial={{ opacity: 0, x: -100 }}
							whileInView={{ opacity: 1, x: 0 }}
							viewport={{ once: true }}
							transition={{ duration: 1 }}>
							<Typography
								variant="h3"
								fontSize={"50px"}
								gutterBottom
								sx={{
									fontFamily: "Inria Sans",
									marginTop: "50px",
									overflowX: "hidden",
									overflowY: "hidden",
									fontSize: {
										xs: "20px",
										sm: "30px",
										md: "40px",
										lg: "50px",
									},
								}}>
								About Our
							</Typography>
						</motion.div>
						<motion.div
							initial={{ opacity: 0, x: -100 }}
							whileInView={{ opacity: 1, x: 0 }}
							viewport={{ once: true }}
							transition={{ duration: 1.5 }}>
							<Typography
								variant="h1"
								fontSize={"100px"}
								gutterBottom
								sx={{
									fontFamily: "DM Sans",
									overflowX: "hidden",
									overflowY: "hidden",
									fontSize: {
										xs: "40px",
										sm: "40px",
										md: "50px",
										lg: "100px",
									},
								}}>
								History
							</Typography>
						</motion.div>
						<motion.div
							initial={{ opacity: 0, x: -100 }}
							whileInView={{ opacity: 1, x: 0 }}
							viewport={{ once: true }}
							transition={{ duration: 1 }}>
							<Typography
								variant="subtitle2"
								gutterBottom
								sx={{
									fontFamily: "DM Sans",
									overflowX: "hidden",
									overflowY: "hidden",
									textAlign: isMobile?"justify":"initial",
									fontSize: {
										xs: "16px",
										sm: "14px",
										md: "20px",
										lg: "20px",
									},
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
					<Grid
						item
						xs={12}
						sm={6}
						md={7}
						sx={{
							overflowX: "hidden",
							width: {
								lg: "100%",
								md: "50%",
								sm: "40%",
								xs: "20%",
							},
							height: { lg: "100%", md: "50%", sm: "40%" },
						}}>
						<motion.div
							style={{
								overflowX: "hidden",
								position: "relative",
								width: "100%",
								height: isMobile?"0px":'600px',
								paddingTop: "100%",
								backgroundColor: "#ffebff",
								borderRadius: "50%",
							}}
							initial={{ opacity: 0, x: 50 }}
							whileInView={{ opacity: 1, x: 0 }}
							viewport={{ once: true }}
							transition={{ duration: 2 }}>
							<motion.img
								src={url}
								alt="Right Content"
								style={{
									overflowX: "hidden",
									position: "absolute",
									top: isMobile?45:isLargeScreen?90:60,
									left: isMobile?45:isLargeScreen?90:40,
									right: isMobile?45:isLargeScreen?90:50,
									bottom: isMobile?45:isLargeScreen?90:50,
									width: isMobile?"70%":"80%",
									height: isMobile?"70%":"80%",
									objectFit: "cover",
									borderRadius: "50%",
								}}
								alignItems="center"
								justifyContent="center"
							/>
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
						viewport={{ once: true }}
						transition={{ duration: 1 }}>
						<Box
							sx={{
								fontFamily: "DM Sans",
								ml: "50px",
								mt: "50px",
								mb: "50px",
								fontSize: "70%",
								display: "flex",
								height: "300px",
								width: "80%",
								borderRadius: "5px",
								boxShadow: " 3px 3px #ffccff",
								alignItems: "center",
								justifyContent: "center",
								overflowX: "hidden",
							}}
							variant="outlined"
							className={classes.gradientBackground}>
							<Typography
								variant="h4"
								sx={{
									m: { xs: 2, sm: 3, md: 4, lg: 5 },
									fontFamily: "Inria Sans",
								}}>
								OUR MISSION
							</Typography>
							<Typography
								sx={{
									fontFamily: "DM Sans",
									overflowX: "hidden",
									fontSize: {
										xs: "10px",
										sm: "12px",
										md: "14px",
										lg: "15px",
									},
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
						viewport={{ once: true }}
						transition={{ duration: 1 }}>
						<Box
							sx={{
								fontFamily: "DM Sans",
								ml: "50px",
								mt: "50px",
								mb: "50px",
								fontSize: "70%",
								display: "flex",
								height: "300px",
								width: "80%",
								boxShadow: " 3px 3px #ffccff",
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
									m: { xs: 2, sm: 3, md: 4, lg: 5 },
									fontFamily: "Inria Sans",
								}}>
								OUR VISION
							</Typography>
							<Typography
								sx={{
									fontFamily: "DM Sans",
									overflowX: "hidden",
									fontSize: {
										xs: "10px",
										sm: "12px",
										md: "14px",
										lg: "15px",
									},
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
