import React from "react";

import { Stack, Box } from "@mui/material";

export default function PageHeader(props) {
  return (
    <Stack
      direction="column"
      sx={{
        pl: 10,
        fontFamily: "DM Sans",
        //   fontFamily: "Nothing You Could Do",
        // fontSize: "4rem",
        pt: 4,
      }}
    >
      <Box sx={{ fontSize: "4rem", fontFamily: "Nothing You Could Do" }}>
        {props.title}
        {/* <Divider /> */}
      </Box>
      <Box sx={{ fontSize: "1.5rem", py: 2, pr: 9 }}>{props.children}</Box>
    </Stack>
  );
}
