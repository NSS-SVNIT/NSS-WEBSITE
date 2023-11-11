import React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import { motion } from "framer-motion";
import ListItemText from "@mui/material/ListItemText";
import { Box } from "@mui/material";

const UpdateCard = () => {
  const updates = [
    "NSS Recruitment",
    "NSS Orientation",
    "Summer Camp",
    "Winter Camp",
    "Aur bhi kuch kuch",
    "Aur bhi bohot kuch",
  ];

  return (
    <Card
      sx={{
        flexBasis: "30%",
        color: "#CCC",
        backdropFilter: "blur(10px)",
        backgroundColor: "rgba(0,0,0,0.1)",
        borderRadius: "10px ",
      }}
      elevation={0}
    >
      <CardContent>
        <motion.div
          animate={{ opacity: [0, 1] }}
          transition={{ duration: 0.5 }}
        >
          <Typography
            variant="h6"
            sx={{ fontFamily: "DM Sans", fontSize: "2rem" }}
            component="div"
          >
            Latest Updates
          </Typography>
        </motion.div>
        {updates.map((update, index) => (
          <motion.div
            key={index}
            animate={{ y: [(index + 1) * 20, 0] }}
            transition={{ duration: 0.5 }}
          >
            <Box
              sx={{ fontFamily: "DM Sans", fontSize: "1.2rem", py: 1.3 }}
              key={index}
            >
              - {update}
            </Box>
          </motion.div>
        ))}
      </CardContent>
    </Card>
  );
};

export default UpdateCard;
