import { useState, useEffect } from "react";
import { getRooms, deleteRoom, getHotels } from "../../utils/storage";

const RoomList = () => {
  interface Room {
    id: string;
    hotelId: string;
    type: string;
    baseCost: number;
    taxes: number;
    enabled: boolean;
  }

  const [rooms, setRooms] = useState<Room[]>([]);
  const [editingRoom, setEditingRoom] = useState<Room | null>(null);
  const [hotelId, setHotelId] = useState("");
  const [type, setType] = useState("");
  const [baseCost, setBaseCost] = useState(0);
  const [taxes, setTaxes] = useState(0);
  
  interface Hotel {
    id: string;
    name: string;
  }

  const [hotels, setHotels] = useState<Hotel[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setHotels(getHotels());

    const handleHotelUpdate = () => {
      setHotels(getHotels());
    };

    window.addEventListener("hotelListUpdated", handleHotelUpdate);

    return () => {
      window.removeEventListener("hotelListUpdated", handleHotelUpdate);
    };
  }, []);

  useEffect(() => {
    setRooms(getRooms());
  }, []);

  const handleSave = () => {
    if (!hotelId || !type || baseCost <= 0 || taxes < 0) {
      setError("Todos los campos son obligatorios y deben tener valores válidos.");
      return;
    }

    const rooms = getRooms();

    const room = {
      id: editingRoom ? editingRoom.id : Date.now().toString(),
      hotelId,
      type,
      baseCost,
      taxes,
      enabled: true,
    };

    if (editingRoom) {
      const updatedRooms = rooms.map((r) => (r.id === editingRoom.id ? room : r));
      localStorage.setItem("rooms", JSON.stringify(updatedRooms));
    } else {
      rooms.push(room);
      localStorage.setItem("rooms", JSON.stringify(rooms));
    }

    setRooms(getRooms());
    setEditingRoom(null);
    setHotelId("");
    setType("");
    setBaseCost(0);
    setTaxes(0);
    setError(null);
  };

  const handleEdit = (room: Room) => {
    setEditingRoom(room);
    setHotelId(room.hotelId);
    setType(room.type);
    setBaseCost(room.baseCost);
    setTaxes(room.taxes);
  };

  const handleDelete = (id: string) => {
    deleteRoom(id);
    setRooms(getRooms());
  };

  return (
    <div className="p-6 bg-white text-black rounded-2xl shadow-lg">
      <h2 className="text-3xl font-bold mb-6 text-center text-blue-600">Gestión de habitaciones</h2>

      {error && <p className="text-red-500 mb-4 text-center">{error}</p>}

      <div className="mb-6">
        <select
          value={hotelId}
          onChange={(e) => setHotelId(e.target.value)}
          className="border p-3 mb-3 w-full bg-white rounded-lg"
        >
          <option value="">Seleccionar Hotel</option>
          {hotels.map((hotel) => (
            <option key={hotel.id} value={hotel.id}>
              {hotel.name}
            </option>
          ))}
        </select>

        <input
          type="text"
          placeholder="Tipo de habitación"
          value={type}
          onChange={(e) => setType(e.target.value)}
          className="border p-3 mb-3 w-full rounded-lg"
        />
        <input
          type="number"
          placeholder="Costo base"
          value={baseCost}
          onChange={(e) => setBaseCost(Number(e.target.value))}
          className="border p-3 mb-3 w-full rounded-lg"
        />
        <input
          type="number"
          placeholder="Impuestos"
          value={taxes}
          onChange={(e) => setTaxes(Number(e.target.value))}
          className="border p-3 mb-3 w-full rounded-lg"
        />

        <button onClick={handleSave} className="bg-green-500 text-white py-3 rounded-lg">
          {editingRoom ? "Actualizar" : "Agregar"}
        </button>
      </div>

      <div className="w-full h-[2px] bg-gradient-to-r from-[#cccccc] via-[#BE8922] to-[#cccccc] mx-auto mb-6"></div>

      <h2 className="text-2xl font-bold mb-6 text-center text-blue-600">Habitaciones registradas</h2>

      {rooms.length === 0 ? (
        <p className="text-center text-gray-600">No hay habitaciones registradas.</p>
      ) : (
        <ul className="space-y-4">
          {rooms.map((room) => (
            <li key={room.id} className="border p-4 flex justify-between items-center rounded-lg shadow-sm bg-gray-100">
              <div>
                <p className="font-bold text-lg">{room.type}</p>
                <p className="text-gray-600"><b>Hotel:</b> {hotels.find((h) => h.id === room.hotelId)?.name || "Desconocido"}</p>
                <p className="text-gray-600"><b>Costo base:</b> ${room.baseCost}</p>
                <p className="text-gray-600"><b>Impuestos:</b> {room.taxes}%</p>
              </div>
              <div className="flex space-x-2">
                <button
                  onClick={() => handleEdit(room)}
                  className="bg-blue-500 text-white px-4 py-2 rounded-lg"
                >
                  Editar
                </button>
                <button
                  onClick={() => handleDelete(room.id)}
                  className="bg-red-500 text-white px-4 py-2 rounded-lg"
                >
                  Eliminar
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default RoomList;
