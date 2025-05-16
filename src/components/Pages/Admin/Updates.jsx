import { Box, Stack, useMediaQuery, useTheme } from "@mui/material";
import SortableList from "./SortableList";

export default function Updates() {
	const theme = useTheme();
	const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

	return (
		<Stack
			sx={{
				fontFamily: "DM Sans",
				width: "100%",
				alignItems: "center",
			}}>
			<Box
				sx={{
					width: isMobile ? "100%" : "80%",
					maxWidth: "600px",
				}}>
				<SortableList />
			</Box>
			{/* <TextField variant="filled" fullWidth label="New Update" /> */}
		</Stack>
	);
}
