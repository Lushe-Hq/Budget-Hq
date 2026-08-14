import { createContext, useContext } from "react";
import { useLocalStorage } from "../hooks/useLocalStorage";

const SavingsContext = createContext();

export function SavingsProvider({ children }) {
  const [goals, setGoals] = useLocalStorage(
    "budgetHQ_savings",
    []
  );

  function addGoal(goal) {
    setGoals((prev) => [
      ...prev,
      {
        ...goal,
        id: Date.now(),
        saved: 0,
      },
    ]);
  }

  function updateGoal(updatedGoal) {
    setGoals((prev) =>
      prev.map((goal) =>
        goal.id === updatedGoal.id
          ? updatedGoal
          : goal
      )
    );
  }

  function deleteGoal(id) {
    setGoals((prev) =>
      prev.filter((goal) => goal.id !== id)
    );
  }

  function addToGoal(id, amount) {
    setGoals((prev) =>
      prev.map((goal) =>
        goal.id === id
          ? {
              ...goal,
              saved:
                Number(goal.saved || 0) +
                Number(amount),
            }
          : goal
      )
    );
  }

  return (
    <SavingsContext.Provider
      value={{
        goals,
        addGoal,
        updateGoal,
        deleteGoal,
        addToGoal,
      }}
    >
      {children}
    </SavingsContext.Provider>
  );
}

export function useSavings() {
  return useContext(SavingsContext);
}