/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useRef } from "react";
import { saveReservation } from "../../utils/storage";
import emailjs from "@emailjs/browser";

interface Guest {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  dob: string;
  gender: string;
  documentType: string;
  documentNumber: string;
  customGender?: string;
  customDocumentType?: string;
}

const ReservationForm = ({ roomId, checkIn, checkOut, roomType, hotelName, city, total, onSuccess }: { roomId: string; checkIn: string; checkOut: string; roomType: string; hotelName: string; city: string; total: number; onSuccess: () => void }) => {
  const [numberOfGuests, setNumberOfGuests] = useState(1);
  const [guests, setGuests] = useState<Guest[]>([]);
  const [confirmationEmail, setConfirmationEmail] = useState("");
  const [emergencyName, setEmergencyName] = useState("");
  const [emergencyPhone, setEmergencyPhone] = useState("");
  const [error, setError] = useState<string | null>(null);
  const form = useRef<HTMLFormElement>(null);

  const isValidEmail = (email: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const handleGuestChange = (index: number, field: string, value: string) => {
    const updatedGuests = [...guests];
    updatedGuests[index] = { ...updatedGuests[index], [field]: value };
    setGuests(updatedGuests);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    for (let i = 0; i < numberOfGuests; i++) {
      if (
        !guests[i]?.firstName ||
        !guests[i]?.lastName ||
        !guests[i]?.email ||
        !guests[i]?.phone ||
        !guests[i]?.dob ||
        !guests[i]?.gender ||
        !guests[i]?.documentType ||
        !guests[i]?.documentNumber
      ) {
        setError("Todos los campos son obligatorios para cada huésped.");
        return;
      }

      if (!isValidEmail(guests[i].email)) {
        setError("El correo electrónico no tiene un formato válido.");
        return;
      }
    }

    if (!confirmationEmail || !isValidEmail(confirmationEmail)) {
      setError("El correo de confirmación es obligatorio y debe tener un formato válido.");
      return;
    }

    if (!emergencyName || !emergencyPhone) {
      setError("Los datos de contacto de emergencia son obligatorios.");
      return;
    }

    const confirmReserve = window.confirm("¿Deseas reservar esta habitación?");
    if (!confirmReserve) return;

    const reservation = {
      id: Date.now().toString(),
      roomId,
      guests,
      guest: guests[0],
      confirmationEmail,
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
    .send(
      "service_bwehs2y",
      "template_a5gklka",
      {
        user_name: `${guests[0].firstName} ${guests[0].lastName}`,
        user_email: confirmationEmail,
        user_phone: guests[0].phone,
        user_dob: guests[0].dob,
        user_gender: guests[0].gender,
        user_document_type: guests[0].documentType,
        user_document_number: guests[0].documentNumber,
        emergency_name: emergencyName,
        emergency_phone: emergencyPhone,
        room_type: roomType,
        hotel_name: hotelName,
        city: city,
        check_in: checkIn,
        check_out: checkOut,
        total: total,
        huespedes: numberOfGuests,
      },
      "izMWGC3Eu--nQlhVs"
    )
    .then(
      () => {
        window.alert("Reserva realizada con éxito ✅\nSe ha enviado un correo de confirmación.");
      },
      (error) => {
        console.error("Error al enviar el correo:", error);
        window.alert("La reserva fue exitosa, pero hubo un error al enviar el correo.");
      }
    )
  
    setNumberOfGuests(1);
    setGuests([]);
    setConfirmationEmail("");
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
              <span className="text-gray-900">{city}</span>
            </p>
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

        <h3 className="text-2xl font-semibold mb-3 mt-5 text-center text-blue-600">Datos de los huéspedes</h3>

        <label htmlFor="numberOfGuests" className="block w-full mb-1 text-gray-800">Número de huéspedes</label>
        <input
          type="number"
          min="1"
          value={numberOfGuests}
          onChange={(e) => {
            const num = parseInt(e.target.value);
            setNumberOfGuests(num > 0 ? num : 1);
            setGuests(Array(num).fill({}));
          }}
          className="border p-2 mb-2 w-full rounded-2xl"
        />

        {Array.from({ length: numberOfGuests }).map((_, index) => (
          <div key={index} className="mb-4 border p-4 rounded-lg bg-gray-50">
            <h4 className="text-xl font-semibold mb-3 text-blue-600">Huésped {index + 1}</h4>

            <label htmlFor={`firstName-${index}`} className="block w-full mb-1 text-gray-800">Nombres</label>
            <input
              type="text"
              placeholder="Nombres..."
              value={guests[index]?.firstName || ""}
              onChange={(e) => handleGuestChange(index, "firstName", e.target.value)}
              className="border p-2 mb-2 w-full rounded-2xl"
            />

            <label htmlFor={`lastName-${index}`} className="block w-full mb-1 text-gray-800">Apellidos</label>
            <input
              type="text"
              placeholder="Apellidos..."
              value={guests[index]?.lastName || ""}
              onChange={(e) => handleGuestChange(index, "lastName", e.target.value)}
              className="border p-2 mb-2 w-full rounded-2xl"
            />

            <label htmlFor={`email-${index}`} className="block w-full mb-1 text-gray-800">Correo</label>
            <input
              type="email"
              placeholder="Correo..."
              value={guests[index]?.email || ""}
              onChange={(e) => handleGuestChange(index, "email", e.target.value)}
              className="border p-2 mb-2 w-full rounded-2xl"
            />

            <label htmlFor={`phone-${index}`} className="block w-full mb-1 text-gray-800">Teléfono</label>
            <input
              type="number"
              placeholder="Teléfono..."
              value={guests[index]?.phone || ""}
              onChange={(e) => handleGuestChange(index, "phone", e.target.value)}
              className="border p-2 mb-2 w-full rounded-2xl"
            />

            <label htmlFor={`dob-${index}`} className="block w-full mb-1 text-gray-800">Fecha de nacimiento</label>
            <input
              type="date"
              placeholder="Fecha de nacimiento..."
              value={guests[index]?.dob || ""}
              onChange={(e) => handleGuestChange(index, "dob", e.target.value)}
              className="border p-2 mb-2 w-full rounded-2xl"
            />

            <label htmlFor={`gender-${index}`} className="block w-full mb-1 text-gray-800">Género</label>
            <select
              value={guests[index]?.gender || ""}
              onChange={(e) => handleGuestChange(index, "gender", e.target.value)}
              className="border p-2 mb-2 w-full rounded-2xl"
            >
              <option value="">Selecciona una opción</option>
              <option value="Masculino">Masculino</option>
              <option value="Femenino">Femenino</option>
              <option value="Otro">Otro</option>
            </select>

            {guests[index]?.gender === "Otro" && (
              <input
                type="text"
                placeholder="Especificar género"
                value={guests[index]?.customGender || ""}
                onChange={(e) => handleGuestChange(index, "customGender", e.target.value)}
                className="border p-2 mb-2 w-full rounded-2xl"
              />
            )}

            <label htmlFor={`documentType-${index}`} className="block w-full mb-1 text-gray-800">Tipo de documento</label>
            <select
              value={guests[index]?.documentType || ""}
              onChange={(e) => handleGuestChange(index, "documentType", e.target.value)}
              className="border p-2 mb-2 w-full rounded-2xl"
            >
              <option value="">Selecciona una opción</option>
              <option value="Cédula">Cédula de ciudadanía</option>
              <option value="Tarjeta">Tarjeta de identidad</option>
              <option value="Otro">Otro</option>
            </select>

            {guests[index]?.documentType === "Otro" && (
              <input
                type="text"
                placeholder="Especificar tipo de documento"
                value={guests[index]?.customDocumentType || ""}
                onChange={(e) => handleGuestChange(index, "customDocumentType", e.target.value)}
                className="border p-2 mb-2 w-full rounded-2xl"
              />
            )}

            <label htmlFor={`documentNumber-${index}`} className="block w-full mb-1 text-gray-800">Número de documento</label>
            <input
              type="number"
              placeholder="Número de documento..."
              value={guests[index]?.documentNumber || ""}
              onChange={(e) => handleGuestChange(index, "documentNumber", e.target.value)}
              className="border p-2 mb-2 w-full rounded-2xl"
            />
          </div>
        ))}

        <h3 className="text-2xl font-semibold mb-3 mt-5 text-center text-blue-600">Correo de confirmación</h3>

        <label htmlFor="confirmationEmail" className="block w-full mb-1 text-gray-800">Correo de confirmación</label>
        <input
          type="email"
          placeholder="Correo de confirmación..."
          value={confirmationEmail}
          onChange={(e) => setConfirmationEmail(e.target.value)}
          className="border p-2 mb-2 w-full rounded-2xl"
        />

        <h3 className="text-2xl font-semibold mb-3 mt-5 text-center text-blue-600">Contacto de emergencia</h3>

        <label htmlFor="emergencyName" className="block w-full mb-1 text-gray-800">Nombre</label>
        <input
          type="text"
          placeholder="Nombre del contacto..."
          value={emergencyName}
          onChange={(e) => setEmergencyName(e.target.value)}
          className="border p-2 mb-2 w-full rounded-2xl"
        />

        <label htmlFor="emergencyPhone" className="block w-full mb-1 text-gray-800">Teléfono</label>
        <input
          type="number"
          placeholder="Teléfono del contacto..."
          value={emergencyPhone}
          onChange={(e) => setEmergencyPhone(e.target.value)}
          className="border p-2 mb-2 w-full rounded-2xl"
        />
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