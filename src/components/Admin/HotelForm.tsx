import { useState } from "react";
import { saveHotel } from "../../utils/storage";

const HotelForm = () => {
  const [name, setName] = useState("");
  const [city, setCity] = useState("");

  const handleSubmit = () => {
    if (!name.trim() || !city.trim()) {
      alert("Por favor, completa todos los campos antes de registrar el hotel.");
      return;
    }

    const hotel = {
      id: Date.now().toString(),
      name: name.trim(),
      city: city.trim(),
      enabled: true,
    };

    saveHotel(hotel);
    alert("Hotel registrado!");

    setName("");
    setCity("");
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Registrar Hotel</h2>

      <label className="block mb-2">
        Hotel
        <input
          type="text"
          placeholder="Nombre del Hotel"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="border p-2 w-full mt-1"
        />
      </label>

      <label className="block mb-4">
        Ciudad
        <input
          type="text"
          placeholder="Ciudad"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          className="border p-2 w-full mt-1"
        />
      </label>

      <button
        onClick={handleSubmit}
        className="bg-green-500 text-white p-2 rounded-lg hover:bg-green-600 transition"
      >
        Registrar
      </button>
    </div>
  );
};

export default HotelForm;
