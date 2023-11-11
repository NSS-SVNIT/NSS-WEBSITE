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

const Footer = () => {
  const position = [21.1702, 72.8311]; // Coordinates for SVnit location

  const isPhone = false;

  return (
    <footer
      style={{
        backgroundColor: "black",
        color: "gray",
        fontSize: "1.2rem",
        paddingTop: 30,
        fontFamily: "DM Sans",
      }}
    >
      <Grid container direction={"row"} justifyContent={"space-around"}>
        <Grid item lg={3} xs={12}>
          <FooterLogo />
        </Grid>
        <Grid item lg={1} xs={12} justifySelf={"center"}>
          <ListItem
            sx={{ fontSize: "1.6rem", fontWeight: "bold", color: "white" }}
          >
            SOCIALS
          </ListItem>
          <ListItem>Discord</ListItem>
          <ListItem>Twitter</ListItem>
          <ListItem>Github</ListItem>
          <ListItem>Email</ListItem>
          <ListItem
            sx={{ fontSize: "1.6rem", fontWeight: "bold", color: "white" }}
          ></ListItem>
        </Grid>

        <Grid item lg={1} xs={12}>
          <ListItem
            sx={{ fontSize: "1.6rem", fontWeight: "bold", color: "white" }}
          >
            LINKS
          </ListItem>
          <ListItem>About</ListItem>
          <ListItem>Events</ListItem>
          <ListItem>Gallery</ListItem>
          <ListItem>Contact</ListItem>
          <ListItem>Alumini</ListItem>
          <ListItem>Articles</ListItem>
        </Grid>
        <Grid item lg={2} xs={12}>
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
        </Grid>

        <Grid item lg={3} xs={12}>
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
        </Grid>
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
      </Grid>
    </footer>
  );
};

export default Footer;
