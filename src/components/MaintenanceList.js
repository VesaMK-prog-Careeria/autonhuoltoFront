import React, { useEffect, useState } from "react";
import axios from "axios";

const MaintenanceList = () => {
  const [maintenances, setMaintenances] = useState([]);
  const [modalImage, setModalImage] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token"); // Tarkista onko token olemassa ennen kuin haetaan huollot
    if (!token) {
      fetchMaintenances();
    }
  }, []);

  const fetchMaintenances = async () => {
    const token = localStorage.getItem("token");
    console.log("Haetaan huollot tokenilla:", token);
    const res = await axios.get("http://localhost:5000/api/maintenance", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
    setMaintenances(res.data);
  };

  const handleDelete = async (id) => {
    await axios.delete(`http://127.0.0.1:5000/api/maintenance/${id}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    fetchMaintenances(); // Päivitä lista poistamisen jälkeen
  };
  const openModal = (filename) => {
    setModalImage(`http://localhost:5000/uploads/${filename}`);
  };

  const closeModal = () => {
    setModalImage(null);
  };

  return (
    <div>
      <h2>Huoltolista</h2>
      <ul>
        {maintenances.map((m) => (
          <li key={m.id}>
            <strong>{m.car}</strong>: – {m.description} – {m.km} km ({m.date})
            <button onClick={() => handleDelete(m.id)}>Poista</button>
            {m.image_path && (
              <button onClick={() => openModal(m.image_path)}>Näytä kuva</button>
            )}
          </li>
        ))}
      </ul>
      {modalImage && (
        <div style={modalStyle}>
          <div style={modalContentStyle}>
          <img src={modalImage} alt="Huoltokuva" style={{ maxWidth: "100%", borderRadius: "8px" }} />
            <button onClick={closeModal}>Sulje</button>
          </div>
          </div>
        )}
    </div>
  );
};

const modalStyle = {
  position: "fixed",
  top: 0, left: 0, right: 0, bottom: 0,
  backgroundColor: "rgba(0,0,0,0.7)",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  zIndex: 1000,
};

const modalContentStyle = {
  background: "#fff",
  padding: "1rem",
  borderRadius: "10px",
  maxWidth: "90%",
  maxHeight: "90%",
  overflow: "auto",
  boxShadow: "0 0 15px rgba(0,0,0,0.3)",
  position: "relative"
};

export default MaintenanceList;
