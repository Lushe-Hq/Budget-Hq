import "../../styles/header.css";

function Header() {
  return (
    <header className="header">
      <div>
        <h2>Welcome back, Lucy 👋</h2>
        <p>Your finances at a glance.</p>
      </div>

      <div className="profile">
        👩 Lucy
      </div>
    </header>
  );
}

export default Header;