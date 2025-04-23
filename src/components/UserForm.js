// src/components/UserForm.js
import React, { useState } from "react";
import axios from "axios";

const UserForm = ({ onUserAdded }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("https://autonhuoltoback.onrender.com/api/register", {
        username,
        password,
      });
      setUsername("");
      setPassword("");
      onUserAdded(); // Päivitä käyttäjälista
    } catch (err) {
      console.error("❌ Käyttäjän lisäys epäonnistui:", err);
    }
  };

  return (
    <form onSubmit={handleSubmit} style={formStyle}>
      <input
        type="text"
        placeholder="Käyttäjätunnus"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        required
      />
      <input
        type="password"
        placeholder="Salasana"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />
      <button type="submit">Lisää käyttäjä</button>
    </form>
  );
};

const formStyle = {
  display: "flex",
  gap: "10px",
  marginBottom: "1rem",
};

export default UserForm;
