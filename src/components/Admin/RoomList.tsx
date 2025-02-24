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
    <div className="p-4 bg-amber-50 text-black rounded-2xl">
      <h2 className="text-2xl font-bold mb-4">Gestión de habitaciones</h2>

      {error && <p className="text-red-500 mb-2">{error}</p>}

      <div className="mb-4">
        <select
          value={hotelId}
          onChange={(e) => setHotelId(e.target.value)}
          className="border p-2 mb-2 w-full bg-amber-50 text-black rounded-2xl"
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
          className="border p-2 mb-2 w-full rounded-2xl"
        />
        <input
          type="number"
          placeholder="Costo base"
          value={baseCost}
          onChange={(e) => setBaseCost(Number(e.target.value))}
          className="border p-2 mb-2 w-full rounded-2xl"
        />
        <input
          type="number"
          placeholder="Impuestos"
          value={taxes}
          onChange={(e) => setTaxes(Number(e.target.value))}
          className="border p-2 mb-2 w-full rounded-2xl"
        />

        <button onClick={handleSave} className="bg-green-500 text-white mt-2 mb-5">
          {editingRoom ? "Actualizar" : "Agregar"}
        </button>
        <div className="w-full h-[2px] bg-gradient-to-r from-[#cccccc] via-[#BE8922] to-[#cccccc] mx-auto"></div>
      </div>

      <ul className="space-y-2">
      <h2 className="text-2xl font-bold mb-4">Habitaciones registradas</h2>
        {rooms.map((room) => (
          <li key={room.id} className="border p-2 flex justify-between items-center rounded-2xl">
            <div>
              <p className="font-bold">{room.type}</p>
              <p>Hotel: {hotels.find((h) => h.id === room.hotelId)?.name}</p>
              <p>Costo base: ${room.baseCost}</p>
              <p>Impuestos: ${room.taxes}</p>
            </div>
            <div>
              <button onClick={() => handleEdit(room)} className="bg-blue-500 text-white p-2 mr-2">
                Editar
              </button>
              <button onClick={() => handleDelete(room.id)} className="bg-red-500 text-white p-2">
                Eliminar
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RoomList;
