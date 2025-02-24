import { useState, useEffect } from "react";
import { getHotels, deleteHotel } from "../../utils/storage";

const HotelList = () => {
  interface Hotel {
    id: string;
    name: string;
    city: string;
    enabled: boolean;
  }

  const [hotels, setHotels] = useState<Hotel[]>([]);
  const [editingHotel, setEditingHotel] = useState<Hotel | null>(null);
  const [name, setName] = useState("");
  const [city, setCity] = useState("");
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setHotels(getHotels());
  }, []);

  const handleSave = () => {
    if (!name.trim() || !city.trim()) {
      setError("Todos los campos son obligatorios.");
      return;
    }

    const hotels = getHotels();

    const hotel = {
      id: editingHotel ? editingHotel.id : Date.now().toString(),
      name,
      city,
      enabled: true,
    };

    if (editingHotel) {
      const updatedHotels = hotels.map((h) => (h.id === editingHotel.id ? hotel : h));
      localStorage.setItem("hotels", JSON.stringify(updatedHotels));
    } else {
      hotels.push(hotel);
      localStorage.setItem("hotels", JSON.stringify(hotels));
    }

    setHotels(getHotels());
    setEditingHotel(null);
    setName("");
    setCity("");
    setError(null);

    window.dispatchEvent(new Event("hotelListUpdated"));
  };

  const handleEdit = (hotel: Hotel) => {
    setEditingHotel(hotel);
    setName(hotel.name);
    setCity(hotel.city);
  };

  const handleDelete = (id: string) => {
    deleteHotel(id);
    setHotels(getHotels());
    window.dispatchEvent(new Event("hotelListUpdated"));
  };

  return (
    <div className="p-6 bg-white text-black rounded-2xl shadow-lg">
      <h2 className="text-3xl font-bold mb-6 text-center text-blue-600">Gestión de hoteles</h2>

      {error && <p className="text-red-500 mb-4 text-center">{error}</p>}

      <div className="mb-6">
        <input
          type="text"
          placeholder="Nombre del hotel"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="border p-3 mb-3 w-full rounded-lg"
        />
        <input
          type="text"
          placeholder="Ciudad"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          className="border p-3 mb-3 w-full rounded-lg"
        />
        <button onClick={handleSave} className="bg-green-500 text-white py-3 rounded-lg">
          {editingHotel ? "Actualizar" : "Agregar"}
        </button>
      </div>

      <div className="w-full h-[2px] bg-gradient-to-r from-[#cccccc] via-[#BE8922] to-[#cccccc] mx-auto mb-6"></div>

      <h2 className="text-2xl font-bold mb-6 text-center text-blue-600">Hoteles registrados</h2>

      {hotels.length === 0 ? (
        <p className="text-center text-gray-600">Aún no hay hoteles registrados.</p>
      ) : (
        <ul className="space-y-4">
          {hotels.map((hotel) => (
            <li key={hotel.id} className="border p-4 flex justify-between items-center rounded-lg shadow-sm bg-gray-100">
              <div>
                <p className="font-bold text-lg">{hotel.name}</p>
                <p className="text-gray-600">{hotel.city}</p>
              </div>
              <div className="flex space-x-2">
                <button
                  onClick={() => handleEdit(hotel)}
                  className="bg-blue-500 text-white px-4 py-2 rounded-lg"
                >
                  Editar
                </button>
                <button
                  onClick={() => handleDelete(hotel.id)}
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

export default HotelList;
