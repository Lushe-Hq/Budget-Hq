import { useMemo, useState } from "react";
import {
  Button,
  Paper,
  TextField,
  MenuItem,
} from "@mui/material";

import { useBudgets } from "../context/BudgetContext";
import { useExpenses } from "../context/ExpenseContext";
import { useCategories } from "../context/CategoryContext";
import { useCurrency } from "../hooks/useCurrency";

function Budget() {
  const {
    budgets,
    addBudget,
    updateBudget,
    deleteBudget,
  } = useBudgets();

  const { expenses } = useExpenses();
  const { categories } = useCategories();
  const { currency } = useCurrency();

  const currentMonth = new Date()
    .toISOString()
    .slice(0, 7);

  const [selectedMonth, setSelectedMonth] =
    useState(currentMonth);

  const [category, setCategory] =
    useState("");

  const [amount, setAmount] =
    useState("");

  const [editingId, setEditingId] =
    useState(null);

  const monthlyBudgets = useMemo(
    () =>
      budgets.filter(
        (budget) =>
          budget.month === selectedMonth
      ),
    [budgets, selectedMonth]
  );

  function getSpent(categoryName) {
    return expenses
      .filter(
        (expense) =>
          expense.category ===
            categoryName &&
          expense.date?.startsWith(
            selectedMonth
          )
      )
      .reduce(
        (total, expense) =>
          total + Number(expense.amount || 0),
        0
      );
  }

  function resetForm() {
    setCategory("");
    setAmount("");
    setEditingId(null);
  }

  function handleSubmit(event) {
    event.preventDefault();

    if (!category || !amount) return;

    const existingBudget =
      budgets.find(
        (budget) =>
          budget.category === category &&
          budget.month === selectedMonth &&
          budget.id !== editingId
      );

    if (existingBudget && !editingId) {
      alert(
        "A budget already exists for this category this month."
      );
      return;
    }

    const budgetData = {
      category,
      amount: Number(amount),
      month: selectedMonth,
    };

    if (editingId) {
      updateBudget({
        id: editingId,
        ...budgetData,
      });
    } else {
      addBudget(budgetData);
    }

    resetForm();
  }

  function handleEdit(budget) {
    setEditingId(budget.id);
    setCategory(budget.category);
    setAmount(budget.amount);
  }

  function handleDelete(id) {
    const confirmed = window.confirm(
      "Delete this budget?"
    );

    if (!confirmed) return;

    deleteBudget(id);

    if (editingId === id) {
      resetForm();
    }
  }

  const totalBudget = monthlyBudgets.reduce(
    (total, budget) =>
      total + Number(budget.amount || 0),
    0
  );

  const totalSpent = monthlyBudgets.reduce(
    (total, budget) =>
      total + getSpent(budget.category),
    0
  );

  const totalRemaining =
    totalBudget - totalSpent;

  return (
    <div>
      <div className="page-header">
        <div>
          <h1>Budget</h1>

          <p>
            Give every part of your money a
            purpose.
          </p>
        </div>

        <TextField
          label="Month"
          type="month"
          value={selectedMonth}
          onChange={(event) =>
            setSelectedMonth(
              event.target.value
            )
          }
          slotProps={{
            inputLabel: {
              shrink: true,
            },
          }}
        />
      </div>

      {/* SUMMARY */}

      <div className="budget-summary-grid">
        <Paper
          elevation={0}
          className="budget-summary-card"
        >
          <span>Total Budget</span>

          <strong>
            {currency(totalBudget)}
          </strong>
        </Paper>

        <Paper
          elevation={0}
          className="budget-summary-card spent"
        >
          <span>Total Spent</span>

          <strong>
            {currency(totalSpent)}
          </strong>
        </Paper>

        <Paper
          elevation={0}
          className={`budget-summary-card ${
            totalRemaining < 0
              ? "over-budget"
              : ""
          }`}
        >
          <span>Remaining</span>

          <strong>
            {currency(totalRemaining)}
          </strong>
        </Paper>
      </div>

      {/* ADD BUDGET */}

      <Paper
        elevation={0}
        className="budget-form-card"
      >
        <div className="budget-form-heading">
          <div className="hq-form-icon">
            🎯
          </div>

          <div>
            <h3>
              {editingId
                ? "Edit Budget"
                : "Set a Budget"}
            </h3>

            <p>
              Decide how much you want to spend
              in each category.
            </p>
          </div>
        </div>

        <form
          onSubmit={handleSubmit}
          className="budget-form"
        >
          <TextField
            select
            label="Category"
            value={category}
            onChange={(event) =>
              setCategory(event.target.value)
            }
            fullWidth
          >
            {categories.map((item) => (
              <MenuItem
                key={item.id}
                value={item.name}
              >
                {item.icon} {item.name}
              </MenuItem>
            ))}
          </TextField>

          <TextField
            label="Budget Amount"
            type="number"
            value={amount}
            onChange={(event) =>
              setAmount(event.target.value)
            }
            inputProps={{
              min: 0,
              step: "0.01",
            }}
            fullWidth
          />

          <div className="budget-form-actions">
            {editingId && (
              <Button
                type="button"
                variant="outlined"
                onClick={resetForm}
              >
                Cancel
              </Button>
            )}

            <Button
              type="submit"
              variant="contained"
            >
              {editingId
                ? "Save Changes"
                : "Add Budget"}
            </Button>
          </div>
        </form>
      </Paper>

      {/* BUDGET LIST */}

      <Paper
        elevation={0}
        className="budget-list-card"
      >
        <div className="category-card-header">
          <div>
            <h3>
              {selectedMonth} Budgets
            </h3>

            <p>
              Track how you're doing against
              each goal.
            </p>
          </div>

          <div className="category-count">
            {monthlyBudgets.length}
          </div>
        </div>

        {monthlyBudgets.length === 0 ? (
          <div className="category-empty">
            <div className="category-empty-icon">
              🎯
            </div>

            <h3>
              No budgets for this month
            </h3>

            <p>
              Set your first category budget
              above.
            </p>
          </div>
        ) : (
          <div className="budget-list">
            {monthlyBudgets.map((budget) => {
              const budgetAmount =
                Number(
                  budget.amount || 0
                );

              const spent = getSpent(
                budget.category
              );

              const remaining =
                budgetAmount - spent;

              const percentage =
                budgetAmount > 0
                  ? (spent / budgetAmount) *
                    100
                  : 0;

              const progress = Math.min(
                Math.max(percentage, 0),
                100
              );

              const categoryInfo =
                categories.find(
                  (item) =>
                    item.name ===
                    budget.category
                );

              return (
                <div
                  key={budget.id}
                  className="budget-item"
                >
                  <div className="budget-item-top">
                    <div className="budget-name">
                      <div className="category-icon">
                        {categoryInfo?.icon ||
                          "🎯"}
                      </div>

                      <div>
                        <strong>
                          {budget.category}
                        </strong>

                        <span>
                          {currency(spent)} of{" "}
                          {currency(
                            budgetAmount
                          )}
                        </span>
                      </div>
                    </div>

                    <div className="budget-actions">
                      <button
                        onClick={() =>
                          handleEdit(
                            budget
                          )
                        }
                        className="category-edit"
                      >
                        Edit
                      </button>

                      <button
                        onClick={() =>
                          handleDelete(
                            budget.id
                          )
                        }
                        className="category-delete"
                      >
                        Delete
                      </button>
                    </div>
                  </div>

                  <div className="budget-progress">
                    <div
                      className={`budget-progress-bar ${
                        percentage >= 100
                          ? "danger"
                          : percentage >= 75
                          ? "warning"
                          : ""
                      }`}
                      style={{
                        width: `${progress}%`,
                      }}
                    />
                  </div>

                  <div className="budget-item-bottom">
                    <span>
                      {Math.round(
                        percentage
                      )}
                      % used
                    </span>

                    <strong
                      className={
                        remaining < 0
                          ? "budget-over"
                          : "budget-left"
                      }
                    >
                      {remaining < 0
                        ? `${currency(
                            Math.abs(
                              remaining
                            )
                          )} over`
                        : `${currency(
                            remaining
                          )} left`}
                    </strong>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </Paper>
    </div>
  );
}

export default Budget;