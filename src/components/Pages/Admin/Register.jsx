import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import GoogleIcon from "@mui/icons-material/Google";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Google } from "@mui/icons-material";
import { firestore } from "../../../firebase";
import { analytics } from "../../../firebase";
import { setDoc, doc } from "firebase/firestore";
import { logEvent } from "firebase/analytics";

function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Facing problems ?"} <br /> {"Contact "}
      <Link
        color="inherit"
        href="mailto://svnitnss@gmail.com"
        target="blank"
      >
        NSS SVNIT
      </Link>
      {" for help."}
    </Typography>
  );
}

// TODO remove, this demo shouldn't need to reset the theme.

const defaultTheme = createTheme();

export default function SignIn(props) {
  const handleSubmit = async (event) => {
    event.preventDefault();
    // console.log("sdf");
    const data = new FormData(event.currentTarget);

    const formData = {
      access: false,
      name: data.get("name"),
      post: data.get("post"),
    };
    logEvent(analytics, "executive_application", formData);

    await setDoc(doc(firestore, "executives", data.get("email")), formData);
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
           SIGN IN
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 1 }}
          >
            <TextField
              margin="normal"
              required
              fullWidth
              id="name"
              label="Name"
              name="name"
              autoComplete="email"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              // autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="post"
              label="Post"
            />

            {/* <Button
              type="submit"
              onSubmit={handleSubmit}
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Apply
            </Button> */}
            <Button
              fullWidth
              onClick={props.handleSignIn}
              sx={{ boxShadow: 1, color: "blue" }}
            >
              <Google sx={{ mr: "8px" }} />
              Sign In
            </Button>
          </Box>
        </Box>
        <Copyright sx={{ mt: 8, mb: 4 }} />
      </Container>
    </ThemeProvider>
  );
}
