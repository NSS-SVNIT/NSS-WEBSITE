import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import MenuIcon from "@mui/icons-material/Menu";
import {
	Avatar,
	Button,
	Menu,
	MenuItem,
	Stack,
	useMediaQuery,
} from "@mui/material";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import { useTheme } from "@mui/material/styles";
import Toolbar from "@mui/material/Toolbar";
import * as React from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import nsslogo from "../../assets/nss_logo.jpg";
import svnitlogo from "../../assets/svnit_logo.png";
import NavButton from "../UI/NavButton";
import NavDialog from "./NavDialog";

export default function NavBar() {
	const theme = useTheme();
	const isPhone = useMediaQuery(theme.breakpoints.down("md"));
	const location = useLocation();

	const [openDialog, setOpenDialog] = React.useState(false);
	const [scrolling, setScrolling] = React.useState(false);
	const [teamMenuAnchor, setTeamMenuAnchor] = React.useState(null);

	const handleMenuClick = () => {
		setOpenDialog(true);
	};

	const handleCloseDialog = () => {
		setOpenDialog(false);
	};

	const handleTeamMenuOpen = (event) => {
		setTeamMenuAnchor(event.currentTarget);
	};

	const handleTeamMenuClose = () => {
		setTeamMenuAnchor(null);
	};

	React.useEffect(() => {
		const handleScroll = () => {
			const scrollThreshold = getScrollThreshold(location.pathname);
			setScrolling(window.scrollY > scrollThreshold);
		};

		const getScrollThreshold = (pathname) => {
			switch (pathname) {
				case "/":
					return 900; // Adjust the threshold for the Home page
				case "/about":
					return 1980; // Adjust the threshold for the About page
				case "/gallery":
					return 300; // Adjust the threshold for the About page
				case "/contact":
					return 700; // Adjust the threshold for the About page
				case "/team":
					return 100; // Adjust the threshold for the About page
				case "/events":
					return 100; // Adjust the threshold for the About page
				case "/Articles":
					return 200; // Adjust the threshold for the About page
				default:
					return 50000; // Default threshold for other pages
			}
		};

		// Attach the scroll event listener
		window.addEventListener("scroll", handleScroll);

		// Detach the event listener when the component unmounts
		return () => {
			window.removeEventListener("scroll", handleScroll);
		};
	}, [location.pathname]); // Re-run the effect when the pathname changes

	const navButtonStyle = {
		textDecoration: "none",
		color: scrolling ? "white" : "black",
	};

	const isDevelopersPage = location.pathname === "/developers";

	const scrollToTop = () => {
		window.scrollTo({
			top: 0,
			left: 0,
			behavior: "smooth",
		});
	};
	return (
		<>
			<AppBar
				position="sticky"
				sx={{
					backdropFilter: "blur(10px)",
					px: 8,
					py: 1,
					backgroundColor: scrolling ? "black" : "transparent",
					transition: "background-color 0.5s",
				}}
				elevation={5}>
				<Toolbar>
					<Stack
						component="div"
						direction="row"
						alignItems="center"
						sx={{ flexGrow: 1 }}>
						<NavLink to="/" onClick={scrollToTop}>
							<Avatar
								alt="Logo"
								src={nsslogo}
								sx={{
									width: isPhone ? 40 : 75,
									height: isPhone ? 40 : 75,
									marginRight: isPhone ? 1 : 3,
									marginLeft: isPhone ? -7 : 3,
								}}
							/>
						</NavLink>
						<NavLink to="/" onClick={scrollToTop}>
							<Avatar
								alt="Logo"
								src={svnitlogo}
								sx={{
									width: isPhone ? 40 : 75,
									height: isPhone ? 40 : 75,
									marginRight: isPhone ? 1 : 3,
									ml: isPhone ? -1 : 0,
								}}
							/>
						</NavLink>
						<NavLink
							to="/"
							style={{
								textDecoration: "none",
								color: scrolling ? "white" : "black",
							}}
							onClick={scrollToTop}>
							<div
								style={{
									fontFamily: "DM Sans",
									fontSize: isPhone ? "1.1rem" : "2rem",
									fontWeight: "100",
								}}>
								NSS SVNIT
							</div>
							<div
								style={{
									fontFamily: "DM Sans",
									fontSize: isPhone ? "0.7rem" : "1rem",
									fontWeight: "400",
								}}>
								National Service Scheme
							</div>
						</NavLink>
					</Stack>
					{isPhone ? (
						<IconButton
							size="large"
							edge="end"
							color={scrolling ? "inherit" : "default"}
							aria-label="menu">
							<MenuIcon onClick={handleMenuClick} />
						</IconButton>
					) : (
						<Box>
							<NavButton to="/" scrolling={scrolling}>
								Home
							</NavButton>
							<NavButton to="/about" scrolling={scrolling}>
								About
							</NavButton>{" "}
							<NavButton to="/events" scrolling={scrolling}>
								Events
							</NavButton>
							<NavButton to="/gallery" scrolling={scrolling}>
								Gallery
							</NavButton>
							<NavButton to="/Articles" scrolling={scrolling}>
								Articles
							</NavButton>
							{/* Team dropdown */}
							<Box sx={{ display: "inline-block" }}>
								<Button
									sx={{
										color: scrolling ? "white" : "black",
										textTransform: "none",
										fontSize: "1rem",
										mx: 1,
										"&:hover": {
											backgroundColor: "transparent",
										},
									}}
									endIcon={<ExpandMoreIcon />}
									onClick={handleTeamMenuOpen}>
									Team
								</Button>
								<Menu
									anchorEl={teamMenuAnchor}
									open={Boolean(teamMenuAnchor)}
									onClose={handleTeamMenuClose}
									MenuListProps={{
										"aria-labelledby": "team-button",
									}}>
									<MenuItem
										component={Link}
										to="/team"
										onClick={handleTeamMenuClose}>
										View Team
									</MenuItem>
									<MenuItem
										component={Link}
										to="/team/volunteer"
										onClick={handleTeamMenuClose}>
										Join Team
									</MenuItem>{" "}
									{/* <MenuItem
										component={Link}
										to="/admin-login"
										onClick={handleTeamMenuClose}>
										Admin Panel
									</MenuItem> */}
								</Menu>
							</Box>
							<NavButton to="/contact" scrolling={scrolling}>
								Contact
							</NavButton>
						</Box>
					)}
				</Toolbar>
			</AppBar>
			<NavDialog
				openDialog={openDialog}
				handleCloseDialog={handleCloseDialog}
			/>
		</>
	);
}
