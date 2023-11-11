import { Box, Stack } from "@mui/material";
import React from "react";

export default function SimpleNavBar() {
  return (
    <Stack
      direction="row"
      justifyContent={"space-between"}
      alignItems={"center"}
      sx={{ px: 8, py: 2, fontFamily: "DM Sans" }}
    >
      <Box sx={{ fontSize: "2rem" }}>Logo</Box>
      <Stack direction="row" spacing={2}>
        <Box>Link </Box>
        <Box>Link </Box>
        <Box>Link </Box>
        <Box>Link </Box>
      </Stack>
    </Stack>
  );
}
