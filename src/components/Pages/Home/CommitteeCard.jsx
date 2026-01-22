// CommitteeCard.js
import React, { useState } from "react";
import { Box, Button, Typography, Modal, Paper } from "@mui/material";
import { motion } from "framer-motion";
import ButtonReadMore from "./ButtonReadMore"; // Assuming this is your styled button

// Framer motion variant for each card to animate in
const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: { y: 0, opacity: 1, transition: { duration: 0.6, ease: 'easeOut' } },
};

const CommitteeCard = React.memo(({ title, icon, about }) => {
	const [openModal, setOpenModal] = useState(false);

	const handleOpenModal = () => setOpenModal(true);
	const handleCloseModal = () => setOpenModal(false);

	// Function to restart GIF on hover for a cool effect
	const reloadGif = (e) => {
		e.target.src = e.target.src;
	};

	return (
		<>
			<Paper
				component={motion.div}
				variants={itemVariants}
				elevation={2}
				sx={{
					p: 3,
					textAlign: 'center',
					borderRadius: 4,
					height: '100%',
					display: 'flex',
					flexDirection: 'column',
					transition: 'transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out',
					'&:hover': {
						transform: 'translateY(-8px)',
						boxShadow: '0px 16px 32px rgba(90, 42, 122, 0.2)',
					}
				}}
			>
				<Box
					sx={{
						height: 180,
						display: 'flex',
						alignItems: 'center',
						justifyContent: 'center',
						mb: 2,
					}}
				>
					<img
						src={icon}
						alt={`${title} committee icon`}
						onMouseEnter={reloadGif}
						style={{ maxHeight: '100%', maxWidth: '100%' }}
					/>
				</Box>
				
				<Typography
					variant="h5"
					component="h3"
					sx={{
						fontFamily: "'DM Sans', sans-serif",
						fontWeight: 'bold',
						flexGrow: 1, // Pushes the button to the bottom
						mb: 2,
					}}
				>
					{title}
				</Typography>

				<ButtonReadMore onClick={handleOpenModal} text="Read More" />
			</Paper>

			<Modal open={openModal} onClose={handleCloseModal} closeAfterTransition>
				<motion.div
					initial={{ opacity: 0, scale: 0.9 }}
					animate={{ opacity: 1, scale: 1 }}
					exit={{ opacity: 0, scale: 0.9 }}
				>
					<Box sx={{
						position: "absolute",
						top: "50%",
						left: "50%",
						transform: "translate(-50%, -50%)",
						bgcolor: "background.paper",
						boxShadow: 24,
						borderRadius: 4,
						width: { xs: "90%", md: "50%", lg: "35%" },
						maxWidth: '600px',
						overflow: 'hidden',
					}}>
						<Box sx={{ bgcolor: '#5A2A7A', p: 2 }}>
							<Typography variant="h5" component="h2" sx={{ color: 'white', fontFamily: "'Inria Sans', serif" }}>
								{title} Committee
							</Typography>
						</Box>
						<Box sx={{ p: 3 }}>
							<Typography textAlign="justify" sx={{ mb: 3 }}>
								{about}
							</Typography>
							<Button
								onClick={handleCloseModal}
								variant="outlined"
								sx={{
									color: '#5A2A7A',
									borderColor: '#5A2A7A',
									'&:hover': {
										backgroundColor: 'rgba(90, 42, 122, 0.08)',
										borderColor: '#5A2A7A',
									}
								}}
							>
								Close
							</Button>
						</Box>
					</Box>
				</motion.div>
			</Modal>
		</>
	);
});

export default CommitteeCard;