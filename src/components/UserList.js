import React, { useEffect, useState } from "react";
import axios from "axios";

const UserList = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get("https://autonhuoltoback.onrender.com/api/users", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setUsers(res.data);
    } catch (err) {
      console.error("❌ Käyttäjien haku epäonnistui:", err.response?.data || err.message);
    }
  };

  const handleDelete = async (id) => {
    try {
      const token = localStorage.getItem("token");
      await axios.delete(`https://autonhuoltoback.onrender.com/api/users/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      fetchUsers(); // päivitä lista
    } catch (err) {
      console.error("❌ Käyttäjän poisto epäonnistui:", err.response?.data || err.message);
    }
  };

  return (
    <div>
      <h2>Käyttäjät</h2>
      <ul>
        {users.map((user) => (
          <li key={user.id}>
            {user.username}{" "}
            <button onClick={() => handleDelete(user.id)}>Poista</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UserList;
