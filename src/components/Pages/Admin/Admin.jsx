import React, { useEffect, useState } from "react";
import Layout from "../../Layout/Layout";
import { Grid } from "@mui/material";
import { auth } from "../../../firebase";
import { GoogleAuthProvider, signInWithPopup, signOut } from "@firebase/auth";
import { Button } from "@mui/material";
import DashBoard from "./DashBoard";

export default function Admin() {
  const [logged, setLogged] = useState(false);
  const provider = new GoogleAuthProvider();
  const logginFields = ["name", "email", "profilePic", "loggedIn"];

  const handleSignIn = () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        const name = result.user.displayName;
        const email = result.user.email;
        const profilePic = result.user.photoURL;
        setLogged(true);

        localStorage.setItem("loggedIn", true);
        localStorage.setItem("name", name);
        localStorage.setItem("email", email);
        localStorage.setItem("profilePic", profilePic);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleSignOut = () => {
    signOut(auth)
      .then(() => {
        setLogged(false);
        logginFields.map((field) => localStorage.removeItem(field));
      })
      .catch((err) => console.log(err));
  };

  return (
    <Layout>
      <Grid container>
        {logged ? (
          <Grid item>
            <Button onClick={handleSignOut}>SIGN OUT</Button>
          </Grid>
        ) : (
          <Grid item>
            <Button onClick={handleSignIn}>SIGN IN</Button>
          </Grid>
        )}

        <DashBoard />
      </Grid>
    </Layout>
  );
}
