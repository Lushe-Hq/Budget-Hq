import {
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Paper,
  TableContainer,
  LinearProgress,
} from "@mui/material";

import { useBudgets } from "../../context/BudgetContext";
import { useExpenses } from "../../context/ExpenseContext";
import { useCurrency } from "../../hooks/useCurrency";

function BudgetTable({ onEdit, selectedMonth }) {
  const { budgets, deleteBudget } = useBudgets();
  const { expenses } = useExpenses();
const { currency } = useCurrency();

  const monthlyBudgets = budgets.filter(
    (budget) => budget.month === selectedMonth
  );

  return (
    <TableContainer component={Paper} sx={{ mt: 4 }}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Category</TableCell>
            <TableCell>Budget</TableCell>
            <TableCell>Spent</TableCell>
            <TableCell>Remaining</TableCell>
            <TableCell>Progress</TableCell>
<TableCell>Status</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>

<TableCell>
  <span
    style={{
      color: statusColor,
      fontWeight: "600",
      fontSize: "13px",
    }}
  >
    {status}
  </span>
</TableCell>

        <TableBody>
          {monthlyBudgets.length === 0 ? (
            <TableRow>
              <TableCell colSpan={7} align="center">
                No budgets for this month.
              </TableCell>
            </TableRow>
          ) : (
            monthlyBudgets.map((budget) => {
              const spent = expenses
                .filter(
                  (expense) =>
                    expense.category === budget.category &&
                    expense.date?.startsWith(
                      selectedMonth
                    )
                )
                .reduce(
                  (total, expense) =>
                    total +
                    Number(expense.amount || 0),
                  0
                );

              const budgetAmount = Number(
                budget.amount || 0
              );

              const remaining =
                budgetAmount - spent;

              const progress =
                budgetAmount > 0
                  ? Math.min(
                      (spent / budgetAmount) * 100,
                      100
                    )
                  : 0;

let status = "On Track";
let statusColor = "#34C759";

if (progress >= 100) {
  status = "Over Budget";
  statusColor = "#FF4D4F";
} else if (progress >= 75) {
  status = "Almost There";
  statusColor = "#F5A623";
}
                  let status = "On Track";

if (spent >= budgetAmount) {
  status = "Over Budget";
} else if (progress >= 75) {
  status = "Almost There";
}

              return (
                <TableRow key={budget.id}>
                  <TableCell>
                    {budget.category}
                  </TableCell>

                  <TableCell>
  {currency(budgetAmount)}
</TableCell>

<TableCell>
  {currency(spent)}
</TableCell>

                  <TableCell
  sx={{
    color:
      remaining < 0
        ? "#FF4D4F"
        : "#34C759",
    fontWeight: "600",
  }}
>
  {currency(remaining)}
</TableCell>

                 <TableCell sx={{ minWidth: 180 }}>
  <LinearProgress
    variant="determinate"
    value={progress}
  />

  <small>
    {progress.toFixed(0)}% — {status}
  </small>
</TableCell>

                  <TableCell>
                    <button
                      onClick={() => onEdit(budget)}
                      style={{
                        border: "none",
                        background: "transparent",
                        color: "#49D6D0",
                        cursor: "pointer",
                        fontWeight: "600",
                        marginRight: "10px",
                      }}
                    >
                      Edit
                    </button>

                    <button
                      onClick={() =>
                        deleteBudget(budget.id)
                      }
                      style={{
                        border: "none",
                        background: "transparent",
                        color: "#FF4D4F",
                        cursor: "pointer",
                        fontWeight: "600",
                      }}
                    >
                      Delete
                    </button>
                  </TableCell>
                </TableRow>
              );
            })
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default BudgetTable;