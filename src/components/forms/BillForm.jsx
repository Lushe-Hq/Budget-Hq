import { useEffect, useState } from "react";

import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  FormControlLabel,
  Switch,
} from "@mui/material";

import { useBills } from "../../context/BillContext";

function BillForm({
  open,
  handleClose,
  editingBill = null,
}) {
  const { addBill, updateBill } = useBills();

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    dueDate: "",
    amount: "",
    paid: false,
  });

  useEffect(() => {
    if (editingBill) {
      setFormData({
        name: editingBill.name || "",
        description:
          editingBill.description || "",
        dueDate: editingBill.dueDate || "",
        amount: editingBill.amount || "",
        paid: Boolean(editingBill.paid),
      });
    } else {
      setFormData({
        name: "",
        description: "",
        dueDate: new Date()
          .toISOString()
          .slice(0, 10),
        amount: "",
        paid: false,
      });
    }
  }, [editingBill, open]);

  function handleChange(event) {
    const { name, value, checked, type } =
      event.target;

    setFormData((prev) => ({
      ...prev,
      [name]:
        type === "checkbox"
          ? checked
          : value,
    }));
  }

  function handleSubmit(event) {
    event.preventDefault();

    if (
      !formData.name ||
      !formData.dueDate ||
      !formData.amount
    ) {
      return;
    }

    const bill = {
      ...formData,
      amount: Number(formData.amount),
      paid: Boolean(formData.paid),
    };

    if (editingBill) {
      updateBill({
        ...editingBill,
        ...bill,
      });
    } else {
      addBill(bill);
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
            <div className="hq-form-icon bill-form-icon">
              🧾
            </div>

            <div>
              <h2>
                {editingBill
                  ? "Edit Bill"
                  : "Add Bill"}
              </h2>

              <p>
                Keep track of bills and their
                due dates.
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
              label="Bill Name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="e.g. Phone Bill"
            />

            <TextField
              fullWidth
              label="Description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Add a note about this bill"
            />

            <TextField
              fullWidth
              label="Due Date"
              name="dueDate"
              type="date"
              value={formData.dueDate}
              onChange={handleChange}
              slotProps={{
                inputLabel: {
                  shrink: true,
                },
              }}
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

            <div className="hq-form-switch">
              <FormControlLabel
                control={
                  <Switch
                    name="paid"
                    checked={formData.paid}
                    onChange={handleChange}
                  />
                }
                label="This bill has already been paid"
              />
            </div>
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
            {editingBill
              ? "Save Changes"
              : "Save Bill"}
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
}

export default BillForm;