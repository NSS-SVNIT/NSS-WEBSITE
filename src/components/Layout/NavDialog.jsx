import {
	Avatar,
	Box,
	Divider,
	Drawer,
	List,
	ListItem,
	ListItemButton,
	ListItemText,
	Stack,
	Typography,
} from "@mui/material";
import { NavLink } from "react-router-dom";
import NavButton from "../UI/NavButton";
const drawerWidth = 240;
const navItems = [
	{ route: "About", link: "/about" },
	{ route: "Events", link: "/events" },
	{ route: "Gallery", link: "/gallery" },
	{ route: "Articles", link: "/articles" },
	{ route: "Team", link: "/team" },
	{ route: "Join Team", link: "/team/volunteer" },
	{ route: "Contact", link: "/contact" },
];
const scrollToTop = () => {
	window.scrollTo({
		top: 0,
		left: 0,
		behavior: "smooth",
	});
};
export default function NavDialog({ openDialog, handleCloseDialog }) {
	const drawer = (
		<Box onClick={handleCloseDialog} sx={{ textAlign: "center" }}>
			<Stack
				component="div"
				direction="row"
				alignItems="center"
				sx={{ flexGrow: 1 }}>
				<NavLink to="/" onClick={scrollToTop}>
					<Avatar
						alt="Logo"
						src="https://firebasestorage.googleapis.com/v0/b/nss-svnit.appspot.com/o/aboutImages%2Fnss_logo.jpg?alt=media&token=860074c2-3cf7-4e5d-86b4-f4bc61a37626"
						sx={{
							width: 30,
							height: 30,
							marginRight: 1,
							marginLeft: 1,
						}}
					/>
				</NavLink>
				<NavLink to="/" onClick={scrollToTop}>
					<Avatar
						alt="Logo"
						src="https://upload.wikimedia.org/wikipedia/en/thumb/1/1b/NIT_Surat_Logo.svg/300px-NIT_Surat_Logo.svg.png"
						sx={{
							width: 30,
							height: 30,
							marginRight: 1,
						}}
					/>
				</NavLink>
				<NavLink
					to="/"
					style={{
						textDecoration: "none",
						marginLeft: 1,
						color: "black",
					}}
					onClick={scrollToTop}>
					<Typography variant="h6" sx={{ my: 2 }}>
						NSS SVNIT
					</Typography>
				</NavLink>
			</Stack>

			<Divider />
			<List>
				{navItems.map((item) => (
					<ListItem key={item} disablePadding>
						<ListItemButton sx={{ textAlign: "center" }}>
							<NavButton to={item.link}>
								<ListItemText primary={item.route} />
							</NavButton>
						</ListItemButton>
					</ListItem>
				))}
			</List>
		</Box>
	);
	return (
		<Box>
			<nav>
				<Drawer
					container={document.body}
					variant="temporary"
					open={openDialog}
					onClose={handleCloseDialog}
					ModalProps={{
						keepMounted: true, // Better open performance on mobile.
					}}
					sx={{
						display: { xs: "block", sm: "none" },
						"& .MuiDrawer-paper": {
							boxSizing: "border-box",
							width: drawerWidth,
						},
					}}>
					{drawer}
				</Drawer>
			</nav>
		</Box>
	);
}
