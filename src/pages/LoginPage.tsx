import { useState } from "react";
import { isAdmin, login } from "../utils/auth";
import { useNavigate } from "react-router-dom";
import icon from "../assets/icon2.png";

const LoginPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = () => {
    if (login(username, password)) {
      navigate(isAdmin() ? "/admin" : "/user", { replace: true }); // Reemplaza la navegación para que no pueda volver atrás
    } else {
      alert("Error, verifica tus credenciales");
    }
  };

  return (
    <div className="absolute inset-0 flex justify-center items-center min-h-screen">
      <div className="p-6 bg-gray-100 text-center text-[#070b0d] rounded-xl shadow-md w-full max-w-sm mx-auto sm:ml-15 sm:mx-0" style={{ textShadow: "3px 3px 3px rgb(0, 0, 0, 0.2)" }}>
        <img src={icon} alt="Logo" className="w-auto h-35 mx-auto" />
        <h1 className="font-semibold mb-4" style={{ fontSize: "2.3rem" }}>Iniciar sesión</h1>
        <input
          type="text"
          placeholder="Usuario"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="border p-2 mb-2 w-full"
        />
        <br />
        <input
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="border p-2 mb-2 w-full"
        />
        <br />
        <button onClick={handleLogin} className="bg-blue-500 text-white px-4 py-2 rounded-lg mt-3">
          Ingresar
        </button>
      </div>
    </div>
  );
};

export default LoginPage;
