import { useNavigate } from "react-router-dom";
import HotelForm from "../components/Admin/HotelForm";
import RoomForm from "../components/Admin/RoomForm";
import ReservationList from "../components/Admin/ReservationList";
import { logout } from "../utils/auth"; 

const AdminPage = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    logout(); 
    navigate("/login", { replace: true }); 
  };

  return (
    <div className="p-4 bg-gray-300 text-center text-[#070b0d] rounded-xl relative" style={{ textShadow: "3px 3px 3px rgb(0, 0, 0, 0.2)" }}>
      <button 
        onClick={handleLogout} 
        className="absolute top-4 right-4 bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition"
      >
        Cerrar sesión
      </button>
      <h1 className="text-2xl font-bold mb-4">Panel de administración</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <HotelForm />
        <RoomForm />
      </div>
      <ReservationList />
    </div>
  );
};

export default AdminPage;
