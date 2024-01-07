import React from "react";
import { Grid } from "@mui/material";
import HeroText from "../../HeroText";
import bg from "../../../assets/bg1.png";
import UpdateCard from "../../UpdateCard";

const HeroSection = React.memo(() => {
  const isPhone = false;
  return (
    <div
      style={{
        marginTop: "-64px",
        backgroundImage: `url(https://firebasestorage.googleapis.com/v0/b/nss-svnit.appspot.com/o/bg1.png?alt=media&token=8cbad320-e909-46f7-b003-5368a97204c5)`,
        height: "100vh",
        backgroundSize: "cover", // Adjust the background size property
        backgroundPosition: "center", // Center the background image
      }}
    >
      <Grid
        container
        lg={12}
        height="100%"
        direction="row"
        justifyContent="space-between"
        sx={{ px: 10 }}
        gap={6}
        alignItems={"center"}
      >
        <Grid item lg={7} sx={12}>
          <HeroText />
        </Grid>
        <Grid item lg={4} sx={12}>
          <UpdateCard />
        </Grid>
      </Grid>
    </div>
  );
});

export default HeroSection;
