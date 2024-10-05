import {
	Box,
	Divider,
	Grid,
	List,
	ListItem,
	ListItemButton,
	Stack,
	useMediaQuery,
} from "@mui/material";
import React from "react";
import { MapContainer, TileLayer, useMap, Popup, Marker } from "react-leaflet";
import FooterLogo from "./FooterLogo";
import {
	FaInstagram,
	FaFacebook,
	FaTwitter,
	FaEnvelope,
	FaYoutube,
} from "react-icons/fa";
import { Link } from "react-router-dom";
import { he } from "@faker-js/faker";
import { PhotoSizeSelectSmall } from "@mui/icons-material";

const Footer = () => {
	const isMobile = useMediaQuery("(max-width:900px)");
	const linkStyle = {
		color: "white",
		fontWeight: "semi-bold", // You can adjust the font weight as needed
		textDecoration: "none", // Optional: Remove underline style
		marginTop: isMobile ? "6px" : "0", // Adjust the margin as needed
	};

	const hrStyle = {
		height: "1px",
		width: "100%",
		backgroundColor: "white",
		border: "none",
		margin: "10px 0", // Adjust the margin as needed
	};

	const linkStyleIcon = {
		color: "white",
		fontWeight: "bold",
		textDecoration: "none",
		marginRight: isMobile ? "5px" : "20px", // Adjust the margin as needed
	};
	return (
		<footer
			style={{
				backgroundColor: "black",
				color: "gray",
				fontSize: "1.2rem",
				paddingTop: 30,
				paddingBottom: 30,
				paddingLeft: 0,
				fontFamily: "DM Sans",
			}}>
			<Grid
				container
				direction={isMobile ? "column" : "row"}
				justifyContent="space-around"
				alignItems="center">
				<Grid item lg={6} xs={8}>
					<FooterLogo />
				</Grid>
				<Grid item lg={3} xs={6} justifyContent="center">
					<div
						style={{
							display: "flex",
							flexDirection: isMobile ? "column" : "row",
							justifyContent: "space-around",
							marginTop: isMobile ? "-120px" : "0",
							marginLeft: isMobile ? "250px" : "0",
							marginBottom: isMobile ? "30px" : "0",
						}}>
						<Link to="/admin" style={linkStyle}>
							Admin
						</Link>
						{/* Use Link component for routing */}
						<Link to="/developers" style={linkStyle}>
							Developers
						</Link>
						<Link to="/" style={linkStyle}>
							Home
						</Link>
						<Link to="/about" style={linkStyle}>
							About
						</Link>
					</div>
					<hr style={hrStyle} />
					<div
						style={{
							display: "flex",
							flexDirection: "row",
							// justifyContent: "space-between",
							justifyContent: "space-evenly",
						}}>
						<a
							href="https://www.instagram.com/nss_svnit"
							style={linkStyleIcon}>
							<FaInstagram size={30} />
						</a>
						<a
							href="https://www.facebook.com/p/NSS-SVNIT-100064799047910/"
							style={linkStyleIcon}>
							<FaFacebook size={30} />
						</a>
						<a
							href="https://twitter.com/nss_svnit"
							style={linkStyleIcon}>
							<FaTwitter size={30} />
						</a>
						<a
							href="https://www.youtube.com/@nsssvnit6353"
							style={linkStyleIcon}>
							<FaYoutube size={30} />
						</a>
						<Link to="/contact" style={linkStyle}>
							<FaEnvelope size={30} />
						</Link>
					</div>
				</Grid>
			</Grid>
		</footer>
	);
};

export default Footer;
