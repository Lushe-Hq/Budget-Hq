import { Paper } from "@mui/material";
import {
  FaCalendarAlt,
} from "react-icons/fa";

import { useBills } from "../../context/BillContext";
import { useCurrency } from "../../hooks/useCurrency";

function UpcomingBills() {
  const { bills } = useBills();
  const { currency } = useCurrency();

  const upcomingBills = bills
    .filter((bill) => !bill.paid)
    .sort(
      (a, b) =>
        new Date(a.dueDate) -
        new Date(b.dueDate)
    )
    .slice(0, 5);

  return (
    <Paper
      elevation={0}
      className="dashboard-panel transactions-panel"
    >
      <div className="panel-header">
        <div>
          <h3>Upcoming Bills</h3>

          <p>
            Bills that still need your attention
          </p>
        </div>

        <span className="panel-badge">
          {upcomingBills.length}
        </span>
      </div>

      {upcomingBills.length === 0 ? (
        <div className="dashboard-empty">
          <div className="empty-icon">
            🎉
          </div>

          <strong>
            You're all caught up!
          </strong>

          <p>
            No unpaid upcoming bills.
          </p>
        </div>
      ) : (
        <div className="transactions-list">
          {upcomingBills.map((bill) => (
            <div
              className="transaction-item"
              key={bill.id}
            >
              <div className="transaction-info">
                <div className="transaction-icon bill-icon">
                  <FaCalendarAlt />
                </div>

                <div>
                  <strong>
                    {bill.name ||
                      "Bill"}
                  </strong>

                  <span>
                    Due{" "}
                    {bill.dueDate ||
                      "No date"}
                  </span>
                </div>
              </div>

              <div className="bill-amount">
                {currency(bill.amount)}
              </div>
            </div>
          ))}
        </div>
      )}
    </Paper>
  );
}

export default UpcomingBills;