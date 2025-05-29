import React, { useEffect, useState } from "react";
import { Container, Draggable } from "react-smooth-dnd";
import { arrayMoveImmutable } from "array-move";
import { firestore } from "../../../firebase";
import {
	List,
	ListItem,
	ListItemIcon,
	ListItemSecondaryAction,
	ListItemText,
	TextField,
} from "@mui/material";
import DragHandleIcon from "@mui/icons-material/DragHandle";
import DeleteIcon from "@mui/icons-material/Delete";
import {
	addDoc,
	collection,
	deleteDoc,
	doc,
	getDocs,
	updateDoc,
} from "firebase/firestore"; // Import Firestore related functions

function SortableList() {
	const [items, setItems] = useState([]);
	const [newItemText, setNewItemText] = useState("");

	useEffect(() => {
		// console.log("adfdf");
		// Load the initial items from the Firestore collection
		const loadItems = async () => {
			await getDocs(collection(firestore, "updates")).then((snap) => {
				const loadedItems = snap.docs.map((doc) => ({
					id: doc.id,
					text: doc.data().text,
					index: doc.data().index,
				}));
				setItems(loadedItems.sort((a, b) => a.index - b.index));
				console.log(items);
			});
		};

		loadItems();
	}, []);

	const onDrop = async ({ removedIndex, addedIndex }) => {
		// Rearrange the items in the local state
		const rearrangedItems = arrayMoveImmutable(
			items,
			removedIndex,
			addedIndex
		).map((item, index) => ({
			...item,
			index: index + 1,
		}));
		setItems(rearrangedItems);

		// Rearrange the items in the Firestore collection
		try {
			for (let i = 0; i < rearrangedItems.length; i++) {
				const { id } = rearrangedItems[i];
				const docRef = doc(firestore, "updates", id);
				await updateDoc(docRef, {
					text: rearrangedItems[i].text,
					index: rearrangedItems[i].index,
				});
			}
			console.log("Items rearranged on Firestore collection");
		} catch (error) {
			console.error("Error rearranging items: ", error);
		}
	};

	const handleDeleteItem = async (id) => {
		// Delete the item from the Firestore collection
		try {
			const docRef = doc(firestore, "updates", id);
			await deleteDoc(docRef);
			console.log("Document deleted with ID: ", id);
		} catch (error) {
			console.error("Error deleting document: ", error);
		}

		// Delete the item from the local state
		setItems((items) => items.filter((item) => item.id !== id));
	};

	const handleNewItemChange = (event) => {
		setNewItemText(event.target.value);
	};

	const handleAddItem = async () => {
		if (newItemText.trim() === "") return;

		// Add the new item to the Firestore collection
		try {
			const docRef = await addDoc(collection(firestore, "updates"), {
				text: newItemText,
				index: items.length + 1,
			});
			console.log("New item added with ID: ", docRef.id);
		} catch (error) {
			console.error("Error adding new item: ", error);
		}

		// Add the new item to the local state
		setItems((items) => [
			...items,
			{
				id: Date.now().toString(),
				text: newItemText,
				index: items.length + 1,
			},
		]);

		// Clear the text field
		setNewItemText("");
	};

	return (
		<List>
			<Container
				dragHandleSelector=".drag-handle"
				lockAxis="y"
				onDrop={onDrop}>
				{items.map(({ id, text, index }) => (
					<Draggable key={id}>
						<ListItem>
							<ListItemText primary={`${index}. ${text}`} />
							<ListItemSecondaryAction>
								<ListItemIcon className="drag-handle">
									<DragHandleIcon />
								</ListItemIcon>
								<ListItemIcon
									edge="end"
									aria-label="delete"
									onClick={() => handleDeleteItem(id)}>
									<DeleteIcon />
								</ListItemIcon>
							</ListItemSecondaryAction>
						</ListItem>
					</Draggable>
				))}
			</Container>

			<TextField
				label="New Update"
				value={newItemText}
				onChange={handleNewItemChange}
				fullWidth
				size="small"
				onKeyDown={(event) => {
					if (event.key === "Enter") {
						handleAddItem();
					}
				}}
				margin="normal"
				variant="outlined"
			/>

			{/* <Button variant="contained" onClick={handleAddItem}>
        Add Item
      </Button> */}
		</List>
	);
}

export default SortableList;
