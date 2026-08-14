import { useState } from "react";
import {
  Button,
  Paper,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";

import { useCategories } from "../context/CategoryContext";

function Categories() {
  const {
    categories,
    addCategory,
    updateCategory,
    deleteCategory,
  } = useCategories();

  const [open, setOpen] = useState(false);
  const [editingCategory, setEditingCategory] =
    useState(null);

  const [name, setName] = useState("");
  const [icon, setIcon] = useState("💗");

  function openAdd() {
    setEditingCategory(null);
    setName("");
    setIcon("💗");
    setOpen(true);
  }

  function openEdit(category) {
    setEditingCategory(category);
    setName(category.name || "");
    setIcon(category.icon || "💗");
    setOpen(true);
  }

  function closeDialog() {
    setOpen(false);
    setEditingCategory(null);
    setName("");
    setIcon("💗");
  }

  function handleSubmit(event) {
    event.preventDefault();

    const trimmedName = name.trim();

    if (!trimmedName) return;

    if (editingCategory) {
      updateCategory({
        ...editingCategory,
        name: trimmedName,
        icon: icon || "💗",
      });
    } else {
      addCategory({
        name: trimmedName,
        icon: icon || "💗",
      });
    }

    closeDialog();
  }

  function handleDelete(category) {
    const confirmed = window.confirm(
      `Delete the "${category.name}" category?`
    );

    if (!confirmed) return;

    deleteCategory(category.id);
  }

  return (
    <div>
      {/* HEADER */}

      <div className="page-header">
        <div>
          <h1>Categories</h1>

          <p>
            Organize your spending your way.
          </p>
        </div>

        <Button
          variant="contained"
          onClick={openAdd}
        >
          + Add Category
        </Button>
      </div>

      {/* CATEGORY CARD */}

      <Paper
        elevation={0}
        className="category-page-card"
      >
        <div className="category-card-header">
          <div>
            <h3>Your Categories</h3>

            <p>
              {categories.length}{" "}
              {categories.length === 1
                ? "category"
                : "categories"}{" "}
              available
            </p>
          </div>

          <div className="category-count">
            {categories.length}
          </div>
        </div>

        {categories.length === 0 ? (
          <div className="category-empty">
            <div className="category-empty-icon">
              🏷️
            </div>

            <h3>No categories yet</h3>

            <p>
              Create your first category to
              start organizing your expenses.
            </p>

            <Button
              variant="contained"
              onClick={openAdd}
            >
              Create Category
            </Button>
          </div>
        ) : (
          <div className="category-grid">
            {categories.map((category) => (
              <div
                key={category.id}
                className="category-card"
              >
                <div className="category-icon">
                  {category.icon || "💗"}
                </div>

                <div className="category-details">
                  <strong>
                    {category.name}
                  </strong>

                  <span>
                    Expense category
                  </span>
                </div>

                <div className="category-actions">
                  <button
                    className="category-edit"
                    onClick={() =>
                      openEdit(category)
                    }
                  >
                    Edit
                  </button>

                  <button
                    className="category-delete"
                    onClick={() =>
                      handleDelete(category)
                    }
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </Paper>

      {/* ADD / EDIT DIALOG */}

      <Dialog
        open={open}
        onClose={closeDialog}
        fullWidth
        maxWidth="xs"
        PaperProps={{
          sx: {
            borderRadius: "20px",
            padding: "6px",
          },
        }}
      >
        <form onSubmit={handleSubmit}>
          <DialogTitle>
            <div className="hq-form-title">
              <div className="hq-form-icon">
                🏷️
              </div>

              <div>
                <h2>
                  {editingCategory
                    ? "Edit Category"
                    : "Add Category"}
                </h2>

                <p>
                  Make your categories work for
                  you.
                </p>
              </div>
            </div>
          </DialogTitle>

          <DialogContent>
            <div
              className="hq-form-grid"
              style={{
                marginTop: "10px",
              }}
            >
              <TextField
                fullWidth
                label="Category Name"
                value={name}
                onChange={(event) =>
                  setName(event.target.value)
                }
                placeholder="e.g. Beauty"
                autoFocus
              />

              <TextField
                fullWidth
                label="Icon"
                value={icon}
                onChange={(event) =>
                  setIcon(event.target.value)
                }
                placeholder="💗"
                helperText="You can use an emoji as your category icon."
              />
            </div>
          </DialogContent>

          <DialogActions
            sx={{
              padding:
                "10px 24px 22px !important",
              gap: "8px",
            }}
          >
            <Button
              type="button"
              variant="outlined"
              onClick={closeDialog}
            >
              Cancel
            </Button>

            <Button
              type="submit"
              variant="contained"
            >
              {editingCategory
                ? "Save Changes"
                : "Add Category"}
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </div>
  );
}

export default Categories;
