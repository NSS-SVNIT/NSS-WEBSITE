import React, { useEffect, useState } from "react";
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
} from "firebase/firestore";

import {
  DndContext,
  closestCenter,
} from "@dnd-kit/core";
import {
  SortableContext,
  useSortable,
  verticalListSortingStrategy,
  arrayMove,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

/* ------------------ SORTABLE ITEM ------------------ */

function SortableItem({ id, text, index, onDelete }) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
  } = useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <ListItem ref={setNodeRef} style={style} divider>
      <ListItemText primary={`${index}. ${text}`} />

      <ListItemSecondaryAction>
        <ListItemIcon {...attributes} {...listeners} style={{ cursor: "grab" }}>
          <DragHandleIcon />
        </ListItemIcon>

        <ListItemIcon
          edge="end"
          aria-label="delete"
          onClick={() => onDelete(id)}
          style={{ cursor: "pointer" }}
        >
          <DeleteIcon />
        </ListItemIcon>
      </ListItemSecondaryAction>
    </ListItem>
  );
}

/* ------------------ MAIN COMPONENT ------------------ */

function SortableList() {
  const [items, setItems] = useState([]);
  const [newItemText, setNewItemText] = useState("");

  useEffect(() => {
    const loadItems = async () => {
      const snap = await getDocs(collection(firestore, "updates"));
      const loadedItems = snap.docs.map((d) => ({
        id: d.id,
        text: d.data().text,
        index: d.data().index,
      }));
      setItems(loadedItems.sort((a, b) => a.index - b.index));
    };

    loadItems();
  }, []);

  const handleDragEnd = async (event) => {
    const { active, over } = event;
    if (!over || active.id === over.id) return;

    const oldIndex = items.findIndex((i) => i.id === active.id);
    const newIndex = items.findIndex((i) => i.id === over.id);

    const newItems = arrayMove(items, oldIndex, newIndex).map((item, i) => ({
      ...item,
      index: i + 1,
    }));

    setItems(newItems);

    // update Firestore order
    try {
      for (let item of newItems) {
        const ref = doc(firestore, "updates", item.id);
        await updateDoc(ref, { index: item.index });
      }
    } catch (err) {
      console.error("Error updating order:", err);
    }
  };

  const handleDeleteItem = async (id) => {
    try {
      await deleteDoc(doc(firestore, "updates", id));
      setItems((prev) => prev.filter((i) => i.id !== id));
    } catch (error) {
      console.error("Error deleting document: ", error);
    }
  };

  const handleAddItem = async () => {
    if (!newItemText.trim()) return;

    try {
      const docRef = await addDoc(collection(firestore, "updates"), {
        text: newItemText,
        index: items.length + 1,
      });

      setItems((prev) => [
        ...prev,
        { id: docRef.id, text: newItemText, index: prev.length + 1 },
      ]);

      setNewItemText("");
    } catch (error) {
      console.error("Error adding item:", error);
    }
  };

  return (
    <>
      <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
        <SortableContext
          items={items.map((i) => i.id)}
          strategy={verticalListSortingStrategy}
        >
          <List>
            {items.map((item) => (
              <SortableItem
                key={item.id}
                id={item.id}
                text={item.text}
                index={item.index}
                onDelete={handleDeleteItem}
              />
            ))}
          </List>
        </SortableContext>
      </DndContext>

      <TextField
        label="New Update"
        value={newItemText}
        onChange={(e) => setNewItemText(e.target.value)}
        fullWidth
        size="small"
        onKeyDown={(e) => e.key === "Enter" && handleAddItem()}
        margin="normal"
      />
    </>
  );
}

export default SortableList;
