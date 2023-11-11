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
        // width:{
        //   xs:"110%",
        // },
      }}
    >
      {/* <Box
        sx={{
          display: "flex",
          height: "75px",
          width: "75px",
          bgcolor: "#ECECEC",
          borderRadius: "50%",
          alignItems: "center",
          justifyContent: "center",
        }}
      > */}
        {/* <SettingsSuggestIcon sx={{ color: "gray", fontSize: "2rem" }} /> */}
      {/* </Box> */}
      {props.url && <img  height="150px" src={props.url} alt={props.title} />}
      <Box sx={{ fontFamily: "DM Sans", py: 1, fontSize: "1.8rem" }}>
        {props.title}
      </Box>
      <Box sx={{ fontFamily: "DM Sans", color: "gray" ,height:{
        xs:690,lg:300
      } }}>
       {props.about}
      </Box>
 </Stack> 
  );
}
