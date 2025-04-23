import React, { useState, useEffect } from "react";
import MaintenanceForm from "./components/MaintenanceForm";
import MaintenanceList from "./components/MaintenanceList";
import LoginForm from "./components/LoginForm";
import UserList from "./components/UserList";
//import UserForm from "./components/UserForm";
import Navbar from "./components/Navbar";
import "./App.css";

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState("");
  const [view, setView] = useState("form"); // oletusnäkymä

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
          <Navbar currentView={view} setView={setView} onLogout={handleLogout} username={username} />
          {view === "form" && <MaintenanceForm />}
          {view === "list" && <MaintenanceList />}
          {view === "users" && <UserList />}
        </>
      ) : (
        <LoginForm onLoginSuccess={handleLoginSuccess} />
      )}
    </div>
  );
};

export default App;
