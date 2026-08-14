import { useMemo } from "react";
import {
  Paper,
  LinearProgress,
} from "@mui/material";

import { useBudgets } from "../../context/BudgetContext";
import { useExpenses } from "../../context/ExpenseContext";
import { useCategories } from "../../context/CategoryContext";
import { useCurrency } from "../../hooks/useCurrency";

function BudgetOverview() {
  const { budgets } = useBudgets();
  const { expenses } = useExpenses();
  const { categories } = useCategories();
  const { currency } = useCurrency();

  const selectedMonth = new Date()
    .toISOString()
    .slice(0, 7);

  const monthlyBudgets = useMemo(() => {
    return budgets.filter(
      (budget) => budget.month === selectedMonth
    );
  }, [budgets, selectedMonth]);

  function getSpent(categoryName) {
    return expenses
      .filter(
        (expense) =>
          expense.category === categoryName &&
          expense.date?.startsWith(selectedMonth)
      )
      .reduce(
        (total, expense) =>
          total + Number(expense.amount || 0),
        0
      );
  }

  function getCategoryIcon(categoryName) {
    const category = categories.find(
      (item) => item.name === categoryName
    );

    return category?.icon || "💰";
  }

  if (monthlyBudgets.length === 0) {
    return (
      <Paper
        className="dashboard-panel"
        sx={{ padding: "25px" }}
      >
        <h3>Budget Overview</h3>

        <p className="empty-state">
          No budgets have been set for this month.
        </p>
      </Paper>
    );
  }

  return (
    <Paper
      className="dashboard-panel"
      sx={{ padding: "25px" }}
    >
      <div className="panel-header">
        <div>
          <h3>Budget Overview</h3>

          <p>
            This month's budget vs. spending
          </p>
        </div>
      </div>

      <div>
        {monthlyBudgets.map((budget) => {
          const budgetAmount =
            Number(budget.amount || 0);

          const spent = getSpent(
            budget.category
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

          let progressColor = "success";

          if (progress >= 100) {
            progressColor = "error";
          } else if (progress >= 75) {
            progressColor = "warning";
          }

          return (
            <div
              key={budget.id}
              style={{
                marginBottom: "22px",
              }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent:
                    "space-between",
                  alignItems: "center",
                  marginBottom: "8px",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "8px",
                  }}
                >
                  <span>
                    {getCategoryIcon(
                      budget.category
                    )}
                  </span>

                  <strong>
                    {budget.category}
                  </strong>
                </div>

                <span>
                  {currency(spent)} /{" "}
                  {currency(budgetAmount)}
                </span>
              </div>

              <LinearProgress
                variant="determinate"
                value={progress}
                color={progressColor}
              />

              <div
                style={{
                  display: "flex",
                  justifyContent:
                    "space-between",
                  marginTop: "6px",
                  fontSize: "13px",
                }}
              >
                <span>
                  {progress.toFixed(0)}% used
                </span>

                <span
                  style={{
                    color:
                      remaining < 0
                        ? "#FF4D4F"
                        : "#34C759",
                    fontWeight: "600",
                  }}
                >
                  {remaining < 0
                    ? `${currency(
                        Math.abs(remaining)
                      )} over`
                    : `${currency(
                        remaining
                      )} left`}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </Paper>
  );
}

export default BudgetOverview;