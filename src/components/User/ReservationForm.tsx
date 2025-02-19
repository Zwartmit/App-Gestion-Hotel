import { useState } from "react";
import { saveReservation } from "../../utils/storage";

const ReservationForm = ({ roomId, onSuccess }: { roomId: string; onSuccess: () => void }) => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [emergencyContact, setEmergencyContact] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const isValidEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSubmit = () => {
    if (!firstName || !lastName || !email || !phone || !emergencyContact) {
      setError("Todos los campos son obligatorios.");
      return;
    }

    if (!isValidEmail(email)) {
      setError("El correo electrónico no tiene un formato válido.");
      return;
    }

    const confirmReserve = window.confirm("¿Estás seguro de que deseas reservar esta habitación?");
    if (!confirmReserve) return;

    const reservation = {
      id: Date.now().toString(),
      roomId,
      guest: {
        firstName,
        lastName,
        email,
        phone,
        dob: "",
        gender: "",
        documentType: "",
        documentNumber: "",
      },
      emergencyContact: {
        fullName: emergencyContact,
        phone: "",
      },
      checkIn: "",
      checkOut: "",
    };

    saveReservation(reservation);
    setSuccessMessage("Reserva realizada con éxito.");
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Formulario de reserva</h2>

      {error && <p className="text-red-500 mb-2">{error}</p>}

      {successMessage ? (
        <div className="bg-green-200 text-green-800 p-4 rounded-lg">
          <p>{successMessage}</p>
          <button onClick={onSuccess} className="bg-blue-500 text-white p-2 mt-4 rounded-lg">
            Volver
          </button>
        </div>
      ) : (
        <>
          <input
            type="text"
            placeholder="Nombres"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            className="border p-2 mb-2"
          />
          <br />
          <input
            type="text"
            placeholder="Apellidos"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            className="border p-2 mb-2"
          />
          <br />
          <input
            type="email"
            placeholder="Correo"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="border p-2 mb-2"
          />
          <br />
          <input
            type="text"
            placeholder="Teléfono"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="border p-2 mb-2"
          />
          <br />
          <input
            type="text"
            placeholder="Contacto de emergencia"
            value={emergencyContact}
            onChange={(e) => setEmergencyContact(e.target.value)}
            className="border p-2 mb-2"
          />
          <br />
          <button onClick={handleSubmit} className="bg-blue-500 text-white p-2 mt-2">
            Reservar
          </button>
        </>
      )}
    </div>
  );
};

export default ReservationForm;
