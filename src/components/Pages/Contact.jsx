import React from "react";
import Layout from "../Layout/Layout";
import SendRoundedIcon from "@mui/icons-material/SendRounded";
import MailIcon from "@mui/icons-material/Mail";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import emailjs from "@emailjs/browser";
import Swal from "sweetalert2";

import {
	Box,
	Grid,
	Typography,
	TextField,
	Button,
	Stack,
	IconButton,
	Tooltip,
} from "@mui/material";
import { Facebook, Instagram, Twitter, YouTube, Mail, SendRounded } from "@mui/icons-material";
import { MapContainer, TileLayer, Popup, Marker } from "react-leaflet";
import emailjs from "@emailjs/browser";
import Swal from "sweetalert2";
import { motion } from "framer-motion";

// Animation variant for items fading/sliding in
const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut",
    },
  },
};

const Contact = () => {
	const handleSubmit = (e) => {
		e.preventDefault();

		// Show loading state with SweetAlert2
		Swal.fire({
			title: 'Sending...',
			text: 'Please wait.',
			allowOutsideClick: false,
			didOpen: () => {
				Swal.showLoading();
			},
		});

		emailjs.sendForm(
			import.meta.env.VITE_EMAILJS_SERVICE_ID,
			import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
			e.target,
			import.meta.env.VITE_EMAILJS_USER_ID
		).then(
			(result) => {
				console.log("Email sent successfully:", result.text);
				Swal.fire({
					icon: 'success',
					title: 'Message Sent!',
					text: 'Thank you for reaching out. We will get back to you soon.',
				});
				e.target.reset();
			},
			(error) => {
				console.log("Error sending email:", error);
				Swal.fire({
					icon: 'error',
					title: 'Oops...',
					text: 'Something went wrong! Please try again later.',
				});
			}
		);
	};

	const position = [21.164583, 72.785239]; // Coordinates for SVnit location

	// Social Media links data for easier mapping
	const socialLinks = [
		{ icon: <Instagram />, label: "Instagram", href: "https://www.instagram.com/nss_svnit" },
		{ icon: <Facebook />, label: "Facebook", href: "https://www.facebook.com/p/NSS-SVNIT-100064799047910/" },
		{ icon: <Twitter />, label: "Twitter", href: "https://twitter.com/nss_svnit" },
		{ icon: <YouTube />, label: "YouTube", href: "https://www.youtube.com/@nsssvnit6353" },
	];

	return (
		<Layout>
			<Typography
				variant={isMobile ? "h2" : "h1"}
				alignItems="center"
				justifyContent="center"
				textAlign="center"
				px="20%"
				marginBottom="30px"
				fontWeight={400}>
				GET IN TOUCH
			</Typography>
			<Grid container direction={"column"}>
				<div
					style={{
						borderRadius: 0,
						textTransform: "none",
						height: "80px",
						width: isMobile ? "auto" : "300px",
						marginTop: "10px",
						alignItems: "center",
						justifyContent: "center",
						backgroundColor: "black",
						// fontSize: "1.1rem",
						fontFamily: "DM Sans",
						margin: isMobile ? "5%" : "0 auto",
						color: "white",
						display: "flex",
						// flexDirection: "column",
						fontSize: "30px",
					}}>
					<span style={{ color: "grey", marginRight: "5px" }}>
						LOCATE{" "}
					</span>{" "}
					<span style={{ color: "white" }}>US</span>
				</div>
				<Grid item lg={12} xs={4} sm={2} sx={{ px: { xs: 2, md: 8 }, py: 4 }}>
					{/* Google Maps Embed */}
					<Box
						sx={{
							height: { xs: "350px", md: "500px" },
							borderRadius: 3,
							overflow: "hidden",
							boxShadow: "0 10px 40px rgba(0,0,0,0.2)",
							border: "3px solid #000",
							position: "relative",
							"&:hover": {
								boxShadow: "0 15px 50px rgba(0,0,0,0.3)",
								transform: "translateY(-2px)",
							},
							transition: "all 0.3s ease",
						}}>
						<iframe
							src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3720.6507653833756!2d72.78287931492656!3d21.164583085916397!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be04dec8b56fdf1%3A0x423b99085d26d1f9!2sSardar%20Vallabhbhai%20National%20Institute%20of%20Technology!5e0!3m2!1sen!2sin!4v1643234567890!5m2!1sen!2sin"
							width="100%"
							height="100%"
							style={{ border: 0 }}
							allowFullScreen=""
							loading="lazy"
							referrerPolicy="no-referrer-when-downgrade"
							title="NSS SVNIT Location"
						/>
					</Box>
					{/* Direct Link to Google Maps */}
					<Box sx={{ textAlign: "center", mt: 3 }}>
						<Button
							variant="contained"
							startIcon={<LocationOnIcon />}
							href="https://maps.google.com/?q=21.164583,72.785239"
							target="_blank"
							rel="noopener noreferrer"
							sx={{
								backgroundColor: "black",
								px: 4,
								py: 1.5,
								fontSize: "1rem",
								"&:hover": {
									backgroundColor: "#333",
								},
							}}>
							Open in Google Maps
						</Button>
					</Box>
				</Grid>
			</Grid>

			<Grid container spacing={3}>
				<Grid item xs={12} md={6}>
					<div
						style={{
							borderRadius: 0,
							textTransform: "none",
							height: "80px",
							width: isMobile ? "auto" : "450px",
							marginTop: "10px",
							alignItems: "center",
							justifyContent: "center",
							backgroundColor: "black",
							// fontSize: "1.1rem",
							fontFamily: "DM Sans",
							margin: isMobile ? "5%" : "0 auto",
							color: "white",
							display: "flex",
							flexDirection: isMobile ? "column" : "row",
							fontSize: "30px",
						}}>
						<span style={{ color: "grey", marginRight: "5px" }}>
							{" "}
							SEND YOUR{" "}
						</span>
						MESSAGE HERE
					</div>
					<Box
						// component="form"
						noValidate
						sx={{ m: 3, mx: "auto", width: "80%" }}>
						<form autoComplete="off" onSubmit={handleSubmit}>
							<TextField
								margin="normal"
								required
								fullWidth
								id="name"
								label="Name"
								name="name"
								autoComplete="name"
								autoFocus
								error={false}
								sx={{ width: "100%" }}
							/>
							<TextField
								margin="normal"
								required
								fullWidth
								id="email"
								label="Email"
								name="email"
								autoComplete="email"
								autoFocus
								sx={{ width: "100%" }}
							/>
							<TextField
								margin="normal"
								multiline
								rows={5}
								required
								fullWidth
								id="message"
								label="Message"
								name="message"
								autoFocus
								sx={{ width: "100%" }}
							/>
							<Button
								variant="contained"
								type="submit"
								endIcon={<SendRoundedIcon />}
								sx={{ mt: 2, backgroundColor: "black" }}>
								Send
							</Button>
						</form>
					</Box>
				</Grid>

					{/* --- CONTACT DETAILS SECTION --- */}
					<Grid item xs={12} md={5}>
						<motion.div initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.3 }} variants={itemVariants}>
							<Stack spacing={4}>
								<Box>
									<Typography variant="h5" gutterBottom sx={{ fontWeight: 600 }}>
										Contact Details
									</Typography>
									<Stack direction="row" alignItems="center" spacing={2} sx={{ mb: 1 }}>
										<Mail color="primary" />
										<Typography variant="body1">
											<a href="mailto:nss@svnit.ac.in" style={{ textDecoration: 'none', color: 'inherit' }}>
												nss@svnit.ac.in
											</a>
										</Typography>
									</Stack>
								</Box>
								<Box>
									<Typography variant="h5" gutterBottom sx={{ fontWeight: 600 }}>
										Follow Us
									</Typography>
									<Stack direction="row" spacing={1}>
										{socialLinks.map((link) => (
											<Tooltip title={link.label} key={link.label} arrow>
												<IconButton
													component="a"
													href={link.href}
													target="_blank"
													rel="noopener noreferrer"
													sx={{ color: 'text.secondary', '&:hover': { color: 'primary.main' } }}
												>
													{link.icon}
												</IconButton>
											</Tooltip>
										))}
									</Stack>
								</Box>
							</Stack>
						</motion.div>
					</Grid>
				</Grid>

				{/* --- MAP SECTION --- */}
				<motion.div initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }} variants={itemVariants}>
					<Box sx={{ mt: { xs: 8, md: 12 } }}>
						<Typography variant="h3" sx={{ textAlign: 'center', mb: 4, fontWeight: 700 }}>
							Find Us Here
						</Typography>
						<Box sx={{ height: '450px', width: '100%', borderRadius: 4, overflow: 'hidden', boxShadow: 3 }}>
							<MapContainer center={position} zoom={15} scrollWheelZoom={false} style={{ height: "100%", width: "100%" }}>
								{/* Using a beautiful monochrome map style */}
								<TileLayer
									attribution='© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors © <a href="https://carto.com/attributions">CARTO</a>'
									url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
								/>
								<Marker position={position}>
									<Popup>
										<b>NSS SVNIT</b> <br /> SVNIT Campus, Ichchhanath, Surat.
									</Popup>
								</Marker>
							</MapContainer>
						</Box>
					</Box>
				</motion.div>
			</Box>
		</Layout>
	);
};

export default React.memo(Contact);