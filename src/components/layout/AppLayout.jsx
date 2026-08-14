import Sidebar from "./Sidebar";
import Header from "./Header";
import "../../styles/layout.css";

function AppLayout({ children }) {
  return (
    <div className="app-layout">
      <Sidebar />

      <div className="main-content">
        <Header />

        <main className="page-content">
          {children}
        </main>
      </div>
    </div>
  );
}

export default AppLayout;