import { Box, Button, Stack } from "@mui/material";
import React, { memo } from "react";
import "./HeroText.css";

const HeroText = memo(() => {
  return (
    <Box sx={{ flexBasis: "60%" }}>
      <div className="glass">
        <h3
          style={{
            fontSize: "6rem",
            fontFamily: "Poppins",
            fontWeight: "100",
          }}
        >
          <span style={{ fontWeight: "400" }}>NSS SVNIT</span>
        </h3>

        <p
          style={{
            fontFamily: "DM Sans",
            fontSize: "1.5rem",
            fontWeight: "400",
          }}
        >
          Serving our community for a year and counting signifies the commitment
          and dedication of the National Service Scheme (NSS) towards making a
          positive impact on the community.
        </p>
        <Stack
          direction="row"
          gap={4}
          sx={{ pt: 2, alignItems: "center", justifyContent: "center" }}
        >
          {/* <Button
            variant="contained"
            style={{
              textTransform: "none",
              height: "40px",
              width: "150px",
              backgroundColor: "black",
              fontSize: "1.1rem",
              fontFamily: "DM Sans",
              margin: "10px",
              borderRadius: "10px",
            }}
            disableElevation
          >
            KNOW MORE
          </Button>
          <Button
            variant="outlined"
            style={{
              textTransform: "none",
              height: "40px",
              color: "black",
              width: "150px",
              border: "2px black solid",
              fontSize: "1.1rem",
              fontFamily: "DM Sans",
              margin: "10px",
              borderRadius: "10px",
            }}
            disableElevation
          >
            JOIN
          </Button> */}
        </Stack>
      </div>
    </Box>
  );
});

export default HeroText;
