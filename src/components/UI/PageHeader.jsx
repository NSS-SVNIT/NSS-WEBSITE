import React, { memo } from "react";
import { Stack, Typography, Box,useMediaQuery } from "@mui/material";

const PageHeader = memo((props) => {
  const isMobile = useMediaQuery("(max-width:900px)");
  return (
    <Stack
      direction="column"
      sx={{
        pl: isMobile?5:10,
        fontFamily: "DM Sans",
        pt: 4,
      }}
    >
      <Typography variant="h1" sx={{ fontWeight: 400 }}>
        {props.title}
      </Typography>
      <Box sx={{ fontSize: isMobile?"1.1rem":"1.5rem", py: 2, pr: isMobile?3:9 }}>
        {props.children}
      </Box>
    </Stack>
  );
});

export default PageHeader;
