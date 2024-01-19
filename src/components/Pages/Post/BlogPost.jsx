import { Box, Rating, Stack, Typography } from "@mui/material";
import React from "react";
import { ReactMarkdown } from "react-markdown/lib/react-markdown";
import remarkGfm from "remark-gfm";

const BlogPost = React.memo((props) => {
  const today = new Date();
  const year = today.getFullYear();
  const month = today.getMonth() + 1; // Note: months are zero-based
  const day = today.getDate();

  const date = `${day}/${month}/${year}`;

  return (
    <Stack alignItems={"center"} sx={{ px: 5, width: "100%" }}>
      <Stack sx={{ width: "100%" }}>
        <Box
          sx={{
            fontFamily: "Poppins",
            fontWeight: "400",
            pl: 0,
            color: "gray",
          }}
        >
          Published on <u>{props.date}</u>
        </Box>
        <Box sx={{ fontFamily: "DM Sans", fontSize: "4em", width: "100%" }}>
          {props.title}
        </Box>
        <Stack
          direction="row"
          justifyContent={"space-between"}
          alignItems={"flex-end"}
        >
          <Box sx={{ fontFamily: "DM Sans", color: "grey" }}>
            by <u>@{props.author}</u>
          </Box>
        </Stack>
        <Box
          sx={{
            bgcolor: "rgba(0,0,0,0.2)",
            fontFamily: "DM Sans",
            color: "gray",
            mt: 2,
            display: "inline-block",
            width: "fit-content",
            px: 1,
            py: 0.5,
            borderRadius: 1,
          }}
        >
          {props.readingTime} minute read
        </Box>
        <Box sx={{ width: "100%" }}>
          <Typography
            className="md"
            remarkPlugins={[remarkGfm]}
            sx={{ wordWrap: "break-word" }}
          >
            {props.content}
          </Typography>
        </Box>
      </Stack>
    </Stack>
  );
});

export default BlogPost;
