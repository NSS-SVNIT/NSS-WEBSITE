// ArticleGrid.jsx

import React, { useState, useEffect } from "react";
import { Box, Grid, Typography, Alert, Skeleton } from "@mui/material";
import { getDocs, collection, where, query } from "firebase/firestore";
import { firestore } from "../../../firebase";
import ArticleCard from "./ArticleCard";
import { motion } from "framer-motion";

// --- Animation Variants ---
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: "easeOut",
    },
  },
};


// Skeleton loader that matches the new card's aspect ratio
const ArticleCardSkeleton = () => (
	<Grid item xs={6} sm={6} md={4}>
		<Skeleton variant="rectangular" sx={{ borderRadius: 4, width: '100%', aspectRatio: '3 / 4' }} />
	</Grid>
);

const ArticleGrid = React.memo(({ title, firestoreFilter }) => {
	const [articles, setArticles] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);

	useEffect(() => {
		const fetchArticles = async () => {
			try {
				setLoading(true);
                setError(null); // Reset error on new fetch
				const q = query(
					collection(firestore, "articles"),
					where(firestoreFilter.field, firestoreFilter.operator, firestoreFilter.value)
				);
				const querySnapshot = await getDocs(q);
				const postsData = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
				setArticles(postsData);
			} catch (err) {
				console.error("Error fetching articles:", err);
				setError("Failed to load articles. Please try again later.");
			} finally {
				setLoading(false);
			}
		};

		fetchArticles();
	}, [firestoreFilter]); // Dependency array is correct

	return (
		<Box sx={{ flexGrow: 1, py: { xs: 4, md: 8 } }}>
			
			{/* --- NEW ANIMATED HEADING --- */}
			<motion.div initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.5 }} variants={itemVariants}>
				<Typography
					variant="h2"
					sx={{
						textAlign: 'center',
						mb: 6,
						fontWeight: 300,
						fontSize: { xs: '2.2rem', sm: '3rem' },
						color: 'text.secondary',
						position: 'relative', // for the underline
						display: 'inline-block', // makes the underline fit the text width
						left: '50%', // centering trick
						transform: 'translateX(-50%)', // centering trick
						
						// The stylish underline
						'&::after': {
							content: '""',
							position: 'absolute',
							left: '50%',
							bottom: '-12px',
							transform: 'translateX(-50%)',
							width: '60%',
							height: '4px',
							backgroundColor: 'primary.main',
							borderRadius: '2px',
						}
					}}
				>
					{title.grey}{' '}
					<span style={{ fontWeight: 700, color: "text.primary" }}>
						{title.white}
					</span>
				</Typography>
			</motion.div>


			{/* --- CONTENT --- */}
			{loading && (
				<Grid container spacing={4} justifyContent="center">
					{[...Array(3)].map((_, index) => <ArticleCardSkeleton key={index} />)}
				</Grid>
			)}
			{error && <Alert severity="error">{error}</Alert>}
			{!loading && !error && (
				<motion.div initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.1 }} variants={containerVariants}>
					<Grid
						container
						spacing={4}
						alignItems="stretch"
						justifyContent={articles.length === 1 ? "center" : "flex-start"}
					>
						{articles.length > 0 ? (
							articles.map((article) => (
								<Grid item xs={6} sm={6} md={4} key={article.id}>
									{/* Wrap card in motion.div for staggered animation */}
									<motion.div variants={itemVariants} style={{ height: '100%' }}>
										<ArticleCard
											name={article.Title}
											description={article.Description}
											image={article.Image}
											download={article.Download}
											flipbook={article.flipbook}
										/>
									</motion.div>
								</Grid>
							))
						) : (
							<Grid item xs={12}>
                                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                                    <Typography textAlign="center" color="text.secondary" sx={{ py: 8 }}>
                                        No articles found in this category.
                                    </Typography>
                                </motion.div>
							</Grid>
						)}
					</Grid>
				</motion.div>
			)}
		</Box>
	);
});

export default ArticleGrid;