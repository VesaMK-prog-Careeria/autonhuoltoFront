import React, { useState } from "react";
import axios from "axios";

// LoginForm-komponentti, joka käsittelee käyttäjän kirjautumisen
// ja näyttää virheilmoitukset tarvittaessa.
const LoginForm = ({ onLoginSuccess }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  // Funktio, joka käsittelee kirjautumislomakkeen lähettämisen
  // ja tekee POST-pyynnön palvelimelle käyttäjätunnuksen ja salasanan kanssa.
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("https://autonhuoltoback.onrender.com/api/login", {
        username,
        password,
      });

      // Jos kirjautuminen onnistuu, tallennetaan token ja käyttäjätunnus localStorageen
      // ja kutsutaan parent-komponentin funktiota onLoginSuccess.
      const { token, username: returnedUsername } = res.data;

      // Tallenna token localStorageen
      localStorage.setItem("token", token);
      localStorage.setItem("username", returnedUsername);

      setError("");
      onLoginSuccess(); // kutsutaan parent-komponenttia (ohjaa eteenpäin)

    } catch (err) {
      console.error("Login error:", err);
      setError("Virheellinen käyttäjätunnus tai salasana");
    }
  };

  return (
    <div>
      <h2>Kirjaudu sisään</h2>
      <form onSubmit={handleLogin}>
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
        <button type="submit">Kirjaudu</button>
        {error && <p style={{ color: "red" }}>{error}</p>}
      </form>
    </div>
  );
};

export default LoginForm;
