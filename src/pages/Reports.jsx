import { useMemo } from "react";
import { Paper } from "@mui/material";
import {
  FaArrowUp,
  FaArrowDown,
  FaWallet,
  FaPiggyBank,
} from "react-icons/fa";

import { useExpenses } from "../context/ExpenseContext";
import { useIncome } from "../context/IncomeContext";
import { useSavings } from "../context/SavingsContext";
import { useCurrency } from "../hooks/useCurrency";

function Reports() {
  const { expenses } = useExpenses();
  const { income } = useIncome();
  const { goals } = useSavings();
  const { currency } = useCurrency();

  const currentMonth = new Date()
    .toISOString()
    .slice(0, 7);

  const monthlyExpenses = useMemo(
    () =>
      expenses.filter((expense) =>
        expense.date?.startsWith(currentMonth)
      ),
    [expenses, currentMonth]
  );

  const monthlyIncome = useMemo(
    () =>
      income.filter((item) =>
        item.date?.startsWith(currentMonth)
      ),
    [income, currentMonth]
  );

  const totalExpenses =
    monthlyExpenses.reduce(
      (total, expense) =>
        total + Number(expense.amount || 0),
      0
    );

  const totalIncome =
    monthlyIncome.reduce(
      (total, item) =>
        total + Number(item.amount || 0),
      0
    );

  const totalSavings = goals.reduce(
    (total, goal) =>
      total + Number(goal.saved || 0),
    0
  );

  const balance =
    totalIncome - totalExpenses;

  const expenseByCategory = useMemo(() => {
    const totals = {};

    monthlyExpenses.forEach((expense) => {
      const category =
        expense.category || "Other";

      totals[category] =
        (totals[category] || 0) +
        Number(expense.amount || 0);
    });

    return Object.entries(totals)
      .sort((a, b) => b[1] - a[1]);
  }, [monthlyExpenses]);

  const maxCategoryAmount =
    expenseByCategory.length > 0
      ? expenseByCategory[0][1]
      : 0;

  const savingsProgress =
    totalIncome > 0
      ? Math.min(
          (totalSavings / totalIncome) * 100,
          100
        )
      : 0;

  return (
    <div>
      {/* HEADER */}

      <div className="page-header">
        <div>
          <h1>Reports</h1>

          <p>
            A clearer picture of where your money
            is going.
          </p>
        </div>

        <div className="reports-month">
          {new Date().toLocaleDateString(
            "en-US",
            {
              month: "long",
              year: "numeric",
            }
          )}
        </div>
      </div>

      {/* SUMMARY */}

      <div className="reports-summary-grid">
        <Paper
          elevation={0}
          className="report-summary-card"
        >
          <div className="report-summary-icon income">
            <FaArrowUp />
          </div>

          <div>
            <span>Income</span>

            <strong>
              {currency(totalIncome)}
            </strong>
          </div>
        </Paper>

        <Paper
          elevation={0}
          className="report-summary-card"
        >
          <div className="report-summary-icon expense">
            <FaArrowDown />
          </div>

          <div>
            <span>Expenses</span>

            <strong>
              {currency(totalExpenses)}
            </strong>
          </div>
        </Paper>

        <Paper
          elevation={0}
          className="report-summary-card"
        >
          <div className="report-summary-icon balance">
            <FaWallet />
          </div>

          <div>
            <span>Net Balance</span>

            <strong
              className={
                balance < 0
                  ? "report-negative"
                  : ""
              }
            >
              {currency(balance)}
            </strong>
          </div>
        </Paper>

        <Paper
          elevation={0}
          className="report-summary-card"
        >
          <div className="report-summary-icon savings">
            <FaPiggyBank />
          </div>

          <div>
            <span>Total Saved</span>

            <strong>
              {currency(totalSavings)}
            </strong>
          </div>
        </Paper>
      </div>

      {/* MAIN REPORT GRID */}

      <div className="reports-grid">
        {/* SPENDING */}

        <Paper
          elevation={0}
          className="report-panel"
        >
          <div className="report-panel-header">
            <div>
              <h3>Spending Breakdown</h3>

              <p>
                Where your money went this month
              </p>
            </div>
          </div>

          {expenseByCategory.length === 0 ? (
            <div className="dashboard-empty">
              <div className="empty-icon">
                📊
              </div>

              <strong>
                No spending data yet
              </strong>

              <p>
                Add expenses to see your
                breakdown.
              </p>
            </div>
          ) : (
            <div className="report-category-list">
              {expenseByCategory.map(
                ([category, amount]) => {
                  const percentage =
                    totalExpenses > 0
                      ? (amount /
                          totalExpenses) *
                        100
                      : 0;

                  const width =
                    maxCategoryAmount > 0
                      ? (amount /
                          maxCategoryAmount) *
                        100
                      : 0;

                  return (
                    <div
                      className="report-category"
                      key={category}
                    >
                      <div className="report-category-top">
                        <span>
                          {category}
                        </span>

                        <strong>
                          {currency(amount)}
                        </strong>
                      </div>

                      <div className="report-bar">
                        <div
                          className="report-bar-fill"
                          style={{
                            width: `${width}%`,
                          }}
                        />
                      </div>

                      <small>
                        {Math.round(
                          percentage
                        )}
                        % of spending
                      </small>
                    </div>
                  );
                }
              )}
            </div>
          )}
        </Paper>

        {/* MONTHLY OVERVIEW */}

        <Paper
          elevation={0}
          className="report-panel"
        >
          <div className="report-panel-header">
            <div>
              <h3>Monthly Overview</h3>

              <p>
                Your income compared with
                spending
              </p>
            </div>
          </div>

          <div className="monthly-overview">
            <div className="overview-row">
              <div>
                <span>Income</span>
              </div>

              <strong className="overview-income">
                {currency(totalIncome)}
              </strong>
            </div>

            <div className="overview-row">
              <div>
                <span>Expenses</span>
              </div>

              <strong className="overview-expense">
                {currency(totalExpenses)}
              </strong>
            </div>

            <div className="overview-divider" />

            <div className="overview-row total">
              <div>
                <span>Left After Expenses</span>
              </div>

              <strong
                className={
                  balance < 0
                    ? "report-negative"
                    : "overview-balance"
                }
              >
                {currency(balance)}
              </strong>
            </div>
          </div>

          <div className="income-expense-visual">
            <div
              className="income-visual"
              style={{
                width: `${
                  totalIncome > 0
                    ? Math.min(
                        (totalIncome /
                          Math.max(
                            totalIncome,
                            totalExpenses
                          )) *
                          100,
                        100
                      )
                    : 0
                }%`,
              }}
            />
          </div>
        </Paper>
      </div>

      {/* SAVINGS INSIGHT */}

      <Paper
        elevation={0}
        className="savings-report-panel"
      >
        <div className="savings-report-content">
          <div className="report-summary-icon savings">
            <FaPiggyBank />
          </div>

          <div className="savings-report-text">
            <h3>Savings Progress</h3>

            <p>
              You've saved{" "}
              <strong>
                {currency(totalSavings)}
              </strong>{" "}
              across your current savings goals.
            </p>

            <div className="report-savings-bar">
              <div
                style={{
                  width: `${savingsProgress}%`,
                }}
              />
            </div>
          </div>

          <strong className="savings-percentage">
            {Math.round(savingsProgress)}%
          </strong>
        </div>
      </Paper>
    </div>
  );
}

export default Reports;