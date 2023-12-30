import React, { memo } from "react";
import { Box, Button, Stack } from "@mui/material";
import { Link } from "react-router-dom";

const Memories = memo(() => {
  return (
    <Box sx={{ flexBasis: "60%" }}>
      <h6
        style={{
          fontSize: "5rem",
          fontFamily: "Poppins",
          fontWeight: "100",
        }}
      >
        Collected awesome{" "}
        <span
          style={{
            fontWeight: "400",
            fontSize: "6rem",
            fontFamily: "Nothing You Could Do",
          }}
        >
          Memories
        </span>{" "}
        over the year...
      </h6>
      <p
        style={{
          fontFamily: "DM Sans",
          fontSize: "1.5rem",
          fontWeight: "400",
          paddingTop: "20px",
        }}
      >
        NSS SVNIT organises various on-campus and off-campus activities aimed at
        the integration of the community and generating widespread awareness
        about prevailing social issues. We live by our motto
        <b> ‘Not Me But You.’ </b>
      </p>
      <Stack direction="row" gap={1} sx={{ pt: 5 }}>
        <Link to="/gallery">
          <Button
            variant="outlined"
            style={{
              borderRadius: 0,
              textTransform: "none",
              height: "40px",
              color: "black",
              width: "200PX",
              border: "2px black solid",
              fontSize: "1.1rem",
              fontFamily: "DM Sans",
            }}
            disableElevation
          >
            EXPLORE GALLERY
          </Button>
        </Link>
      </Stack>
    </Box>
  );
});

export default Memories;
