import React from "react";
import { Stack, Box, Grid } from "@mui/material";
import ComitteeCard from "./CommitteeCard";
import { motion } from "framer-motion";
import AboutCommittee from "./AboutCommittee";

const ComitteeSection = React.memo(() => {
	return (
		<Stack>
			<Box
				sx={{
					fontFamily: "Inria Sans",
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
				<AboutCommittee />
			</Grid>
		</Stack>
	);
});

export default ComitteeSection;
