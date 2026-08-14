import { useState } from "react";
import { Button, Stack } from "@mui/material";

import ExpenseForm from "../forms/ExpenseForm";
import IncomeForm from "../forms/IncomeForm";
import BillForm from "../forms/BillForm";
import SavingsForm from "../forms/SavingsForm";

function QuickActions() {
  const [expenseOpen, setExpenseOpen] = useState(false);
  const [incomeOpen, setIncomeOpen] = useState(false);
  const [billOpen, setBillOpen] = useState(false);
  const [savingsOpen, setSavingsOpen] = useState(false);

  return (
    <>
      <div
        className="dashboard-panel"
        style={{
          marginTop: "25px",
          padding: "25px",
        }}
      >
        <h3>Quick Actions</h3>

        <Stack
          direction="row"
          spacing={2}
          flexWrap="wrap"
          useFlexGap
          sx={{ marginTop: "15px" }}
        >
          <Button
            variant="contained"
            onClick={() => setExpenseOpen(true)}
            sx={{
              backgroundColor: "#49D6D0",
              "&:hover": {
                backgroundColor: "#35c5bf",
              },
            }}
          >
            + Add Expense
          </Button>

          <Button
            variant="outlined"
            onClick={() => setIncomeOpen(true)}
          >
            + Add Income
          </Button>

          <Button
            variant="outlined"
            onClick={() => setBillOpen(true)}
          >
            + Add Bill
          </Button>

          <Button
            variant="outlined"
            onClick={() => setSavingsOpen(true)}
          >
            + Add Savings Goal
          </Button>
        </Stack>
      </div>

      <ExpenseForm
        open={expenseOpen}
        handleClose={() => setExpenseOpen(false)}
        editingExpense={null}
      />

      <IncomeForm
        open={incomeOpen}
        handleClose={() => setIncomeOpen(false)}
        editingIncome={null}
      />

      <BillForm
        open={billOpen}
        handleClose={() => setBillOpen(false)}
        editingBill={null}
      />

      <SavingsForm
        open={savingsOpen}
        handleClose={() => setSavingsOpen(false)}
        editingGoal={null}
      />
    </>
  );
}

export default QuickActions;