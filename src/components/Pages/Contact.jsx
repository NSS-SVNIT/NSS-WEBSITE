import React from "react";
import Layout from "../Layout/Layout";
import SendRoundedIcon from "@mui/icons-material/SendRounded";
import MailIcon from "@mui/icons-material/Mail";
import emailjs from "@emailjs/browser";
import Swal from "sweetalert2";
import { MapContainer, TileLayer, useMap, Popup, Marker } from "react-leaflet";

import {
  Box,
  Divider,
  Grid,
  List,
  ListItem,
  ListItemButton,
  Stack,
  FormControl,
  TextField,
  Typography,
  Button,
  ListItemText,
  ListItemIcon,
} from "@mui/material";
import { Facebook, Instagram, Twitter } from "@mui/icons-material";
const Contact = () => {
  const handleSubmit = (e) => {
    e.preventDefault();

    emailjs
      .sendForm(import.meta.env.VITE_EMAILJS_SERVICE_ID, import.meta.env.VITE_EMAILJS_TEMPLATE_ID, e.target, import.meta.env.VITE_EMAILJS_USER_ID)
      .then((result) => {
        console.log("Email sent successfully:", result.text);
        Swal.fire({
          icon: "success",
          title: "Message sent sucessfully 👍",
        });
      })
      .catch((error) => {
        console.log("Error sending email:", error);
        Swal.fire({
          icon: "error",
          title: "Something went wrong!",
          text: error.text,
        });
      });
    e.target.reset();
  };

  const position = [21.164583, 72.785239]; // Coordinates for SVnit location
  return (
    <Layout>
      <Typography
        variant="h1"
        alignItems="center"
        justifyContent="center"
        textAlign="center"
        paddingRight="50px"
      >
        GET IN TOUCH
      </Typography>
      <Grid container direction={"column"}>
        <Button
          variant="contained"
          style={{
            borderRadius: 0,
            textTransform: "none",
            height: "80px",
            width: "300px",
            marginTop: "10px",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "black",
            fontSize: "1.1rem",
            fontFamily: "DM Sans",
            margin: "0 auto",
          }}
          disableElevation
        >
          LOCATE US
        </Button>
        <Grid item lg={12} xs={4} sm={2} sx={{ px: 8, py: 4 }}>
          <MapContainer
            center={position}
            zoom={13}
            scrollWheelZoom={true}
            style={{ width: "100%" }}
          >
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <Marker position={position}>
              <Popup>
                <h1>Locate Us:</h1>
                <b>NSS SVNIT</b>
                <br />
                SVNIT,Icchchanath, <br /> Dumas Road,Surat
              </Popup>
            </Marker>
          </MapContainer>
        </Grid>
      </Grid>

      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Button
            variant="contained"
            style={{
              borderRadius: 0,
              textTransform: "none",
              height: "80px",
              width: "300px",
              // marginTop: "10px",
              margin: "10px 160px",
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: "black",
              fontSize: "1.1rem",
              fontFamily: "DM Sans",
            }}
            disableElevation
          >
            SEND YOUR MESSAGE HERE
          </Button>
          <Box
            // component="form"
            noValidate
            sx={{ m: 3, width: "80%" }}
          >
            <form autoComplete="off" onSubmit={handleSubmit}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="name"
                label="Name"
                name="name"
                autoComplete="name"
                autoFocus
                error={false}
                sx={{ width: "100%" }}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email"
                name="email"
                autoComplete="email"
                autoFocus
                sx={{ width: "100%" }}
              />
              <TextField
                margin="normal"
                multiline
                rows={5}
                required
                fullWidth
                id="message"
                label="Message"
                name="message"
                autoFocus
                sx={{ width: "100%" }}
              />
              <Button
                variant="contained"
                type="submit"
                endIcon={<SendRoundedIcon />}
                sx={{ mt: 2, backgroundColor: "black" }}
              >
                Send
              </Button>
            </form>
          </Box>
        </Grid>

        <Grid item xs={12} md={6}>
          <Button
            variant="contained"
            style={{
              borderRadius: 0,
              textTransform: "none",
              height: "80px",
              width: "300px",
              margin: "20px 160px",
              backgroundColor: "black",
              fontSize: "1.1rem",
              fontFamily: "DM Sans",
            }}
            disableElevation
          >
            CONTACT DETAILS
          </Button>
          <List>
            <ListItem disablePadding>
              <ListItemButton>
                <ListItemIcon>
                  <MailIcon />
                </ListItemIcon>
                <ListItemText primary="nss_svnit@gmail.com" />
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
              <ListItemButton>
              
                <ListItemIcon>
                  <Instagram />
                </ListItemIcon>
                <a href="https://www.instagram.com/nss_svnit" linkstyle='none'  text-decoration= "none">
                <ListItemText primary="@nss_svnit" />
                </a>
              </ListItemButton>

            </ListItem>
            <ListItem disablePadding>
              <ListItemButton>
                <ListItemIcon>
                  <Facebook />
                </ListItemIcon>
                <ListItemText primary="NSS-SVNIT" />
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
              <ListItemButton>
                <ListItemIcon>
                  <Twitter />
                </ListItemIcon>
                <ListItemText primary="nss_svnit" />
              </ListItemButton>
            </ListItem>
          </List>
        </Grid>
      </Grid>

      {/* </FormControl> */}
    </Layout>
  );
};

export default Contact;
