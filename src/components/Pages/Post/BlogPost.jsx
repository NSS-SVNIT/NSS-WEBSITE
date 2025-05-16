import { Box, Stack, Typography } from "@mui/material";
import React from "react";
import { Typewriter } from "react-simple-typewriter";
import remarkGfm from "remark-gfm";

const BlogPost = React.memo((props) => {
	const today = new Date();
	const year = today.getFullYear();
	const month = today.getMonth() + 1; // Note: months are zero-based
	const day = today.getDate();
	// const date = `${day}/${month}/${year}`;

	// const hrStyle = {
	//   height: "1px",
	//   width: "100%",
	//   backgroundColor: "black",
	//   border: "none",
	//   margin: "10px 0", // Adjust the margin as needed
	// };

	return (
		<Stack alignItems={"center"} sx={{ px: 5, width: "100%" }}>
			<Stack sx={{ width: "100%" }}>
				<Box
					sx={{
						fontFamily: "DM Sans",
						fontSize: "4em",
						width: "100%",
					}}>
					<Typewriter
						words={props.title && props.title.split()}
						typeSpeed={70}
					/>
				</Box>
				<Stack
					direction="row"
					justifyContent={"space-between"}
					alignItems={"flex-end"}>
					<Box sx={{ fontFamily: "DM Sans", color: "grey" }}>
						{props.eventDate && (
							<div>
								Date: <u>{props.eventDate}</u>
							</div>
						)}
						{props.venue && (
							<div>
								Venue: <u>{props.venue}</u>
							</div>
						)}
					</Box>
				</Stack>
				<br />
				{props.description && (
					<Typography>Summary: {props.description}</Typography>
				)}
				<br />
				{props.content && (
					<Box sx={{ width: "100%" }}>
						<Typography
							className="md"
							remarkPlugins={[remarkGfm]}
							sx={{
								wordWrap: "break-word",
								textAlign: "justify",
							}}>
							{props.content}
						</Typography>
					</Box>
				)}
			</Stack>
		</Stack>
	);
});

export default BlogPost;
