import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
} from "@mui/material";

import { useEffect, useState } from "react";
import { useCategories } from "../../context/CategoryContext";

function CategoryForm({
  open,
  handleClose,
  editingCategory,
}) {
  const { addCategory, updateCategory } = useCategories();

  const [category, setCategory] = useState({
    name: "",
    icon: "🏷️",
  });

  useEffect(() => {
    if (editingCategory) {
      setCategory(editingCategory);
    } else {
      setCategory({
        name: "",
        icon: "🏷️",
      });
    }
  }, [editingCategory, open]);

  function handleChange(e) {
    setCategory({
      ...category,
      [e.target.name]: e.target.value,
    });
  }

  function handleSave() {
    if (!category.name.trim()) {
      alert("Please enter a category name.");
      return;
    }

    if (editingCategory) {
      updateCategory(category);
    } else {
      addCategory(category);
    }

    handleClose();
  }

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      fullWidth
      maxWidth="sm"
    >
      <DialogTitle>
        {editingCategory
          ? "Edit Category"
          : "Add Category"}
      </DialogTitle>

      <DialogContent
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 2,
          mt: 1,
        }}
      >
        <TextField
          label="Category Name"
          name="name"
          value={category.name}
          onChange={handleChange}
          fullWidth
        />

        <TextField
          label="Icon"
          name="icon"
          value={category.icon}
          onChange={handleChange}
          fullWidth
          helperText="You can use an emoji such as 🍔, 🏠, 🚗 or 💄"
        />
      </DialogContent>

      <DialogActions>
        <Button onClick={handleClose}>
          Cancel
        </Button>

        <Button
          variant="contained"
          onClick={handleSave}
          sx={{
            backgroundColor: "#49D6D0",
            "&:hover": {
              backgroundColor: "#35c5bf",
            },
          }}
        >
          {editingCategory ? "Update" : "Save"}
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default CategoryForm;