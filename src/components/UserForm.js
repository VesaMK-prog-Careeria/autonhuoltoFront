import React, { useState } from "react";
import axios from "axios";

const UserForm = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem("token");
      await axios.post("https://autonhuoltoback.onrender.com/api/users", {
        username,
        password,
      }, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      alert("Käyttäjä lisätty!");
      setUsername("");
      setPassword("");
    } catch (err) {
      console.error("❌ Käyttäjän lisäys epäonnistui:", err);
      alert("Virhe käyttäjän lisäyksessä.");
    }
  };

  return (
    <div>
      <h3>Lisää uusi käyttäjä</h3>
      <form onSubmit={handleSubmit}>
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
    </div>
  );
};

export default UserForm;
