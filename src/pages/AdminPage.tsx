import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { LogOut, Hotel, Bed, CalendarCheck } from "lucide-react";
import { logout } from "../utils/auth"; 
import HotelList from "../components/Admin/HotelList";
import RoomList from "../components/Admin/RoomList";
import ReservationList from "../components/Admin/ReservationList";
import { motion } from "framer-motion";
import icon from "../assets/icon.png";
import back1 from "../assets/back2.jpg";
import back2 from "../assets/backLogin.png";

const AdminPage = () => {
  const navigate = useNavigate();
  const [selectedTab, setSelectedTab] = useState<"hotels" | "rooms" | "reservations">("hotels");

  const handleLogout = () => {
    const confirmLogout = window.confirm("¿Estás seguro de que deseas cerrar sesión?");
    if (confirmLogout) {
      logout();
      navigate("/", { replace: true });
    }
  };

  return (
    <div className="flex flex-col items-center bg-gray-100 p-3 rounded-2xl" style={{ backgroundImage: `url(${back1})`, backgroundSize: "contain", backgroundPosition: "center" }}>
      <button 
        onClick={handleLogout} 
        className="fixed top-4 right-4 bg-red-500 text-white px-4 py-2 rounded-2xl hover:bg-red-600 transition flex items-center gap-2"
      >
        <LogOut size={20} />
        <span className="hidden sm:inline">Cerrar Sesión</span>
      </button>

      <div className="w-full max-w-4xl bg-white text-gray-900 rounded-xl shadow-lg p-6 md:p-8" style={{ backgroundImage: `url(${back2})`, backgroundSize: "contain", backgroundPosition: "center" }}>
        <h1 className="text-2xl font-bold text-center text-white" style={{ textShadow: "3px 3px 6px rgb(0, 0, 0)" }}>Panel de Administración</h1>
        <img src={icon} alt="Logo" className="w-auto h-35 mb-6 mx-auto" style={{ filter: "drop-shadow(3px 3px 6px rgba(0, 0, 0, 0.2))" }} />

        <div className="flex justify-center space-x-4 mb-6">
          <button
            className={`flex items-center gap-2 px-4 py-2 rounded-lg transition ${
              selectedTab === "hotels" ? "bg-blue-500 text-white" : "bg-gray-200 text-gray-800"
            }`}
            onClick={() => setSelectedTab("hotels")}
          >
            <Hotel size={20} />
            Hoteles
          </button>

          <button
            className={`flex items-center gap-2 px-4 py-2 rounded-lg transition ${
              selectedTab === "rooms" ? "bg-blue-500 text-white" : "bg-gray-200 text-gray-800"
            }`}
            onClick={() => setSelectedTab("rooms")}
          >
            <Bed size={20} />
            Habitaciones
          </button>

          <button
            className={`flex items-center gap-2 px-4 py-2 rounded-lg transition ${
              selectedTab === "reservations" ? "bg-blue-500 text-white" : "bg-gray-200 text-gray-800"
            }`}
            onClick={() => setSelectedTab("reservations")}
          >
            <CalendarCheck size={20} />
            Reservas
          </button>
        </div>

        <motion.div
          key={selectedTab}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.3 }}
        >
          {selectedTab === "hotels" && <HotelList />}
          {selectedTab === "rooms" && <RoomList />}
          {selectedTab === "reservations" && <ReservationList />}
        </motion.div>
      </div>
    </div>
  );
};

export default AdminPage;
