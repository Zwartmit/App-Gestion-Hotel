import { useState } from "react";
import SearchForm from "../components/User/SearchForm";
import ReservationForm from "../components/User/ReservationForm";
import { getHotels, getRooms } from "../utils/storage";
import { LogOut } from 'lucide-react';
import { logout } from "../utils/auth";
import { useNavigate } from "react-router-dom";

const UserPage = () => {
  const [selectedRoom, setSelectedRoom] = useState<string | null>(null);
  
  interface Room {
    id: string;
    type: string;
    baseCost: number;
    taxes: number;
    hotelId: string;
    enabled: boolean;
  }

  const [availableRooms, setAvailableRooms] = useState<Room[]>([]);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleLogout = () => {
    const confirmLogout = window.confirm("¿Estás seguro de que deseas cerrar sesión?");
    if (confirmLogout) {
      logout();
      navigate("/", { replace: true });
    }
  };

  const handleSearch = (filters: { checkIn: string; checkOut: string; city: string }) => {
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
      const isRoomInFilteredHotels = filteredHotels.some((hotel) => hotel.id === room.hotelId);
      return isRoomInFilteredHotels && room.enabled;
    });

    setAvailableRooms(availableRooms);
  };

  const handleBackToSearch = () => {
    setSelectedRoom(null);
    setAvailableRooms([]); // Limpia las habitaciones buscadas
  };

  return (
    <div className="flex flex-col items-center bg-gray-200 p-4 rounded-lg">
      <button onClick={handleLogout} className="fixed top-4 right-4 md:absolute md:top-6 md:right-6 z-10 bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition">
        <LogOut size={25} />
      </button>

      <div className="w-full max-w-sm sm:max-w-md md:max-w-screen-xl bg-gray-300 text-center text-[#070b0d] rounded-xl shadow-lg p-6 md:p-8">
        <h1 className="text-2xl font-bold mb-4">Panel de reserva</h1>
        
        {!selectedRoom ? (
          <>
            <SearchForm onSearch={handleSearch} />
            {error && <p className="text-red-500 mt-2">{error}</p>}

            {availableRooms.length > 0 && (
              <div className="mt-4">
                <h2 className="text-xl font-bold mb-4">Habitaciones disponibles</h2>
                <ul className="space-y-2">
                  {availableRooms.map((room) => (
                    <li key={room.id} className="border p-2">
                      <p className="font-bold">{room.type}</p>
                      <p>Costo: ${room.baseCost}</p>
                      <p>Impuesto: ${room.taxes}</p>
                      <button
                        onClick={() => setSelectedRoom(room.id)}
                        className="bg-blue-500 text-white p-2 mt-2"
                      >
                        Reservar
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </>
        ) : (
          <ReservationForm roomId={selectedRoom} onSuccess={handleBackToSearch} />
        )}
      </div>
    </div>
  );
};

export default UserPage;
