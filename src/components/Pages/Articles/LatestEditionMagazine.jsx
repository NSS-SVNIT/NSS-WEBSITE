import { useMediaQuery } from "@mui/material";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import { collection, getDocs, query, where } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { firestore } from "../../../firebase";
import ArticleCard from "./ArticleCard";

const LatestEdition = React.memo((props) => {
	const isMobile = useMediaQuery("(max-width:900px)");
	const [post, setPost] = useState([]);
	const fetchPosts = async () => {
		const q = query(
			collection(firestore, "articles"),
			where("Type", "==", "Latest edition")
		);
		return getDocs(q).then((posts) => setPost(posts.docs));
	};

	useEffect(() => {
		fetchPosts();
	}, []);

	return (
		<Box>
			<div style={{ fontFamily: "DM Sans", overflowX: "hidden" }}></div>
			<Box
				sx={{
					margin: "20px auto",
					px: isMobile ? 0 : 8,
					py: isMobile ? 2 : 4,
					fontSize: isMobile ? "1.7rem" : "3rem",
					backgroundColor: "black",
					fontFamily: "DM Sans",
					color: "grey",
					width: isMobile ? "100%" : "35%",
					textAlign: "center",
				}}>
				LATEST{" "}
				<span style={{ fontWeight: 400, color: "white" }}>EDITION</span>
			</Box>

			{!isMobile && <br />}
			<Box
				style={{
					paddingLeft: "80px",
					paddingRight: "80px",
					display: "flex",
					justifyContent: "center",
				}}>
				{!isMobile && <br />}
				<Box>
					<Grid
						container
						spacing={{ xs: 2, md: 3 }}
						columns={{ xs: 4, sm: 8, md: 12 }}>
						{post.map((posts) => (
							<Grid item xs={2} sm={4} md={4} key={posts.id}>
								<ArticleCard
									name={posts.data().Title}
									description={posts.data().Description}
									type={posts.data().Type}
									image={posts.data().Image}
									download={posts.data().Download}
									flipbook={
										posts.data().flipbook
									}></ArticleCard>
							</Grid>
						))}
					</Grid>
				</Box>
			</Box>
		</Box>
	);
});

export default LatestEdition;
