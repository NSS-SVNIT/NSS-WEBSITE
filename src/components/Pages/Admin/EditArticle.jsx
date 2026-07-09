import {
	Alert,
	Box,
	Button,
	Card,
	CardMedia,
	CircularProgress,
	Container,
	Dialog,
	DialogContent,
	DialogTitle,
	Grid,
	IconButton,
	ImageList,
	ImageListItem,
	ImageListItemBar,
	MenuItem,
	Select,
	Snackbar,
	Stack,
	TextField,
	Typography,
	useMediaQuery,
	useTheme,
} from "@mui/material";
import { collection, doc, getDocs, updateDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { firestore } from "../../../firebase";

export default function EditArticle() {
	const theme = useTheme();
	const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
	const [articles, setArticles] = useState([]);
	const [loading, setLoading] = useState(true);
	const [selectedArticle, setSelectedArticle] = useState(null);
	const [imageUrl, setImageUrl] = useState("");
	const [updating, setUpdating] = useState(false);
	const [snackbar, setSnackbar] = useState({
		open: false,
		message: "",
		severity: "success",
	});
	const [filterType, setFilterType] = useState("All");
	const [useLocalImage, setUseLocalImage] = useState(false);
	const [localImageName, setLocalImageName] = useState("");

	useEffect(() => {
		fetchArticles();
	}, []);

	const fetchArticles = async () => {
		try {
			const querySnapshot = await getDocs(collection(firestore, "articles"));
			const articlesData = querySnapshot.docs.map((doc) => ({
				id: doc.id,
				...doc.data(),
			}));
			setArticles(articlesData);
		} catch (error) {
			console.error("Error fetching articles:", error);
			setSnackbar({
				open: true,
				message: "Error fetching articles",
				severity: "error",
			});
		} finally {
			setLoading(false);
		}
	};

	const handleFilterChange = (event) => {
		setFilterType(event.target.value);
	};

	const filteredArticles =
		filterType === "All"
			? articles
			: articles.filter((article) => article.Type === filterType);

	const handleSelectArticle = (article) => {
		setSelectedArticle(article);
		setImageUrl(article.Image || "");
		setLocalImageName("");
		setUseLocalImage(false);
	};

	const handleUrlChange = (event) => {
		setImageUrl(event.target.value);
	};

	const handleLocalImageNameChange = (event) => {
		setLocalImageName(event.target.value);
	};

	const handleToggleLocalImage = () => {
		setUseLocalImage(!useLocalImage);
		if (!useLocalImage) {
			setImageUrl("");
		} else {
			setLocalImageName("");
		}
	};

	const handleUpdateImage = async () => {
		if (!selectedArticle) {
			setSnackbar({
				open: true,
				message: "Please select an article",
				severity: "error",
			});
			return;
		}

		let finalImageUrl;

		if (useLocalImage) {
			if (!localImageName) {
				setSnackbar({
					open: true,
					message: "Please enter a local image filename",
					severity: "error",
				});
				return;
			}
			finalImageUrl = `/assets/article-images/${localImageName}`;
		} else {
			if (!imageUrl) {
				setSnackbar({
					open: true,
					message: "Please enter an image URL",
					severity: "error",
				});
				return;
			}
			finalImageUrl = imageUrl;
		}

		try {
			setUpdating(true);

			// Update the article in Firestore
			await updateDoc(doc(firestore, "articles", selectedArticle.id), {
				Image: finalImageUrl,
			});

			setUpdating(false);
			setSnackbar({
				open: true,
				message: "Image updated successfully!",
				severity: "success",
			});

			// Refresh articles list
			await fetchArticles();

			// Update selected article with new image
			setSelectedArticle({
				...selectedArticle,
				Image: finalImageUrl,
			});
		} catch (error) {
			setUpdating(false);
			setSnackbar({
				open: true,
				message: "Error updating image: " + error.message,
				severity: "error",
			});
		}
	};

	const handleCloseSnackbar = () => {
		setSnackbar({ ...snackbar, open: false });
	};

	if (loading) {
		return (
			<Box
				sx={{
					display: "flex",
					justifyContent: "center",
					alignItems: "center",
					height: "50vh",
				}}>
				<CircularProgress />
			</Box>
		);
	}

	return (
		<Container maxWidth="lg" sx={{ py: 4 }}>
			<Typography variant="h4" gutterBottom>
				Edit Article Cover Images
			</Typography>
			<Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
				Select an article to update its cover image
			</Typography>

			<Box sx={{ mb: 3 }}>
				<Select
					value={filterType}
					onChange={handleFilterChange}
					sx={{ minWidth: 200 }}>
					<MenuItem value="All">All Types</MenuItem>
					<MenuItem value="Latest edition">Latest Edition</MenuItem>
					<MenuItem value="Magazine">Magazine</MenuItem>
					<MenuItem value="Camp Report">Camp Report</MenuItem>
					<MenuItem value="Annual Report">Annual Report</MenuItem>
				</Select>
			</Box>

			{selectedArticle ? (
				<Stack spacing={3}>
					<Card sx={{ maxWidth: 400, mx: "auto" }}>
						<CardMedia
							component="img"
							height="300"
							image={imageUrl || selectedArticle.Image}
							alt={selectedArticle.Title}
							sx={{ objectFit: "cover" }}
						/>
					</Card>

					<Typography variant="h6" align="center">
						{selectedArticle.Title}
					</Typography>
					<Typography variant="body2" align="center" color="text.secondary">
						Type: {selectedArticle.Type}
					</Typography>

					<Stack spacing={2} alignItems="center">
						<Button
							variant="outlined"
							onClick={handleToggleLocalImage}
							disabled={updating}
							sx={{ mb: 1 }}>
							{useLocalImage ? "Switch to URL" : "Switch to Local Image"}
						</Button>

						{useLocalImage ? (
							<>
								<Typography variant="body2" color="text.secondary">
									Place your images in: public/assets/article-images/
								</Typography>
								<TextField
									label="Image Filename"
									value={localImageName}
									onChange={handleLocalImageNameChange}
									fullWidth
									sx={{ maxWidth: 500 }}
									placeholder="example.jpg"
									disabled={updating}
									helperText="Enter just the filename, not the full path"
								/>
							</>
						) : (
							<TextField
								label="Image URL"
								value={imageUrl}
								onChange={handleUrlChange}
								fullWidth
								sx={{ maxWidth: 500 }}
								placeholder="https://example.com/image.jpg"
								disabled={updating}
							/>
						)}

						{(useLocalImage ? localImageName : imageUrl) && (
							<Button
								variant="contained"
								onClick={handleUpdateImage}
								disabled={updating}
								fullWidth
								sx={{ maxWidth: 300 }}>
								{updating ? "Updating..." : "Update Image"}
							</Button>
						)}

						<Button
							variant="outlined"
							onClick={() => setSelectedArticle(null)}
							disabled={updating}>
							Back to Articles List
						</Button>
					</Stack>

					{updating && (
						<Box sx={{ display: "flex", justifyContent: "center" }}>
							<CircularProgress />
						</Box>
					)}
				</Stack>
			) : (
				<ImageList
					cols={isMobile ? 1 : 3}
					gap={16}
					sx={{ width: "100%", height: "100%" }}>
					{filteredArticles.map((article) => (
						<ImageListItem
							key={article.id}
							sx={{
								cursor: "pointer",
								"&:hover": {
									opacity: 0.8,
								},
							}}
							onClick={() => handleSelectArticle(article)}>
							<img
								src={article.Image || "https://via.placeholder.com/300"}
								alt={article.Title}
								loading="lazy"
								style={{
									width: "100%",
									height: "200px",
									objectFit: "cover",
								}}
							/>
							<ImageListItemBar
								title={article.Title}
								subtitle={article.Type}
								position="below"
							/>
						</ImageListItem>
					))}
				</ImageList>
			)}

			{filteredArticles.length === 0 && !selectedArticle && (
				<Typography variant="body1" align="center" sx={{ mt: 4 }}>
					No articles found
				</Typography>
			)}

			<Snackbar
				open={snackbar.open}
				autoHideDuration={6000}
				onClose={handleCloseSnackbar}
				anchorOrigin={{ vertical: "bottom", horizontal: "center" }}>
				<Alert
					onClose={handleCloseSnackbar}
					severity={snackbar.severity}
					sx={{ width: "100%" }}>
					{snackbar.message}
				</Alert>
			</Snackbar>
		</Container>
	);
}
