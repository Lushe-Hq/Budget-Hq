import { useEffect, useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  MenuItem,
  Button,
} from "@mui/material";

import { useExpenses } from "../../context/ExpenseContext";
import { useCategories } from "../../context/CategoryContext";

function ExpenseForm({
  open,
  handleClose,
  editingExpense = null,
}) {
  const { addExpense, updateExpense } =
    useExpenses();

  const { categories } = useCategories();

  const [formData, setFormData] = useState({
    date: "",
    category: "",
    description: "",
    amount: "",
  });

  useEffect(() => {
    if (editingExpense) {
      setFormData({
        date: editingExpense.date || "",
        category:
          editingExpense.category || "",
        description:
          editingExpense.description || "",
        amount:
          editingExpense.amount || "",
      });
    } else {
      setFormData({
        date: new Date()
          .toISOString()
          .slice(0, 10),
        category: "",
        description: "",
        amount: "",
      });
    }
  }, [editingExpense, open]);

  function handleChange(event) {
    const { name, value } = event.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  function handleSubmit(event) {
    event.preventDefault();

    if (
      !formData.category ||
      !formData.description ||
      !formData.amount
    ) {
      return;
    }

    const expense = {
      ...formData,
      amount: Number(formData.amount),
    };

    if (editingExpense) {
      updateExpense({
        ...editingExpense,
        ...expense,
      });
    } else {
      addExpense(expense);
    }

    handleClose();
  }

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      fullWidth
      maxWidth="sm"
      PaperProps={{
        sx: {
          borderRadius: "20px",
          padding: "6px",
        },
      }}
    >
      <form onSubmit={handleSubmit}>
        <DialogTitle
          sx={{
            padding: "22px 24px 10px",
          }}
        >
          <div className="hq-form-title">
            <div className="hq-form-icon">
              💸
            </div>

            <div>
              <h2>
                {editingExpense
                  ? "Edit Expense"
                  : "Add Expense"}
              </h2>

              <p>
                Keep track of where your money
                goes.
              </p>
            </div>
          </div>
        </DialogTitle>

        <DialogContent
          sx={{
            padding: "18px 24px !important",
          }}
        >
          <div className="hq-form-grid">
            <TextField
              fullWidth
              label="Date"
              name="date"
              type="date"
              value={formData.date}
              onChange={handleChange}
              slotProps={{
                inputLabel: {
                  shrink: true,
                },
              }}
            />

            <TextField
              fullWidth
              select
              label="Category"
              name="category"
              value={formData.category}
              onChange={handleChange}
            >
              {categories.map((category) => (
                <MenuItem
                  key={category.id}
                  value={category.name}
                >
                  {category.icon}{" "}
                  {category.name}
                </MenuItem>
              ))}
            </TextField>

            <TextField
              fullWidth
              label="Description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="What did you spend on?"
            />

            <TextField
              fullWidth
              label="Amount"
              name="amount"
              type="number"
              value={formData.amount}
              onChange={handleChange}
              inputProps={{
                min: 0,
                step: "0.01",
              }}
              placeholder="0.00"
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
            onClick={handleClose}
          >
            Cancel
          </Button>

          <Button
            type="submit"
            variant="contained"
          >
            {editingExpense
              ? "Save Changes"
              : "Save Expense"}
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
}

export default ExpenseForm;