import React, { useState } from "react";
import { Box, Stack } from "@mui/material";
import SettingsSuggestIcon from "@mui/icons-material/SettingsSuggest";
import { motion } from "framer-motion";

export default function ComitteeCard(props) {
  const [isHovered, setHovered] = useState(false);
  return (
    <Stack
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      sx={{
        bgcolor: "white",
        filter: "drop-shadow(2px 2px 15px rgba(0, 0, 0, 0.1))",
        p: 2,
        m: 0,
        borderRadius: "8px",
      }}
    >
      <Box
        sx={{
          display: "flex",
          height: "75px",
          width: "75px",
          bgcolor: "#ECECEC",
          borderRadius: "50%",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {/* <SettingsSuggestIcon sx={{ color: "gray", fontSize: "2rem" }} /> */}
      </Box>
      <Box sx={{ fontFamily: "DM Sans", py: 1, fontSize: "1.8rem" }}>
        {props.title}
      </Box>
      <Box sx={{ fontFamily: "DM Sans", color: "gray" }}>
        Lorem Ipsum is simply dummy text of the printing and typesetting
        industry. Lorem Ipsum has been the industry standard dummy text ever
        since the 1500s, when an unknown printer took a galley of type and
        scrambled.
      </Box>
    </Stack>
  );
}
