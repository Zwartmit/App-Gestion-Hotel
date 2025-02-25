import { useState } from "react";
import { isAdmin, login } from "../utils/auth";
import { useNavigate } from "react-router-dom";
import { House } from 'lucide-react';
import icon from "../assets/icon.png";
import back from "../assets/backLogin.png";

const LoginPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = () => {
    if (login(username, password)) {
      navigate(isAdmin() ? "/admin" : "/user", { replace: true });
    } else {
      alert("Error, verifica tus credenciales...");
    }
  };

  return (
    <div className="absolute inset-0 flex justify-center align-center items-center min-h-screen">
      <div className="p-6 text-center text-white shadow-md w-full max-w-sm mx-auto" style={{ backgroundImage: `url(${back})`, backgroundSize: "contain", backgroundPosition: "center",  textShadow: "3px 3px 6px rgb(0, 0, 0, 0.5)", borderRadius: "30px", boxShadow: "0px 0px 8px rgb(1, 4, 14)" }}>
        <div className="flex justify-start">
        <button
          onClick={() => navigate("/", { replace: true })}
          style={{ background: "transparent" }}
        >
          <House size={25} className="animate-bounce" />
        </button>
        </div>
        <img src={icon} alt="Logo" className="w-auto h-35 mx-auto" />
        <h1 className="font-semibold mb-3" style={{ fontSize: "2.3rem", fontStyle: "italic" }}>Iniciar sesión</h1>
        <h1 className="font-semibold mb-3" style={{ fontSize: "0.7rem", fontStyle: "italic" }}>Digita tus datos según tu rol (Administrador o Usuario)</h1>
        <input
          type="text"
          placeholder="Usuario"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="border p-2 mb-2 w-full bg-white text-black rounded-xl"
        />
        <br />
        <input
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="border p-2 mb-2 w-full bg-white text-black rounded-xl"
        />
        <br />
        <button onClick={handleLogin} className="text-white px-4 mt-3" style={{ background: "linear-gradient(to right, rgb(232, 57, 37),rgb(240, 147, 35))", boxShadow: "0px 0px 6px rgb(0, 0, 0)" }}>
          Ingresar
        </button>
      </div>
    </div>
  );
};

export default LoginPage;
