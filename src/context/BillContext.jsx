import { createContext, useContext } from "react";
import { useLocalStorage } from "../hooks/useLocalStorage";

const BillContext = createContext();

export function BillProvider({ children }) {
  const [bills, setBills] = useLocalStorage(
    "budgetHQ_bills",
    []
  );

  function addBill(bill) {
    setBills((prev) => [
      ...prev,
      {
        ...bill,
        id: Date.now(),
        paid: false,
      },
    ]);
  }

  function updateBill(updatedBill) {
    setBills((prev) =>
      prev.map((bill) =>
        bill.id === updatedBill.id
          ? updatedBill
          : bill
      )
    );
  }

  function deleteBill(id) {
    setBills((prev) =>
      prev.filter((bill) => bill.id !== id)
    );
  }

  function toggleBillPaid(id) {
    setBills((prev) =>
      prev.map((bill) =>
        bill.id === id
          ? { ...bill, paid: !bill.paid }
          : bill
      )
    );
  }

  return (
    <BillContext.Provider
      value={{
        bills,
        addBill,
        updateBill,
        deleteBill,
        toggleBillPaid,
      }}
    >
      {children}
    </BillContext.Provider>
  );
}

export function useBills() {
  return useContext(BillContext);
}