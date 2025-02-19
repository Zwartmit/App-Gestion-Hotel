import { useState } from "react";
import { saveHotel } from "../../utils/storage";

const HotelForm = () => {
  const [name, setName] = useState("");
  const [city, setCity] = useState("");

  const handleSubmit = () => {
    const hotel = {
      id: Date.now().toString(),
      name,
      city,
      enabled: true,
    };
    saveHotel(hotel);
    alert("Hotel registrado!");
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Registrar Hotel</h2>
      <p>Hotelㅤ
      <input
        type="text"
        placeholder="Nombre del Hotel"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="border p-2 mb-2"
      />
      </p>
      <br />
      <p>Ciudadㅤ
      <input
        type="text"
        placeholder="Ciudad"
        value={city}
        onChange={(e) => setCity(e.target.value)}
        className="border p-2 mb-2"
      />
      </p>
      <br />
      <button onClick={handleSubmit} className="bg-green-500 text-white p-2">
        Registrar
      </button>
    </div>
  );
};

export default HotelForm;