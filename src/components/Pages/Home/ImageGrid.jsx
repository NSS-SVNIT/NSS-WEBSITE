import * as React from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import ButtonBase from "@mui/material/ButtonBase";
import Container from "@mui/material/Container";
import { useState, useEffect } from 'react';
import { getStorage, ref, getDownloadURL } from '@firebase/storage';
import { Typography } from "@mui/material";
import { motion } from "framer-motion";
import { getStorage, ref, getDownloadURL, listAll } from '@firebase/storage';
import { useState, useEffect } from 'react';


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

export default function ImageGrid() {
  const [CulturalActivity, setCulturalActivity] = useState([]);
  const [Parade, setParade] = useState([]);
  const [Industrial, setIndustrial] = useState([]);
  const [Cleanliness, setCleanliness] = useState([]);
  const [Camp, setCamp] = useState([]);
  const [MorningRoutine, setMorningRoutine] = useState([]);
  const [Workshop, setWorkshop] = useState([]);
  const [AwarenessCampaign, setAwarenessCampaign] = useState([]);
  const [PlantationDrive, setPlantationDrive] = useState([]);
  const func = async() => {
    const storage = getStorage();
    const reference1 = ref(storage, 'aboutImages/Cultural.jpg');
    getDownloadURL(reference1).then((x)=>{setCulturalActivity(x);})

    const reference2 = ref(storage, 'aboutImages/Parade.jpg');
    getDownloadURL(reference2).then((x)=>{setParade(x);})

    const reference3 = ref(storage, 'aboutImages/Industrial.jpg');
    getDownloadURL(reference3).then((x)=>{setIndustrial(x);})

    const reference4 = ref(storage, 'aboutImages/Cleanliness.jpg');
    getDownloadURL(reference4).then((x)=>{setCleanliness(x);})

    const reference5 = ref(storage, 'aboutImages/Camp.jpg');
    getDownloadURL(reference5).then((x)=>{setCamp(x);})

    const reference6 = ref(storage, 'aboutImages/MorningRoutine.jpg');
    getDownloadURL(reference6).then((x)=>{setMorningRoutine(x);})

    const reference7 = ref(storage, 'aboutImages/workshops.png');
    getDownloadURL(reference7).then((x)=>{setWorkshop(x);})

    const reference8 = ref(storage, 'aboutImages/Plantation.jpg');
    getDownloadURL(reference8).then((x)=>{setPlantationDrive(x);})

    const reference9 = ref(storage, 'aboutImages/Awareness.jpg');
    getDownloadURL(reference9).then((x)=>{setAwarenessCampaign(x);})
}

useEffect(()=>{
  func()
}, []);
console.log(CulturalActivity);

const images = [
  {
    // url: "src/components/Pages/Home/photos/Cultural.jpg",
    url: CulturalActivity,
    title: "Cultural Activities",
    width: "40%",
  },
  {
    url: Parade,
    title: "Parade",
    width: "20%",
  },
  {
    url: Industrial,
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
    url: Cleanliness,
    // url: {c},
    title: "Cleanliness Drives",
    width: "20%",
  },
  {
    url: Camp,
    title: "Camps",
    width: "40%",
  },
  {
    url: MorningRoutine,
    title: "Morning Routines and Yoga Sessions",
    width: "40%",
  },
  {
    url: Workshop,
    title: "Workshops",
    width: "40%",
  },
  {
    // url: "src/components/Pages/Home/photos/Awareness.jpg",
    url: AwarenessCampaign,
    title: "Awareness Campaigns",
    width: "40%",
  },
  {
    url: PlantationDrive,
    title: "Plantation Drives",
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
