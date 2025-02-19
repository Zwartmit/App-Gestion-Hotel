import { useState } from "react";
import { getHotels, saveRoom } from "../../utils/storage";

const RoomForm = () => {
  const [hotelId, setHotelId] = useState("");
  const [type, setType] = useState("");
  const [baseCost, setBaseCost] = useState<number | "">("");
  const [taxes, setTaxes] = useState<number | "">("");
  const hotels = getHotels();

  const handleSubmit = () => {
    if (!hotelId || !type.trim() || baseCost === "" || taxes === "") {
      alert("Por favor, completa todos los campos antes de registrar la habitación.");
      return;
    }

    if (baseCost < 0 || taxes < 0) {
      alert("El costo base y los impuestos no pueden ser negativos.");
      return;
    }

    const room = { id: Date.now().toString(), hotelId, type: type.trim(), baseCost, taxes, enabled: true, };

    saveRoom(room);
    alert("Habitación registrada!");

    setHotelId("");
    setType("");
    setBaseCost("");
    setTaxes("");
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Registrar habitación</h2>

      <label className="block mb-2">
        Hotel
        <select
          value={hotelId}
          onChange={(e) => setHotelId(e.target.value)}
          className="border p-2 w-full mt-1"
        >
          <option value="">Selecciona un hotel</option>
          {hotels.map((hotel) => (
            <option key={hotel.id} value={hotel.id}>
              {hotel.name}
            </option>
          ))}
        </select>
      </label>

      <label className="block mb-2">
        Tipo de habitación
        <input
          type="text"
          placeholder="Ej: Suite, Estándar, Doble"
          value={type}
          onChange={(e) => setType(e.target.value)}
          className="border p-2 w-full mt-1"
        />
      </label>

      <label className="block mb-2">
        Costo base
        <input
          type="number"
          placeholder="Costo base"
          value={baseCost}
          onChange={(e) => setBaseCost(Number(e.target.value))}
          className="border p-2 w-full mt-1"
          min="0"
        />
      </label>

      <label className="block mb-4">
        Impuestos
        <input
          type="number"
          placeholder="Impuestos"
          value={taxes}
          onChange={(e) => setTaxes(Number(e.target.value))}
          className="border p-2 w-full mt-1"
          min="0"
        />
      </label>

      <button
        onClick={handleSubmit}
        className="bg-green-500 text-white p-2 w-full rounded-lg hover:bg-green-600 transition"
      >
        Guardar
      </button>
    </div>
  );
};

export default RoomForm;
