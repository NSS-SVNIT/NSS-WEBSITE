import { motion, useTransform, useScroll } from "framer-motion";
import { useRef, useState } from "react";
import { Box, Button, Stack, Typography, Modal } from "@mui/material";
import ButtonReadMore from "./ButtonReadMore";
import coin from "./coin.gif";
import document from "./document.gif";
import social from "./social.gif";
import technical from './technical.gif'
import sports from './sports.gif'
import creative from './creative.gif'
import culture from './culture.gif'
const Example = () => {
	return (
		<div
			className="bg-neutral-800"
			style={{ display: "flex", flexDirection: "row" }}>
			<HorizontalScrollCarousel />
		</div>
	);
};

const HorizontalScrollCarousel = () => {
	const targetRef = useRef(null);
	const { scrollYProgress } = useScroll({
		target: targetRef,
	});

	const x = useTransform(scrollYProgress, [0, 1], ["95%", "-90%"]);

	return (
		<section ref={targetRef} className="relative h-[300vh] bg-neutral-900">
			<div className="sticky top-0 flex h-screen items-center overflow-hidden">
				<motion.div
					style={{
						x,
						flexDirection: "row",
						display: "flex",
						gap: "48px",
					}}
					className="gap-4">
					{cards.map((card) => {
						return <Card card={card} />;
					})}
				</motion.div>
			</div>
		</section>
	);
};

const Card = ({ card }) => {
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
			// onMouseEnter={() => setHovered(true)}
			onMouseLeave={() => setHovered(false)}
			key={card.id}
			className="group relative h-[450px] w-[450px] overflow-hidden bg-neutral-200">
			<img
				onMouseEnter={reload}
				src={card.icon}
				style={{
					// backgroundImage: `url(${card.icon})`,
					backgroundSize: "cover",
					backgroundPosition: "center",
					height: "150px",
				}}
				className="absolute inset-0 z-0 transition-transform duration-300 group-hover:scale-110"></img>
			<div className="absolute inset-0 z-10 grid place-content-center">
				<p className="bg-gradient-to-br from-white/20 to-white/0 p-8 text-6xl font-black uppercase text-white backdrop-blur-lg">
					{/* {card.name} */}
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
								width: "35%", // Adjust the width as needed
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
							{/* <br /> */}
							<Button
								onClick={handleCloseModal}
								variant="outlined"
								sx={{
									marginTop: "15px",
									marginLeft: "0", // Align the button to the left
								}}>
								Close
							</Button>
							{/* <Box></Box> */}
						</Box>
					</Modal>
				</p>
			</div>
		</div>
	);
};

export default Example;
const cards = [
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
		id: 5,
		name: "Documentation",
		description:
			"The Documentation Committee maintains detailed records of event planning, meeting minutes, and creates reports. Their meticulous documentation fosters effective communication with the faculty advisor, promoting transparency and informed decision-making within the unit.",
		icon: document,
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
		description:"The NSS Cultural Committee organizes diverse cultural events, providing a platform for talent expression in music, dance, and art. It promotes and preserves cultural heritage, encouraging student participation in celebrations that showcase their cultural identity.",
		icon: culture,
	},
];