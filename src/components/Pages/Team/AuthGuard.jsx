import { Box, CircularProgress, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { getCurrentUser, isUserAdmin } from "../../../utils/auth";

const AuthGuard = ({ children }) => {
	const [loading, setLoading] = useState(true);
	const [user, setUser] = useState(null);
	useEffect(() => {
		const checkAuth = async () => {
			try {
				const currentUser = await getCurrentUser();
				setUser(currentUser);
			} catch (error) {
				console.error("Error checking authentication:", error);
				setUser(null);
			} finally {
				setLoading(false);
			}
		};

		checkAuth();
	}, []);

	if (loading) {
		return (
			<Box
				sx={{
					display: "flex",
					flexDirection: "column",
					alignItems: "center",
					justifyContent: "center",
					height: "100vh",
				}}>
				<CircularProgress size={50} />
				<Typography variant="h6" sx={{ mt: 2 }}>
					Verifying authentication...
				</Typography>
			</Box>
		);
	}
	// Check if user is authenticated and has admin privileges
	if (!user || !isUserAdmin(user)) {
		return <Navigate to="/admin-login" />;
	}

	return children;
};

export default AuthGuard;
