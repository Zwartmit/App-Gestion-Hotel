import { useNavigate } from "react-router-dom";
import ReservationList from "../components/Admin/ReservationList";
import { LogOut } from 'lucide-react';
import { logout } from "../utils/auth"; 
import HotelList from "../components/Admin/HotelList";
import RoomList from "../components/Admin/RoomList";

const AdminPage = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    const confirmLogout = window.confirm("¿Estás seguro de que deseas cerrar sesión?");
    if (confirmLogout) {
      logout();
      navigate("/", { replace: true });
    }
  };

  return (
    <div className="flex flex-col items-center bg-gray-200 p-4 rounded-lg">

      <div className="w-full max-w-sm sm:max-w-md md:max-w-screen-xl bg-gray-300 text-center text-[#070b0d] rounded-xl shadow-lg p-6 md:p-8">
      <button onClick={handleLogout} className="fixed top-4 right-4 md:absolute md:top-6 md:right-6 z-10 bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition" >
        <LogOut size={25} />
      </button>
        <h1 className="text-2xl md:text-3xl font-bold mb-6">Panel de administración</h1>
        <HotelList />
        <RoomList />

        <div className="mt-6">
          <ReservationList />
        </div>
      </div>
    </div>
  );
};

export default AdminPage;
