import { useState } from "react";
import {
  Button,
  TextField,
  MenuItem,
} from "@mui/material";

import IncomeTable from "../components/tables/IncomeTable";
import IncomeForm from "../components/forms/IncomeForm";

function Income() {
  const [open, setOpen] = useState(false);
  const [editingIncome, setEditingIncome] =
    useState(null);

  const [search, setSearch] = useState("");
  const [type, setType] = useState("");
  const [month, setMonth] = useState("");

  function handleOpen() {
    setEditingIncome(null);
    setOpen(true);
  }

  function handleEdit(item) {
    setEditingIncome(item);
    setOpen(true);
  }

  function handleClose() {
    setOpen(false);
    setEditingIncome(null);
  }

  function clearFilters() {
    setSearch("");
    setType("");
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
          <h1>Income</h1>

          <p>
            Track and manage all your income.
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
          + Add Income
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
          label="Search Income"
          value={search}
          onChange={(e) =>
            setSearch(e.target.value)
          }
        />

        <TextField
          select
          label="Type"
          value={type}
          onChange={(e) =>
            setType(e.target.value)
          }
        >
          <MenuItem value="">
            All Types
          </MenuItem>

          <MenuItem value="Salary">
            Salary
          </MenuItem>

          <MenuItem value="Business">
            Business
          </MenuItem>

          <MenuItem value="Freelance">
            Freelance
          </MenuItem>

          <MenuItem value="Other">
            Other
          </MenuItem>
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

      <IncomeTable
        onEdit={handleEdit}
        search={search}
        type={type}
        month={month}
      />

      <IncomeForm
        open={open}
        handleClose={handleClose}
        editingIncome={editingIncome}
      />
    </div>
  );
}

export default Income;