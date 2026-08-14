import { useExpenses } from "../context/ExpenseContext";
import { useIncome } from "../context/IncomeContext";
import { useSavings } from "../context/SavingsContext";

import DashboardCard from "../components/dashboard/DashboardCard";
import QuickActions from "../components/dashboard/QuickActions";
import RecentTransactions from "../components/dashboard/RecentTransactions";
import UpcomingBills from "../components/dashboard/UpcomingBills";
import BudgetOverview from "../components/dashboard/BudgetOverview";
import MonthlySummary from "../components/dashboard/MonthlySummary";
import DashboardAlerts from "../components/dashboard/DashboardAlerts";

import { useCurrency } from "../hooks/useCurrency";

import "../styles/dashboard.css";

function Dashboard() {
  const { expenses } = useExpenses();
  const { income } = useIncome();
  const { goals } = useSavings();
  const { currency } = useCurrency();

  const totalExpenses = expenses.reduce(
    (total, expense) =>
      total + Number(expense.amount || 0),
    0
  );

  const totalIncome = income.reduce(
    (total, item) =>
      total + Number(item.amount || 0),
    0
  );

  const totalSavings = goals.reduce(
    (total, goal) =>
      total + Number(goal.saved || 0),
    0
  );

  const currentBalance =
    totalIncome - totalExpenses;

  return (
    <div className="dashboard-page">
      {/* WELCOME */}

      <div className="dashboard-welcome">
        <div>
          <span className="dashboard-eyebrow">
            YOUR PERSONAL FINANCE HQ 💗
          </span>

          <h1 className="dashboard-title">
            Welcome back!
          </h1>

          <p className="dashboard-subtitle">
            Here's a quick look at your money
            today.
          </p>
        </div>

        <div className="dashboard-date">
          <span>
            {new Date().toLocaleDateString(
              "en-US",
              {
                weekday: "long",
              }
            )}
          </span>

          <strong>
            {new Date().toLocaleDateString(
              "en-US",
              {
                month: "short",
                day: "numeric",
                year: "numeric",
              }
            )}
          </strong>
        </div>
      </div>

      {/* FINANCIAL CARDS */}

      <div className="cards-grid">
        <DashboardCard
          title="Current Balance"
          value={currency(currentBalance)}
          color="#49D6D0"
        />

        <DashboardCard
          title="Income"
          value={currency(totalIncome)}
          color="#45A96B"
        />

        <DashboardCard
          title="Expenses"
          value={currency(totalExpenses)}
          color="#DF5B68"
        />

        <DashboardCard
          title="Savings"
          value={currency(totalSavings)}
          color="#D4AF37"
        />
      </div>

      {/* ALERTS */}

      <DashboardAlerts />

      {/* TRANSACTIONS + BILLS */}

      <div className="dashboard-grid">
        <RecentTransactions />

        <UpcomingBills />
      </div>

      {/* BUDGET */}

      <div className="dashboard-section">
        <BudgetOverview />
      </div>

      {/* MONTHLY SUMMARY */}

      <div className="dashboard-section">
        <MonthlySummary />
      </div>

      {/* QUICK ACTIONS */}

      <div className="dashboard-section">
        <QuickActions />
      </div>
    </div>
  );
}

export default Dashboard;