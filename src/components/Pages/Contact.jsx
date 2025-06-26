import React from "react";
import Layout from "../Layout/Layout";
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
			<Box sx={{ px: { xs: 2, md: 4 }, py: { xs: 5, md: 10 }, overflow: 'hidden' }}>
				{/* --- MAIN HEADING --- */}
				<motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={itemVariants}>
					<Typography variant="h2" sx={{ textAlign: 'center', mb: 1, fontWeight: 700 }}>
						Get In Touch
					</Typography>
					<Typography color="text.secondary" sx={{ textAlign: 'center', maxWidth: '600px', mx: 'auto', mb: 8 }}>
						We're here to help and answer any question you might have. We look forward to hearing from you.
					</Typography>
				</motion.div>

				{/* --- FORM & CONTACT DETAILS GRID --- */}
				<Grid container spacing={{ xs: 5, md: 8 }}>
					{/* --- FORM SECTION --- */}
					<Grid item xs={12} md={7}>
						<motion.div initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.3 }} variants={itemVariants}>
							<Box sx={{ p: { xs: 2, sm: 4 }, bgcolor: 'action.hover', borderRadius: 4 }}>
								<Typography variant="h4" gutterBottom sx={{ fontWeight: 600, mb: 3 }}>
									Send us a Message
								</Typography>
								<form autoComplete="off" onSubmit={handleSubmit}>
									<Grid container spacing={3}>
										<Grid item xs={12} sm={6}>
											<TextField required fullWidth name="name" label="Your Name" variant="filled" />
										</Grid>
										<Grid item xs={12} sm={6}>
											<TextField required fullWidth name="email" type="email" label="Your Email" variant="filled" />
										</Grid>
										<Grid item xs={12}>
											<TextField required fullWidth multiline rows={6} name="message" label="Your Message" variant="filled" />
										</Grid>
										<Grid item xs={12}>
											<Button
												type="submit"
												variant="contained"
												size="large"
												endIcon={<SendRounded />}
												sx={{ fontWeight: 600, px: 4, py: 1.5 }}
											>
												Send Message
											</Button>
										</Grid>
									</Grid>
								</form>
							</Box>
						</motion.div>
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