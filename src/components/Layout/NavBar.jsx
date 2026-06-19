import LocationOnIcon from '@mui/icons-material/LocationOn';
import MenuIcon from "@mui/icons-material/Menu";
import {
  Avatar,
  Stack,
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
  background: "rgba(26, 32, 44, 0.85)",
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

  // Desktop nav links
  const DesktopNavLinks = (
    <Stack direction="row" spacing={scrolling ? 2.5 : 1.5}>
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
          py: scrolling ? 0.25 : 0.5,         // 🔽 reduced height
          px: { xs: 1.5, md: 3, lg: 6 },
          transition: "all 0.3s ease-in-out",
        }}
        elevation={scrolling ? 8 : 0}
      >
        <Toolbar
          disableGutters
          sx={{
            minHeight: { xs: 56, md: 64 },     // 🔽 tighter toolbar
            px: { xs: 1.5, md: 2 },
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          {/* LEFT GROUP */}
          <Stack direction="row" alignItems="center" spacing={3}>
            <NavLink to="/" onClick={scrollToTop}>
              <Avatar
                alt="NSS Logo"
                src={nsslogo}
                sx={{ width: { xs: 36, md: 48 }, height: { xs: 36, md: 48 } }} // 🔽 smaller logo
              />
            </NavLink>

            <NavLink
              to="/"
              style={{ textDecoration: "none", color: currentTheme.textColor }}
              onClick={scrollToTop}
            >
              <Typography
                sx={{
                  fontFamily: "DM Sans",
                  fontSize: { xs: "1rem", md: "1.3rem" }, // 🔽 slightly smaller
                  fontWeight: "bold",
                  whiteSpace: "nowrap",
                }}
              >
                {isPhone || scrolling ? "NSS SVNIT" : "National Service Scheme, SVNIT"}
              </Typography>
            </NavLink>

            {!isPhone && !scrolling && DesktopNavLinks}
          </Stack>

          {/* RIGHT GROUP */}
          {isPhone ? (
            <IconButton
              size="large"
              edge="end"
              aria-label="menu"
              onClick={handleMenuClick}
              sx={{ color: currentTheme.textColor }}
            >
              <MenuIcon />
            </IconButton>
          ) : (
            <>
              {!scrolling && (
                <Stack direction="row" alignItems="center" sx={{ color: currentTheme.textColor }}>
                  <Box sx={{ textAlign: "right" }}>
                    <Typography variant="body2" sx={{ fontWeight: "bold" }}>
                      Sardar Vallabhbhai National Institute of Technology
                    </Typography>
                    <Typography variant="caption">
                      Ichchhanath, Surat, Gujarat - 395007
                    </Typography>
                  </Box>
                  <LocationOnIcon sx={{ ml: 1, fontSize: "2.2rem" }} /> {/* 🔽 slightly smaller */}
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
