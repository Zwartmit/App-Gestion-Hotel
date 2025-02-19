import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import AdminPage from "./pages/AdminPage";
import UserPage from "./pages/UserPage";
import ProtectedRoute from "./utils/ProtectedRoute";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
      <Route path="/" element={<LoginPage />} />
        <Route path="/admin" element={<ProtectedRoute><AdminPage /></ProtectedRoute>} />
        <Route path="/user" element={<ProtectedRoute><UserPage /></ProtectedRoute>} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;