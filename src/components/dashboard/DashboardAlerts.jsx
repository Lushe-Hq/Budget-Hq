import { useMemo } from "react";
import { Alert, Stack } from "@mui/material";

import { useBudgets } from "../../context/BudgetContext";
import { useExpenses } from "../../context/ExpenseContext";
import { useBills } from "../../context/BillContext";
import { useSettings } from "../../context/SettingsContext";
import { useCurrency } from "../../hooks/useCurrency";

function DashboardAlerts() {
  const { budgets } = useBudgets();
  const { expenses } = useExpenses();
  const { bills } = useBills();
  const { settings } = useSettings();
  const { currency } = useCurrency();

  const currentMonth = new Date()
    .toISOString()
    .slice(0, 7);

  const alerts = useMemo(() => {
    if (!settings.budgetAlerts) {
      return [];
    }

    const results = [];

    budgets
      .filter(
        (budget) => budget.month === currentMonth
      )
      .forEach((budget) => {
        const spent = expenses
          .filter(
            (expense) =>
              expense.category === budget.category &&
              expense.date?.startsWith(currentMonth)
          )
          .reduce(
            (total, expense) =>
              total + Number(expense.amount || 0),
            0
          );

        const amount = Number(budget.amount || 0);

        if (amount <= 0) {
          return;
        }

        const percentage = (spent / amount) * 100;

        if (percentage >= 100) {
          results.push({
            severity: "error",
            message: `${budget.category} is over budget by ${currency(
              spent - amount
            )}.`,
          });
        } else if (percentage >= 75) {
          results.push({
            severity: "warning",
            message: `${budget.category} is ${percentage.toFixed(
              0
            )}% used. You have ${currency(
              amount - spent
            )} left.`,
          });
        }
      });

    return results;
  }, [
    budgets,
    expenses,
    settings.budgetAlerts,
    currentMonth,
    currency,
  ]);

  const unpaidBills = bills.filter(
    (bill) => !bill.paid
  );

  const billAlerts = unpaidBills
    .filter((bill) => {
      if (!bill.dueDate) return false;

      const today = new Date();
      const dueDate = new Date(
        `${bill.dueDate}T00:00:00`
      );

      const difference =
        (dueDate - today) /
        (1000 * 60 * 60 * 24);

      return difference >= 0 && difference <= 7;
    })
    .slice(0, 3);

  if (
    alerts.length === 0 &&
    billAlerts.length === 0
  ) {
    return null;
  }

  return (
    <Stack spacing={1.5} sx={{ marginTop: "25px" }}>
      {alerts.map((alert, index) => (
        <Alert
          key={`budget-${index}`}
          severity={alert.severity}
        >
          {alert.message}
        </Alert>
      ))}

      {billAlerts.map((bill) => (
        <Alert
          key={`bill-${bill.id}`}
          severity="info"
        >
          {bill.name} is due on {bill.dueDate} —{" "}
          {currency(bill.amount)}.
        </Alert>
      ))}
    </Stack>
  );
}

export default DashboardAlerts;