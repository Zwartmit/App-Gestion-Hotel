import { useState } from "react";
import { getHotels, saveRoom } from "../../utils/storage";

const RoomForm = () => {
  const [hotelId, setHotelId] = useState("");
  const [type, setType] = useState("");
  const [baseCost, setBaseCost] = useState(0);
  const [taxes, setTaxes] = useState(0);
  const hotels = getHotels();

  const handleSubmit = () => {
    const room = {
      id: Date.now().toString(),
      hotelId,
      type,
      baseCost,
      taxes,
      enabled: true,
    };
    saveRoom(room);
    alert("Habitación registrada!");
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Registrar habitación</h2>
      <select
        value={hotelId}
        onChange={(e) => setHotelId(e.target.value)}
        className="border p-2 mb-2"
      >
        <option value="">Selecciona un hotel</option>
        {hotels.map((hotel) => (
          <option key={hotel.id} value={hotel.id}>
            {hotel.name}
          </option>
        ))}
      </select>
      <br />
      <p>Habitaciónㅤ
      <input
        type="text"
        placeholder="Tipo de habitación"
        value={type}
        onChange={(e) => setType(e.target.value)}
        className="border p-2 mb-2"
      />
      </p>
      <p>Costo baseㅤ
      <input
        type="number"
        placeholder="Costo base"
        value={baseCost}
        onChange={(e) => setBaseCost(Number(e.target.value))}
        className="border p-2 mb-2"
      />
      </p>
      <p>Impuestosㅤ
      <input
        type="number"
        placeholder="Impuestos"
        value={taxes}
        onChange={(e) => setTaxes(Number(e.target.value))}
        className="border p-2 mb-2"
      />
      </p>
      <button onClick={handleSubmit} className="bg-green-500 text-white p-2">
        Guardar
      </button>
    </div>
  );
};

export default RoomForm;