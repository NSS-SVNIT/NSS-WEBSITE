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
import { Facebook, Instagram, Twitter, YouTube } from "@mui/icons-material";

const Contact = () => {
  const handleSubmit = (e) => {
    e.preventDefault();

    emailjs
      .sendForm(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
        e.target,
        import.meta.env.VITE_EMAILJS_USER_ID
      )
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
  const linkStyle = {
    color: "inherit", // Inherit color from parent, which should be the default text color
    textDecoration: "none", // Remove underline
  };
  return (
    <Layout>
      <Typography
        variant="h1"
        alignItems="center"
        justifyContent="center"
        textAlign="center"
        paddingRight="50px"
        marginBottom="30px"
        fontWeight={400}
      >
        GET IN TOUCH
      </Typography>
      <Grid container direction={"column"}>
        <div
          style={{
            borderRadius: 0,
            textTransform: "none",
            height: "80px",
            width: "300px",
            marginTop: "10px",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "black",
            // fontSize: "1.1rem",
            fontFamily: "DM Sans",
            margin: "0 auto",
            color: "white",
            display: "flex",
            // flexDirection: "column",
            fontSize: "30px",
          }}
        >
          <span style={{ color: "grey", marginRight: "5px" }}>LOCATE </span>{" "}
          <span style={{ color: "white" }}>US</span>
        </div>
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
          <div
            style={{
              borderRadius: 0,
              textTransform: "none",
              height: "80px",
              width: "450px",
              marginTop: "10px",
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: "black",
              // fontSize: "1.1rem",
              fontFamily: "DM Sans",
              margin: "0 auto",
              color: "white",
              display: "flex",
              // flexDirection: "column",
              fontSize: "30px",
            }}
          >
            <span style={{ color: "grey", marginRight: "5px" }}>
              {" "}
              SEND YOUR{" "}
            </span>
            MESSAGE HERE
          </div>
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

        <Grid item xs={12} md={6} >
          <div
            style={{
              borderRadius: 0,
              textTransform: "none",
              height: "80px",
              width: "350px",
              marginTop: "10px",
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: "black",
              // fontSize: "1.1rem",
              fontFamily: "DM Sans",
              margin: "0 auto",
              color: "white",
              display: "flex",
              // flexDirection: "column",
              fontSize: "30px",
              marginBottom: "20px",
            }}
          >
            <span style={{ color: "grey", marginRight: "5px" }}>CONTACT</span>
            DETAILS
          </div>
          <List>
            <ListItem 
              component="a"
              href="mailto:nss@svnit.ac.in"
              target="_blank"
              rel="noopener noreferrer"
              style={linkStyle}
            >
              <ListItemIcon>
                <MailIcon />
              </ListItemIcon>
              <ListItemText primary="nss@svnit.ac.in" />
            </ListItem>
            <ListItem
              component="a"
              href="https://www.instagram.com/nss_svnit"
              target="_blank"
              rel="noopener noreferrer"
              style={linkStyle}
            >
              <ListItemIcon>
                <Instagram />
              </ListItemIcon>
              <ListItemText primary="@nss_svnit" />
            </ListItem>
            <ListItem
              component="a"
              href="https://www.facebook.com/p/NSS-SVNIT-100064799047910/"
              target="_blank"
              rel="noopener noreferrer"
              style={linkStyle}
            >
              <ListItemIcon>
                <Facebook />
              </ListItemIcon>
              <ListItemText primary="nss_svnit" />
            </ListItem>
            <ListItem
              component="a"
              href="https://twitter.com/nss_svnit"
              target="_blank"
              rel="noopener noreferrer"
              style={linkStyle}
            >
              <ListItemIcon>
                <Twitter />
              </ListItemIcon>
              <ListItemText primary="nss_svnit" />
            </ListItem>
            <ListItem
              component="a"
              href="https://www.youtube.com/@nsssvnit6353"
              target="_blank"
              style={linkStyle}
              rel="noopener noreferrer"
            >
              <ListItemIcon>
                <YouTube />
              </ListItemIcon>
              <ListItemText primary="NSS SVNIT" />
            </ListItem>
          </List>
        </Grid>
      </Grid>

      {/* </FormControl> */}
    </Layout>
  );
};

export default React.memo(Contact);
