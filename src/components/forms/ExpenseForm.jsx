import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  MenuItem,
} from "@mui/material";

import { useEffect, useState } from "react";
import { useExpenses } from "../../context/ExpenseContext";
import { useCategories } from "../../context/CategoryContext";

function ExpenseForm({
  open,
  handleClose,
  editingExpense,
}) {
  const { addExpense, updateExpense } = useExpenses();
const { categories } = useCategories();
  const [expense, setExpense] = useState({
    date: "",
    category: "",
    description: "",
    amount: "",
  });

  useEffect(() => {
    if (editingExpense) {
      setExpense(editingExpense);
    } else {
      setExpense({
        date: "",
        category: "",
        description: "",
        amount: "",
      });
    }
  }, [editingExpense, open]);

  function handleChange(e) {
    setExpense({
      ...expense,
      [e.target.name]: e.target.value,
    });
  }

  function handleSave() {
    if (
      !expense.date ||
      !expense.category ||
      !expense.description ||
      !expense.amount
    ) {
      alert("Please fill in all fields.");
      return;
    }

    if (editingExpense) {
      updateExpense({
        ...expense,
        amount: Number(expense.amount),
      });
    } else {
      addExpense({
        ...expense,
        id: Date.now(),
        amount: Number(expense.amount),
      });
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
        {editingExpense ? "Edit Expense" : "Add Expense"}
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
          label="Date"
          type="date"
          name="date"
          value={expense.date}
          onChange={handleChange}
          slotProps={{
  inputLabel: {
    shrink: true,
  },
}}
        />

        <TextField
  select
  label="Category"
  name="category"
  value={expense.category}
  onChange={handleChange}
>
  {categories.map((category) => (
    <MenuItem
      key={category.id}
      value={category.name}
    >
      {category.icon} {category.name}
    </MenuItem>
  ))}
</TextField>

        <TextField
          label="Description"
          name="description"
          value={expense.description}
          onChange={handleChange}
        />

        <TextField
          label="Amount"
          name="amount"
          type="number"
          value={expense.amount}
          onChange={handleChange}
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
          {editingExpense ? "Update" : "Save"}
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default ExpenseForm;