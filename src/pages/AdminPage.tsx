import { useNavigate } from "react-router-dom";
import HotelForm from "../components/Admin/HotelForm";
import RoomForm from "../components/Admin/RoomForm";
import ReservationList from "../components/Admin/ReservationList";
import { LogOut } from 'lucide-react';
import { logout } from "../utils/auth"; 

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
      <button onClick={handleLogout} className="fixed top-4 right-4 md:absolute md:top-6 md:right-6 z-10 bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition" >
        <LogOut size={25} />
      </button>

      <div className="w-full max-w-sm sm:max-w-md md:max-w-screen-xl bg-gray-300 text-center text-[#070b0d] rounded-xl shadow-lg p-6 md:p-8">
        <h1 className="text-2xl md:text-3xl font-bold mb-6">Panel de administración</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <HotelForm />
          <RoomForm />
        </div>

        <div className="mt-6">
          <ReservationList />
        </div>
      </div>
    </div>
  );
};

export default AdminPage;
