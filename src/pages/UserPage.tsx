import { useState } from "react";
import SearchForm from "../components/User/SearchForm";
import ReservationForm from "../components/User/ReservationForm";
import { getHotels, getRooms } from "../utils/storage";

const UserPage = () => {
  const [selectedRoom, setSelectedRoom] = useState<string | null>(null);
  const [availableRooms, setAvailableRooms] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null);

  const handleSearch = (filters: {
    checkIn: string;
    checkOut: string;
    city: string;
  }) => {
    const { checkIn, checkOut, city } = filters;

    if (!checkIn || !checkOut || !city) {
      setError("Todos los campos son obligatorios.");
      return;
    }

    if (new Date(checkIn) >= new Date(checkOut)) {
      setError("La fecha de check-in debe ser anterior a la fecha de check-out.");
      return;
    }

    setError(null);

    const hotels = getHotels();
    const rooms = getRooms();

    const filteredHotels = hotels.filter(
      (hotel) => hotel.city.toLowerCase() === city.toLowerCase() && hotel.enabled
    );

    const availableRooms = rooms.filter((room) => {
      const isRoomInFilteredHotels = filteredHotels.some(
        (hotel) => hotel.id === room.hotelId
      );
      const isRoomAvailable = room.enabled;
      return isRoomInFilteredHotels && isRoomAvailable;
    });

    setAvailableRooms(availableRooms);
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">User Dashboard</h1>
      <SearchForm onSearch={handleSearch} />
      {error && <p className="text-red-500 mt-2">{error}</p>}
      {selectedRoom ? (
        <ReservationForm
          roomId={selectedRoom}
          onSuccess={() => setSelectedRoom(null)}
        />
      ) : (
        <div className="mt-4">
          <h2 className="text-xl font-bold mb-4">Available Rooms</h2>
          {availableRooms.length > 0 ? (
            <ul className="space-y-2">
              {availableRooms.map((room) => (
                <li key={room.id} className="border p-2">
                  <p className="font-bold">{room.type}</p>
                  <p>Base Cost: ${room.baseCost}</p>
                  <p>Taxes: ${room.taxes}</p>
                  <button
                    onClick={() => setSelectedRoom(room.id)}
                    className="bg-blue-500 text-white p-2 mt-2"
                  >
                    Reserve
                  </button>
                </li>
              ))}
            </ul>
          ) : (
            <p>No hay habitaciones disponibles.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default UserPage;