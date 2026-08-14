import { useState } from "react";
import {
  Button,
  TextField,
  MenuItem,
} from "@mui/material";

import ExpenseTable from "../components/tables/ExpenseTable";
import ExpenseForm from "../components/forms/ExpenseForm";
import { useCategories } from "../context/CategoryContext";

function Expenses() {
  const { categories } = useCategories();

  const [open, setOpen] = useState(false);
  const [editingExpense, setEditingExpense] =
    useState(null);

  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [month, setMonth] = useState("");

  function handleOpen() {
    setEditingExpense(null);
    setOpen(true);
  }

  function handleEdit(expense) {
    setEditingExpense(expense);
    setOpen(true);
  }

  function handleClose() {
    setOpen(false);
    setEditingExpense(null);
  }

  function clearFilters() {
    setSearch("");
    setCategory("");
    setMonth("");
  }

  return (
    <div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "25px",
        }}
      >
        <div>
          <h1>Expenses</h1>

          <p>
            Track and manage all your expenses.
          </p>
        </div>

        <Button
          variant="contained"
          onClick={handleOpen}
          sx={{
            backgroundColor: "#49D6D0",
            "&:hover": {
              backgroundColor: "#35c5bf",
            },
          }}
        >
          + Add Expense
        </Button>
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns:
            "2fr 1fr 1fr auto",
          gap: "15px",
          marginBottom: "25px",
        }}
      >
        <TextField
          label="Search Expenses"
          value={search}
          onChange={(e) =>
            setSearch(e.target.value)
          }
        />

        <TextField
          select
          label="Category"
          value={category}
          onChange={(e) =>
            setCategory(e.target.value)
          }
        >
          <MenuItem value="">
            All Categories
          </MenuItem>

          {categories.map((item) => (
            <MenuItem
              key={item.id}
              value={item.name}
            >
              {item.icon} {item.name}
            </MenuItem>
          ))}
        </TextField>

        <TextField
          label="Month"
          type="month"
          value={month}
          onChange={(e) =>
            setMonth(e.target.value)
          }
          slotProps={{
            inputLabel: {
              shrink: true,
            },
          }}
        />

        <Button
          variant="outlined"
          onClick={clearFilters}
        >
          Clear
        </Button>
      </div>

      <ExpenseTable
        onEdit={handleEdit}
        search={search}
        category={category}
        month={month}
      />

      <ExpenseForm
        open={open}
        handleClose={handleClose}
        editingExpense={editingExpense}
      />
    </div>
  );
}

export default Expenses;