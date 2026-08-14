import { useState } from "react";
import {
  Button,
  Paper,
  TextField,
} from "@mui/material";

import { useSavings } from "../context/SavingsContext";
import { useCurrency } from "../hooks/useCurrency";

function Savings() {
  const {
    goals,
    addGoal,
    updateGoal,
    deleteGoal,
  } = useSavings();

  const { currency } = useCurrency();

  const [name, setName] = useState("");
  const [target, setTarget] = useState("");
  const [saved, setSaved] = useState("");

  const [editingId, setEditingId] =
    useState(null);

  function resetForm() {
    setName("");
    setTarget("");
    setSaved("");
    setEditingId(null);
  }

  function handleSubmit(event) {
    event.preventDefault();

    if (!name.trim() || !target) {
      return;
    }

    const goal = {
      name: name.trim(),
      target: Number(target),
      saved: Number(saved || 0),
    };

    if (editingId) {
      const existingGoal = goals.find(
        (item) => item.id === editingId
      );

      updateGoal({
        ...existingGoal,
        ...goal,
      });
    } else {
      addGoal(goal);
    }

    resetForm();
  }

  function handleEdit(goal) {
    setEditingId(goal.id);
    setName(goal.name || "");
    setTarget(goal.target || "");
    setSaved(goal.saved || "");
  }

  function handleDelete(id) {
    const confirmed = window.confirm(
      "Delete this savings goal?"
    );

    if (!confirmed) return;

    deleteGoal(id);

    if (editingId === id) {
      resetForm();
    }
  }

  const totalSaved = goals.reduce(
    (total, goal) =>
      total + Number(goal.saved || 0),
    0
  );

  const totalTarget = goals.reduce(
    (total, goal) =>
      total + Number(goal.target || 0),
    0
  );

  return (
    <div>
      {/* HEADER */}

      <div className="page-header">
        <div>
          <h1>Savings</h1>

          <p>
            Give your dreams a number and a plan.
          </p>
        </div>

        <div className="savings-total-badge">
          💗 {currency(totalSaved)} saved
        </div>
      </div>

      {/* SUMMARY */}

      <div className="savings-summary-grid">
        <Paper
          elevation={0}
          className="savings-summary-card"
        >
          <span>Total Saved</span>

          <strong>
            {currency(totalSaved)}
          </strong>
        </Paper>

        <Paper
          elevation={0}
          className="savings-summary-card"
        >
          <span>Total Goals</span>

          <strong>
            {goals.length}
          </strong>
        </Paper>

        <Paper
          elevation={0}
          className="savings-summary-card"
        >
          <span>Goal Target</span>

          <strong>
            {currency(totalTarget)}
          </strong>
        </Paper>
      </div>

      {/* ADD GOAL */}

      <Paper
        elevation={0}
        className="savings-form-card"
      >
        <div className="budget-form-heading">
          <div className="hq-form-icon savings-form-icon">
            🎯
          </div>

          <div>
            <h3>
              {editingId
                ? "Edit Savings Goal"
                : "Create a Savings Goal"}
            </h3>

            <p>
              Keep your goals visible and watch
              your progress grow.
            </p>
          </div>
        </div>

        <form
          onSubmit={handleSubmit}
          className="savings-form"
        >
          <TextField
            label="Goal Name"
            value={name}
            onChange={(event) =>
              setName(event.target.value)
            }
            placeholder="e.g. New Car"
            fullWidth
          />

          <TextField
            label="Target Amount"
            type="number"
            value={target}
            onChange={(event) =>
              setTarget(event.target.value)
            }
            inputProps={{
              min: 0,
              step: "0.01",
            }}
            fullWidth
          />

          <TextField
            label="Amount Already Saved"
            type="number"
            value={saved}
            onChange={(event) =>
              setSaved(event.target.value)
            }
            inputProps={{
              min: 0,
              step: "0.01",
            }}
            fullWidth
          />

          <div className="savings-form-actions">
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
                : "Add Goal"}
            </Button>
          </div>
        </form>
      </Paper>

      {/* GOALS */}

      <Paper
        elevation={0}
        className="savings-goals-card"
      >
        <div className="category-card-header">
          <div>
            <h3>Your Savings Goals</h3>

            <p>
              Every little bit gets you closer.
            </p>
          </div>

          <div className="category-count">
            {goals.length}
          </div>
        </div>

        {goals.length === 0 ? (
          <div className="category-empty">
            <div className="category-empty-icon">
              💗
            </div>

            <h3>
              No savings goals yet
            </h3>

            <p>
              Create your first goal and start
              building toward something you want.
            </p>

            <Button
              variant="contained"
              onClick={() =>
                document
                  .querySelector(
                    ".savings-form-card"
                  )
                  ?.scrollIntoView({
                    behavior: "smooth",
                  })
              }
            >
              Create Your First Goal
            </Button>
          </div>
        ) : (
          <div className="savings-goals-grid">
            {goals.map((goal) => {
              const goalTarget =
                Number(goal.target || 0);

              const goalSaved =
                Number(goal.saved || 0);

              const percentage =
                goalTarget > 0
                  ? (goalSaved /
                      goalTarget) *
                    100
                  : 0;

              const progress = Math.min(
                Math.max(percentage, 0),
                100
              );

              const remaining =
                goalTarget - goalSaved;

              return (
                <div
                  key={goal.id}
                  className="savings-goal-card"
                >
                  <div className="savings-goal-top">
                    <div className="savings-goal-icon">
                      🎯
                    </div>

                    <div className="savings-goal-actions">
                      <button
                        className="category-edit"
                        onClick={() =>
                          handleEdit(goal)
                        }
                      >
                        Edit
                      </button>

                      <button
                        className="category-delete"
                        onClick={() =>
                          handleDelete(
                            goal.id
                          )
                        }
                      >
                        Delete
                      </button>
                    </div>
                  </div>

                  <h3>
                    {goal.name ||
                      "Savings Goal"}
                  </h3>

                  <div className="savings-goal-amounts">
                    <strong>
                      {currency(goalSaved)}
                    </strong>

                    <span>
                      of{" "}
                      {currency(goalTarget)}
                    </span>
                  </div>

                  <div className="savings-progress">
                    <div
                      className="savings-progress-bar"
                      style={{
                        width: `${progress}%`,
                      }}
                    />
                  </div>

                  <div className="savings-goal-bottom">
                    <span>
                      {Math.round(
                        percentage
                      )}
                      % complete
                    </span>

                    <strong>
                      {remaining <= 0
                        ? "🎉 Goal reached!"
                        : `${currency(
                            remaining
                          )} to go`}
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

export default Savings;