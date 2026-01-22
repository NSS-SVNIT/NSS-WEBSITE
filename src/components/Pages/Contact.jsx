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
	List,
	ListItem,
	TextField,
	Typography,
	Button,
	ListItemText,
	ListItemIcon,
	useMediaQuery,
} from "@mui/material";
import { Facebook, Instagram, Twitter, YouTube } from "@mui/icons-material";

const Contact = () => {
	const isMobile = useMediaQuery("(max-width:900px)");
	const handleSubmit = (e) => {
		e.preventDefault();

		emailjs
			.sendForm(
				import.meta.env.VITE_EMAILJS_SERVICE_ID,
				import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
				e.target,
				import.meta.env.VITE_EMAILJS_USER_ID
			)
			.then((result) => {
				console.log("Email sent successfully:", result.text);
				Swal.fire({
					icon: "success",
					title: "Message sent sucessfully 👍",
				});
			})
			.catch((error) => {
				console.log("Error sending email:", error);
				Swal.fire({
					icon: "error",
					title: "Something went wrong!",
					text: error.text,
				});
			});
		e.target.reset();
	};

	const position = [21.164583, 72.785239]; // Coordinates for SVnit location
	const linkStyle = {
		color: "inherit", // Inherit color from parent, which should be the default text color
		textDecoration: "none", // Remove underline
	};
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

				<Grid item xs={12} md={6}>
					<div
						style={{
							borderRadius: 0,
							textTransform: "none",
							height: "80px",
							width: isMobile ? "auto" : "350px",
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
							marginBottom: "20px",
						}}>
						<span style={{ color: "grey", marginRight: "5px" }}>
							CONTACT
						</span>
						DETAILS
					</div>
					<List
						sx={{
							m: 3,
							mx: isMobile ? "none" : "auto",
							width: "50%",
						}}>
						<ListItem
							component="a"
							href="mailto:nss@svnit.ac.in"
							target="_blank"
							rel="noopener noreferrer"
							style={linkStyle}>
							<ListItemIcon>
								<MailIcon />
							</ListItemIcon>
							<ListItemText primary="nss@svnit.ac.in" />
						</ListItem>
						<ListItem
							component="a"
							href="https://www.instagram.com/nss_svnit"
							target="_blank"
							rel="noopener noreferrer"
							style={linkStyle}>
							<ListItemIcon>
								<Instagram />
							</ListItemIcon>
							<ListItemText primary="@nss_svnit" />
						</ListItem>
						<ListItem
							component="a"
							href="https://www.facebook.com/p/NSS-SVNIT-100064799047910/"
							target="_blank"
							rel="noopener noreferrer"
							style={linkStyle}>
							<ListItemIcon>
								<Facebook />
							</ListItemIcon>
							<ListItemText primary="nss_svnit" />
						</ListItem>
						<ListItem
							component="a"
							href="https://twitter.com/nss_svnit"
							target="_blank"
							rel="noopener noreferrer"
							style={linkStyle}>
							<ListItemIcon>
								<Twitter />
							</ListItemIcon>
							<ListItemText primary="nss_svnit" />
						</ListItem>
						<ListItem
							component="a"
							href="https://www.youtube.com/@nsssvnit6353"
							target="_blank"
							style={linkStyle}
							rel="noopener noreferrer">
							<ListItemIcon>
								<YouTube />
							</ListItemIcon>
							<ListItemText primary="NSS SVNIT" />
						</ListItem>
					</List>
				</Grid>
			</Grid>

		</Layout>
	);
};

export default React.memo(Contact);
