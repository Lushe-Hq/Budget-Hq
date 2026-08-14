import {
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Paper,
  TableContainer,
} from "@mui/material";

import { FaEdit, FaTrash } from "react-icons/fa";

import { useExpenses } from "../../context/ExpenseContext";
import { useCurrency } from "../../hooks/useCurrency";

function ExpenseTable({
  onEdit,
  search = "",
  category = "",
  month = "",
}) {
  const { expenses, deleteExpense } =
    useExpenses();

  const { currency } = useCurrency();

  const searchTerm = search.toLowerCase();

  const filteredExpenses = expenses.filter(
    (expense) => {
      const description =
        expense.description || "";

      const expenseCategory =
        expense.category || "";

      const date = expense.date || "";

      const matchesSearch =
        !searchTerm ||
        description
          .toLowerCase()
          .includes(searchTerm) ||
        expenseCategory
          .toLowerCase()
          .includes(searchTerm) ||
        date
          .toLowerCase()
          .includes(searchTerm);

      const matchesCategory =
        !category ||
        expenseCategory === category;

      const matchesMonth =
        !month ||
        date.startsWith(month);

      return (
        matchesSearch &&
        matchesCategory &&
        matchesMonth
      );
    }
  );

  return (
    <div className="hq-table-card">
      <div className="hq-table-header">
        <div>
          <h3>Expense History</h3>

          <p>
            {filteredExpenses.length}{" "}
            {filteredExpenses.length === 1
              ? "expense"
              : "expenses"}{" "}
            found
          </p>
        </div>

        <div className="hq-table-count">
          {filteredExpenses.length}
        </div>
      </div>

      <TableContainer
        component={Paper}
        elevation={0}
        className="hq-table-container"
      >
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Date</TableCell>

              <TableCell>
                Category
              </TableCell>

              <TableCell>
                Description
              </TableCell>

              <TableCell>
                Amount
              </TableCell>

              <TableCell align="right">
                Actions
              </TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {filteredExpenses.length ===
            0 ? (
              <TableRow>
                <TableCell
                  colSpan={5}
                  align="center"
                >
                  <div className="hq-empty-state">
                    <div className="hq-empty-icon">
                      💗
                    </div>

                    <strong>
                      No expenses found
                    </strong>

                    <p>
                      Try changing your search
                      or filters.
                    </p>
                  </div>
                </TableCell>
              </TableRow>
            ) : (
              filteredExpenses.map(
                (expense) => (
                  <TableRow
                    key={expense.id}
                    className="hq-table-row"
                  >
                    <TableCell>
                      <span className="hq-date">
                        {expense.date || "-"}
                      </span>
                    </TableCell>

                    <TableCell>
                      <span className="hq-category">
                        {expense.category ||
                          "Other"}
                      </span>
                    </TableCell>

                    <TableCell>
                      <strong className="hq-description">
                        {expense.description ||
                          "-"}
                      </strong>
                    </TableCell>

                    <TableCell>
                      <span className="hq-expense-amount">
                        -
                        {currency(
                          expense.amount
                        )}
                      </span>
                    </TableCell>

                    <TableCell align="right">
                      <div className="hq-actions">
                        <button
                          className="hq-action edit"
                          onClick={() =>
                            onEdit(expense)
                          }
                          title="Edit expense"
                        >
                          <FaEdit />
                        </button>

                        <button
                          className="hq-action delete"
                          onClick={() =>
                            deleteExpense(
                              expense.id
                            )
                          }
                          title="Delete expense"
                        >
                          <FaTrash />
                        </button>
                      </div>
                    </TableCell>
                  </TableRow>
                )
              )
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}

export default ExpenseTable;