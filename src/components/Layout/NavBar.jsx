import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import {
  Stack,
  useMediaQuery,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import NavDialog from "./NavDialog";
import { Link, NavLink, useLocation } from "react-router-dom";
import NavButton from "../UI/NavButton";

export default function NavBar() {
  const theme = useTheme();
  const isPhone = useMediaQuery(theme.breakpoints.down("sm"));
  const location = useLocation();

  const [openDialog, setOpenDialog] = React.useState(false);
  const [scrolling, setScrolling] = React.useState(false);

  const handleMenuClick = () => {
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  React.useEffect(() => {
    const handleScroll = () => {
      const scrollThreshold = getScrollThreshold(location.pathname);
      console.log(window.scrollY);
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

  return (
    <>
      <AppBar
        position="sticky"
        sx={{
          backdropFilter: "blur(10px)",
          px: 8,
          backgroundColor: scrolling ? "black" : "transparent",
        }}
        elevation={5}
      >
        <Toolbar>
          <Stack component="div" sx={{ flexGrow: 1 }}>
            <NavLink
              to="/"
              style={{
                textDecoration: "none",
                color: scrolling ? "white" : "black",
              }}
            >
              <div
                style={{
                  fontFamily: "DM Sans",
                  fontSize: isPhone ? "1.5rem" : "2rem",
                  fontWeight: "100",
                }}
              >
                NSS SVNIT
              </div>
              <div
                style={{
                  fontFamily: "DM Sans",
                  fontSize: isPhone ? "0.8rem" : "0.9rem",
                  fontWeight: "400",
                }}
              >
                National Service Scheme
              </div>
            </NavLink>
          </Stack>
          {isPhone ? (
            <IconButton
              size="large"
              edge="end"
              color="inherit"
              aria-label="menu"
            >
              <MenuIcon onClick={handleMenuClick} />
            </IconButton>
          ) : (
            <Box>
              <NavButton to="/" scrolling={scrolling}>
                Home
              </NavButton>
              <NavButton to="/about" scrolling={scrolling}>
                About
              </NavButton>
              <NavButton to="/events" scrolling={scrolling}>
                Events
              </NavButton>
              <NavButton to="/gallery" scrolling={scrolling}>
                Gallery
              </NavButton>
              <NavButton to="/team" scrolling={scrolling}>
                Team
              </NavButton>
              <NavButton to="/contact" scrolling={scrolling}>
                Contact
              </NavButton>
              {/* <NavButton to="/admin" scrolling={scrolling}>
                Admin
              </NavButton>
              <NavButton to="/developers" scrolling={scrolling}>
                Developers
              </NavButton> */}
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
