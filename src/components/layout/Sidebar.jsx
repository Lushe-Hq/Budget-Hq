import {
  FaChartPie,
  FaMoneyBillWave,
  FaTags,
  FaWallet,
  FaFileInvoiceDollar,
  FaPiggyBank,
  FaChartBar,
  FaCog,
  FaBullseye,
} from "react-icons/fa";

import { NavLink } from "react-router-dom";

import "../../styles/sidebar.css";

function Sidebar() {
  const menuItems = [
    {
      to: "/",
      label: "Dashboard",
      icon: <FaChartPie />,
    },
    {
      to: "/expenses",
      label: "Expenses",
      icon: <FaMoneyBillWave />,
    },
    {
      to: "/budget",
      label: "Budget",
      icon: <FaBullseye />,
    },
    {
      to: "/categories",
      label: "Categories",
      icon: <FaTags />,
    },
    {
      to: "/income",
      label: "Income",
      icon: <FaWallet />,
    },
    {
      to: "/bills",
      label: "Bills",
      icon: <FaFileInvoiceDollar />,
    },
    {
      to: "/savings",
      label: "Savings",
      icon: <FaPiggyBank />,
    },
    {
      to: "/reports",
      label: "Reports",
      icon: <FaChartBar />,
    },
  ];

  return (
    <aside className="sidebar">
      <div className="sidebar-brand">
        <div className="brand-icon">💗</div>

        <div>
          <h2>Budget HQ</h2>
          <span>Personal Finance</span>
        </div>
      </div>

      <div className="sidebar-divider" />

      <p className="sidebar-section-title">
        MY MONEY
      </p>

      <nav className="nav-menu">
        {menuItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            className={({ isActive }) =>
              `menu-item ${
                isActive ? "active" : ""
              }`
            }
            end={item.to === "/"}
          >
            <span className="menu-icon">
              {item.icon}
            </span>

            <span>{item.label}</span>
          </NavLink>
        ))}
      </nav>

      <div className="sidebar-bottom">
        <NavLink
          to="/settings"
          className={({ isActive }) =>
            `menu-item ${
              isActive ? "active" : ""
            }`
          }
        >
          <span className="menu-icon">
            <FaCog />
          </span>

          <span>Settings</span>
        </NavLink>

        <div className="sidebar-footer">
          <span>Made for you</span>
          <span>💗</span>
        </div>
      </div>
    </aside>
  );
}

export default Sidebar;