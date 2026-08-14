import { BrowserRouter, Routes, Route } from "react-router-dom";

import AppLayout from "./components/layout/AppLayout";

import Dashboard from "./pages/Dashboard";
import Expenses from "./pages/Expenses";
import Budget from "./pages/Budget";
import Categories from "./pages/Categories";
import Income from "./pages/Income";
import Bills from "./pages/Bills";
import Savings from "./pages/Savings";
import Reports from "./pages/Reports";
import Settings from "./pages/Settings";

function App() {
  return (
    <BrowserRouter>
      <AppLayout>
        <Routes>
          <Route
            path="/"
            element={<Dashboard />}
          />

          <Route
            path="/expenses"
            element={<Expenses />}
          />

          <Route
            path="/budget"
            element={<Budget />}
          />

          <Route
            path="/categories"
            element={<Categories />}
          />

          <Route
            path="/income"
            element={<Income />}
          />

          <Route
            path="/bills"
            element={<Bills />}
          />

          <Route
            path="/savings"
            element={<Savings />}
          />

          <Route
            path="/reports"
            element={<Reports />}
          />

          <Route
            path="/settings"
            element={<Settings />}
          />
        </Routes>
      </AppLayout>
    </BrowserRouter>
  );
}

export default App;