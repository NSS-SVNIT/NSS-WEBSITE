import {
	Alert,
	Box,
	Button,
	CircularProgress,
	Container,
	Paper,
	TextField,
	Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { getCurrentUser, loginWithEmailAndPassword } from "../../../utils/auth";
import Layout from "../../Layout/Layout";

const AdminLogin = () => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [error, setError] = useState("");
	const [loading, setLoading] = useState(false);
	const [user, setUser] = useState(null);
	const [checkingAuth, setCheckingAuth] = useState(true);
	const navigate = useNavigate();

	// Check if user is already authenticated
	useEffect(() => {
		const checkAuth = async () => {
			try {
				const currentUser = await getCurrentUser();
				setUser(currentUser);
			} catch (err) {
				console.error("Error checking authentication:", err);
			} finally {
				setCheckingAuth(false);
			}
		};

		checkAuth();
	}, []);

	// If still checking auth status, show loading
	if (checkingAuth) {
		return (
			<Layout>
				<Box
					sx={{
						display: "flex",
						justifyContent: "center",
						alignItems: "center",
						height: "80vh",
					}}>
					<CircularProgress />
				</Box>
			</Layout>
		);
	}

	// If user is already authenticated and is admin, redirect to admin panel
	if (user && user.email === "nss@svnit.ac.in") {
		return <Navigate to="/team/admin" />;
	}
	const handleLogin = async (e) => {
		e.preventDefault();

		// Reset error message
		setError("");

		setLoading(true);

		try {
			// Use our authentication utility to sign in
			await loginWithEmailAndPassword(email, password);

			// If successful, redirect to admin page
			navigate("/team/admin");
		} catch (err) {
			console.error("Authentication error:", err);
			if (err.message === "Only NSS admin can access this page") {
				setError(err.message);
			} else if (
				err.code === "auth/user-not-found" ||
				err.code === "auth/wrong-password"
			) {
				setError("Invalid email or password.");
			} else if (err.code === "auth/too-many-requests") {
				setError(
					"Too many failed login attempts. Please try again later."
				);
			} else {
				setError("Failed to log in. Please try again.");
			}
		} finally {
			setLoading(false);
		}
	};

	return (
		<Layout>
			<Container maxWidth="sm" sx={{ py: 8 }}>
				<Paper elevation={3} sx={{ p: 4, borderRadius: 2 }}>
					<Typography
						variant="h4"
						component="h1"
						align="center"
						gutterBottom>
						Admin Login
					</Typography>

					<Typography
						variant="body1"
						align="center"
						color="text.secondary"
						sx={{ mb: 4 }}>
						Please sign in to access the admin dashboard
					</Typography>

					{error && (
						<Alert severity="error" sx={{ mb: 3 }}>
							{error}
						</Alert>
					)}

					<Box component="form" onSubmit={handleLogin} noValidate>
						<TextField
							fullWidth
							margin="normal"
							label="Email"
							type="email"
							value={email}
							onChange={(e) => setEmail(e.target.value)}
							required
							autoFocus
						/>

						<TextField
							fullWidth
							margin="normal"
							label="Password"
							type="password"
							value={password}
							onChange={(e) => setPassword(e.target.value)}
							required
						/>

						<Button
							type="submit"
							fullWidth
							variant="contained"
							color="primary"
							size="large"
							disabled={loading}
							sx={{ mt: 3, mb: 2, py: 1.5 }}>
							{loading ? (
								<CircularProgress size={24} />
							) : (
								"Sign In"
							)}
						</Button>

						<Typography
							variant="body2"
							align="center"
							color="text.secondary">
							Only authorized NSS team members can access the
							admin dashboard.
						</Typography>
					</Box>
				</Paper>
			</Container>
		</Layout>
	);
};

export default AdminLogin;
