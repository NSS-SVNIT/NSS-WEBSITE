import { Box, Divider, Grid, List, ListItemButton, Stack } from "@mui/material";
import React from "react";
import { MapContainer, TileLayer, useMap, Popup, Marker } from "react-leaflet";
import FooterLogo from "./FooterLogo";

const Footer = () => {
  const position = [21.1702, 72.8311]; // Coordinates for SVnit location

  const isPhone = false;

  return (
    <footer style={{ backgroundColor: "black", color: "white" }}>
      <Grid
        container
        direction={"column"}
        alignItems="center"
        justifyContent={"space-around"}
      >
        <Grid item>
          <FooterLogo />
        </Grid>
        <Grid item>
          <Stack>
            <Box>
              <List component="nav" aria-aria-label="main mailbox folders">
                NSS Svnit Surat
                <ListItemButton>About us</ListItemButton>
                <ListItemButton>Meet the team</ListItemButton>
                <ListItemButton>Contact US </ListItemButton>
              </List>
            </Box>

            <Box>
              <List component="nav" aria-aria-label="main mailbox folders">
                COMPANY
                <ListItemButton>About</ListItemButton>
                <ListItemButton>Careers</ListItemButton>
                <ListItemButton>Blog</ListItemButton>
                <ListItemButton>Shop</ListItemButton>
              </List>
            </Box>

            {/* <p
          style={{ textAlign: "center", fontSize: "1.5rem", fontWeight: "200" }}
        >
          Made with 💞, by{" "} */}
            {/* <a
            target="blank"
            href="https://barik.super.site"
            style={{
              textDecoration: "none",
              fontFamily: "Arvo",
              fontWeight: "600",
              fontSize: "1.8rem",
              color: "black",
            }}
          >
            barik.
          </a> */}
            {/* </p> */}

            <Box>
              <List component="nav" aria-aria-label="main mailbox folders">
                CONTACT
                <ListItemButton>Discord</ListItemButton>
                <ListItemButton>Twitter</ListItemButton>
                <ListItemButton>Github</ListItemButton>
                <ListItemButton>Email</ListItemButton>
              </List>
            </Box>
          </Stack>
        </Grid>
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
          </div>
        </Grid>
      </Grid>
    </footer>
  );
};

export default Footer;
