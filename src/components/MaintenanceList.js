import React, { useEffect, useState } from "react";
import axios from "axios";

// MaintenanceList-komponentti, joka hakee ja näyttää huoltotiedot
// sekä mahdollistaa niiden poistamisen ja kuvien katselun.
const MaintenanceList = () => {
  const [maintenances, setMaintenances] = useState([]);
  const [modalImage, setModalImage] = useState(null);

  useEffect(() => {
    fetchMaintenances();
  }, []);

  // Hakee huoltotiedot palvelimelta ja asettaa ne maintenances-tilaan.
  const fetchMaintenances = async () => {
    const token = localStorage.getItem("token");
    console.log("Haetaan huollot tokenilla:", token);

    try {
      const res = await axios.get("https://autonhuoltoback.onrender.com/api/maintenance", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log("Huoltojen response:", res.data);
      setMaintenances(res.data); // Asetetaan huoltotiedot tilaan
    } catch (err) {
      console.error("GET error:", err.response?.data || err.message);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`https://autonhuoltoback.onrender.com/api/maintenance/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      fetchMaintenances();
    } catch (err) {
      console.error("DELETE error:", err.response?.data || err.message);
    }
  };

  const openModal = (filename) => {
    setModalImage(`https://autonhuoltoback.onrender.com/uploads/${filename}`);
  };

  const closeModal = () => {
    setModalImage(null);
  };

  return (
    <div>
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
          <button onClick={closeModal} style={closeButtonStyle}>×</button>
            <img 
              src={modalImage} 
              alt="Huoltokuva" 
              style={{ 
                maxWidth: "100%",
                maxHeight: "100%",
                objectFit: "contain", 
                borderRadius: "8px" 
              }} 
            />
          </div>
        </div>
      )}
    </div>
  );
};

const modalContentStyle = {
  background: "#fff",
  padding: "1rem",
  borderRadius: "10px",
  width: "80vw",
  height: "80vh",
  overflow: "auto",
  boxShadow: "0 0 15px rgba(0,0,0,0.3)",
  position: "relative",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
};

const closeButtonStyle = {
  position: "absolute",
  top: "10px",
  right: "10px",
  backgroundColor: "#f44336",
  color: "white",
  border: "none",
  borderRadius: "50%",
  width: "30px",
  height: "30px",
  cursor: "pointer",
  fontWeight: "bold",
};

export default MaintenanceList;
