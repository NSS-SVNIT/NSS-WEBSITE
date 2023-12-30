import React, { memo } from "react";
import { Stack, Typography, Box } from "@mui/material";

const PageHeader = memo((props) => {
  return (
    <Stack
      direction="column"
      sx={{
        pl: 10,
        fontFamily: "DM Sans",
        pt: 4,
      }}
    >
      <Typography variant="h1" sx={{ fontWeight: 400 }}>
        {props.title}
      </Typography>
      <Box sx={{ fontSize: "1.5rem", py: 2, pr: 9 }}>
        {props.children}
      </Box>
    </Stack>
  );
});

export default PageHeader;
