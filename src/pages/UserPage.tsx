import { useState } from "react";
import SearchForm from "../components/User/SearchForm";
import ReservationForm from "../components/User/ReservationForm";
import { getHotels, getRooms, Room } from "../utils/storage";
import { LogOut } from "lucide-react";
import { logout } from "../utils/auth";
import { useNavigate } from "react-router-dom";
import icon from "../assets/icon2.png";
import back1 from "../assets/back2.jpg";
import back2 from "../assets/backLogin.png";

const UserPage = () => {
  const [selectedRoom, setSelectedRoom] = useState<{ id: string; type: string; hotelName: string; city: string; total: number } | null>(null);
  const [selectedCheckIn, setSelectedCheckIn] = useState<string | null>(null);
  const [selectedCheckOut, setSelectedCheckOut] = useState<string | null>(null);
  const [availableRooms, setAvailableRooms] = useState<Room[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [noRoomsMessage, setNoRoomsMessage] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleLogout = () => {
    const confirmLogout = window.confirm("¿Deseas cerrar sesión?");
    if (confirmLogout) {
      logout();
      navigate("/", { replace: true });
    }
  };

  const handleSearch = (filters: { checkIn: string; checkOut: string; city: string; guests: number }) => {
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
    setNoRoomsMessage(null);

    const hotels = getHotels();
    const rooms = getRooms();

    const filteredHotels = hotels.filter(
      (hotel) => hotel.city.toLowerCase() === city.toLowerCase() && hotel.enabled
    );

    if (filteredHotels.length === 0) {
      setAvailableRooms([]);
      setNoRoomsMessage("No hay hoteles disponibles en esta ciudad.");
      return;
    }

    const availableRooms = rooms.filter((room) => {
      const isRoomInFilteredHotels = filteredHotels.some((hotel) => hotel.id === room.hotelId);
      return isRoomInFilteredHotels && room.enabled;
    });

    if (availableRooms.length === 0) {
      setNoRoomsMessage("No hay habitaciones disponibles en esta ciudad.");
    }

    setAvailableRooms(availableRooms);
    setSelectedCheckIn(checkIn);
    setSelectedCheckOut(checkOut);
  };

  const handleSelectRoom = (room: Room) => {
    const hotels = getHotels();
    const hotel = hotels.find(h => h.id === room.hotelId);
    setSelectedRoom({
      id: room.id,
      type: room.type,
      hotelName: hotel ? hotel.name : "Desconocido",
      city: hotel ? hotel.city : "Desconocido",
      total: Math.round(room.baseCost * (1 + room.taxes / 100)),
    });
  };
  const handleBackToSearch = () => {
    setSelectedRoom(null);
    setAvailableRooms([]);
    setNoRoomsMessage(null);
  };
  return (
    <div
      className="flex flex-col items-center p-3 rounded-2xl"
      style={{
        backgroundImage: `url(${back1})`,
        backgroundSize: "contain",
        backgroundPosition: "center",
      }}
    >
      <button
        onClick={handleLogout}
        className="fixed top-4 right-4 bg-red-500 text-white px-4 py-2 rounded-2xl hover:bg-red-600 transition flex items-center gap-2"
      >
        <LogOut size={20} />
        <span className="hidden sm:inline">Cerrar Sesión</span>
      </button>
  
      <div
        className="w-full max-w-4xl bg-white text-gray-900 rounded-xl shadow-lg p-6 md:p-8"
        style={{
          backgroundImage: `url(${back2})`,
          backgroundSize: "contain",
          backgroundPosition: "center",
        }}
      >
        <h1 className="text-2xl font-bold text-center text-white">Panel de reserva</h1>
        <img
          src={icon}
          alt="Logo"
          className="w-auto h-35 mb-6 mx-auto"
          style={{ filter: "drop-shadow(3px 3px 6px rgba(0, 0, 0, 0.2))" }}
        />
  
        {!selectedRoom ? (
          <>
            <SearchForm onSearch={handleSearch} />
            {error && <p className="text-red-500 mt-2">{error}</p>}
            {noRoomsMessage && <p className="text-red-500 mt-2">{noRoomsMessage}</p>}
  
            {availableRooms.length > 0 && (
              <div className="mt-4 bg-white text-black rounded-2xl p-3">
                <h2 className="text-2xl font-bold m-3">Habitaciones disponibles</h2>
                <ul className="space-y-2">
                  {availableRooms.map((room) => (
                    <li key={room.id} className="border p-2 rounded-2xl">
                      <p><b>Tipo:</b> {room.type}</p>
                      <p><b>Hotel:</b> {getHotels().find(hotel => hotel.id === room.hotelId)?.name || "Desconocido"}</p>
                      <p><b>Ciudad:</b> {getHotels().find(hotel => hotel.id === room.hotelId)?.city || "Desconocido"}</p>
                      <p><b>Costo base:</b> ${room.baseCost}</p>
                      <p><b>Impuestos:</b> {room.taxes}%</p>
                      <p><b>Total:</b> ${Math.round(room.baseCost * (1 + room.taxes / 100))}</p>
                      <button
                        onClick={() => handleSelectRoom(room)}
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
          <ReservationForm
            roomId={selectedRoom.id}
            roomType={selectedRoom.type}
            hotelName={selectedRoom.hotelName}
            city={selectedRoom.city}
            checkIn={selectedCheckIn || ""}
            checkOut={selectedCheckOut || ""}
            total={selectedRoom.total}
            onSuccess={handleBackToSearch}
          />
        )}
      </div>
    </div>
  );
  };
  
export default UserPage;
