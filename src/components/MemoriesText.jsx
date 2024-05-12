import React, { memo } from "react";
import { Box, Button, Stack, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import './MemoriesText.css'
const Memories = memo(() => {
  return (
    <Box sx={{ flexBasis: "60%",maxWidth:{xs:"90%",sm:"100%"},ml:{xs:"15px",sm:"0px"} }}>
      <Typography
        sx={{
          fontSize: {xs:"3rem",sm:"5rem"},
          fontFamily: "Poppins",
          fontWeight: "100",
        }}
      >
        Collected awesome{" "}
        <Typography
          sx={{
            fontWeight: "400",
            fontSize: {xs:"4rem",sm:"6rem"},
            fontFamily: "Nothing You Could Do",
          }}
        >
          Memories
        </Typography>{" "}
        over the year...
      </Typography>
      <p
      className="memories-text"
      >
        NSS SVNIT organises various on-campus and off-campus activities aimed at
        the integration of the community and generating widespread awareness
        about prevailing social issues. We live by our motto
        <b> ‘Not Me But You.’ </b>
      </p>
      <Stack direction="row" gap={1} sx={{ pt: 5}}>
        <Link to="/gallery">
          <Button
            variant="outlined"
            style={{
              borderRadius: 0,
              textTransform: "none",
              height: "40px",
              color: "black",
              width: "200px",
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
