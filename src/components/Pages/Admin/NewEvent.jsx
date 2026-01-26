import {
	Alert,
	Box,
	Button,
	CircularProgress,
	Snackbar,
	Stack,
	TextField,
	Typography,
	useMediaQuery,
	useTheme,
} from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import Compressor from "compressorjs";
import { doc, setDoc } from "firebase/firestore";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { useEffect, useRef, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { firestore, storage } from "../../../firebase";
import { CustomDateFnsAdapter } from "../../../utils/dateFnsAdapter";
import BlogPost from "../Post/BlogPost";

export default function NewEvent() {
	const theme = useTheme();
	const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
	const today = new Date();
	const year = today.getFullYear();
	const month = today.getMonth() + 1;
	const day = today.getDate();
	const [text, setText] = useState(``);
	const date = `${day}/${month}/${year}`;
	const [snackbarOpen, setSnackbarOpen] = useState(false);
	const [snackbarMessage, setSnackbarMessage] = useState("");
	const [snackbarSeverity, setSnackbarSeverity] = useState("success");
	const [selectedDate, setSelectedDate] = useState(today);
	const [readingTime, setReadingTime] = useState("1");
	const [previewMode, setPreviewMode] = useState(false);

	// Image upload states
	const [uploading, setUploading] = useState(false);
	const [uploadProgress, setUploadProgress] = useState(0);
	const fileInputRef = useRef(null);
	const [imageFile, setImageFile] = useState(null);
	const [imagePreview, setImagePreview] = useState(null);

	// Format date manually for Eventdate
	const formatEventdate = (date) => {
		const months = [
			"January",
			"February",
			"March",
			"April",
			"May",
			"June",
			"July",
			"August",
			"September",
			"October",
			"November",
			"December",
		];
		const day = date.getDate();
		const month = months[date.getMonth()];
		const year = date.getFullYear();
		return `${day} ${month} ${year}`;
	};

	const initPostData = {
		date: date, // Today's date (when the event was created)
		title: "",
		timestamp: today.getTime(), // For sorting events
		content: [], // Content paragraphs
		Eventdate: formatEventdate(today), // Actual date of the event
		Venue: "",
		description: "",
		image: "",
		readingTime: "1", // Automatically calculated
	};
	const handleSubmit = async () => {
		try {
			const uuid = uuidv4();
			// Ensure timestamp is current
			postData["timestamp"] = new Date().getTime();

			// Validate required fields
			if (!postData.title.trim()) {
				setSnackbarMessage("Please enter a title for the event");
				setSnackbarSeverity("error");
				setSnackbarOpen(true);
				return;
			}

			if (!postData.Venue.trim()) {
				setSnackbarMessage("Please enter a Venue for the event");
				setSnackbarSeverity("error");
				setSnackbarOpen(true);
				return;
			}

			if (!postData.description.trim()) {
				setSnackbarMessage("Please enter a description for the event");
				setSnackbarSeverity("error");
				setSnackbarOpen(true);
				return;
			}

			if (!text.trim()) {
				setSnackbarMessage("Please enter content for the event");
				setSnackbarSeverity("error");
				setSnackbarOpen(true);
				return;
			}

			// Check if an image has been selected but not uploaded
			if (imageFile && !postData.image) {
				setSnackbarMessage(
					"Please upload the selected image before publishing"
				);
				setSnackbarSeverity("warning");
				setSnackbarOpen(true);
				return;
			}

			// Ensure content is properly formatted as an array of paragraphs
			const contentArray = text
				.split("\n")
				.filter((paragraph) => paragraph.trim().length > 0);

			if (contentArray.length === 0) {
				setSnackbarMessage("Please enter valid content for the event");
				setSnackbarSeverity("error");
				setSnackbarOpen(true);
				return;
			}

			// Prepare final data with proper content array
			const finalPostData = {
				...postData,
				content: contentArray,
			};

			// Upload to Firebase
			await setDoc(doc(firestore, "posts", uuid), finalPostData); // Show success message with event ID for reference
			setSnackbarMessage(
				`Event "${postData.title}" successfully created! (ID: ${uuid})`
			);
			setSnackbarSeverity("success");
			setSnackbarOpen(true);

			// Reset form
			setPostData(initPostData);
			setText("");
			setSelectedDate(today);

			// Consider redirecting to events page or showing a more detailed success dialog
			localStorage.setItem("lastCreatedEventId", uuid);
			localStorage.setItem("lastCreatedEventTitle", postData.title);
		} catch (error) {
			console.error("Error creating event:", error);
			setSnackbarMessage("Error creating event: " + error.message);
			setSnackbarSeverity("error");
			setSnackbarOpen(true);
		}
	};

	const [postData, setPostData] = useState(initPostData);

	function handleChange(field) {
		return (event) => {
			setPostData((prev) => ({
				...prev,
				[field]: event.target.value,
			}));
		};
	}

	function handleTextChange(e) {
		const newText = e.target.value;
		setText(newText);

		// Calculate reading time based on content length
		// Average reading speed is about 200-250 words per minute
		// We'll use a simple formula: words / 200 = minutes
		const contentWords = newText.trim() ? newText.split(/\s+/).length : 0;
		const descriptionWords = postData.description
			? postData.description.split(/\s+/).length
			: 0;
		const wordCount = contentWords + descriptionWords;

		// Ensure minimum reading time is 1 minute, and round up
		const calculatedTime = Math.max(1, Math.ceil(wordCount / 200));

		setReadingTime(calculatedTime.toString());

		setPostData((prev) => ({
			...prev,
			content: newText.split("\n"),
			readingTime: calculatedTime.toString(),
		}));
	}
	// Handle date picker change
	const handleDateChange = (newDate) => {
		setSelectedDate(newDate);
		setPostData((prev) => ({
			...prev,
			Eventdate: formatEventdate(newDate),
		}));
	};
	// Update reading time when description changes
	useEffect(() => {
		if (text || postData.description) {
			const contentWords = text
				? text.split(/\s+/).filter((word) => word.trim().length > 0)
						.length
				: 0;
			const descriptionWords = postData.description
				? postData.description
						.split(/\s+/)
						.filter((word) => word.trim().length > 0).length
				: 0;

			const wordCount = contentWords + descriptionWords;
			// Average reading speed: 200 words per minute
			const calculatedTime = Math.max(1, Math.ceil(wordCount / 200));

			setReadingTime(calculatedTime.toString());

			setPostData((prev) => ({
				...prev,
				readingTime: calculatedTime.toString(),
			}));
		}
	}, [postData.description, text]);

	// Reset preview mode when switching to mobile view
	useEffect(() => {
		if (isMobile && previewMode) {
			setPreviewMode(false);
		}
	}, [isMobile]);
	const handleSnackbarClose = () => {
		setSnackbarOpen(false);
	}; // Helper function to reset the form
	const resetForm = () => {
		// Add confirmation if there's data in the form
		if (
			postData.title ||
			postData.description ||
			text ||
			imageFile ||
			postData.image
		) {
			if (
				window.confirm(
					"Are you sure you want to reset the form? All entered data will be lost."
				)
			) {
				setPostData(initPostData);
				setText("");
				setSelectedDate(today);
				setReadingTime("1");
				setImageFile(null);
				setImagePreview(null);
				// Reset file input
				if (fileInputRef.current) {
					fileInputRef.current.value = "";
				}
				setSnackbarMessage("Form has been reset");
				setSnackbarSeverity("info");
				setSnackbarOpen(true);
			}
		} else {
			setPostData(initPostData);
			setText("");
			setSelectedDate(today);
			setReadingTime("1");
			setImageFile(null);
			setImagePreview(null);
			// Reset file input
			if (fileInputRef.current) {
				fileInputRef.current.value = "";
			}
		}
	};
	// Keyboard shortcut for Ctrl+Enter to submit form
	useEffect(() => {
		const handleKeyPress = (event) => {
			if (event.ctrlKey && event.key === "Enter") {
				handleSubmit();
			}
		};

		document.addEventListener("keydown", handleKeyPress);

		return () => {
			document.removeEventListener("keydown", handleKeyPress);
		};
	}, [postData, text]);

	// Warn user before leaving page with unsaved changes
	useEffect(() => {
		// Check if there are unsaved changes
		const hasUnsavedChanges =
			postData.title || postData.Venue || postData.description || text;

		// Function to warn users before leaving
		const handleBeforeUnload = (event) => {
			if (hasUnsavedChanges) {
				const message =
					"You have unsaved changes. Are you sure you want to leave?";
				event.returnValue = message; // Standard for most browsers
				return message; // For some older browsers
			}
		};

		// Add event listener
		window.addEventListener("beforeunload", handleBeforeUnload);

		// Clean up
		return () => {
			window.removeEventListener("beforeunload", handleBeforeUnload);
		};
	}, [postData.title, postData.Venue, postData.description, text]);

	// Handle image file selection
	const handleFileChange = (event) => {
		const file = event.target.files[0];
		if (file) {
			setImageFile(file);

			// Create a preview URL for the selected image
			const previewURL = URL.createObjectURL(file);
			setImagePreview(previewURL);

			// Do not set postData.image yet - wait for upload button
		}
	};
	// Upload image to Firebase Storage with compression
	const handleImageUpload = async () => {
		if (!imageFile) {
			setSnackbarMessage("Please select an image file first");
			setSnackbarSeverity("error");
			setSnackbarOpen(true);
			return;
		}

		try {
			setUploading(true);
			setUploadProgress(0);

			// Use Compressor to optimize the image before uploading
			new Compressor(imageFile, {
				quality: 0.7, // Adjust quality as needed (0.7 is a good balance)
				maxWidth: 1920, // Limit max width for large images
				maxHeight: 1080, // Limit max height for large images
				success: async (compressedFile) => {
					// Create a unique filename for storage
					const uniqueId = uuidv4();
					const fileName = imageFile.name.replace(/\.[^/.]+$/, ""); // Remove file extension
					const fileExtension = imageFile.name.split(".").pop();
					const storageRef = ref(
						storage,
						`eventImages/${uniqueId}_${fileName}.${fileExtension}`
					);

					// Start upload process with compressed file
					const uploadTask = uploadBytesResumable(
						storageRef,
						compressedFile
					);

					// Monitor upload progress
					uploadTask.on(
						"state_changed",
						(snapshot) => {
							// Update progress
							const progress = Math.round(
								(snapshot.bytesTransferred /
									snapshot.totalBytes) *
									100
							);
							setUploadProgress(progress);
						},
						(error) => {
							// Handle error
							setUploading(false);
							setSnackbarMessage(
								"Error uploading image: " + error.message
							);
							setSnackbarSeverity("error");
							setSnackbarOpen(true);
						},
						() => {
							// Upload completed successfully
							getDownloadURL(uploadTask.snapshot.ref).then(
								(downloadURL) => {
									// Update the form with the image URL
									setPostData((prev) => ({
										...prev,
										image: downloadURL,
									}));
									setUploading(false);
									setSnackbarMessage(
										"Image uploaded successfully!"
									);
									setSnackbarSeverity("success");
									setSnackbarOpen(true);
								}
							);
						}
					);
				},
				error: (err) => {
					setUploading(false);
					console.error("Error compressing image:", err);
					setSnackbarMessage(
						"Error compressing image: " + err.message
					);
					setSnackbarSeverity("error");
					setSnackbarOpen(true);
				},
			});
		} catch (error) {
			setUploading(false);
			console.error("Error uploading image:", error);
			setSnackbarMessage("Error uploading image: " + error.message);
			setSnackbarSeverity("error");
			setSnackbarOpen(true);
		}
	};

	// Clear the selected image and preview
	const handleClearImage = () => {
		setImageFile(null);
		setImagePreview(null);

		// If we want to also clear the uploaded image URL:
		if (postData.image) {
			if (
				window.confirm(
					"Do you want to remove the uploaded image from the event?"
				)
			) {
				setPostData((prev) => ({
					...prev,
					image: "",
				}));
			}
		}

		// Reset the file input
		if (fileInputRef.current) {
			fileInputRef.current.value = "";
		}
	};

	return (
		<>
			<Snackbar
				open={snackbarOpen}
				autoHideDuration={6000}
				onClose={handleSnackbarClose}
				anchorOrigin={{ vertical: "top", horizontal: "center" }}>
				<Alert
					onClose={handleSnackbarClose}
					severity={snackbarSeverity}
					sx={{ width: "100%" }}>
					{snackbarMessage}
				</Alert>
			</Snackbar>
			<Typography variant="h5" gutterBottom>
				Create New Event
			</Typography>
			<Stack direction={isMobile ? "column" : "row"} spacing={3}>
				<Stack gap={2} sx={{ width: isMobile ? "100%" : "50%" }}>
					<Typography
						variant="subtitle2"
						color="primary"
						gutterBottom>
						EVENT DETAILS
					</Typography>
					<TextField
						variant="outlined"
						label="Event Title *"
						size="small"
						value={postData.title}
						onChange={handleChange("title")}
						fullWidth
						placeholder="E.g., Blood Donation Camp"
					/>{" "}
					<Stack direction={isMobile ? "column" : "row"} spacing={2}>
						{" "}
						<LocalizationProvider
							dateAdapter={CustomDateFnsAdapter}
							sx={{ flex: 1 }}>
							<DatePicker
								label="Event Date *"
								value={selectedDate}
								onChange={handleDateChange}
								format="dd/MM/yyyy"
								slotProps={{
									textField: {
										variant: "outlined",
										fullWidth: true,
										size: "small",
									},
								}}
							/>
						</LocalizationProvider>{" "}
					</Stack>{" "}
					<TextField
						variant="outlined"
						label="Venue *"
						size="small"
						value={postData.Venue}
						onChange={handleChange("Venue")}
						fullWidth
						placeholder="E.g., Main Auditorium, SVNIT"
						sx={{ flex: 1 }}
						helperText="Enter the complete Venue (building, institution, etc.)"
					/>
					<Box sx={{ width: "100%" }}>
						<Typography
							variant="subtitle2"
							color="primary"
							sx={{ mb: 1 }}>
							Event Image
						</Typography>

						{/* Image preview */}
						{(imagePreview || postData.image) && (
							<Box
								sx={{
									mb: 2,
									width: "100%",
									height: "200",
									borderRadius: 1,
									overflow: "hidden",
									position: "relative",
									border: "1px solid #eaeaea",
								}}>
								<img
									src={imagePreview || postData.image}
									alt="Event preview"
									style={{
										width: "100%",
										height: "100%",
										objectFit: "cover",
									}}
								/>
								<Button
									variant="contained"
									color="error"
									size="small"
									onClick={handleClearImage}
									sx={{
										position: "absolute",
										top: 8,
										right: 8,
										minWidth: "auto",
										opacity: 0.8,
										"&:hover": { opacity: 1 },
									}}>
									✕
								</Button>
							</Box>
						)}
						<Stack
							direction="column"
							spacing={1}
							sx={{ width: "100%" }}>
							<Stack
								direction="row"
								spacing={2}
								alignItems="center"
								sx={{ mb: 0 }}>
								<input
									accept="image/*"
									type="file"
									id="image-upload"
									onChange={handleFileChange}
									style={{ display: "none" }}
									ref={fileInputRef}
								/>
								<Button
									variant="outlined"
									component="label"
									htmlFor="image-upload"
									disabled={uploading}
									fullWidth>
									{imageFile
										? "Change Image"
										: "Select Image"}
								</Button>
								{imageFile && !uploading && (
									<Button
										variant="contained"
										color="primary"
										onClick={handleImageUpload}
										disabled={uploading}
										fullWidth>
										Upload
									</Button>
								)}
							</Stack>

							{imageFile && (
								<Typography
									variant="caption"
									color="text.secondary"
									sx={{ pl: 1 }}>
									Selected: {imageFile.name} (
									{(imageFile.size / 1024).toFixed(1)} KB)
								</Typography>
							)}
						</Stack>

						{uploading && (
							<Box
								sx={{
									display: "flex",
									alignItems: "center",
									mt: 1,
									mb: 2,
								}}>
								<CircularProgress
									variant="determinate"
									value={uploadProgress}
									size={24}
									sx={{ mr: 1 }}
								/>
								<Typography variant="body2">
									Uploading... {uploadProgress}%
								</Typography>
							</Box>
						)}

						{postData.image && (
							<TextField
								variant="outlined"
								label="Image URL"
								size="small"
								value={postData.image}
								onChange={handleChange("image")}
								fullWidth
								InputProps={{
									readOnly: true,
									endAdornment: (
										<Button
											size="small"
											onClick={() =>
												window.open(
													postData.image,
													"_blank"
												)
											}
											sx={{ ml: 1, minWidth: "auto" }}>
											Open
										</Button>
									),
								}}
								sx={{ mt: 1 }}
							/>
						)}

						<Typography
							variant="caption"
							color="text.secondary"
							sx={{ mt: 0.5, display: "block" }}>
							For best results, use a landscape image with 16:9
							aspect ratio (e.g., 1280×720)
						</Typography>
					</Box>{" "}
					<Box sx={{ width: "100%" }}>
						<TextField
							variant="outlined"
							label="Short Description/Summary *"
							multiline
							rows={3}
							value={postData.description}
							onChange={handleChange("description")}
							fullWidth
							placeholder="Write a brief summary of the event that will appear in the event listing"
							helperText={`${
								postData.description
									? postData.description.length
									: 0
							}/250 characters (recommended max)`}
							error={
								postData.description &&
								postData.description.length > 250
							}
							FormHelperTextProps={{
								sx: {
									display: "flex",
									justifyContent: "space-between",
									"& .MuiFormHelperText-root": {
										marginRight: 0,
									},
								},
							}}
						/>
						<Typography
							variant="caption"
							color="text.secondary"
							sx={{ mt: 0.5, display: "block" }}>
							This summary appears in the event list card before
							users click to read the full event
						</Typography>
					</Box>
					<Box
						sx={{
							mt: 1,
							display: "flex",
							justifyContent: "space-between",
							alignItems: "center",
						}}>
						<Typography variant="caption" color="text.secondary">
							Estimated reading time: {readingTime} min
						</Typography>
						{isMobile && (
							<Button
								size="small"
								variant={previewMode ? "contained" : "outlined"}
								color="primary"
								onClick={() => setPreviewMode(!previewMode)}
								startIcon={
									previewMode ? null : (
										<span role="img" aria-label="preview">
											👁️
										</span>
									)
								}>
								{previewMode ? "Back to Edit" : "Preview"}
							</Button>
						)}
					</Box>{" "}
					<Box sx={{ width: "100%", mt: 2 }}>
						<Typography
							variant="subtitle2"
							color="primary"
							gutterBottom>
							EVENT CONTENT
						</Typography>
						<TextField
							margin="normal"
							label="Content *"
							multiline
							rows={10}
							required
							fullWidth
							value={text}
							onChange={handleTextChange}
							name="content"
							placeholder="Write the full content of your event post here. Press Enter to create a new paragraph."
							helperText="Each line will be treated as a separate paragraph. Write detailed information about the event here."
							sx={{ mt: 1 }}
						/>

						<Typography
							variant="caption"
							color="text.secondary"
							sx={{ display: "block", mt: 1 }}>
							Tips: • Write in a clear, concise manner • Include
							important details about the event • Mention key
							participants and outcomes • Add context about why
							this event is important
						</Typography>
					</Box>
					<Stack direction="row" spacing={2} sx={{ mt: 2 }}>
						<Button
							variant="contained"
							color="primary"
							onClick={handleSubmit}
							size="large"
							fullWidth>
							PUBLISH EVENT
						</Button>
						<Button
							variant="outlined"
							onClick={resetForm}
							size="large">
							RESET FORM
						</Button>
					</Stack>
					<Typography
						variant="caption"
						color="text.secondary"
						sx={{ mt: 1, display: "block", textAlign: "center" }}>
						Pro Tip: Press Ctrl+Enter to quickly publish
					</Typography>
				</Stack>

				<Box
					sx={{
						width: isMobile ? "100%" : "50%",
						mt: isMobile ? 3 : 0,
						border: "1px solid #eaeaea",
						borderRadius: 2,
						p: 2,
						bgcolor: "#f9f9f9",
						height: "fit-content",
						position: "sticky",
						top: 20,
						maxHeight: "80vh",
						overflow: "auto",
						display: isMobile && !previewMode ? "none" : "block",
					}}>
					<Box
						sx={{
							display: "flex",
							justifyContent: "space-between",
							alignItems: "center",
							mb: 2,
						}}>
						<Typography variant="h6" gutterBottom sx={{ mb: 0 }}>
							Event Preview
						</Typography>
						{isMobile && (
							<Button
								size="small"
								variant="outlined"
								onClick={() => setPreviewMode(false)}>
								Back to Edit
							</Button>
						)}
					</Box>
					<BlogPost
						title={postData.title}
						content={text}
						readingTime={postData.readingTime}
						Eventdate={postData.Eventdate}
						Venue={postData.Venue}
						description={postData.description}
						image={postData.image}
					/>
					{!postData.title && !text && (
						<Typography
							variant="body2"
							color="text.secondary"
							sx={{
								mt: 2,
								fontStyle: "italic",
								textAlign: "center",
							}}>
							Fill in the form fields to see a preview of your
							event
						</Typography>
					)}{" "}
				</Box>
			</Stack>
		</>
	);
}
