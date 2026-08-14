import { createContext, useContext } from "react";
import { useLocalStorage } from "../hooks/useLocalStorage";

const ExpenseContext = createContext();

export function ExpenseProvider({ children }) {
  const [expenses, setExpenses] = useLocalStorage(
    "budgetHQ_expenses",
    []
  );

  function addExpense(expense) {
    setExpenses((prev) => [
      ...prev,
      expense,
    ]);
  }

  function deleteExpense(id) {
    setExpenses((prev) =>
      prev.filter(
        (expense) => expense.id !== id
      )
    );
  }

  function updateExpense(updatedExpense) {
    setExpenses((prev) =>
      prev.map((expense) =>
        expense.id === updatedExpense.id
          ? updatedExpense
          : expense
      )
    );
  }

  return (
    <ExpenseContext.Provider
      value={{
        expenses,
        addExpense,
        deleteExpense,
        updateExpense,
      }}
    >
      {children}
    </ExpenseContext.Provider>
  );
}

export function useExpenses() {
  return useContext(ExpenseContext);
}