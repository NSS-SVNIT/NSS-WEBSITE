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
        backgroundImage: `url(${bg})`,
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
