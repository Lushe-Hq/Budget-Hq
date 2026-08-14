import { useEffect, useState } from "react";

import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
} from "@mui/material";

import { useIncome } from "../../context/IncomeContext";

function IncomeForm({
  open,
  handleClose,
  editingIncome = null,
}) {
  const { addIncome, updateIncome } =
    useIncome();

  const [formData, setFormData] = useState({
    date: "",
    type: "",
    description: "",
    amount: "",
  });

  useEffect(() => {
    if (editingIncome) {
      setFormData({
        date: editingIncome.date || "",
        type: editingIncome.type || "",
        description:
          editingIncome.description || "",
        amount: editingIncome.amount || "",
      });
    } else {
      setFormData({
        date: new Date()
          .toISOString()
          .slice(0, 10),
        type: "",
        description: "",
        amount: "",
      });
    }
  }, [editingIncome, open]);

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
      !formData.type ||
      !formData.description ||
      !formData.amount
    ) {
      return;
    }

    const incomeEntry = {
      ...formData,
      amount: Number(formData.amount),
    };

    if (editingIncome) {
      updateIncome({
        ...editingIncome,
        ...incomeEntry,
      });
    } else {
      addIncome(incomeEntry);
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
            <div className="hq-form-icon income-form-icon">
              💰
            </div>

            <div>
              <h2>
                {editingIncome
                  ? "Edit Income"
                  : "Add Income"}
              </h2>

              <p>
                Keep track of the money coming
                in.
              </p>
            </div>
          </div>
        </DialogTitle>

        <DialogContent
          sx={{
            padding:
              "18px 24px !important",
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
              label="Income Type"
              name="type"
              value={formData.type}
              onChange={handleChange}
              placeholder="e.g. Salary, Freelance"
            />

            <TextField
              fullWidth
              label="Description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Where did this income come from?"
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
            {editingIncome
              ? "Save Changes"
              : "Save Income"}
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
}

export default IncomeForm;