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
import { useBudgets } from "../../context/BudgetContext";
import { useCategories } from "../../context/CategoryContext";

function BudgetForm({
  open,
  handleClose,
  editingBudget,
}) {
  const { addBudget, updateBudget } = useBudgets();
  const { categories } = useCategories();

  const [budget, setBudget] = useState({
    category: "",
    amount: "",
    month: new Date().toISOString().slice(0, 7),
  });

  useEffect(() => {
    if (editingBudget) {
      setBudget(editingBudget);
    } else {
      setBudget({
        category: "",
        amount: "",
        month: new Date().toISOString().slice(0, 7),
      });
    }
  }, [editingBudget, open]);

  function handleChange(e) {
    setBudget({
      ...budget,
      [e.target.name]: e.target.value,
    });
  }

  function handleSave() {
    if (
      !budget.category ||
      !budget.amount ||
      !budget.month
    ) {
      alert("Please fill in all fields.");
      return;
    }

    const budgetData = {
      ...budget,
      amount: Number(budget.amount),
    };

    if (editingBudget) {
      updateBudget(budgetData);
    } else {
      addBudget(budgetData);
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
        {editingBudget
          ? "Edit Budget"
          : "Add Budget"}
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
          select
          label="Category"
          name="category"
          value={budget.category}
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
          label="Monthly Budget"
          name="amount"
          type="number"
          value={budget.amount}
          onChange={handleChange}
          inputProps={{
            min: 0,
            step: "0.01",
          }}
        />

        <TextField
          label="Month"
          type="month"
          name="month"
          value={budget.month}
          onChange={handleChange}
          slotProps={{
            inputLabel: {
              shrink: true,
            },
          }}
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
          {editingBudget ? "Update" : "Save"}
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default BudgetForm;