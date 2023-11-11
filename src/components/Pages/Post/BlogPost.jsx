import { Box, Rating, Stack } from "@mui/material";
import React from "react";
import { ReactMarkdown } from "react-markdown/lib/react-markdown";
import remarkGfm from "remark-gfm";

export default function BlogPost(props) {
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
          <Rating value={4.5} precision={0.5} size="small"></Rating>
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
          <ReactMarkdown className="md" remarkPlugins={[remarkGfm]}>
            {props.content}
          </ReactMarkdown>
        </Box>
      </Stack>
    </Stack>
  );
}
