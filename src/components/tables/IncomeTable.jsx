import {
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Paper,
  TableContainer,
} from "@mui/material";

import {
  FaEdit,
  FaTrash,
} from "react-icons/fa";

import { useIncome } from "../../context/IncomeContext";
import { useCurrency } from "../../hooks/useCurrency";

function IncomeTable({
  onEdit,
  search = "",
  type = "",
  month = "",
}) {
  const { income, deleteIncome } = useIncome();
  const { currency } = useCurrency();

  const searchTerm = search.toLowerCase();

  const filteredIncome = income.filter((item) => {
    const description = item.description || "";
    const incomeType = item.type || "";
    const date = item.date || "";

    const matchesSearch =
      !searchTerm ||
      description.toLowerCase().includes(searchTerm) ||
      incomeType.toLowerCase().includes(searchTerm) ||
      date.toLowerCase().includes(searchTerm);

    const matchesType =
      !type || incomeType === type;

    const matchesMonth =
      !month || date.startsWith(month);

    return (
      matchesSearch &&
      matchesType &&
      matchesMonth
    );
  });

  return (
    <div className="hq-table-card">
      <div className="hq-table-header">
        <div>
          <h3>Income History</h3>

          <p>
            {filteredIncome.length}{" "}
            {filteredIncome.length === 1
              ? "income entry"
              : "income entries"}{" "}
            found
          </p>
        </div>

        <div className="hq-table-count income-count">
          {filteredIncome.length}
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
              <TableCell>Type</TableCell>
              <TableCell>Description</TableCell>
              <TableCell>Amount</TableCell>
              <TableCell align="right">
                Actions
              </TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {filteredIncome.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={5}
                  align="center"
                >
                  <div className="hq-empty-state">
                    <div className="hq-empty-icon income-empty-icon">
                      💰
                    </div>

                    <strong>
                      No income found
                    </strong>

                    <p>
                      Try changing your search
                      or filters.
                    </p>
                  </div>
                </TableCell>
              </TableRow>
            ) : (
              filteredIncome.map((item) => (
                <TableRow
                  key={item.id}
                  className="hq-table-row"
                >
                  <TableCell>
                    <span className="hq-date">
                      {item.date || "-"}
                    </span>
                  </TableCell>

                  <TableCell>
                    <span className="hq-category income-category">
                      {item.type || "Other"}
                    </span>
                  </TableCell>

                  <TableCell>
                    <strong className="hq-description">
                      {item.description || "-"}
                    </strong>
                  </TableCell>

                  <TableCell>
                    <span className="hq-income-amount">
                      +{currency(item.amount)}
                    </span>
                  </TableCell>

                  <TableCell align="right">
                    <div className="hq-actions">
                      <button
                        className="hq-action edit"
                        onClick={() => onEdit(item)}
                        title="Edit income"
                      >
                        <FaEdit />
                      </button>

                      <button
                        className="hq-action delete"
                        onClick={() =>
                          deleteIncome(item.id)
                        }
                        title="Delete income"
                      >
                        <FaTrash />
                      </button>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}

export default IncomeTable;