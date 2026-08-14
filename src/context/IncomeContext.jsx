import { createContext, useContext } from "react";
import { useLocalStorage } from "../hooks/useLocalStorage";

const IncomeContext = createContext();

export function IncomeProvider({ children }) {
  const [income, setIncome] = useLocalStorage(
    "budgetHQ_income",
    []
  );

  function addIncome(newIncome) {
    setIncome((prev) => [
      ...prev,
      {
        ...newIncome,
        id: Date.now(),
      },
    ]);
  }

  function updateIncome(updatedIncome) {
    setIncome((prev) =>
      prev.map((item) =>
        item.id === updatedIncome.id
          ? updatedIncome
          : item
      )
    );
  }

  function deleteIncome(id) {
    setIncome((prev) =>
      prev.filter((item) => item.id !== id)
    );
  }

  return (
    <IncomeContext.Provider
      value={{
        income,
        addIncome,
        updateIncome,
        deleteIncome,
      }}
    >
      {children}
    </IncomeContext.Provider>
  );
}

export function useIncome() {
  return useContext(IncomeContext);
}