import React, { useState, useEffect } from "react";
import axios from "axios";

// MaintenanceForm-komponentti, joka käsittelee huoltotietojen lisäämistä
// ja näyttää lomakkeen käyttäjälle. Käyttää Axiosia tietojen lähettämiseen palvelimelle.
const MaintenanceForm = () => {
  //const [car, setCar] = useState("");
  const [description, setDescription] = useState("");
  const [km, setKm] = useState("");
  const [date, setDate] = useState("");
  const [image, setImage] = useState(null); // ✅ tämä tarvitaan!
  const [carOptions, setCarOptions] = useState([]);
  const [selectedCar, setSelectedCar] = useState("");
  const [customCar, setCustomCar] = useState("");

  // Hakee autolistauksen palvelimelta ja asettaa sen carOptions-tilaan
  // Tämä tapahtuu vain kerran komponentin latautuessa (tyhjät riippuvuudet []).
  useEffect(() => {
    const fetchCars = async () => {
      try {
        const res = await axios.get("https://autonhuoltoback.onrender.com/api/cars");
        setCarOptions(res.data); // Tässä tallenetaan autot carOptions-muuttujaan
        } catch (err) {
          console.error("Autolistan haku epäonnistui:", err);
      }
    };
    fetchCars();
  }, []);

  // Funktio, joka käsittelee lomakkeen lähettämisen
  // ja lähettää tiedot palvelimelle POST-pyynnöllä.
  const handleSubmit = async (e) => {
    e.preventDefault();
  
    // Tarkistetaan, onko käyttäjä valinnut uuden auton vai olemassa olevan
    // Jos uusi auto, käytetään customCar-tilaa, muuten käytetään selectedCar-tilaa
    const finalCar = selectedCar === "__new__" ? customCar : selectedCar;
  
    const formData = new FormData();
    formData.append("car", finalCar);
    formData.append("description", description);
    formData.append("km", km);
    formData.append("date", date);
    if (image) {
      formData.append("image", image);
    }
  
    try {
      await axios.post("https://autonhuoltoback.onrender.com/api/maintenance", formData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          // ÄLÄ LISÄÄ Content-Type, Axios hoitaa sen automaattisesti FormDatesta!
        },
      });
  
      setSelectedCar("");
      setCustomCar("");
      setDescription("");
      setKm("");
      setDate("");
      setImage(null);
      window.location.reload();
    } catch (err) {
      console.error("❌ POST error:", err.response?.data || err.message);
    }
  };
  

  return (
    <div>
      <h2>Lisää huolto</h2>
      <form onSubmit={handleSubmit}>
        
        {/* Auto: valitse listasta tai lisää uusi */}
        <label>Auto:</label>
        <select value={selectedCar} onChange={(e) => setSelectedCar(e.target.value)} required>
          <option value="">Valitse auto tai lisää uusi</option>
          {carOptions.map((c, index) => ( // rakennetetaan lista autoista
            <option key={index} value={c}>{c}</option>
      ))}
      <option value="__new__">+ Lisää uusi auto</option>
    </select>

        {selectedCar === "__new__" && (
          <input
            type="text"
            placeholder="Uusi auton nimi"
            value={customCar}
            onChange={(e) => setCustomCar(e.target.value)}
            required
          />
        )}
        <input
          type="text"
          placeholder="Kuvaus"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
        <input
          type="number"
          placeholder="Km-lukema"
          value={km}
          onChange={(e) => setKm(e.target.value)}
          required
        />
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          required
        />
        <input
          type="file"
          accept="image/*"
          capture="environment" // Käytetään kameraa mobiililaitteissa
          onChange={(e) => setImage(e.target.files[0])}
        />
        <button type="submit">Lisää</button>
      </form>
    </div>
  );
};

export default MaintenanceForm;
