import { Box, Stack, Typography } from "@mui/material";
import React from "react";
import { Typewriter } from "react-simple-typewriter";
import remarkGfm from "remark-gfm";

const BlogPost = React.memo((props) => {
	return (
		<Stack alignItems={"center"} sx={{ px: 5, width: "100%" }}>
			<Stack sx={{ width: "100%" }}>
				<Box
					sx={{
						fontFamily: "DM Sans",
						fontSize: "3em",
						width: "100%",
					}}>
					{props.title}
				</Box>
				<Stack
					direction="row"
					justifyContent={"space-between"}
					alignItems={"flex-end"}>
					<Box
						sx={{
							fontFamily: "DM Sans",
							color: "grey",
							fontStyle: "italic",
						}}>
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
				{props.image && (
					<Box
						sx={{
							mb: 2,
							width: "100%",
							height: "80%",
							borderRadius: 1,
							overflow: "hidden",
						}}>
						<img
							src={props.image}
							alt={props.title || "Event Image"}
							style={{
								width: "100%",
								maxHeight: "80%",
								objectFit: "cover",
							}}
						/>
					</Box>
				)}

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
