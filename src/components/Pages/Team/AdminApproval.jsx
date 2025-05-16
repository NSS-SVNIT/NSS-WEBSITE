import {
	Alert,
	Avatar,
	Box,
	Button,
	CircularProgress,
	Dialog,
	DialogActions,
	DialogContent,
	DialogTitle,
	Paper,
	Snackbar,
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow,
	Typography,
} from "@mui/material";
import {
	collection,
	deleteDoc,
	doc,
	getDocs,
	query,
	updateDoc,
	where,
} from "firebase/firestore";
import { useEffect, useState } from "react";
import { firestore as db } from "../../../firebase";

const AdminApproval = () => {
	const [pendingVolunteers, setPendingVolunteers] = useState([]);
	const [loading, setLoading] = useState(true);
	const [selectedVolunteer, setSelectedVolunteer] = useState(null);
	const [dialogOpen, setDialogOpen] = useState(false);
	const [snackbar, setSnackbar] = useState({
		open: false,
		message: "",
		severity: "success",
	});

	useEffect(() => {
		fetchPendingVolunteers();
	}, []);

	const fetchPendingVolunteers = async () => {
		try {
			setLoading(true);
			const volunteerQuery = query(
				collection(db, "volunteers"),
				where("approved", "==", false)
			);
			const querySnapshot = await getDocs(volunteerQuery);

			const volunteers = [];
			querySnapshot.forEach((doc) => {
				volunteers.push({
					id: doc.id,
					...doc.data(),
				});
			});

			setPendingVolunteers(volunteers);
		} catch (error) {
			console.error("Error fetching pending volunteers:", error);
			setSnackbar({
				open: true,
				message: "Failed to load pending volunteers",
				severity: "error",
			});
		} finally {
			setLoading(false);
		}
	};

	const handleView = (volunteer) => {
		setSelectedVolunteer(volunteer);
		setDialogOpen(true);
	};
	const handleApprove = async (volunteer) => {
		try {
			const volunteerRef = doc(db, "volunteers", volunteer.id);

			// Make sure the volunteer has all required fields in the correct format
			const requiredFields = [
				"name",
				"position",
				"batch",
				"gmail",
				"firebase",
			];
			const missingFields = requiredFields.filter(
				(field) => !volunteer[field]
			);

			if (missingFields.length > 0) {
				console.error("Missing required fields:", missingFields);
				setSnackbar({
					open: true,
					message: `Cannot approve: Missing required fields: ${missingFields.join(
						", "
					)}`,
					severity: "error",
				});
				return;
			}
			await updateDoc(volunteerRef, {
				approved: true,
				// Ensure the data has the correct structure and fields
				name: volunteer.name,
				position: volunteer.position || "Volunteer",
				batch: volunteer.batch?.toString(), // Ensure batch is a string
				gmail: volunteer.gmail,
				linkedin: volunteer.linkedin || "",
				firebase: volunteer.firebase || volunteer.imageUrl,
				// Remove any fields not needed in TeamData.js format
				updatedAt: new Date(),
			});

			setPendingVolunteers((prev) =>
				prev.filter((v) => v.id !== volunteer.id)
			);
			setSnackbar({
				open: true,
				message: "Volunteer approved successfully",
				severity: "success",
			});

			if (selectedVolunteer && selectedVolunteer.id === volunteer.id) {
				setDialogOpen(false);
			}
		} catch (error) {
			console.error("Error approving volunteer:", error);
			setSnackbar({
				open: true,
				message: "Failed to approve volunteer",
				severity: "error",
			});
		}
	};

	const handleReject = async (volunteer) => {
		try {
			await deleteDoc(doc(db, "volunteers", volunteer.id));

			setPendingVolunteers((prev) =>
				prev.filter((v) => v.id !== volunteer.id)
			);
			setSnackbar({
				open: true,
				message: "Volunteer rejected and removed",
				severity: "info",
			});

			if (selectedVolunteer && selectedVolunteer.id === volunteer.id) {
				setDialogOpen(false);
			}
		} catch (error) {
			console.error("Error rejecting volunteer:", error);
			setSnackbar({
				open: true,
				message: "Failed to reject volunteer",
				severity: "error",
			});
		}
	};

	const handleCloseSnackbar = () => {
		setSnackbar({ ...snackbar, open: false });
	};

	return (
		<Box sx={{ p: 3 }}>
			<Typography variant="h4" gutterBottom>
				Volunteer Approval
			</Typography>
			<Typography variant="body1" sx={{ mb: 3 }}>
				Review and approve new volunteer submissions
			</Typography>

			{loading ? (
				<Box sx={{ display: "flex", justifyContent: "center", my: 4 }}>
					<CircularProgress />
				</Box>
			) : pendingVolunteers.length === 0 ? (
				<Paper sx={{ p: 3, textAlign: "center" }}>
					<Typography variant="h6">
						No pending volunteers to approve
					</Typography>
				</Paper>
			) : (
				<TableContainer component={Paper}>
					<Table>
						<TableHead>
							<TableRow>
								<TableCell>Name</TableCell>
								<TableCell>Position</TableCell>
								<TableCell>Batch</TableCell>
								<TableCell>Email</TableCell>
								<TableCell>Actions</TableCell>
							</TableRow>
						</TableHead>
						<TableBody>
							{pendingVolunteers.map((volunteer) => (
								<TableRow key={volunteer.id}>
									<TableCell>{volunteer.name}</TableCell>
									<TableCell>{volunteer.position}</TableCell>
									<TableCell>{volunteer.batch}</TableCell>
									<TableCell>{volunteer.gmail}</TableCell>
									<TableCell>
										<Button
											variant="outlined"
											size="small"
											onClick={() =>
												handleView(volunteer)
											}
											sx={{ mr: 1 }}>
											View
										</Button>
										<Button
											variant="contained"
											color="primary"
											size="small"
											onClick={() =>
												handleApprove(volunteer)
											}
											sx={{ mr: 1 }}>
											Approve
										</Button>
										<Button
											variant="contained"
											color="error"
											size="small"
											onClick={() =>
												handleReject(volunteer)
											}>
											Reject
										</Button>
									</TableCell>
								</TableRow>
							))}
						</TableBody>
					</Table>
				</TableContainer>
			)}

			{/* Detail Dialog */}
			<Dialog
				open={dialogOpen}
				onClose={() => setDialogOpen(false)}
				maxWidth="sm"
				fullWidth>
				{selectedVolunteer && (
					<>
						<DialogTitle>Volunteer Details</DialogTitle>
						<DialogContent>
							<Box
								sx={{
									display: "flex",
									flexDirection: { xs: "column", sm: "row" },
									mb: 2,
								}}>
								<Box
									sx={{
										display: "flex",
										justifyContent: "center",
										mb: { xs: 2, sm: 0 },
									}}>
									<Avatar
										src={selectedVolunteer.firebase}
										alt={selectedVolunteer.name}
										sx={{
											width: 150,
											height: 150,
											mr: { sm: 3 },
										}}
									/>
								</Box>
								<Box>
									<Typography variant="h6">
										{selectedVolunteer.name}
									</Typography>
									<Typography variant="body1" sx={{ mt: 1 }}>
										<strong>Position:</strong>{" "}
										{selectedVolunteer.position}
									</Typography>
									<Typography variant="body1">
										<strong>Batch:</strong>{" "}
										{selectedVolunteer.batch}
									</Typography>
									<Typography variant="body1">
										<strong>Email:</strong>{" "}
										{selectedVolunteer.gmail}
									</Typography>
									<Typography variant="body1">
										<strong>LinkedIn:</strong>{" "}
										<a
											href={selectedVolunteer.linkedin}
											target="_blank"
											rel="noopener noreferrer">
											{selectedVolunteer.linkedin}
										</a>
									</Typography>
								</Box>
							</Box>
						</DialogContent>
						<DialogActions>
							<Button onClick={() => setDialogOpen(false)}>
								Close
							</Button>
							<Button
								variant="contained"
								color="primary"
								onClick={() =>
									handleApprove(selectedVolunteer)
								}>
								Approve
							</Button>
							<Button
								variant="contained"
								color="error"
								onClick={() => handleReject(selectedVolunteer)}>
								Reject
							</Button>
						</DialogActions>
					</>
				)}
			</Dialog>

			{/* Snackbar for notifications */}
			<Snackbar
				open={snackbar.open}
				autoHideDuration={6000}
				onClose={handleCloseSnackbar}
				anchorOrigin={{ vertical: "bottom", horizontal: "right" }}>
				<Alert
					onClose={handleCloseSnackbar}
					severity={snackbar.severity}
					sx={{ width: "100%" }}>
					{snackbar.message}
				</Alert>
			</Snackbar>
		</Box>
	);
};

export default AdminApproval;
