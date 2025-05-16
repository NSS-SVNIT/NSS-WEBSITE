import { Grid } from "@mui/material";
import { doc, getDoc } from "firebase/firestore";
import { useCallback, useEffect, useState } from "react"; // Added useCallback
import { auth, firestore } from "../../../firebase";
import Layout from "../../Layout/Layout";
// import { GoogleAuthProvider, signInWithPopup, signOut } from "firebase/auth"; // Google Sign-In removed
import {
	onAuthStateChanged, // Added to listen to auth state changes
	signInWithEmailAndPassword,
	signOut,
} from "firebase/auth";
import DashBoard from "./DashBoard";
import SignIn from "./Register"; // This component will now handle email/password

export default function Admin() {
	const [logged, setLogged] = useState(false);
	const [currentUser, setCurrentUser] = useState(null);
	const [loading, setLoading] = useState(true); // Added loading state
	// const provider = new GoogleAuthProvider(); // Google provider removed
	const logginFields = ["name", "email", "profilePic", "loggedIn"];

	const grantAccess = useCallback(async (user) => {
		if (!user || !user.email) {
			setLogged(false);
			return;
		}
		const ref = doc(firestore, "executives", user.email);
		try {
			const snap = await getDoc(ref);
			if (snap.exists() && snap.data().access) {
				setLogged(true);
				// Store minimal info, actual profilePic and name might come from 'executives' doc or be generic
				localStorage.setItem("loggedIn", "true");
				localStorage.setItem("email", user.email);
				// If name/profilePic are in 'executives' doc, retrieve and set them
				if (snap.data().name)
					localStorage.setItem("name", snap.data().name);
				if (snap.data().profilePic)
					localStorage.setItem("profilePic", snap.data().profilePic);
				else localStorage.removeItem("profilePic"); // Or set a default
			} else {
				setLogged(false);
				// Clear local storage if access is denied or doc doesn't exist
				logginFields.forEach((field) => localStorage.removeItem(field));
				sessionStorage.removeItem("loggedIn");
				alert(
					"Access Denied. You are not authorized or your account is not configured correctly."
				);
				await signOut(auth); // Sign out the user if not authorized by 'executives' collection
			}
		} catch (error) {
			setLogged(false);
			logginFields.forEach((field) => localStorage.removeItem(field));
			sessionStorage.removeItem("loggedIn");
			alert("Error checking authorization. Please try again.");
			await signOut(auth); // Sign out on error too
		}
	}, []); // Added dependencies

	useEffect(() => {
		setLoading(true);
		const unsubscribe = onAuthStateChanged(auth, async (user) => {
			setCurrentUser(user);
			if (user) {
				// User is signed in, check if they are in executives collection
				await grantAccess(user);
			} else {
				// User is signed out
				setLogged(false);
				logginFields.forEach((field) => localStorage.removeItem(field));
				sessionStorage.removeItem("loggedIn");
			}
			setLoading(false);
		});
		return () => unsubscribe(); // Cleanup subscription
	}, [grantAccess]);

	// handleSignIn will now be passed to SignIn component for email/password
	const handleSignIn = async (email, password) => {
		try {
			const userCredential = await signInWithEmailAndPassword(
				auth,
				email,
				password
			);
			// Auth state change will be handled by onAuthStateChanged listener
			// grantAccess will be called from there.
			// No need to setLogged(true) here directly.
		} catch (error) {
			alert(`Sign-in failed: ${error.message}`);
			setLogged(false);
			logginFields.forEach((field) => localStorage.removeItem(field));
			sessionStorage.removeItem("loggedIn");
		}
	};

	const handleSignOut = () => {
		signOut(auth)
			.then(() => {
				// State updates (logged, currentUser) handled by onAuthStateChanged
				// Clearing localStorage is also handled there upon sign-out
			})
			.catch((err) => console.error("Sign out error:", err));
	};

	useEffect(() => {
		window.scrollTo(0, 0);
		const handleTabClose = (event) => {
			// Consider if this is still needed or if onAuthStateChanged covers it.
			// For now, keeping it to ensure cleanup on tab close.
			// signOut(auth); // Optionally sign out on tab close
			// logginFields.forEach((field) => localStorage.removeItem(field));
			// sessionStorage.removeItem("loggedIn");
		};
		window.addEventListener("beforeunload", handleTabClose);
		return () => {
			window.scrollTo(0, 0);
			window.removeEventListener("beforeunload", handleTabClose);
		};
	}, []);

	if (loading) {
		return (
			<Layout>
				<Grid
					container
					justifyContent="center"
					alignItems="center"
					style={{ height: "100vh" }}>
					<p>Loading...</p>
				</Grid>
			</Layout>
		);
	}

	return (
		<Layout>
			<Grid container>
				{logged && currentUser ? (
					<DashBoard handleSignOut={handleSignOut} />
				) : (
					<SignIn handleSignIn={handleSignIn} /> // Pass the new handleSignIn
				)}
			</Grid>
		</Layout>
	);
}
