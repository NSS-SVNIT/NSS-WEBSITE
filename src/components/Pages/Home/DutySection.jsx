import React from "react";
import { Stack, Box } from "@mui/material";
import ImageGrid from "./ImageGrid";

export default function DutySection() {
  return (
    <Stack>
      <Box
        sx={{
          // textAlign: "center",
          bgcolor: "black",
          color: "white",
          fontFamily: "DM Sans",
          fontSize: "4rem",
          px: 8,
          pt: 2,
        }}
      >
        What we do ?
      </Box>
      <Box
        sx={{
          // textAlign: "center",
          bgcolor: "black",
          color: "white",
          fontFamily: "DM Sans",
          fontSize: "1.2rem",
          px: 8,
          py: 2,
        }}
      >
        Spreading happiness through community service has been one of the
        primary objectives of NSS. With innovative activities across the
        departments catering to all classes of the campus residents, we try to
        create small, happy and memorable moments in their lives. We aim to
        bring about a positive change in the society with focus on education and
        development.
      </Box>

      <Stack sx={{ bgcolor: "black" }}>
        <ImageGrid />
      </Stack>
    </Stack>
  );
}
