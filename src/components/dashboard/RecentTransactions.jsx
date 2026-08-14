import {
  Paper,
  IconButton,
} from "@mui/material";
import {
  FaArrowDown,
  FaArrowUp,
} from "react-icons/fa";

import { useExpenses } from "../../context/ExpenseContext";
import { useCurrency } from "../../hooks/useCurrency";

function RecentTransactions() {
  const { expenses } = useExpenses();
  const { currency } = useCurrency();

  const recentExpenses = [...expenses]
    .sort(
      (a, b) =>
        new Date(b.date) -
        new Date(a.date)
    )
    .slice(0, 5);

  return (
    <Paper
      elevation={0}
      className="dashboard-panel transactions-panel"
    >
      <div className="panel-header">
        <div>
          <h3>Recent Transactions</h3>

          <p>
            Your latest spending activity
          </p>
        </div>

        <span className="panel-badge">
          {recentExpenses.length}
        </span>
      </div>

      {recentExpenses.length === 0 ? (
        <div className="dashboard-empty">
          <div className="empty-icon">
            💗
          </div>

          <strong>No transactions yet</strong>

          <p>
            Your recent expenses will appear
            here.
          </p>
        </div>
      ) : (
        <div className="transactions-list">
          {recentExpenses.map((expense) => (
            <div
              className="transaction-item"
              key={expense.id}
            >
              <div className="transaction-info">
                <div className="transaction-icon expense-icon">
                  <FaArrowDown />
                </div>

                <div>
                  <strong>
                    {expense.description ||
                      "Expense"}
                  </strong>

                  <span>
                    {expense.category ||
                      "Other"}{" "}
                    • {expense.date || ""}
                  </span>
                </div>
              </div>

              <div className="transaction-amount">
                -{currency(expense.amount)}
              </div>
            </div>
          ))}
        </div>
      )}
    </Paper>
  );
}

export default RecentTransactions;