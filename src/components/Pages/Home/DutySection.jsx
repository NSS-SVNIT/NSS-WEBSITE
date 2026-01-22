// DutySection.js
import React from "react";
import { Typography, Box, Container } from "@mui/material";
import { motion } from "framer-motion";
import ImageGrid from "./ImageGrid";

const DutySection = React.memo(() => {
	return (
		<Box sx={{ py: { xs: 8, md: 12 }, background: 'linear-gradient(180deg, #fdeeff 0%, #fff9ff 100%)' }}>
			<Container maxWidth="md">
				<motion.div
					initial={{ opacity: 0, y: 50 }}
					whileInView={{ opacity: 1, y: 0 }}
					viewport={{ once: true }}
					transition={{ duration: 0.8, ease: "easeOut" }}
				>
					<Typography
						variant="h2"
						component="h2"
						textAlign="center"
						sx={{
							fontFamily: "'Inria Sans', serif",
							fontWeight: 700,
							color: "#5A2A7A",
							mb: 3,
							fontSize: { xs: "2.5rem", md: "4rem" }
						}}
					>
						What We Do?
					</Typography>
					<Typography
						variant="h6"
						textAlign="center"
						color="text.secondary"
						sx={{
							fontFamily: "'DM Sans', sans-serif",
							maxWidth: "800px",
							mx: "auto",
							lineHeight: 1.7,
						}}
					>
						Spreading happiness through community service is our primary objective.
						With innovative activities across departments, we create small, happy,
						and memorable moments. We aim to bring about a positive change in
						society with a focus on education and development.
					</Typography>
				</motion.div>
			</Container>

			{/* The ImageGrid will follow directly after */}
			<ImageGrid />
		</Box>
	);
});

export default DutySection;