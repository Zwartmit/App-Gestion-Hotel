import { useState, useRef } from "react";
import { saveReservation } from "../../utils/storage";
import emailjs from "@emailjs/browser";

const ReservationForm = ({ roomId, checkIn, checkOut, roomType, hotelName, city, total, onSuccess }: { roomId: string; checkIn: string; checkOut: string; roomType: string; hotelName: string; city: string; total: number; onSuccess: () => void }) => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [dob, setDob] = useState("");
  const [gender, setGender] = useState("");
  const [customGender, setCustomGender] = useState("");
  const [documentType, setDocumentType] = useState("");
  const [customDocumentType, setCustomDocumentType] = useState("");
  const [documentNumber, setDocumentNumber] = useState("");
  const [emergencyName, setEmergencyName] = useState("");
  const [emergencyPhone, setEmergencyPhone] = useState("");
  const [error, setError] = useState<string | null>(null);
  const form = useRef<HTMLFormElement>(null);

  const isValidEmail = (email: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  
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
      city,
    };
  
    saveReservation(reservation);
  
    emailjs
      .send("service_bwehs2y", "template_a5gklka", {
        user_name: `${firstName} ${lastName}`,
        user_email: email,
        user_phone: phone,
        user_dob: dob,
        user_gender: gender,
        user_document_type: documentType,
        user_document_number: documentNumber,
        emergency_name: emergencyName,
        emergency_phone: emergencyPhone,
        room_type: roomType,
        hotel_name: hotelName,
        city: city,
        check_in: checkIn,
        check_out: checkOut,
        total: total,
      }, "izMWGC3Eu--nQlhVs")
      .then(
        () => {
          window.alert("Reserva realizada con éxito ✅\nSe ha enviado un correo de confirmación.");
        },
        (error) => {
          console.error("Error al enviar el correo:", error);
          window.alert("La reserva fue exitosa, pero hubo un error al enviar el correo.");
        }
      );

    setFirstName("");
    setLastName("");
    setEmail("");
    setPhone("");
    setDob("");
    setGender("");
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
    <div className="p-4 bg-white text-black rounded-2xl w-full">

      {error && <p className="text-red-500 mb-2">{error}</p>}

    <form ref={form} onSubmit={handleSubmit} className="max-w-lg mx-auto">
      <div className="bg-gray-100 p-4 rounded-lg shadow-md text-gray-800 text-left">
        <h2 className="text-3xl font-bold text-center text-blue-600 border-b pb-2 mb-3">Detalles de la Reserva</h2>
        <div className="space-y-2">
          <p className="flex items-center">
            <span className="font-bold text-gray-700 w-30">🛏️ Habitación:</span>
            <span className="text-gray-900">{roomType}</span>
          </p>
          <p className="flex items-center">
            <span className="font-bold text-gray-700 w-30">🏨 Hotel:</span>
            <span className="text-gray-900">{hotelName}</span>
          </p>
          <p className="flex items-center">
            <span className="font-bold text-gray-700 w-30">📍 Ciudad:</span>
            <span className="text-gray-900">{city}</span></p>
          <p className="flex items-center">
            <span className="font-bold text-gray-700 w-30">📅 Check-in:</span>
            <span className="text-gray-900">{checkIn}</span>
          </p>
          <p className="flex items-center">
            <span className="font-bold text-gray-700 w-30">📅 Check-out:</span>
            <span className="text-gray-900">{checkOut}</span>
          </p>
          <p className="flex items-center">
            <span className="font-bold text-gray-700 w-30">💵 Total:</span>
            <span className="text-gray-900">$ {total}</span>
          </p>
        </div>
      </div>

      <h3 className="text-2xl font-semibold mb-3 mt-5 text-center text-blue-600">Datos del huesped</h3>
      
      <label htmlFor="firstName" className="block w-full mb-1 text-gray-800">Nombres</label>
      <input type="text" name="user_name" placeholder="Nombres..." value={firstName} onChange={(e) => setFirstName(e.target.value)} className="border p-2 mb-2 w-full rounded-2xl" />

      <label htmlFor="lastName" className="block w-full mb-1 text-gray-800">Apellidos</label>
      <input type="text" name="user_lastname" placeholder="Apellidos..." value={lastName} onChange={(e) => setLastName(e.target.value)} className="border p-2 mb-2 w-full rounded-2xl" />

      <label htmlFor="email" className="block w-full mb-1 text-gray-800">Correo</label>
      <input type="email" name="user_email" placeholder="Correo..." value={email} onChange={(e) => setEmail(e.target.value)} className="border p-2 mb-2 w-full rounded-2xl" />

      <label htmlFor="phone" className="block w-full mb-1 text-gray-800">Teléfono</label>
      <input type="number" name="user_phone" placeholder="Teléfono..." value={phone} onChange={(e) => setPhone(e.target.value)} className="border p-2 mb-2 w-full rounded-2xl" />

      <label htmlFor="dob" className="block w-full mb-1 text-gray-800">Fecha de nacimiento</label>
      <input type="date" name="user_dob" placeholder="Fecha de nacimiento..." value={dob} onChange={(e) => setDob(e.target.value)} className="border p-2 mb-2 w-full rounded-2xl" />

      <label htmlFor="gender" className="block w-full mb-1 text-gray-800">Género</label>
      <select name="user_gender"  value={gender} onChange={(e) => setGender(e.target.value)} className="border p-2 mb-2 w-full rounded-2xl">
        <option value="">Selecciona una opción</option>
        <option value="Masculino">Masculino</option>
        <option value="Femenino">Femenino</option>
        <option value="Otro">Otro</option>
      </select>

      {gender === "Otro" && (
        <input name="user_gender" type="text" placeholder="Especificar género" value={customGender} onChange={(e) => setCustomGender(e.target.value)} className="border p-2 mb-2 w-full rounded-2xl" />
      )}

      <label htmlFor="documentType" className="block w-full mb-1 text-gray-800">Tipo de documento</label>
      <select name="user_document_type" id="documentType" value={documentType} onChange={(e) => setDocumentType(e.target.value)} className="border p-2 mb-2 w-full rounded-2xl">
        <option value="">Selecciona una opción</option>
        <option value="Cédula">Cédula de ciudadanía</option>
        <option value="Tarjeta">Tarjeta de identidad</option>
        <option value="Otro">Otro</option>
      </select>

      {documentType === "Otro" && (
        <input name="user_document_type" type="text" placeholder="Especificar tipo de documento" value={customDocumentType} onChange={(e) => setCustomDocumentType(e.target.value)} className="border p-2 mb-2 w-full rounded-2xl" />
      )}

      <label htmlFor="documentNumber" className="block w-full mb-1 text-gray-800">Número de documento</label>
      <input name="user_document_number" type="number" placeholder="Número de documento..." value={documentNumber} onChange={(e) => setDocumentNumber(e.target.value)} className="border p-2 mb-2 w-full rounded-2xl" />

      <h3 className="text-2xl font-semibold mb-3 mt-5 text-center text-blue-600">Contacto de emergencia</h3>

      <label htmlFor="user_contactname" className="block w-full mb-1 text-gray-800">Nombre</label>
      <input name="emergency_name" type="text" placeholder="Nombre del contacto..." value={emergencyName} onChange={(e) => setEmergencyName(e.target.value)} className="border p-2 mb-2 w-full rounded-2xl" />
      
      <label htmlFor="emergencyPhone" className="block w-full mb-1 text-gray-800">Teléfono</label>
      <input name="emergency_phone" type="number" placeholder="Teléfono del contacto..." value={emergencyPhone} onChange={(e) => setEmergencyPhone(e.target.value)} className="border p-2 mb-2 w-full rounded-2xl" />
      
    </form>

      <div className="flex gap-4 mt-4 justify-end">
        <button onClick={(e) => { e.preventDefault(); handleSubmit(e as any); }} className="bg-blue-500 text-white p-2 w-auto rounded-lg hover:bg-blue-600 transition">
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