import * as React from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import ButtonBase from "@mui/material/ButtonBase";
import Container from "@mui/material/Container";
import { Typography } from "@mui/material";
import { motion } from "framer-motion";

const ImageBackdrop = styled("div")(({ theme }) => ({
  position: "absolute",
  left: 0,
  right: 0,
  top: 0,
  bottom: 0,
  background: "#000",
  opacity: 0.5,
  transition: theme.transitions.create("opacity"),
}));

const ImageIconButton = styled(ButtonBase)(({ theme }) => ({
  position: "relative",
  display: "block",
  padding: 0,
  borderRadius: 0,
  height: "40vh",
  [theme.breakpoints.down("md")]: {
    width: "100% !important",
    height: 100,
  },
  "&:hover": {
    zIndex: 1,
  },
  "&:hover .imageBackdrop": {
    opacity: 0.15,
  },
  "&:hover .imageMarked": {
    opacity: 0,
  },
  "&:hover .imageTitle": {
    border: "4px solid currentColor",
  },
  "& .imageTitle": {
    position: "relative",
    fontFamily: "DM Sans",
    fontWeight: "400",
    padding: `${theme.spacing(2)} ${theme.spacing(4)} 14px`,
  },
  "& .imageMarked": {
    height: 3,
    width: 18,
    background: theme.palette.common.white,
    position: "absolute",
    bottom: -2,
    left: "calc(50% - 9px)",
    transition: theme.transitions.create("opacity"),
  },
}));

const images = [
  {
    url: "https://wallpapers.com/images/featured/wl9pg3zeygysq0ps.jpg",
    title: "Old Age Home and Orphanage Visits",
    width: "40%",
  },
  {
    url: "src/components/Pages/Home/photos/Parade.jpeg",
    title: "Parade",
    width: "20%",
  },
  {
    url: "src/components/Pages/Home/photos/Industrial.jpg",
    title: "Industrial Visits and Projects",
    width: "40%",
  },
  // {
  //   url: "https://images.unsplash.com/photo-1453747063559-36695c8771bd?auto=format&fit=crop&w=400",
  //   title: "",
  //   width: "38%",
  // },
  // {
  //   url: "https://images.unsplash.com/photo-1523309996740-d5315f9cc28b?auto=format&fit=crop&w=400",
  //   title: "",
  //   width: "38%",
  // },
  // {
  //   url: "https://images.unsplash.com/photo-1506941433945-99a2aa4bd50a?auto=format&fit=crop&w=400",
  //   title: " Drives",
  //   width: "24%",
  // },
  {
    url: "src/components/Pages/Home/photos/Cleanliness.jpg",
    title: "Cleanliness Drives",
    width: "20%",
  },
  {
    url: "src/components/Pages/Home/photos/Camp.jpg",
    title: "Camps",
    width: "40%",
  },
  {
    url: "src/components/Pages/Home/photos/MorningRoutine.jpg",
    title: "Morning Routines and Yoga Sessions",
    width: "40%",
  },
  {
    url: "src/components/Pages/Home/photos/Workshops.png",
    title: "Workshops",
    width: "40%",
  },
  {
    url: "src/components/Pages/Home/photos/Awareness.jpg",
    title: "Awareness Campaigns",
    width: "40%",
  },
  {
    url: "https://images.unsplash.com/photo-1518136247453-74e7b5265980?auto=format&fit=crop&w=400",
    title: "Collection Drives",
    width: "20%",
  },
  // {
  //   url: "https://images.unsplash.com/photo-1518136247453-74e7b5265980?auto=format&fit=crop&w=400",
  //   title: "Education",
  //   width: "40%",
  // },
  // {
  //   url: "https://images.unsplash.com/photo-1518136247453-74e7b5265980?auto=format&fit=crop&w=400",
  //   title: "Talk Sessions",
  //   width: "20%",
  // },
  // {
  //   url: "https://images.unsplash.com/photo-1518136247453-74e7b5265980?auto=format&fit=crop&w=400",
  //   title: "Parade",
  //   width: "40%",
  // },
];

export default function ImageGrid() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 2 }}
    >
      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          px: 8,
          py: 2,
        }}
      >
        {images.map((image) => (
          <ImageIconButton
            key={image.title}
            style={{
              width: image.width,
              fontFamily: "DM Sans",
            }}
          >
            <Box
              sx={{
                position: "absolute",
                left: 0,
                right: 0,
                top: 0,
                bottom: 0,
                backgroundSize: "cover",
                backgroundPosition: "center 40%",
                backgroundImage: `url(${image.url})`,
              }}
            />
            <ImageBackdrop className="imageBackdrop" />
            <Box
              sx={{
                position: "absolute",
                left: 0,
                right: 0,
                top: 0,
                bottom: 0,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "common.white",
              }}
            >
              <Typography
                component="h3"
                variant="h6"
                color="inherit"
                className="imageTitle"
              >
                {image.title}
                <div className="imageMarked" />
              </Typography>
            </Box>
          </ImageIconButton>
        ))}
      </Box>
    </motion.div>
  );
}
