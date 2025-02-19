import { useNavigate } from "react-router-dom";
import icon from "../assets/icon2.png";
import back from "../assets/backLogin.png";

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col py-12 p-12 items-center justify-center bg-gray-100" style={{ backgroundImage: `url(${back})`, backgroundSize: "contain",backgroundPosition: "center", backgroundColor: "rgba(0, 0, 0, 0.1)", backgroundBlendMode: "darken", textShadow: "3px 3px 6px rgb(0, 0, 0, 0.5)", borderRadius: "30px", boxShadow: "0px 0px 8px rgb(1, 4, 14)" }}>
    <img src={icon} alt="Logo" className="w-auto h-35 mx-auto" />
      <h1 className="text-3xl mt-6 font-bold mb-8 text-white">Bienvenido(a)...</h1>
      <div className="space-y-6">
        <button onClick={() => navigate("/login")} style={{ background: "linear-gradient(to right, rgb(232, 57, 37),rgb(240, 147, 35))", boxShadow: "0px 0px 6px rgb(0, 0, 0)" }}>
          Iniciar sesión
        </button>
      </div>
    </div>
  );
};

export default Home;