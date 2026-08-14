import { useState } from "react";
import {
  Button,
  TextField,
  MenuItem,
} from "@mui/material";

import BillsTable from "../components/tables/BillsTable";
import BillForm from "../components/forms/BillForm";

function Bills() {
  const [open, setOpen] = useState(false);
  const [editingBill, setEditingBill] =
    useState(null);

  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("");
  const [month, setMonth] = useState("");

  function handleOpen() {
    setEditingBill(null);
    setOpen(true);
  }

  function handleEdit(bill) {
    setEditingBill(bill);
    setOpen(true);
  }

  function handleClose() {
    setOpen(false);
    setEditingBill(null);
  }

  function clearFilters() {
    setSearch("");
    setStatus("");
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
          <h1>Bills</h1>

          <p>
            Track and manage your bills.
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
          + Add Bill
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
          label="Search Bills"
          value={search}
          onChange={(e) =>
            setSearch(e.target.value)
          }
        />

        <TextField
          select
          label="Status"
          value={status}
          onChange={(e) =>
            setStatus(e.target.value)
          }
        >
          <MenuItem value="">
            All Bills
          </MenuItem>

          <MenuItem value="unpaid">
            Unpaid
          </MenuItem>

          <MenuItem value="paid">
            Paid
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

      <BillsTable
        onEdit={handleEdit}
        search={search}
        status={status}
        month={month}
      />

      <BillForm
        open={open}
        handleClose={handleClose}
        editingBill={editingBill}
      />
    </div>
  );
}

export default Bills;