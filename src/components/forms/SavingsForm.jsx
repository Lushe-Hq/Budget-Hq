import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
} from "@mui/material";

import { useEffect, useState } from "react";
import { useSavings } from "../../context/SavingsContext";

function SavingsForm({
  open,
  handleClose,
  editingGoal,
}) {
  const { addGoal, updateGoal } = useSavings();

  const [goal, setGoal] = useState({
    name: "",
    target: "",
    targetDate: "",
  });

  useEffect(() => {
    if (editingGoal) {
      setGoal(editingGoal);
    } else {
      setGoal({
        name: "",
        target: "",
        targetDate: "",
      });
    }
  }, [editingGoal, open]);

  function handleChange(e) {
    setGoal({
      ...goal,
      [e.target.name]: e.target.value,
    });
  }

  function handleSave() {
    if (
      !goal.name ||
      !goal.target ||
      !goal.targetDate
    ) {
      alert("Please fill in all fields.");
      return;
    }

    const goalData = {
      ...goal,
      target: Number(goal.target),
    };

    if (editingGoal) {
      updateGoal(goalData);
    } else {
      addGoal(goalData);
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
        {editingGoal
          ? "Edit Savings Goal"
          : "Add Savings Goal"}
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
          label="Goal Name"
          name="name"
          value={goal.name}
          onChange={handleChange}
          placeholder="e.g. Vacation"
        />

        <TextField
          label="Target Amount"
          name="target"
          type="number"
          value={goal.target}
          onChange={handleChange}
          inputProps={{
            min: 0,
            step: "0.01",
          }}
        />

        <TextField
          label="Target Date"
          type="date"
          name="targetDate"
          value={goal.targetDate}
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
          {editingGoal ? "Update" : "Save"}
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default SavingsForm;