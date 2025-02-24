import { useState } from "react";
import { saveReservation } from "../../utils/storage";

const ReservationForm = ({ roomId, checkIn, checkOut, onSuccess }: { roomId: string; checkIn: string; checkOut: string; onSuccess: () => void }) => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [dob, setDob] = useState("");
  const [gender, setGender] = useState("Masculino");
  const [customGender, setCustomGender] = useState("");
  const [documentType, setDocumentType] = useState("");
  const [customDocumentType, setCustomDocumentType] = useState("");
  const [documentNumber, setDocumentNumber] = useState("");
  const [emergencyName, setEmergencyName] = useState("");
  const [emergencyPhone, setEmergencyPhone] = useState("");
  const [error, setError] = useState<string | null>(null);

  const isValidEmail = (email: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const handleSubmit = () => {
    if (!firstName || !lastName || !email || !phone || !dob || !documentType || !documentNumber || !emergencyName || !emergencyPhone) {
      setError("Todos los campos son obligatorios.");
      return;
    }

    if (!isValidEmail(email)) {
      setError("El correo electrónico no tiene un formato válido.");
      return;
    }

    const confirmReserve = window.confirm("¿Deseas reservar esta habitación?");
    if (!confirmReserve) return;

    const reservation = {
      id: Date.now().toString(),
      roomId,
      guest: {
        firstName,
        lastName,
        email,
        phone,
        dob,
        gender: gender === "Otro" ? customGender : gender,
        documentType: documentType === "Otro" ? customDocumentType : documentType,
        documentNumber,
      },
      emergencyContact: {
        fullName: emergencyName,
        phone: emergencyPhone,
      },
      checkIn,
      checkOut,
    };

    saveReservation(reservation);

    window.alert("Reserva realizada con éxito ✅");

    setFirstName("");
    setLastName("");
    setEmail("");
    setPhone("");
    setDob("");
    setGender("Masculino");
    setCustomGender("");
    setDocumentType("");
    setCustomDocumentType("");
    setDocumentNumber("");
    setEmergencyName("");
    setEmergencyPhone("");
    setError(null);

    onSuccess();
  };
  const handleCancel = () => {
    const confirmCancel = window.confirm("¿Estás seguro de que deseas cancelar la reserva?");
    if (confirmCancel) {
      onSuccess();
    }
  };
  
  return (
    <div className="p-4 bg-amber-50 text-black rounded-2xl">
      <h2 className="text-xl font-bold mb-4">Formulario de reserva</h2>

      {error && <p className="text-red-500 mb-2">{error}</p>}

      <input type="text" placeholder="Nombres" value={firstName} onChange={(e) => setFirstName(e.target.value)} className="border p-2 mb-2 w-full rounded-2xl" />
      <input type="text" placeholder="Apellidos" value={lastName} onChange={(e) => setLastName(e.target.value)} className="border p-2 mb-2 w-full rounded-2xl" />
      <input type="email" placeholder="Correo" value={email} onChange={(e) => setEmail(e.target.value)} className="border p-2 mb-2 w-full rounded-2xl" />
      <input type="number" placeholder="Teléfono" value={phone} onChange={(e) => setPhone(e.target.value)} className="border p-2 mb-2 w-full rounded-2xl" />
      <input type="date" value={dob} onChange={(e) => setDob(e.target.value)} className="border p-2 mb-2 w-full rounded-2xl" />

      <select value={gender} onChange={(e) => setGender(e.target.value)} className="border p-2 mb-2 w-full rounded-2xl">
        <option value="Masculino">Masculino</option>
        <option value="Femenino">Femenino</option>
        <option value="Otro">Otro</option>
      </select>

      {gender === "Otro" && (
        <input type="text" placeholder="Especificar género" value={customGender} onChange={(e) => setCustomGender(e.target.value)} className="border p-2 mb-2 w-full rounded-2xl" />
      )}

      <select value={documentType} onChange={(e) => setDocumentType(e.target.value)} className="border p-2 mb-2 w-full rounded-2xl">
        <option value="">Tipo de documento</option>
        <option value="Cédula">Cédula de ciudadania</option>
        <option value="Tarjeta">Tarjeta de identidad</option>
        <option value="Otro">Otro</option>
      </select>

      {documentType === "Otro" && (
        <input type="text" placeholder="Especificar tipo de documento" value={customDocumentType} onChange={(e) => setCustomDocumentType(e.target.value)} className="border p-2 mb-2 w-full rounded-2xl" />
      )}

      <input type="number" placeholder="Número de documento" value={documentNumber} onChange={(e) => setDocumentNumber(e.target.value)} className="border p-2 mb-2 w-full rounded-2xl" />

      <h3 className="text-lg font-bold mt-4">Contacto de Emergencia</h3>
      <input type="text" placeholder="Nombre del contacto" value={emergencyName} onChange={(e) => setEmergencyName(e.target.value)} className="border p-2 mb-2 w-full rounded-2xl" />
      <input type="number" placeholder="Teléfono del contacto" value={emergencyPhone} onChange={(e) => setEmergencyPhone(e.target.value)} className="border p-2 mb-2 w-full rounded-2xl" />

      <p>Check-in: {checkIn}</p>
      <p>Check-out: {checkOut}</p>

      <div className="flex gap-4 mt-4 justify-end">
        <button onClick={handleSubmit} className="bg-blue-500 text-white p-2 w-auto rounded-lg hover:bg-blue-600 transition">
          Reservar
        </button>
  
        <button onClick={handleCancel} className="bg-red-500 text-white p-2 w-auto rounded-lg hover:bg-red-600 transition">
          Cancelar
        </button>
      </div>
    </div>
  );  
};

export default ReservationForm;