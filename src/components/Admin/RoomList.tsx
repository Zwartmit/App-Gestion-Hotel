import { useState, useEffect } from "react";
import { getRooms, deleteRoom, getHotels } from "../../utils/storage";

const RoomList = () => {
  const [rooms, setRooms] = useState<any[]>([]);
  const [editingRoom, setEditingRoom] = useState<any>(null);
  const [hotelId, setHotelId] = useState("");
  const [type, setType] = useState("");
  const [baseCost, setBaseCost] = useState(0);
  const [taxes, setTaxes] = useState(0);
  const [hotels, setHotels] = useState<any[]>([]);

  useEffect(() => {
  setHotels(getHotels());

  const handleHotelUpdate = () => {
      setHotels(getHotels());
  };

  // Escuchar cambios en los hoteles
  window.addEventListener("hotelListUpdated", handleHotelUpdate);

  return () => {
      window.removeEventListener("hotelListUpdated", handleHotelUpdate);
  };
  }, []);

  useEffect(() => {
    const rooms = getRooms();
    setRooms(rooms);
  }, []);

  const handleSave = () => {
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
  };
  
  const handleEdit = (room: any) => {
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
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Gestión de habitaciones</h2>
      <div className="mb-4">
        <select
          value={hotelId}
          onChange={(e) => setHotelId(e.target.value)}
          className="border p-2 mb-2"
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
          className="border p-2 mb-2"
        />
        <input
          type="number"
          placeholder="Costo base"
          value={baseCost}
          onChange={(e) => setBaseCost(Number(e.target.value))}
          className="border p-2 mb-2"
        />
        <input
          type="number"
          placeholder="Impuestos"
          value={taxes}
          onChange={(e) => setTaxes(Number(e.target.value))}
          className="border p-2 mb-2"
        />
        <button
          onClick={handleSave}
          className="bg-green-500 text-white p-2"
        >
          {editingRoom ? "Actualizar" : "Agregar"}
        </button>
      </div>
      <ul className="space-y-2">
        {rooms.map((room) => (
          <li key={room.id} className="border p-2 flex justify-between items-center">
            <div>
              <p className="font-bold">{room.type}</p>
              <p>Hotel: {hotels.find((h) => h.id === room.hotelId)?.name}</p>
              <p>Costo base: ${room.baseCost}</p>
              <p>Impuestos: ${room.taxes}</p>
            </div>
            <div>
              <button
                onClick={() => handleEdit(room)}
                className="bg-blue-500 text-white p-2 mr-2"
              >
                Editar
              </button>
              <button
                onClick={() => handleDelete(room.id)}
                className="bg-red-500 text-white p-2"
              >
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