import {
	Alert,
	Box,
	Button,
	Card,
	CircularProgress,
	Container,
	FormControl,
	FormHelperText,
	Grid,
	InputLabel,
	MenuItem,
	Select,
	Snackbar,
	TextField,
	Typography,
} from "@mui/material";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { firestore as db, storage } from "../../../firebase";

const VolunteerForm = () => {
	const [formData, setFormData] = useState({
		name: "",
		position: "Volunteer", // Default position
		batch: "",
		gmail: "",
		linkedin: "",
		approved: false, // Admin approval flag
	});

	const [image, setImage] = useState(null);
	const [imagePreview, setImagePreview] = useState(null);
	const [loading, setLoading] = useState(false);
	const [alertOpen, setAlertOpen] = useState(false);
	const [alertMessage, setAlertMessage] = useState("");
	const [alertSeverity, setAlertSeverity] = useState("success");
	const [errors, setErrors] = useState({});

	const batchOptions = [
		"2018",
		"2019",
		"2020",
		"2021",
		"2022",
		// "2023",
		// "2024",
		// "2025",
	];

	const handleChange = (e) => {
		setFormData({ ...formData, [e.target.name]: e.target.value });
		// Clear error when field is updated
		if (errors[e.target.name]) {
			setErrors({ ...errors, [e.target.name]: "" });
		}
	};

	const handleImageChange = (e) => {
		if (e.target.files[0]) {
			const selectedImage = e.target.files[0];
			setImage(selectedImage);

			// Create a preview URL
			const previewUrl = URL.createObjectURL(selectedImage);
			setImagePreview(previewUrl);

			if (errors.image) {
				setErrors({ ...errors, image: "" });
			}
		}
	};

	const validateForm = () => {
		const newErrors = {};

		if (!formData.name.trim()) newErrors.name = "Name is required";
		if (!formData.batch) newErrors.batch = "Batch year is required";
		if (!formData.gmail.trim()) {
			newErrors.gmail = "Email is required";
		} else if (!/\S+@\S+\.\S+/.test(formData.gmail)) {
			newErrors.gmail = "Email is invalid";
		}

		if (formData.linkedin && !formData.linkedin.includes("linkedin.com")) {
			newErrors.linkedin = "Please enter a valid LinkedIn URL";
		}

		if (!image) newErrors.image = "Profile photo is required";

		setErrors(newErrors);
		return Object.keys(newErrors).length === 0;
	};

	const handleSubmit = async (e) => {
		e.preventDefault();

		if (!validateForm()) {
			return;
		}

		setLoading(true);

		try {
			// 1. Upload image to Firebase Storage
			const imageFileName = `team_photos/${formData.batch}/${uuidv4()}-${
				image.name
			}`;
			const storageRef = ref(storage, imageFileName);

			await uploadBytes(storageRef, image);
			const downloadURL = await getDownloadURL(storageRef); // 2. Save volunteer data to Firestore
			const volunteerData = {
				...formData,
				imageUrl: downloadURL, // Firebase storage URL for backward compatibility
				firebase: downloadURL, // Matching format in TeamData.js
				approved: false, // Default to not approved
				createdAt: serverTimestamp(),
				// Make sure batch is a string to match TeamData.js format
				batch: formData.batch.toString(),
			};

			await addDoc(collection(db, "volunteers"), volunteerData); // 3. Show success message
			setAlertSeverity("success");
			setAlertMessage(
				"Thank you! Your information has been submitted and will be reviewed by an administrator. You'll be added to the team page once approved."
			);
			setAlertOpen(true);

			// 4. Reset form
			setFormData({
				name: "",
				position: "Volunteer",
				batch: "",
				gmail: "",
				linkedin: "",
				approved: false,
			});
			setImage(null);
			setImagePreview(null);
		} catch (error) {
			console.error("Error submitting form: ", error);
			setAlertSeverity("error");
			setAlertMessage("An error occurred. Please try again later.");
			setAlertOpen(true);
		} finally {
			setLoading(false);
		}
	};

	const handleAlertClose = () => {
		setAlertOpen(false);
	};

	return (
		<Container maxWidth="md" sx={{ py: 8 }}>
			<Card elevation={3} sx={{ p: { xs: 3, md: 5 }, borderRadius: 2 }}>
				{" "}
				<Typography
					variant="h4"
					component="h1"
					align="center"
					fontWeight="bold"
					gutterBottom>
					Join the NSS SVNIT Team
				</Typography>
				<Typography
					variant="body1"
					align="center"
					color="text.secondary"
					sx={{ mb: 2 }}>
					Fill in your details to be featured on our team page
				</Typography>
				<Alert severity="info" sx={{ mb: 4 }}>
					<Typography variant="body2">
						Your submission will be reviewed by an administrator
						before being published on the website. Please provide
						accurate information and a professional profile photo.
					</Typography>
				</Alert>
				<Box component="form" onSubmit={handleSubmit} noValidate>
					<Grid container spacing={3}>
						<Grid item xs={12} md={6}>
							<TextField
								fullWidth
								label="Full Name"
								name="name"
								value={formData.name}
								onChange={handleChange}
								error={!!errors.name}
								helperText={errors.name}
								required
							/>
						</Grid>

						<Grid item xs={12} md={6}>
							<FormControl
								fullWidth
								error={!!errors.batch}
								required>
								<InputLabel>Batch Year</InputLabel>
								<Select
									name="batch"
									value={formData.batch}
									onChange={handleChange}
									label="Batch Year">
									{batchOptions.map((year) => (
										<MenuItem key={year} value={year}>
											{year}
										</MenuItem>
									))}
								</Select>
								{errors.batch && (
									<FormHelperText>
										{errors.batch}
									</FormHelperText>
								)}
							</FormControl>
						</Grid>

						<Grid item xs={12} md={6}>
							<TextField
								fullWidth
								label="Email"
								name="gmail"
								type="email"
								value={formData.gmail}
								onChange={handleChange}
								error={!!errors.gmail}
								helperText={errors.gmail}
								required
							/>
						</Grid>

						<Grid item xs={12} md={6}>
							<TextField
								fullWidth
								label="LinkedIn Profile URL"
								name="linkedin"
								value={formData.linkedin}
								onChange={handleChange}
								error={!!errors.linkedin}
								helperText={errors.linkedin || "Optional"}
								placeholder="https://www.linkedin.com/in/yourprofile"
							/>
						</Grid>

						<Grid item xs={12}>
							<Typography
								variant="subtitle1"
								gutterBottom
								sx={{ mt: 1 }}>
								Profile Photo*
							</Typography>
							<Box
								sx={{
									border: errors.image
										? "1px dashed #d32f2f"
										: "1px dashed #ccc",
									borderRadius: 1,
									p: 3,
									textAlign: "center",
									backgroundColor: "rgba(0, 0, 0, 0.02)",
									cursor: "pointer",
									"&:hover": {
										backgroundColor: "rgba(0, 0, 0, 0.04)",
									},
								}}
								onClick={() =>
									document
										.getElementById("photo-upload")
										.click()
								}>
								<input
									id="photo-upload"
									type="file"
									accept="image/*"
									hidden
									onChange={handleImageChange}
								/>

								{imagePreview ? (
									<Box
										component="img"
										src={imagePreview}
										alt="Preview"
										sx={{
											width: 150,
											height: 150,
											objectFit: "cover",
											borderRadius: "50%",
											border: "4px solid #f5f5f5",
											boxShadow:
												"0 4px 8px rgba(0,0,0,0.1)",
										}}
									/>
								) : (
									<Typography
										variant="body2"
										color="text.secondary">
										Click to upload your profile photo{" "}
										<br />
										(square image recommended)
									</Typography>
								)}

								{errors.image && (
									<Typography
										variant="caption"
										color="error"
										display="block"
										sx={{ mt: 1 }}>
										{errors.image}
									</Typography>
								)}
							</Box>
						</Grid>

						<Grid item xs={12} sx={{ mt: 3, textAlign: "center" }}>
							<Button
								type="submit"
								variant="contained"
								color="primary"
								size="large"
								disabled={loading}
								sx={{
									minWidth: 200,
									py: 1.5,
									fontSize: "1rem",
									borderRadius: 2,
								}}>
								{loading ? (
									<CircularProgress size={24} />
								) : (
									"Submit"
								)}
							</Button>
						</Grid>
					</Grid>
				</Box>
			</Card>

			<Snackbar
				open={alertOpen}
				autoHideDuration={6000}
				onClose={handleAlertClose}
				anchorOrigin={{ vertical: "bottom", horizontal: "center" }}>
				<Alert
					onClose={handleAlertClose}
					severity={alertSeverity}
					variant="filled"
					sx={{ width: "100%" }}>
					{alertMessage}
				</Alert>
			</Snackbar>
		</Container>
	);
};

export default VolunteerForm;
