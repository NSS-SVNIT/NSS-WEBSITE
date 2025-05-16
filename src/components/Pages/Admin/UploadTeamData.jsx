// A script to upload team data to Firebase Firestore
// Run this script from the browser console or a component

import {
	Alert,
	Box,
	Button,
	Card,
	CardContent,
	CircularProgress,
	Dialog,
	DialogActions,
	DialogContent,
	DialogTitle,
	Grid,
	Typography,
} from "@mui/material";
import { getAuth } from "firebase/auth";
import { useEffect, useState } from "react";
import { uploadAllTeamData } from "../../../utils/uploadTeamData";
import { validateTeamData } from "../../../utils/validateTeamData";

const UploadTeamData = () => {
	const [open, setOpen] = useState(false);
	const [loading, setLoading] = useState(false);
	const [result, setResult] = useState(null);
	const [error, setError] = useState(null);
	const [validationResult, setValidationResult] = useState(null);
	const [isValidating, setIsValidating] = useState(false);
	const [user, setUser] = useState(null);
	const [isAdmin, setIsAdmin] = useState(false);
	// Check if the user is authenticated
	useEffect(() => {
		const auth = getAuth();
		const unsubscribe = auth.onAuthStateChanged((currentUser) => {
			setUser(currentUser);
			// Any logged in user is considered admin
			setIsAdmin(!!currentUser);
		});

		return () => unsubscribe();
	}, []);

	const handleOpen = () => {
		setOpen(true);
		setResult(null);
		setError(null);
	};

	const handleClose = () => {
		setOpen(false);
	};

	const handleUpload = async () => {
		try {
			setLoading(true);
			setError(null);
			setResult(null);
			setValidationResult(null);

			// Run the upload
			const stats = await uploadAllTeamData();
			setResult(stats);
			console.log("Upload complete with stats:", stats);
		} catch (err) {
			console.error("Error uploading team data:", err);
			setError(err.message || "An unknown error occurred");
		} finally {
			setLoading(false);
		}
	};

	const handleValidate = async () => {
		try {
			setIsValidating(true);
			setValidationResult(null);

			// Run validation
			const stats = await validateTeamData();
			setValidationResult(stats);
			console.log("Validation complete with stats:", stats);
		} catch (err) {
			console.error("Error validating team data:", err);
			setError(err.message || "An error occurred during validation");
		} finally {
			setIsValidating(false);
		}
	};	return (
		<>
			{!isAdmin && (
				<Alert severity="warning" sx={{ mb: 3 }}>
					You need to be logged in to upload team data.
				</Alert>
			)}

			<Grid container spacing={3} sx={{ mb: 4 }}>
				<Grid item xs={12} md={6}>
					<Card>
						<CardContent>
							<Typography variant="h6" gutterBottom>
								Upload Team Data
							</Typography>
							<Typography
								variant="body2"
								color="text.secondary"
								paragraph>
								Upload all team data from TeamData.js to
								Firebase Firestore in a structured format.
							</Typography>
							<Button
								variant="contained"
								color="primary"
								onClick={handleOpen}
								fullWidth>
								Upload Team Data to Firestore
							</Button>
						</CardContent>
					</Card>
				</Grid>

				<Grid item xs={12} md={6}>
					<Card>
						<CardContent>
							<Typography variant="h6" gutterBottom>
								Validate Team Data
							</Typography>
							<Typography
								variant="body2"
								color="text.secondary"
								paragraph>
								Check what team data is currently in Firestore
								and validate the structure.
							</Typography>
							<Button
								variant="outlined"
								color="primary"
								onClick={handleValidate}
								disabled={isValidating}
								fullWidth>
								{isValidating
									? "Validating..."
									: "Validate Team Data"}
							</Button>

							{validationResult && (
								<Box
									sx={{
										mt: 2,
										p: 2,
										bgcolor: "info.light",
										borderRadius: 1,
									}}>
									<Typography variant="h6" gutterBottom>
										Validation Results
									</Typography>
									<Typography>
										Total Categories:{" "}
										{validationResult.totalCategories}
									</Typography>
									<Typography>
										Total Members:{" "}
										{validationResult.totalMembers}
									</Typography>

									<Typography
										variant="subtitle1"
										sx={{ mt: 1 }}>
										Members per Category:
									</Typography>
									{Object.entries(
										validationResult.categoryCounts
									).map(([category, count]) => (
										<Typography
											key={category}
											variant="body2">
											{category}: {count} members
										</Typography>
									))}
								</Box>
							)}
						</CardContent>
					</Card>
				</Grid>
			</Grid>

			<Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth>
				<DialogTitle>Upload Team Data to Firestore</DialogTitle>
				<DialogContent>
					<Typography variant="body1" gutterBottom>
						This will upload all team data from TeamData.js to
						Firebase Firestore in a structured format.
					</Typography>
					<Typography
						variant="body2"
						color="text.secondary"
						paragraph>
						Each team category (Sir, ProgramCoordinators, Founder,
						CoFounder, Team2019, Team2020, etc.) will be uploaded as
						a separate collection in the "volunteers" collection.
					</Typography>

					{loading && (
						<Box
							sx={{
								display: "flex",
								justifyContent: "center",
								my: 4,
							}}>
							<CircularProgress />
						</Box>
					)}

					{result && (
						<Box
							sx={{
								mt: 2,
								p: 2,
								bgcolor: "success.light",
								borderRadius: 1,
							}}>
							<Typography variant="h6" gutterBottom>
								Upload Complete!
							</Typography>
							<Typography>
								Total processed: {result.total}
							</Typography>
							<Typography>
								Successfully uploaded: {result.successful}
							</Typography>
							<Typography>Failed: {result.failed}</Typography>

							<Typography variant="h6" sx={{ mt: 2 }}>
								Category Statistics:
							</Typography>
							{Object.entries(result.byCategory).map(
								([category, stats]) => (
									<Typography key={category}>
										{category}: {stats.successful}/
										{stats.total} uploaded
									</Typography>
								)
							)}
						</Box>
					)}

					{error && (
						<Box
							sx={{
								mt: 2,
								p: 2,
								bgcolor: "error.light",
								borderRadius: 1,
							}}>
							<Typography color="error">{error}</Typography>
						</Box>
					)}
				</DialogContent>				<DialogActions>
					<Button onClick={handleClose}>Close</Button>
					<Button
						onClick={handleUpload}
						variant="contained"
						color="primary"
						disabled={loading || !isAdmin}>
						{loading ? "Uploading..." : "Start Upload"}
					</Button>
				</DialogActions>

				{!isAdmin && (
					<Alert severity="error" sx={{ m: 2 }}>
						You must be logged in to upload data.
					</Alert>
				)}
			</Dialog>
		</>
	);
};

export default UploadTeamData;
