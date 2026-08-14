import { useMemo } from "react";
import { Paper } from "@mui/material";

import { useExpenses } from "../../context/ExpenseContext";
import { useIncome } from "../../context/IncomeContext";
import { useSavings } from "../../context/SavingsContext";
import { useBills } from "../../context/BillContext";
import { useCurrency } from "../../hooks/useCurrency";

function MonthlySummary() {
  const { expenses } = useExpenses();
  const { income } = useIncome();
  const { goals } = useSavings();
  const { bills } = useBills();
  const { currency } = useCurrency();

  const currentMonth = new Date()
    .toISOString()
    .slice(0, 7);

  const monthlyIncome = useMemo(() => {
    return income
      .filter((item) =>
        item.date?.startsWith(currentMonth)
      )
      .reduce(
        (total, item) =>
          total + Number(item.amount || 0),
        0
      );
  }, [income, currentMonth]);

  const monthlyExpenses = useMemo(() => {
    return expenses
      .filter((item) =>
        item.date?.startsWith(currentMonth)
      )
      .reduce(
        (total, item) =>
          total + Number(item.amount || 0),
        0
      );
  }, [expenses, currentMonth]);

  const totalSavings = goals.reduce(
    (total, goal) =>
      total + Number(goal.saved || 0),
    0
  );

  const unpaidBills = bills.filter(
    (bill) => !bill.paid
  );

  const unpaidBillTotal = unpaidBills.reduce(
    (total, bill) =>
      total + Number(bill.amount || 0),
    0
  );

  const moneyRemaining =
    monthlyIncome - monthlyExpenses;

  return (
    <Paper
      className="dashboard-panel"
      sx={{
        padding: "25px",
        marginTop: "25px",
      }}
    >
      <div className="panel-header">
        <div>
          <h3>Monthly Summary</h3>

          <p>
            Your financial snapshot for this month
          </p>
        </div>
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns:
  "repeat(auto-fit, minmax(130px, 1fr))",
          gap: "15px",
        }}
      >
        <div>
          <small>Income</small>

          <h3
            style={{
              color: "#34C759",
            }}
          >
            {currency(monthlyIncome)}
          </h3>
        </div>

        <div>
          <small>Expenses</small>

          <h3
            style={{
              color: "#FF4D4F",
            }}
          >
            {currency(monthlyExpenses)}
          </h3>
        </div>

        <div>
          <small>Savings</small>

          <h3
            style={{
              color: "#D4AF37",
            }}
          >
            {currency(totalSavings)}
          </h3>
        </div>

        <div>
          <small>Unpaid Bills</small>

          <h3>
            {currency(unpaidBillTotal)}
          </h3>
        </div>

        <div>
          <small>Remaining</small>

          <h3
            style={{
              color:
                moneyRemaining < 0
                  ? "#FF4D4F"
                  : "#49D6D0",
            }}
          >
            {currency(moneyRemaining)}
          </h3>
        </div>
      </div>
    </Paper>
  );
}

export default MonthlySummary;