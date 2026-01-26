// ComitteeSection.js
import React from "react";
import { Box, Grid, Container, Typography } from "@mui/material";
import { motion } from "framer-motion";
import CommitteeCard from "./CommitteeCard"; // We will use the new card

// Import your GIFs here
import coin from "./coin.gif";
import document from "./document.gif";
import social from "./social.gif";
import technical from "./technical.gif";
import sports from "./sports.gif";
import creative from "./creative.gif";
import culture from "./culture.gif";

// --- Data Configuration ---
// It's cleaner to keep the data in the parent component.
const committeesData = [
	{ id: 1, slug: "technical", name: "Technical", icon: technical, description: "The NSS Technical Committee facilitates student engagement in engineering and technology by organizing projects, workshops, and industrial trips, promoting practical experiences to enhance technical skills and address societal challenges." },
	{ id: 2, slug: "sports", name: "Sports", icon: sports, description: "The NSS Sports Committee prioritizes volunteers' physical health through morning routines and organizes sporting events. It manages discipline at NSS events and trains volunteers for the NSS parade, ensuring their overall well-being." },
	{ id: 3, slug: "social", name: "Social", icon: social, description: "The Social Committee organizes diverse events and campaigns, promoting social engagement, personal development, and community service. From orphanage visits to awareness campaigns, the committee fosters connections with other NSS units and NGOs, utilizing social media for effective communication." },
	{ id: 4, slug: "finance", name: "Finance", icon: coin, description: "The Finance Committee handles all financial aspects, managing bills and obtaining admin approval. It educates volunteers on finance and money management, playing a crucial role in ensuring financial transparency within the NSS SVNIT Unit." },
	{ id: 5, slug: "documentation", name: "Documentation", icon: document, description: "The Documentation Committee maintains detailed records of event planning, meeting minutes, and creates reports. Their meticulous documentation fosters effective communication with the faculty advisor, promoting transparency and informed decision-making within the unit." },
	{ id: 6, slug: "creative", name: "Creative", icon: creative, description: "The NSS Creative Committee utilizes creative abilities for the greater good, engaging in tasks from designing posters to video editing. It channels creativity to effectively promote welfare initiatives and spread messages that resonate with the audience." },
	{ id: 7, slug: "cultural", name: "Cultural", icon: culture, description: "The NSS Cultural Committee organizes diverse cultural events, providing a platform for talent expression in music, dance, and art. It promotes and preserves cultural heritage, encouraging student participation in celebrations that showcase their cultural identity." },
];

// --- Framer Motion Variants ---
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

const ComitteeSection = React.memo(() => {
	const firstRow = committeesData.slice(0, 2);
	const middleRow = committeesData.slice(2, 5);
	const lastRow = committeesData.slice(5);

	return (
		<Box sx={{ py: { xs: 8, md: 12 }, background: ' linear-gradient(180deg, #f5faff 0%, #eef6ff 100%)' }}>
			<Container maxWidth="lg">
				<motion.div
					initial={{ opacity: 0, y: 50 }}
					whileInView={{ opacity: 1, y: 0 }}
					viewport={{ once: true }}
					transition={{ duration: 0.8 }}
				>
					<Typography
						variant="h2"
						component="h2"
						textAlign="center"
						sx={{
							fontFamily: "'Inria Sans', serif",
							fontWeight: 700,
							color: "#5A2A7A",
							mb: { xs: 6, md: 8 },
							fontSize: { xs: "2.5rem", md: "4rem" }
						}}
					>
						Our Committees
					</Typography>
				</motion.div>
				
				<Grid container spacing={4}>
					<Grid
						container
						item
						xs={12}
						spacing={4}
						justifyContent="center"
						component={motion.div}
						variants={containerVariants}
						initial="hidden"
						whileInView="visible"
						viewport={{ once: true, amount: 0.2 }}
					>
						{firstRow.map((committee) => (
							<Grid item xs={12} sm={6} md={6} key={committee.id}>
								<CommitteeCard title={committee.name} icon={committee.icon} slug={committee.slug} />
							</Grid>
						))}
					</Grid>

					<Grid
						container
						item
						xs={12}
						spacing={4}
						justifyContent="center"
						component={motion.div}
						variants={containerVariants}
						initial="hidden"
						whileInView="visible"
						viewport={{ once: true, amount: 0.2 }}
					>
						{middleRow.map((committee) => (
							<Grid item xs={12} sm={6} md={4} key={committee.id}>
								<CommitteeCard title={committee.name} icon={committee.icon} slug={committee.slug} />
							</Grid>
						))}
					</Grid>

					<Grid
						container
						item
						xs={12}
						spacing={4}
						justifyContent="center"
						component={motion.div}
						variants={containerVariants}
						initial="hidden"
						whileInView="visible"
						viewport={{ once: true, amount: 0.2 }}
					>
						{lastRow.map((committee) => (
							<Grid item xs={12} sm={6} md={6} key={committee.id}>
								<CommitteeCard title={committee.name} icon={committee.icon} slug={committee.slug} />
							</Grid>
						))}
					</Grid>
				</Grid>
			</Container>
		</Box>
	);
});

export default ComitteeSection;