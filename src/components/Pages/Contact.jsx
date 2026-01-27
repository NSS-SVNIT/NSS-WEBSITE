import React from "react";
import Layout from "../Layout/Layout";
import SendRoundedIcon from "@mui/icons-material/SendRounded";
import MailIcon from "@mui/icons-material/Mail";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import emailjs from "@emailjs/browser";
import Swal from "sweetalert2";
import { MapContainer, TileLayer, Popup, Marker } from "react-leaflet";
import { motion } from "framer-motion";

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
	const isMobile = false; // You can use useMediaQuery hook if needed

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
			<Box sx={{ px: { xs: 2, md: 4 }, py: { xs: 4, md: 6 } }}>
				{/* Header */}
				<Typography
					variant="h2"
					textAlign="center"
					mb={6}
					fontWeight={600}
					sx={{
						whiteSpace: "nowrap",
						fontSize: { xs: "2.1rem", sm: "2.75rem", md: "3.5rem" },
						lineHeight: 1.1,
					}}>
					GET IN TOUCH
				</Typography>

				{/* Contact Form Section */}
				<Grid container spacing={4}>
					<Grid item xs={12} md={12}>
						<motion.div initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.3 }} variants={itemVariants}>
							<Typography variant="h4" mb={3} fontWeight={600}>
								<SendRoundedIcon sx={{ verticalAlign: 'middle', mr: 1 }} />
								SEND US A MESSAGE
							</Typography>

							<Box component="form" onSubmit={handleSubmit} noValidate>
								<TextField
									margin="normal"
									required
									fullWidth
									id="name"
									label="Your Name"
									name="name"
									autoComplete="name"
									sx={{ mb: 2 }}
								/>
								<TextField
									margin="normal"
									required
									fullWidth
									id="email"
									label="Your Email"
									name="email"
									autoComplete="email"
									sx={{ mb: 2 }}
								/>
								<TextField
									margin="normal"
									multiline
									rows={5}
									required
									fullWidth
									id="message"
									label="Your Message"
									name="message"
									sx={{ mb: 2 }}
								/>
								<Button
									variant="contained"
									type="submit"
									endIcon={<SendRoundedIcon />}
									sx={{
										mt: 2,
										backgroundColor: "black",
										px: 4,
										py: 1.5,
										"&:hover": {
											backgroundColor: "#333",
										},
									}}>
									Send Message
								</Button>
							</Box>
						</motion.div>
					</Grid>
				</Grid>

				{/* Google Maps Section */}
				<Box sx={{ mt: 8 }}>
					<Typography variant="h4" textAlign="center" mb={3} fontWeight={600}>
						<LocationOnIcon sx={{ verticalAlign: 'middle', mr: 1 }} />
						LOCATE US
					</Typography>
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
				</Box>

				{/* Contact Details Section */}
				<Box sx={{ mt: 8 }}>
					<motion.div initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.3 }} variants={itemVariants}>
						<Stack spacing={4}>
							<Box>
								<Typography variant="h5" gutterBottom sx={{ fontWeight: 600 }}>
									Contact Details
								</Typography>
								<Stack direction="row" alignItems="center" spacing={2} sx={{ mb: 1 }}>
									<MailIcon color="action" />
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
				</Box>
			</Box>
		</Layout>
	);
};

export default React.memo(Contact);