import { createContext, useContext } from "react";
import { useLocalStorage } from "../hooks/useLocalStorage";

const BudgetContext = createContext(null);

export function BudgetProvider({ children }) {
  const [budgets, setBudgets] = useLocalStorage(
    "budgetHQ_budgets",
    []
  );

  function addBudget(budget) {
    setBudgets((prev) => [
      ...prev,
      {
        ...budget,
        id: Date.now(),
      },
    ]);
  }

  function updateBudget(updatedBudget) {
    setBudgets((prev) =>
      prev.map((budget) =>
        budget.id === updatedBudget.id
          ? updatedBudget
          : budget
      )
    );
  }

  function deleteBudget(id) {
    setBudgets((prev) =>
      prev.filter(
        (budget) => budget.id !== id
      )
    );
  }

  return (
    <BudgetContext.Provider
      value={{
        budgets,
        addBudget,
        updateBudget,
        deleteBudget,
      }}
    >
      {children}
    </BudgetContext.Provider>
  );
}

export function useBudgets() {
  return useContext(BudgetContext);
}