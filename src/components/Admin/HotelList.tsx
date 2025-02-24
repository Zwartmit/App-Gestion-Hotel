import { useState, useEffect } from "react";
import { getHotels, deleteHotel } from "../../utils/storage";

const HotelList = () => {
  const [hotels, setHotels] = useState<any[]>([]);
  const [editingHotel, setEditingHotel] = useState<any>(null);
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

  const handleEdit = (hotel: any) => {
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
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Gestión de hoteles</h2>

      {error && <p className="text-red-500 mb-2">{error}</p>}

      <div className="mb-4">
        <input
          type="text"
          placeholder="Nombre del hotel"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="border p-2 mb-2 w-full"
        />
        <input
          type="text"
          placeholder="Ciudad"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          className="border p-2 mb-2 w-full"
        />
        <button onClick={handleSave} className="bg-green-500 text-white p-2">
          {editingHotel ? "Actualizar" : "Agregar"}
        </button>
      </div>

      <ul className="space-y-2">
        {hotels.map((hotel) => (
          <li key={hotel.id} className="border p-2 flex justify-between items-center">
            <div>
              <p className="font-bold">{hotel.name}</p>
              <p>{hotel.city}</p>
            </div>
            <div>
              <button onClick={() => handleEdit(hotel)} className="bg-blue-500 text-white p-2 mr-2">
                Editar
              </button>
              <button onClick={() => handleDelete(hotel.id)} className="bg-red-500 text-white p-2">
                Eliminar
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default HotelList;
