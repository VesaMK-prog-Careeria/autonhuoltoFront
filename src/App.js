import React, { useState, useEffect } from "react";
import MaintenanceForm from "./components/MaintenanceForm";
import MaintenanceList from "./components/MaintenanceList";
import LoginForm from "./components/LoginForm";
import UserList from "./components/UserList";
import UserForm from "./components/UserForm";
import "./App.css";

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState("");

  // Tarkista onko token olemassa
  useEffect(() => {
    const token = localStorage.getItem("token");
    const user = localStorage.getItem("username");
    if (token && user) {
      setIsLoggedIn(true);
      setUsername(user);
    }
  }, []);

  const handleLoginSuccess = () => {
    const user = localStorage.getItem("username");
    setIsLoggedIn(true);
    setUsername(user);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    setIsLoggedIn(false);
    setUsername("");
  };

  return (
    <div>
      {isLoggedIn ? (
        <>
          <h2>Tervetuloa, {username}!</h2>
          <button onClick={handleLogout}>Kirjaudu ulos</button>
          <MaintenanceForm />
          <MaintenanceList />
          <hr />
          <h3>Huoltojen ja käyttäjien hallinta</h3>
          <p>Voit lisätä ja poistaa huoltoja ja käyttäjiä alla olevista lomakkeista.</p>
          <UserList />
          <UserForm />
          
        </>
      ) : (
        <LoginForm onLoginSuccess={handleLoginSuccess} />
      )}
    </div>
  );
};

export default App;
