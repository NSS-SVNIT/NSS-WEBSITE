// NewArticle.jsx

import React, { useState } from "react";
import { Button, Grid, MenuItem, Stack, TextField, CircularProgress, Snackbar, Alert, Container, Typography } from "@mui/material";
// --- MODIFIED: Import serverTimestamp ---
import { doc, setDoc, serverTimestamp } from "firebase/firestore";
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";
import { v4 as uuidv4 } from "uuid";
import { firestore } from "../../../firebase";

const options = ["Latest edition", "Magazine", "Camp Report", "Annual Report"];

export default function NewArticle() {
	const [title, setTitle] = useState("");
	const [type, setType] = useState("Magazine");
	const [description, setDescription] = useState("");
	const [flipbook, setFlipbook] = useState("");
	const [pdfFile, setPdfFile] = useState(null);
	const [imageFile, setImageFile] = useState(null);

	const [isSubmitting, setIsSubmitting] = useState(false);
	const [snackbar, setSnackbar] = useState({ open: false, message: "", severity: "success" });

	const storage = getStorage();

	const handleSubmit = async (event) => {
		event.preventDefault();
		if (!imageFile || !pdfFile || !title) {
			setSnackbar({ open: true, message: "Please fill all required fields and upload both files.", severity: "error" });
			return;
		}
		setIsSubmitting(true);

		try {
			const imageRef = ref(storage, `articleImages/${uuidv4()}_${imageFile.name}`);
			const pdfRef = ref(storage, `articlePdfs/${uuidv4()}_${pdfFile.name}`);

			await Promise.all([
				uploadBytes(imageRef, imageFile),
				uploadBytes(pdfRef, pdfFile),
			]);

			const [imageUrl, pdfUrl] = await Promise.all([
				getDownloadURL(imageRef),
				getDownloadURL(pdfRef),
			]);

			const articleData = {
				Title: title,
				Description: description,
				Type: type,
				Image: imageUrl,
				Download: pdfUrl,
				flipbook: flipbook,
				// --- MODIFIED: Add the creation timestamp ---
				createdAt: serverTimestamp(),
			};

			await setDoc(doc(firestore, "articles", uuidv4()), articleData);
			setSnackbar({ open: true, message: "Article submitted successfully!", severity: "success" });
			setTitle(""); setType("Magazine"); setDescription(""); setFlipbook(""); setPdfFile(null); setImageFile(null);
		} catch (error) {
			console.error("Error submitting article:", error);
			setSnackbar({ open: true, message: `Error: ${error.message}`, severity: "error" });
		} finally {
			setIsSubmitting(false);
		}
	};

	const handleCloseSnackbar = () => {
		setSnackbar({ ...snackbar, open: false });
	};

	// I've also wrapped your form in a Container and added a title for better UI.
	return (
		<Container maxWidth="md" sx={{ my: 4 }}>
			<Typography variant="h4" gutterBottom>Add New Article</Typography>
			<form onSubmit={handleSubmit}>
				<Stack spacing={3}>
					<TextField label="Title" value={title} onChange={(e) => setTitle(e.target.value)} required />
					<TextField label="Description" value={description} onChange={(e) => setDescription(e.target.value)} multiline rows={3} />
					<TextField label="Flipbook URL (Optional)" value={flipbook} onChange={(e) => setFlipbook(e.target.value)} />
					<TextField select label="Type" value={type} onChange={(e) => setType(e.target.value)} required>
						{options.map((option) => (<MenuItem key={option} value={option}>{option}</MenuItem>))}
					</TextField>
					<Button variant="outlined" component="label">
						Upload Article PDF*
						<input type="file" hidden accept="application/pdf" onChange={(e) => setPdfFile(e.target.files[0])} />
					</Button>
					{pdfFile && <Typography variant="body2">{pdfFile.name}</Typography>}
					<Button variant="outlined" component="label">
						Upload Cover Image*
						<input type="file" hidden accept="image/*" onChange={(e) => setImageFile(e.target.files[0])} />
					</Button>
					{imageFile && <Typography variant="body2">{imageFile.name}</Typography>}
					<Box sx={{ position: 'relative' }}>
						<Button variant="contained" type="submit" disabled={isSubmitting} fullWidth size="large">
							{isSubmitting ? "Submitting..." : "Submit Article"}
						</Button>
						{isSubmitting && <CircularProgress size={24} sx={{ position: 'absolute', top: '50%', left: '50%', mt: '-12px', ml: '-12px' }} />}
					</Box>
				</Stack>
			</form>
			<Snackbar open={snackbar.open} autoHideDuration={6000} onClose={handleCloseSnackbar}>
				<Alert onClose={handleCloseSnackbar} severity={snackbar.severity} sx={{ width: '100%' }}>
					{snackbar.message}
				</Alert>
			</Snackbar>
		</Container>
	);
}