import React from "react";
import { Stack, Box, Grid } from "@mui/material";
import ComitteeCard from "./CommitteeCard";
import { motion } from "framer-motion";

import Example from "./Example";
const ComitteeSection = React.memo(() => {
	// const comittees = [
	// 	{
	// 		name: "Technical",
	// 		description:
	// 			"The NSS Technical Committee facilitates student engagement in engineering and technology by organizing projects, workshops, and industrial trips, promoting practical experiences to enhance technical skills and address societal challenges.",
	// 		icon: doc,
	// 	},
	// 	{
	// 		name: "Sports",
	// 		description:
	// 			"The NSS Sports Committee prioritizes volunteers' physical health through morning routines and organizes sporting events. It manages discipline at NSS events and trains volunteers for the NSS parade, ensuring their overall well-being.",
	// 		icon: "sports_soccer",
	// 	},
	// 	{
	// 		name: "Social",
	// 		description:
	// 			"The Social Committee organizes diverse events and campaigns, promoting social engagement, personal development, and community service. From orphanage visits to awareness campaigns, the committee fosters connections with other NSS units and NGOs, utilizing social media for effective communication.",
	// 		icon: "volunteer_activism",
	// 	},
	// 	{
	// 		name: "Finance",
	// 		description:
	// 			"The Finance Committee handles all financial aspects, managing bills and obtaining admin approval. It educates volunteers on finance and money management, playing a crucial role in ensuring financial transparency within the NSS SVNIT Unit.",
	// 		icon: "currency_exchange",
	// 	},
	// 	{
	// 		name: "Documentation",
	// 		description:
	// 			"The Documentation Committee maintains detailed records of event planning, meeting minutes, and creates reports. Their meticulous documentation fosters effective communication with the faculty advisor, promoting transparency and informed decision-making within the unit.",
	// 		icon: "description",
	// 	},
	// 	{
	// 		name: "Creative",
	// 		description:
	// 			"The NSS Cultural Committee organizes diverse cultural events, providing a platform for talent expression in music, dance, and art. It promotes and preserves cultural heritage, encouraging student participation in celebrations that showcase their cultural identity.",
	// 		icon: logo,
	// 	},
	// 	{
	// 		name: "Cultural",
	// 		description:
	// 			"The NSS Creative Committee utilizes creative abilities for the greater good, engaging in tasks from designing posters to video editing. It channels creativity to effectively promote welfare initiatives and spread messages that resonate with the audience.",
	// 		icon: "attractions",
	// 	},
	// ];

	return (
		<Stack>
			<Box
				sx={{
					fontFamily: "DM Sans",
					fontSize: "4rem",
					px: 8,
					textAlign: "center",
					m: 5,
					pl: "15px",
					pr: "40px",
				}}>
				About Our Committees
			</Box>
			<Grid
				container
				direction="row"
				justifyContent="center"
				alignItems="center"
				spacing={2}
				sx={{ px: 8, py: 6 }}>
				{/* {comittees.map((title, index) => (
					<Grid item xs={6} lg={3} key={index}>
						<motion.div
							initial={{ opacity: 0, y: (index + 1) * 10 }}
							whileInView={{ opacity: 1, y: 0 }}
							viewport={{ once: true }}
							transition={{ duration: 1 }}>
							<ComitteeCard
								title={title.name}
								about={title.description}
								icon={title.icon}
							/>
						</motion.div>
					</Grid>
				))} */}
				<Example />
			</Grid>
		</Stack>
	);
});

export default ComitteeSection;
