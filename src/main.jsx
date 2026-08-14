import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";

import "./styles/global.css";

import { ExpenseProvider } from "./context/ExpenseContext";
import { CategoryProvider } from "./context/CategoryContext";
import { IncomeProvider } from "./context/IncomeContext";
import { BillProvider } from "./context/BillContext";
import { SavingsProvider } from "./context/SavingsContext";
import { BudgetProvider } from "./context/BudgetContext";
import { SettingsProvider } from "./context/SettingsContext";

ReactDOM.createRoot(document.getElementById("root")).render(
 <ExpenseProvider>
  <CategoryProvider>
    <IncomeProvider>
      <BillProvider>
        <SavingsProvider>
  <BudgetProvider>
    <SettingsProvider>
      <App />
    </SettingsProvider>
  </BudgetProvider>
</SavingsProvider>
      </BillProvider>
    </IncomeProvider>
  </CategoryProvider>
</ExpenseProvider>
);