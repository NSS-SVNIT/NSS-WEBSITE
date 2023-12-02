import {
  Box,
  Divider,
  Grid,
  List,
  ListItem,
  ListItemButton,
  Stack,
} from "@mui/material";
import React from "react";
import { MapContainer, TileLayer, useMap, Popup, Marker } from "react-leaflet";
import FooterLogo from "./FooterLogo";
import { FaInstagram, FaFacebook, FaTwitter, FaEnvelope } from "react-icons/fa";
import { Link } from "react-router-dom";

const Footer = () => {
  // const position = [21.1702, 72.8311]; // Coordinates for SVnit location

  const isPhone = false;
  const linkStyle = {
    color: "white",
    fontWeight: "semi-bold", // You can adjust the font weight as needed
    textDecoration: "none", // Optional: Remove underline style
  };

  const hrStyle = {
    height: "2px",
    width: "100%",
    backgroundColor: "white",
    border: "none",
    margin: "20px 0", // Adjust the margin as needed
  };

  const linkStyleIcon = {
    color: "white",
    fontWeight: "bold",
    textDecoration: "none",
    marginRight: "20px", // Adjust the margin as needed
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
      }}
    >
      <Grid
        container
        direction="row"
        justifyContent="space-around"
        alignItems="center"
      >
        <Grid item lg={3} xs={12}>
          <FooterLogo />
        </Grid>
        <Grid item lg={6} xs={8} justifyContent="center">
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              marginRight: "0px",
              // marginLeft: "30px",
            }}
          >
            <Link to="/admin" style={linkStyle}>
              Admin
            </Link>
            {/* Use Link component for routing */}
            <Link to="/developers" style={linkStyle}>
              Developers
            </Link>
            <a style={linkStyle}>Third Link</a>
            <a style={linkStyle}>Fourth Link</a>
          </div>
          <hr style={hrStyle} />
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              // justifyContent: "space-between",
              justifyContent: "flex-end",
            }}
          >
            <a href="https://www.instagram.com/nss_svnit" style={linkStyleIcon}>
              <FaInstagram size={30} />
            </a>
            <a href="https://www.facebook.com/p/NSS-SVNIT-100064799047910/" style={linkStyleIcon}>
              <FaFacebook size={30} />
            </a>
            <a href="https://twitter.com/nss_svnit" style={linkStyleIcon}>
              <FaTwitter size={30} />
            </a>
            <Link to="/contact" style={linkStyle}>
              <FaEnvelope size={30} />
            </Link>
          </div>
        </Grid>
      </Grid>
      {/* <Grid item lg={2} xs={12}>
          <ListItem
            sx={{ fontSize: "1.6rem", fontWeight: "bold", color: "white" }}
          >
            WEBSITE
          </ListItem>
          <ListItem>Developers</ListItem>
          <ListItem>Contribute</ListItem>
          <ListItem>Source</ListItem>
          <ListItem
            sx={{ fontSize: "1.6rem", fontWeight: "bold", color: "white" }}
          >
            ADDRESS
          </ListItem>
          <ListItem>
            Ichchhanath Surat- Dumas, Road, Keval Chowk, Surat, Gujarat 395007
          </ListItem>
        </Grid> */}

      {/* <Grid item lg={3} xs={12}>
          <MapContainer center={position} zoom={13} scrollWheelZoom={false}>
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <Marker position={position}>
              <Popup>
                A pretty CSS3 popup. <br /> Easily customizable.
              </Popup>
            </Marker>
          </MapContainer>
        </Grid> */}
      {/* <Grid item>
            <Box>
              <List>
                NSS Svnit Surat
                <ListItemButton>About us</ListItemButton>
                <ListItemButton>Meet the team</ListItemButton>
                <ListItemButton>Contact US </ListItemButton>
              </List>
            </Box>
</Grid>
            <Box>
              <List component="nav" aria-aria-label="main mailbox folders">
                COMPANY
                <ListItemButton>About</ListItemButton>
                <ListItemButton>Careers</ListItemButton>
                <ListItemButton>Blog</ListItemButton>
                <ListItemButton>Shop</ListItemButton>
              </List>
            </Box>
            <Box>
              <List component="nav" aria-aria-label="main mailbox folders">
                CONTACT
                <ListItemButton>Discord</ListItemButton>
                <ListItemButton>Twitter</ListItemButton>
                <ListItemButton>Github</ListItemButton>
                <ListItemButton>Email</ListItemButton>
              </List>
            </Box>
        <Grid item>
          <div>
            <MapContainer center={position} zoom={13} scrollWheelZoom={false}>
              <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
              <Marker position={position}>
                <Popup>
                  A pretty CSS3 popup. <br /> Easily customizable.
                </Popup>
              </Marker>
            </MapContainer>
          </div> */}
      {/* </Grid> */}
    </footer>
  );
};

export default Footer;
