import {
	Alert,
	Box,
	Button,
	CircularProgress,
	List,
	ListItem,
	ListItemText,
	Paper,
	Stack,
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
import { useCallback, useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, firestore as db } from "../../../firebase"; // Assuming auth is exported for currentUser

const VolunteerApprovalPanel = () => {
	const [user] = useAuthState(auth);
	const [volunteers, setVolunteers] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);
	const [successMessage, setSuccessMessage] = useState(null);

	const fetchPendingVolunteers = useCallback(async () => {
		if (!user) {
			setError("You must be logged in to view pending volunteers.");
			setLoading(false);
			return;
		}
		setLoading(true);
		setError(null);
		setSuccessMessage(null);
		try {
			// Query for volunteers where 'approved' is false or does not exist
			const q = query(
				collection(db, "volunteers"),
				where("approved", "==", false)
			);
			const querySnapshot = await getDocs(q);
			const pendingVolunteers = [];
			querySnapshot.forEach((doc) => {
				pendingVolunteers.push({ id: doc.id, ...doc.data() });
			});

			// Also fetch volunteers where 'approved' field might not exist yet
			// This might be complex with Firestore native queries if you need OR logic across different states of a field.
			// For simplicity, we'll stick to 'approved === false'. If new volunteers are added without 'approved' field,
			// they should ideally be initialized with 'approved: false'.

			setVolunteers(pendingVolunteers);
			if (pendingVolunteers.length === 0) {
				setSuccessMessage(
					"No volunteers are currently pending approval."
				);
			}
		} catch (error) {
			setError("Failed to load volunteers.");
		} finally {
			setLoading(false);
		}
	}, [user]);

	useEffect(() => {
		fetchPendingVolunteers();
	}, [fetchPendingVolunteers]);

	const handleApprove = async (volunteerId) => {
		if (!user) {
			setError("Action requires authentication.");
			return;
		}
		setLoading(true);
		try {
			const volunteerRef = doc(db, "volunteers", volunteerId);
			await updateDoc(volunteerRef, {
				approved: true,
			});
			setSuccessMessage(
				`Volunteer ${volunteerId} approved successfully.`
			);
			// Optimistically update UI or refetch
			setVolunteers((prev) => prev.filter((v) => v.id !== volunteerId));
		} catch (error) {
			alert(`Failed to approve volunteer: ${error.message}`);
		}
	};

	const handleReject = async (volunteerId) => {
		try {
			await deleteDoc(doc(firestore, "volunteers", volunteerId));
			// Optimistically update UI or refetch
			setVolunteers((prev) => prev.filter((v) => v.id !== volunteerId));
		} catch (error) {
			alert(`Failed to reject volunteer: ${error.message}`);
		}
	};

	if (!user) {
		return (
			<Alert severity="warning">
				Please log in to manage volunteer approvals.
			</Alert>
		);
	}

	if (loading && volunteers.length === 0) {
		return (
			<Box sx={{ display: "flex", justifyContent: "center", py: 5 }}>
				<CircularProgress />
			</Box>
		);
	}

	return (
		<Paper sx={{ p: 3, mt: 2 }}>
			<Typography variant="h5" gutterBottom>
				Pending Volunteer Approvals
			</Typography>
			{error && (
				<Alert severity="error" sx={{ mb: 2 }}>
					{error}
				</Alert>
			)}
			{successMessage && !error && (
				<Alert severity="success" sx={{ mb: 2 }}>
					{successMessage}
				</Alert>
			)}

			{volunteers.length > 0 ? (
				<List>
					{volunteers.map((volunteer) => (
						<ListItem
							key={volunteer.id}
							divider
							secondaryAction={
								<Stack direction="row" spacing={1}>
									<Button
										variant="contained"
										color="success"
										onClick={() =>
											handleApprove(volunteer.id)
										}
										disabled={loading}>
										Approve
									</Button>
									<Button
										variant="contained"
										color="error"
										onClick={() =>
											handleReject(volunteer.id)
										}
										disabled={loading}>
										Reject
									</Button>
								</Stack>
							}>
							<ListItemText
								primary={volunteer.name || "Unnamed Volunteer"}
								secondary={`Email: ${
									volunteer.email || "N/A"
								} | Category: ${
									volunteer.category || "N/A"
								} | Batch: ${volunteer.batch || "N/A"}`}
							/>
						</ListItem>
					))}
				</List>
			) : (
				!loading &&
				!error && (
					<Typography>
						No volunteers are currently pending approval.
					</Typography>
				)
			)}
			<Button
				onClick={fetchPendingVolunteers}
				disabled={loading}
				sx={{ mt: 2 }}>
				Refresh List
			</Button>
		</Paper>
	);
};

export default VolunteerApprovalPanel;
