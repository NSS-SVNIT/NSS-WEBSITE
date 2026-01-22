import LocationOnIcon from '@mui/icons-material/LocationOn';
import MenuIcon from "@mui/icons-material/Menu";
import {
	Avatar,
	Stack, // Make sure Stack is imported
	Typography,
	useMediaQuery,
} from "@mui/material";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import { useTheme } from "@mui/material/styles";
import Toolbar from "@mui/material/Toolbar";
import * as React from "react";
import { NavLink } from "react-router-dom";
import nsslogo from "../../assets/nss_logo.jpg";
import NavButton from "../UI/NavButton";
import NavDialog from "./NavDialog";

// --- Colors for easy management ---
const lightTheme = {
	background: "rgba(255, 255, 255, 0.0)",
	textColor: "#0d47a1",
};

const darkTheme = {
	background: "rgba(26, 32, 44)",
	textColor: "#ffffff",
};

export default function NavBar() {
	const theme = useTheme();
	const isPhone = useMediaQuery(theme.breakpoints.down("lg"));
	const [scrolling, setScrolling] = React.useState(false);
	const [openDialog, setOpenDialog] = React.useState(false);

	const handleMenuClick = () => setOpenDialog(true);
	const handleCloseDialog = () => setOpenDialog(false);

	React.useEffect(() => {
		const handleScroll = () => {
			setScrolling(window.scrollY > 50);
		};
		window.addEventListener("scroll", handleScroll);
		return () => {
			window.removeEventListener("scroll", handleScroll);
		};
	}, []);

	const scrollToTop = () => {
		window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
	};

	const currentTheme = scrolling ? darkTheme : lightTheme;

	// --- CHANGE IS HERE ---
	// Wrap buttons in a Stack and apply conditional spacing.
	const DesktopNavLinks = (
		<Stack direction="row" spacing={scrolling ? 3 : 1}> {/* More space on scroll */}
			<NavButton to="/" scrolling={scrolling}>Home</NavButton>
			<NavButton to="/about" scrolling={scrolling}>About</NavButton>
			<NavButton to="/events" scrolling={scrolling}>Events</NavButton>
			<NavButton to="/team" scrolling={scrolling}>Team</NavButton>
			<NavButton to="/gallery" scrolling={scrolling}>Gallery</NavButton>
			<NavButton to="/articles" scrolling={scrolling}>Articles</NavButton>
			<NavButton to="/contact" scrolling={scrolling}>Contact</NavButton>
		</Stack>
	);

	return (
		<>
			<AppBar
				position="sticky"
				sx={{
					background: currentTheme.background,
					backdropFilter: scrolling ? "blur(10px)" : "none",
					py: scrolling ? 0.5 : 1.5,
					px: { xs: 2, md: 4, lg: 8 },
					transition: "all 0.3s ease-in-out",
				}}
				elevation={scrolling ? 8 : 0}>
				<Toolbar sx={{ justifyContent: 'space-between', alignItems: 'center' }}>
					
					{/* LEFT GROUP: Logo, Title, and Nav Links (only when not scrolled) */}
					<Stack direction="row" alignItems="center" spacing={4}>
						<NavLink to="/" onClick={scrollToTop}>
							<Avatar alt="NSS Logo" src={nsslogo} sx={{ width: { xs: 40, md: 60 }, height: { xs: 40, md: 60 } }} />
						</NavLink>
						
						<NavLink to="/" style={{ textDecoration: "none", color: currentTheme.textColor }} onClick={scrollToTop}>
							<Typography sx={{ fontFamily: "DM Sans", fontSize: { xs: "1.1rem", md: "1.5rem" }, fontWeight: "bold", whiteSpace: "nowrap" }}>
								{isPhone || scrolling ? "NSS SVNIT" : "National Service Scheme, SVNIT"}
							</Typography>
						</NavLink>
						
						{!isPhone && !scrolling && DesktopNavLinks}
					</Stack>

					{/* RIGHT GROUP: Mobile Menu or Desktop Content */}
					{isPhone ? (
						<IconButton size="large" edge="end" aria-label="menu" onClick={handleMenuClick} sx={{ color: currentTheme.textColor }}>
							<MenuIcon />
						</IconButton>
					) : (
						<>
							{!scrolling && (
								<Stack direction="row" alignItems="center" sx={{ color: currentTheme.textColor }}>
									<Box sx={{ textAlign: 'right' }}>
										<Typography variant="body2" sx={{ fontWeight: 'bold' }}>
											Sardar Vallabhbhai National Institute of Technology
										</Typography>
										<Typography variant="caption">
											Ichchhanath, Surat, Gujarat - 395007
										</Typography>
									</Box>
									<LocationOnIcon sx={{ ml: 1.5, fontSize: '2.5rem' }} />
								</Stack>
							)}

							{scrolling && DesktopNavLinks}
						</>
					)}
				</Toolbar>
			</AppBar>
			<NavDialog openDialog={openDialog} handleCloseDialog={handleCloseDialog} />
		</>
	);
}