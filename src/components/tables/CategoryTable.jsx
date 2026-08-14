import {
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Paper,
  TableContainer,
} from "@mui/material";

import { useCategories } from "../../context/CategoryContext";

function CategoryTable({ onEdit }) {
  const {
    categories,
    deleteCategory,
  } = useCategories();

  return (
    <TableContainer component={Paper} sx={{ mt: 4 }}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Icon</TableCell>
            <TableCell>Category</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {categories.map((category) => (
            <TableRow key={category.id}>
              <TableCell>
                {category.icon}
              </TableCell>

              <TableCell>
                {category.name}
              </TableCell>

              <TableCell>
                <button
                  onClick={() => onEdit(category)}
                  style={{
                    border: "none",
                    background: "transparent",
                    color: "#49D6D0",
                    cursor: "pointer",
                    fontWeight: "600",
                    marginRight: "12px",
                  }}
                >
                  Edit
                </button>

                <button
                  onClick={() =>
                    deleteCategory(category.id)
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
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default CategoryTable;