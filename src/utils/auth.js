import {
	onAuthStateChanged,
	signInWithEmailAndPassword,
	signOut,
} from "firebase/auth";
import { auth } from "../firebase";

// Sign in with email and password
export const loginWithEmailAndPassword = async (email, password) => {
	if (email !== "nss@svnit.ac.in") {
		throw new Error("Only NSS admin can access this page");
	}

	try {
		const userCredential = await signInWithEmailAndPassword(
			auth,
			email,
			password
		);
		return userCredential.user;
	} catch (error) {
		console.error("Login error:", error);
		throw error;
	}
};

// Sign out user
export const logoutUser = async () => {
	try {
		await signOut(auth);
		return true;
	} catch (error) {
		console.error("Logout error:", error);
		throw error;
	}
};

// Get the current user
export const getCurrentUser = () => {
	return new Promise((resolve, reject) => {
		const unsubscribe = onAuthStateChanged(
			auth,
			(user) => {
				unsubscribe();
				resolve(user);
			},
			(error) => {
				reject(error);
			}
		);
	});
};

// Check if user has admin privileges
export const isUserAdmin = (user) => {
	return user && user.email === "nss@svnit.ac.in";
};
