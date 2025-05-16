// A utility to validate the team data uploaded to Firestore
import { collection, getDocs } from "firebase/firestore";
import { firestore as db } from "../firebase";

/**
 * Validates the team data in Firestore by checking each category
 * @returns {Promise<object>} Statistics about the team data in Firestore
 */
export const validateTeamData = async () => {
	try {
		// Get all volunteers
		const volunteersSnapshot = await getDocs(collection(db, "volunteers"));

		// Group by category
		const volunteersByCategory = {};
		volunteersSnapshot.forEach((doc) => {
			const data = doc.data();
			// Use batch if category is not present, otherwise default to 'uncategorized'
			const categoryName =
				data.category ||
				(data.batch ? `Team${data.batch}` : "uncategorized");

			if (!volunteersByCategory[categoryName]) {
				volunteersByCategory[categoryName] = [];
			}

			volunteersByCategory[categoryName].push({
				id: doc.id,
				...data,
			});
		});

		const categories = Object.keys(volunteersByCategory);

		const stats = {
			totalCategories: categories.length,
			totalMembers: volunteersSnapshot.size,
			categoryCounts: {},
		};

		for (const category of categories) {
			stats.categoryCounts[category] =
				volunteersByCategory[category].length;
		}

		// console.log("Validation Stats:", stats);
		return stats;
	} catch (error) {
		console.error("Error validating team data:", error);
		throw error;
	}
};
