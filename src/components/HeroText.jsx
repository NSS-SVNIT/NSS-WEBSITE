import { Box, Button, Stack } from "@mui/material";
import React from "react";

export default function HeroText() {
  return (
    <Box sx={{ flexBasis: "60%" }}>
      <h1
        style={{ fontSize: "6rem", fontFamily: "Poppins", fontWeight: "100" }}
      >
        {" "}
        <span style={{ fontWeight: "400" }}>NSS SVNIT</span>
      </h1>
      <p
        style={{ fontFamily: "DM Sans", fontSize: "1.5rem", fontWeight: "400" }}
      >
        Serving our community for a year and counting signifies the commitment
        and dedication of the National Service Scheme (NSS) towards making a
        positive impact on the community
      </p>
      <Stack direction="row" gap={1} sx={{ pt: 2 }}>
        <Button
          variant="contained"
          style={{
            borderRadius: 0,
            textTransform: "none",
            height: "40px",
            width: "150px",

            backgroundColor: "black",
            fontSize: "1.1rem",
            fontFamily: "DM Sans",
          }}
          disableElevation
        >
          KNOW MORE
        </Button>
        {/* <Button
          variant="outlined"
          style={{
            borderRadius: 0,
            textTransform: "none",
            height: "40px",
            color: "black",
            width: "150px",
            border: "2px black solid",
            fontSize: "1.1rem",
            fontFamily: "DM Sans",
          }}
          disableElevation
        >
          JOIN
        </Button> */}
      </Stack>
    </Box>
  );
}
