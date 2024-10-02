import React, { useEffect, useState, memo } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import { motion } from "framer-motion";
import ListItemText from "@mui/material/ListItemText";
import { Box,useMediaQuery } from "@mui/material";
import { firestore } from "../firebase";
import { collection, getDocs } from "firebase/firestore";

const MAXUPDATECOUNT = 2;
const UpdateCard = memo(() => {
	const [updates, setUpdates] = useState([]);
	const isMobile = useMediaQuery("(max-width:900px)");
	const fetchUpdates = async () => {
		await getDocs(collection(firestore, "updates")).then(
			(querySnapshot) => {
				const newData = querySnapshot.docs.map((doc) => ({
					...doc.data(),
					id: doc.id,
				}));
				newData.sort((a, b) =>  b.index - a.index);
				setUpdates(newData);
				// console.log(updates, newData);
			}
		);
	};

	useEffect(() => {
		fetchUpdates();
	}, []);

	return (
		<Card
			sx={{
				
				flexBasis: "30%",
				color: "#CCC",
				backdropFilter: "blur(10px)",
				backgroundColor: "rgba(0,0,0,0.1)",
				borderRadius: "10px ",
			}}
			elevation={0}>
			<CardContent>
				<motion.div
					animate={{ opacity: [0, 1] }}
					transition={{ duration: 0.5 }}>
					<Typography
						variant="h6"
						sx={{ fontFamily: "DM Sans", fontSize: "2rem" }}
						component="div">
						Latest Updates
					</Typography>
				</motion.div>
				{!isMobile&&updates.map((update, index) => (
					<motion.div
						key={index}
						animate={{ y: [(index + 1) * 20, 0] }}
						transition={{ duration: 0.5 }}>
						<Box
							sx={{
								fontFamily: "DM Sans",
								fontSize: "1.2rem",
								py: 1.3,
							}}
							key={index}>
								{update.text}
							<div style={{opacity:'.7'}}> - {update.date}</div>
						</Box>
					</motion.div>
				))}
				{isMobile&&updates.map((update, index) => (
					index<MAXUPDATECOUNT&&
					<motion.div
						key={index}
						animate={{ y: [(index + 1) * 20, 0] }}
						transition={{ duration: 0.5 }}>
						<Box
							sx={{
								fontFamily: "DM Sans",
								fontSize: "1.2rem",
								py: 1.3,
							}}
							key={index}>
								{update.text}
							<div style={{opacity:'.7'}}> - {update.date}</div>
						</Box>
					</motion.div>
				))}
			</CardContent>
		</Card>
	);
});

export default UpdateCard;
