// src/components/Navbar.js
import React from "react";

const Navbar = ({ currentView, setView, onLogout, username }) => {
  return (
    <nav style={styles.nav}>
      <div style={styles.left}>
        <button onClick={() => setView("form")}>Huollon ilmoitus</button>
        <button onClick={() => setView("list")}>Huoltolista</button>
        <button onClick={() => setView("users")}>Käyttäjähallinta</button>
      </div>
      <div style={styles.right}>
        <span>Tervetuloa, {username}!</span>
        <button onClick={onLogout}>Kirjaudu ulos</button>
      </div>
    </nav>
  );
};

const styles = {
  nav: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "10px",
    background: "#eee",
    borderBottom: "1px solid #ccc",
  },
  left: {
    display: "flex",
    gap: "10px",
  },
  right: {
    display: "flex",
    gap: "10px",
    alignItems: "center",
  },
};

export default Navbar;
