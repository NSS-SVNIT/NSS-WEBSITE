import { motion } from "framer-motion";
import { useState } from "react";
import { Box, Button, Typography, Modal, useMediaQuery } from "@mui/material";
import ButtonReadMore from "./ButtonReadMore";
import coin from "./coin.gif";
import document from "./document.gif";
import social from "./social.gif";
import technical from "./technical.gif";
import sports from "./sports.gif";
import creative from "./creative.gif";
import culture from "./culture.gif";
const AboutCommittee = () => {
	return <HorizontalScrollCarousel />;
};

const HorizontalScrollCarousel = () => {
	const isMobile = useMediaQuery("(max-width:600px)");
	return (
		<section>
			<div>
				<motion.div
					style={{
						flexDirection: isMobile ? "column" : "row",
						display: "flex",
						gap: "50px",
					}}
					className="gap-4">
					{cards.map((card) => {
						return (
							<div
								style={{
									padding: "0px 0px 0px 14px",
									width: "150px",
								}}>
								<Card card={card} />
							</div>
						);
					})}
				</motion.div>
			</div>
		</section>
	);
};

const Card = ({ card }) => {
	const isMobile = useMediaQuery("(max-width:900px)");
	const [openModal, setOpenModal] = useState(false);

	const handleOpenModal = () => {
		setOpenModal(true);
	};

	const handleCloseModal = () => {
		setOpenModal(false);
	};
	const reload = (e) => {
		e.target.src = e.target.src;
	};
	return (
		<div
			key={card.id}
			className="group relative h-[450px] w-[450px] overflow-hidden bg-neutral-200">
			<img
				onMouseEnter={reload}
				src={card.icon}
				style={{
					backgroundSize: "cover",
					backgroundPosition: "center",
					marginLeft: card.name == "Documentation" ? "-20px" : "0px",
				}}
				className="absolute inset-0 z-0 transition-transform duration-300 group-hover:scale-110"></img>
			<div className="absolute inset-0 z-10 grid place-content-center">
				<p className="bg-gradient-to-br from-white/20 to-white/0 p-8 text-6xl font-black uppercase text-white backdrop-blur-lg">
					<ButtonReadMore
						text={card.name}
						onClick={handleOpenModal}
					/>
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
								width: isMobile ? "80%" : "35%", // Adjust the width as needed
								padding: "20px", // Adjust padding values as needed
							}}>
							<Typography
								variant="h4"
								component="div"
								textAlign="center"
								marginBottom="20px">
								{card.name} Committee
							</Typography>
							<Typography textAlign="justify">
								{card.description}
							</Typography>
							<Button
								onClick={handleCloseModal}
								variant="outlined"
								sx={{
									marginTop: "15px",
									marginLeft: "0", // Align the button to the left
								}}>
								Close
							</Button>
						</Box>
					</Modal>
				</p>
			</div>
		</div>
	);
};

export default AboutCommittee;
const cards = [
	{
		id: 5,
		name: "Documentation",
		description:
			"The Documentation Committee maintains detailed records of event planning, meeting minutes, and creates reports. Their meticulous documentation fosters effective communication with the faculty advisor, promoting transparency and informed decision-making within the unit.",
		icon: document,
	},
	{
		id: "1",
		name: "Technical",
		description:
			"The NSS Technical Committee facilitates student engagement in engineering and technology by organizing projects, workshops, and industrial trips, promoting practical experiences to enhance technical skills and address societal challenges.",
		icon: technical,
	},
	{
		id: 2,
		name: "Sports",
		description:
			"The NSS Sports Committee prioritizes volunteers' physical health through morning routines and organizes sporting events. It manages discipline at NSS events and trains volunteers for the NSS parade, ensuring their overall well-being.",
		icon: sports,
	},
	{
		id: 3,
		name: "Social",
		description:
			"The Social Committee organizes diverse events and campaigns, promoting social engagement, personal development, and community service. From orphanage visits to awareness campaigns, the committee fosters connections with other NSS units and NGOs, utilizing social media for effective communication.",
		icon: social,
	},
	{
		id: 4,
		name: "Finance",
		description:
			"The Finance Committee handles all financial aspects, managing bills and obtaining admin approval. It educates volunteers on finance and money management, playing a crucial role in ensuring financial transparency within the NSS SVNIT Unit.",
		icon: coin,
	},
	{
		id: 6,
		name: "Creative",
		description:
			"The NSS Creative Committee utilizes creative abilities for the greater good, engaging in tasks from designing posters to video editing. It channels creativity to effectively promote welfare initiatives and spread messages that resonate with the audience.",
		icon: creative,
	},
	{
		id: 7,
		name: "Cultural",
		description:
			"The NSS Cultural Committee organizes diverse cultural events, providing a platform for talent expression in music, dance, and art. It promotes and preserves cultural heritage, encouraging student participation in celebrations that showcase their cultural identity.",
		icon: culture,
	},
];
