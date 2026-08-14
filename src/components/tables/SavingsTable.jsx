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

import { useSavings } from "../../context/SavingsContext";
import { useCurrency } from "../../hooks/useCurrency";

function SavingsTable({ onEdit }) {
  const {
    goals,
    deleteGoal,
    addToGoal,
  } = useSavings();
const { currency } = useCurrency();

  function handleAddMoney(goal) {
    const amount = prompt(
      `How much would you like to add to ${goal.name}?`
    );

    if (!amount) return;

    const value = Number(amount);

    if (Number.isNaN(value) || value <= 0) {
      alert("Please enter a valid amount.");
      return;
    }

    addToGoal(goal.id, value);
  }

  return (
    <TableContainer component={Paper} sx={{ mt: 4 }}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Goal</TableCell>
            <TableCell>Progress</TableCell>
            <TableCell>Target Date</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {goals.length === 0 ? (
            <TableRow>
              <TableCell colSpan={4} align="center">
                No savings goals yet.
              </TableCell>
            </TableRow>
          ) : (
            goals.map((goal) => {
              const target = Number(goal.target || 0);
              const saved = Number(goal.saved || 0);

              const percentage =
                target > 0
                  ? Math.min((saved / target) * 100, 100)
                  : 0;

              return (
                <TableRow key={goal.id}>
                  <TableCell>
                    <strong>{goal.name}</strong>

                    <div>
  {currency(saved)} / {currency(target)}
</div>
                  </TableCell>

                  <TableCell sx={{ minWidth: 220 }}>
                    <LinearProgress
                      variant="determinate"
                      value={percentage}
                    />

                    <small>
                      {percentage.toFixed(0)}%
                    </small>
                  </TableCell>

                  <TableCell>
                    {goal.targetDate}
                  </TableCell>

                  <TableCell>
                    <button
                      onClick={() =>
                        handleAddMoney(goal)
                      }
                      style={{
                        border: "none",
                        background: "transparent",
                        color: "#49D6D0",
                        cursor: "pointer",
                        fontWeight: "600",
                        marginRight: "10px",
                      }}
                    >
                      + Money
                    </button>

                    <button
                      onClick={() => onEdit(goal)}
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
                        deleteGoal(goal.id)
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

export default SavingsTable;