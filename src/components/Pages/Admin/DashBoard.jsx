import MenuIcon from "@mui/icons-material/Menu"; // Added MenuIcon
import {
	Avatar,
	Button,
	Drawer,
	IconButton,
	Stack,
	useMediaQuery,
	useTheme,
} from "@mui/material"; // Added Drawer, IconButton, useTheme, useMediaQuery
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import Tabs from "@mui/material/Tabs";
import Typography from "@mui/material/Typography";
import PropTypes from "prop-types";
import * as React from "react";
// import Profile from "./Profile";
import Articles from "../Articles/newarticle";
import ImageUpload from "./ImageUpload";
import NewEvent from "./NewEvent";
import Updates from "./Updates";
import UploadTeamData from "./UploadTeamData";
import VolunteerApprovalPanel from "./VolunteerApprovalPanel";

function TabPanel(props) {
	const { children, value, index, ...other } = props;

	return (
		<div
			role="tabpanel"
			hidden={value !== index}
			id={`vertical-tabpanel-${index}`}
			aria-labelledby={`vertical-tab-${index}`}
			{...other}>
			{value === index && (
				// <Box sx={{ p: 3, width: "calc(100vw - 150px)" }}> // Original width
				<Box sx={{ p: 3, width: "100%" }}>
					{" "}
					{/* Changed width to 100% to fill container */}
					<Typography component="div">{children}</Typography>{" "}
					{/* Ensure Typography can host complex children */}
				</Box>
			)}
		</div>
	);
}

TabPanel.propTypes = {
	children: PropTypes.node,
	index: PropTypes.number.isRequired,
	value: PropTypes.number.isRequired,
};

function a11yProps(index) {
	return {
		id: `vertical-tab-${index}`,
		"aria-controls": `vertical-tabpanel-${index}`,
	};
}

export default function DashBoard({ handleSignOut }) {
	const [value, setValue] = React.useState(0);
	const theme = useTheme();
	const isMobile = useMediaQuery(theme.breakpoints.down("md"));
	const [mobileOpen, setMobileOpen] = React.useState(false);

	const profilePic = localStorage.getItem("profilePic");
	const profileName = localStorage.getItem("name");

	const handleDrawerToggle = () => {
		setMobileOpen(!mobileOpen);
	};

	const handleChange = (event, newValue) => {
		setValue(newValue);
		if (isMobile) {
			setMobileOpen(false); // Close drawer on tab selection on mobile
		}
	};

	const drawerWidth = 240; // Define drawer width for mobile

	const drawerContent = (
		<Stack
			alignItems={"center"}
			gap={2}
			sx={{ pt: 2, height: "100%", width: "100%" }}>
			{" "}
			{/* Content fills drawer/sidebar */}
			<Stack alignItems={"center"}>
				<Avatar
					src={profilePic}
					sx={{ height: "80px", width: "80px" }}></Avatar>
				<Box
					sx={{
						fontFamily: "Roboto",
						fontSize: "1.1rem",
						py: 2,
						textAlign: "CENTER",
					}}>
					{profileName}
				</Box>
			</Stack>
			<Tabs
				orientation="vertical"
				value={value}
				onChange={handleChange}
				aria-label="Vertical tabs example"
				sx={{
					borderRight: isMobile ? 0 : 1, // No border in mobile drawer
					width: "100%", // Tabs take full width of their container (drawer or sidebar)
					borderColor: "divider", // MUI theme divider color
				}}>
				{/* <Tab label="PROFILE" {...a11yProps(0)} /> */}
				<Tab label="EVENTS" {...a11yProps(0)} />
				<Tab label="IMAGES" {...a11yProps(1)} />
				<Tab label="UPDATES" {...a11yProps(2)} />
				<Tab label="ARTICLES" {...a11yProps(3)} />
				<Tab label="TEAM DATA" {...a11yProps(4)} />
				<Tab label="APPROVE VOLUNTEERS" {...a11yProps(5)} />
			</Tabs>
			<Button
				variant="contained"
				color="primary"
				onClick={handleSignOut}
				sx={{ mt: "auto", mb: 2, width: "calc(100% - 16px)" }}>
				Logout
			</Button>
		</Stack>
	);

	return (
		<Box
			sx={{
				display: "flex",
				height: "100vh",
				width: "100vw",
				bgcolor: "background.paper",
			}}>
			{isMobile && (
				<IconButton
					color="inherit"
					aria-label="open drawer"
					edge="start"
					onClick={handleDrawerToggle}
					sx={{
						position: "fixed", // Use fixed position for hamburger
						top: 16,
						left: 16,
						zIndex: theme.zIndex.drawer + 1, // Ensure it's above the drawer
						// Apply some background to make it visible on various content
						backgroundColor: "rgba(255,255,255,0.7)",
						"&:hover": {
							backgroundColor: "rgba(255,255,255,1)",
						},
					}}>
					<MenuIcon />
				</IconButton>
			)}
			<Box
				component="nav"
				sx={{ width: { md: "150px" }, flexShrink: { md: 0 } }}
				aria-label="mailbox folders">
				{isMobile ? (
					<Drawer
						variant="temporary"
						open={mobileOpen}
						onClose={handleDrawerToggle}
						ModalProps={{
							keepMounted: true, // Better open performance on mobile.
						}}
						sx={{
							display: { xs: "block", md: "none" },
							"& .MuiDrawer-paper": {
								boxSizing: "border-box",
								width: drawerWidth,
							},
						}}>
						{drawerContent}
					</Drawer>
				) : (
					// For desktop, render the sidebar content directly or within a non-temporary Drawer
					// Using a permanent drawer structure for consistency, styled to match original fixed sidebar
					<Box
						sx={{
							width: "150px",
							height: "100%",
							display: { xs: "none", md: "flex" },
							borderRight: 1,
							borderColor: "divider",
						}}>
						{drawerContent}
					</Box>
				)}
			</Box>
			<Box
				component="main"
				sx={{
					flexGrow: 1,
					// p: 3, // Padding is now handled by TabPanel's inner Box
					width: { xs: "100%", md: "calc(100% - 150px)" }, // Adjust width based on screen size
					overflowY: "auto",
					pt: isMobile ? "64px" : 0, // Add padding top on mobile to avoid overlap with fixed hamburger
				}}>
				<TabPanel value={value} index={0}>
					<NewEvent />
				</TabPanel>
				<TabPanel value={value} index={1}>
					<ImageUpload />
				</TabPanel>
				<TabPanel value={value} index={2}>
					<Updates />
				</TabPanel>
				<TabPanel value={value} index={3}>
					<Articles />
				</TabPanel>
				<TabPanel value={value} index={4}>
					<UploadTeamData />
				</TabPanel>
				<TabPanel value={value} index={5}>
					<VolunteerApprovalPanel />
				</TabPanel>
			</Box>
		</Box>
	);
}

// Add prop type for handleSignOut
DashBoard.propTypes = {
	handleSignOut: PropTypes.func.isRequired,
};
