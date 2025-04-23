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
          <h3>Huoltolomake</h3>
          <p>Voit lisätä uuden huollon alla olevasta lomakkeesta.</p>
          <MaintenanceForm />
          <hr />
          <h3>Huoltolista</h3>
          <p>Alla näet kaikki huollot, jotka on lisätty järjestelmään.</p>
          <MaintenanceList />
          <hr />
          <h3>Käyttäjien hallinta</h3>
          <p>Voit lisätä ja poistaa käyttäjiä alla olevasta lomakkeesta.</p>
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
