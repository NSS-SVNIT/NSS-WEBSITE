// A utility script to upload all team data from TeamData.js to Firebase Firestore
// import { getAuth } from "firebase/auth"; // We will pass currentUser directly
import { addDoc, collection } from "firebase/firestore";
import * as TeamData from "../components/Pages/Team/TeamData";
import { firestore as db } from "../firebase";

/**
 * Uploads a volunteer to the Firestore database
 * @param {Object} volunteer The volunteer data to upload
 * @param {string} category The category/collection to add the volunteer to
 * @returns {Promise<string>} The document ID of the uploaded volunteer
 */
const uploadVolunteer = async (volunteer, category) => {
	try {
		// Use the top-level volunteers collection as per existing security rules
		const collectionRef = collection(db, "volunteers");

		// Add timestamp and approval status
		const volunteerWithMeta = {
			...volunteer,
			category: category, // Store category as a field instead of in path
			approved: true, // Static data is pre-approved
		};

		// Add the document to Firestore
		const docRef = await addDoc(collectionRef, volunteerWithMeta);
		return docRef.id;
	} catch (error) {
		console.error(`Error uploading volunteer ${volunteer.name}:`, error);
		throw error;
	}
};

/**
 * Uploads all team data from TeamData.js to Firestore
 * @param {object} currentUser The currently authenticated Firebase user object.
 */
export const uploadAllTeamData = async (currentUser) => {
	// Added currentUser parameter
	try {
		// Check if user is authenticated
		// const auth = getAuth(); // Removed
		// const currentUser = auth.currentUser; // Removed

		if (!currentUser) {
			throw new Error(
				"You must be logged in to upload team data. currentUser was not provided."
			);
		}

		// Optional: Further check if this user is an executive based on custom claims or a quick DB check if needed,
		// though security rules should be the primary enforcer.
		// For example, you could re-check against the executives collection here if desired,
		// but it adds an extra read and might be redundant if rules are correctly set up.
		// console.log("Uploading data as user:", currentUser.email);

		// console.log("Starting team data upload to Firestore...");
		const stats = {
			total: 0,
			successful: 0,
			failed: 0,
			byCategory: {},
		};

		// Upload core team categories
		const categories = {
			Sir: TeamData.Sir,
			ProgramCoordinators: TeamData.ProgramCoordinators,
			Founder: TeamData.Founder,
			CoFounder: TeamData.CoFounder,
		};

		// Get all team years (e.g., Team2019, Team2020, etc.)
		const teamYears = Object.keys(TeamData)
			.filter((key) => key.startsWith("Team"))
			.reduce((obj, key) => {
				obj[key] = TeamData[key];
				return obj;
			}, {});

		// Combine all categories
		const allCategories = { ...categories, ...teamYears };

		// Process each category
		for (const [category, volunteers] of Object.entries(allCategories)) {
			// console.log(
			// 	`Uploading ${category} (${volunteers.length} members)...`
			// );

			stats.byCategory[category] = {
				total: volunteers.length,
				successful: 0,
				failed: 0,
			};

			// Upload each volunteer in the category
			for (const volunteer of volunteers) {
				try {
					stats.total++;
					stats.byCategory[category].total++;

					const docId = await uploadVolunteer(volunteer, category);

					// console.log(
					// 	`  Uploaded ${volunteer.name} to ${category} (Document ID: ${docId})`
					// );
					stats.successful++;
					stats.byCategory[category].successful++;
				} catch (error) {
					// console.error(
					// 	`  Error uploading ${volunteer.name} to ${category}:`,
					// 	error
					// );
					stats.failed++;
					stats.byCategory[category].failed++;
				}
			}
			// console.log(`Finished processing category: ${category}\n`); // Removed
		}

		// console.log("\nTeam data upload complete!"); // Removed
		// console.log(`Total volunteers processed: ${stats.total}`); // Removed
		// console.log(`Successfully uploaded: ${stats.successful}`); // Removed
		// console.log(`Failed uploads: ${stats.failed}`); // Removed

		// console.log("\nCategory statistics:"); // Removed
		for (const category in stats.categoryStats) {
			// console.log( // Removed
			// 	`  ${category}: ${stats.categoryStats[category].successful} successful, ${stats.categoryStats[category].failed} failed`
			// );
		}

		return stats;
	} catch (error) {
		console.error("Error in uploadAllTeamData:", error);
		throw error;
	}
};

// Example usage (can be removed or kept for direct script execution):
//    uploadAllTeamData().then(stats => console.log("Upload stats:", stats)); // Removed
