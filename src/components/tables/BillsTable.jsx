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
  FaCheck,
} from "react-icons/fa";

import { useBills } from "../../context/BillContext";
import { useCurrency } from "../../hooks/useCurrency";

function BillsTable({
  onEdit,
  search = "",
  status = "",
  month = "",
}) {
  const {
    bills,
    deleteBill,
    toggleBillPaid,
  } = useBills();

  const { currency } = useCurrency();

  const searchTerm = search.toLowerCase();

  const filteredBills = bills.filter((bill) => {
    const name = bill.name || "";
    const description = bill.description || "";
    const dueDate = bill.dueDate || "";

    const matchesSearch =
      !searchTerm ||
      name.toLowerCase().includes(searchTerm) ||
      description.toLowerCase().includes(searchTerm) ||
      dueDate.toLowerCase().includes(searchTerm);

    const matchesStatus =
      !status ||
      (status === "paid" && bill.paid) ||
      (status === "unpaid" && !bill.paid);

    const matchesMonth =
      !month || dueDate.startsWith(month);

    return (
      matchesSearch &&
      matchesStatus &&
      matchesMonth
    );
  });

  return (
    <div className="hq-table-card">
      <div className="hq-table-header">
        <div>
          <h3>Bill Tracker</h3>

          <p>
            {filteredBills.length}{" "}
            {filteredBills.length === 1
              ? "bill"
              : "bills"}{" "}
            found
          </p>
        </div>

        <div className="hq-table-count">
          {filteredBills.length}
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
              <TableCell>Bill</TableCell>
              <TableCell>Due Date</TableCell>
              <TableCell>Amount</TableCell>
              <TableCell>Status</TableCell>
              <TableCell align="right">
                Actions
              </TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {filteredBills.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={5}
                  align="center"
                >
                  <div className="hq-empty-state">
                    <div className="hq-empty-icon">
                      🧾
                    </div>

                    <strong>
                      No bills found
                    </strong>

                    <p>
                      Try changing your search
                      or filters.
                    </p>
                  </div>
                </TableCell>
              </TableRow>
            ) : (
              filteredBills.map((bill) => (
                <TableRow
                  key={bill.id}
                  className="hq-table-row"
                >
                  <TableCell>
                    <strong className="hq-description">
                      {bill.name || "Bill"}
                    </strong>

                    {bill.description && (
                      <span className="hq-secondary-text">
                        {bill.description}
                      </span>
                    )}
                  </TableCell>

                  <TableCell>
                    <span className="hq-date">
                      {bill.dueDate || "-"}
                    </span>
                  </TableCell>

                  <TableCell>
                    <span className="hq-bill-amount">
                      {currency(bill.amount)}
                    </span>
                  </TableCell>

                  <TableCell>
                    <button
                      className={
                        bill.paid
                          ? "hq-status paid"
                          : "hq-status unpaid"
                      }
                      onClick={() =>
                        toggleBillPaid(bill.id)
                      }
                    >
                      {bill.paid && (
                        <FaCheck />
                      )}

                      {bill.paid
                        ? "Paid"
                        : "Unpaid"}
                    </button>
                  </TableCell>

                  <TableCell align="right">
                    <div className="hq-actions">
                      <button
                        className="hq-action edit"
                        onClick={() => onEdit(bill)}
                        title="Edit bill"
                      >
                        <FaEdit />
                      </button>

                      <button
                        className="hq-action delete"
                        onClick={() =>
                          deleteBill(bill.id)
                        }
                        title="Delete bill"
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

export default BillsTable;