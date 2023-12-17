import React, { useState } from "react";
import { Box, Button, Stack, Typography, Modal } from "@mui/material";
import SettingsSuggestIcon from "@mui/icons-material/SettingsSuggest";
import { motion } from "framer-motion";
import ButtonReadMore from "./ButtonReadMore";

export default function ComitteeCard(props) {
  const [isHovered, setHovered] = useState(false);
  const [openModal, setOpenModal] = useState(false);

  const handleOpenModal = () => {
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  return (
    <Stack
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      sx={{
        bgcolor: "white",
        filter: "drop-shadow(2px 2px 15px rgba(0, 0, 0, 0.1))",
        p: 2,
        m: 0,
        borderRadius: "15px",
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
      {/* {props.url && <img height="150px" src={props.url} alt={props.title} />} */}
      <Typography
        component="span"
        style={{
          fontFamily: "'Material Symbols Outlined'",
          fontSize: "8rem",
          textAlign: "center",
          lineHeight: "1", // Adjust line height to remove extra space
          verticalAlign: "middle", // Align the icon vertically in the middle
        }}
      >
        {props.icon}
      </Typography>
      <Box
        sx={{
          fontFamily: "DM Sans",
          py: 1,
          fontSize: "1.8rem",
        }}
      >
        {props.title}
      </Box>
      {/* <Button variant="outlined">Read more...</Button> */}
      <ButtonReadMore onClick={handleOpenModal} />
      <Modal open={openModal} onClose={handleCloseModal}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            bgcolor: "white",
            boxShadow: 24,
            p: 3,
            borderRadius: "15px",
            width: "35%", // Adjust the width as needed
            padding: "20px", // Adjust padding values as needed
          }}
        >
          <Typography
            variant="h4"
            component="div"
            textAlign="center"
            marginBottom="20px"
          >
            {props.title} Committee
          </Typography>
          <Typography textAlign="justify">{props.about}</Typography>
          {/* <br /> */}
          <Button
            onClick={handleCloseModal}
            variant="outlined"
            sx={{
              marginTop: "15px",
              marginLeft: "0", // Align the button to the left
            }}
          >
            Close
          </Button>
          {/* <Box></Box> */}
        </Box>
      </Modal>
    </Stack>
  );
}
