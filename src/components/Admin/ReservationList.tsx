import { useEffect, useState } from "react";
import { getReservations } from "../../utils/storage";

interface Reservation {
  id: string;
  roomId: string;
  guest: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    dob: string;
    gender: string;
    documentType: string;
    documentNumber: string;
  };
  emergencyContact: {
    fullName: string;
    phone: string;
  } | null;
  checkIn: string;
  checkOut: string;
}

const ReservationList = () => {
  const [reservations, setReservations] = useState<Reservation[]>([]);

  useEffect(() => {
    const reservations = getReservations();
    setReservations(reservations);
  }, []);

  return (
    <div className="p-4 w-full">
      <h2 className="text-2xl font-bold mb-4 text-center">Reservaciones</h2>

      <div className="hidden md:block">
        <div className="overflow-x-auto">
          <table className="w-full border-collapse shadow-lg">
            <thead>
              <tr className="bg-gray-200 text-gray-700 text-sm md:text-base">
                <th className="border p-3">Huésped</th>
                <th className="border p-3">Correo</th>
                <th className="border p-3">Teléfono</th>
                <th className="border p-3">Fecha de Nacimiento</th>
                <th className="border p-3">Género</th>
                <th className="border p-3">Documento</th>
                <th className="border p-3">Check-in</th>
                <th className="border p-3">Check-out</th>
                <th className="border p-3">Emergencia</th>
              </tr>
            </thead>
            <tbody>
              {reservations.map((reservation) => (
                <tr key={reservation.id} className="border text-gray-800 text-sm md:text-base">
                  <td className="border p-3">
                    {reservation.guest.firstName} {reservation.guest.lastName}
                  </td>
                  <td className="border p-3">{reservation.guest.email}</td>
                  <td className="border p-3">{reservation.guest.phone}</td>
                  <td className="border p-3">{reservation.guest.dob}</td>
                  <td className="border p-3 capitalize">{reservation.guest.gender}</td>
                  <td className="border p-3">
                    {reservation.guest.documentType} - {reservation.guest.documentNumber}
                  </td>
                  <td className="border p-3">{reservation.checkIn}</td>
                  <td className="border p-3">{reservation.checkOut}</td>
                  <td className="border p-3">
                    {reservation.emergencyContact
                      ? `${reservation.emergencyContact.fullName} - ${reservation.emergencyContact.phone}`
                      : "No registrado"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="md:hidden flex flex-col space-y-4">
        {reservations.map((reservation) => (
          <div key={reservation.id} className="border rounded-lg p-4 shadow-md bg-white">
            <p className="font-bold text-lg text-blue-600">
              {reservation.guest.firstName} {reservation.guest.lastName}
            </p>
            <p className="text-gray-700">
              <span className="font-semibold">Correo:</span> {reservation.guest.email}
            </p>
            <p className="text-gray-700">
              <span className="font-semibold">Teléfono:</span> {reservation.guest.phone}
            </p>
            <p className="text-gray-700">
              <span className="font-semibold">Fecha de nacimiento:</span> {reservation.guest.dob}
            </p>
            <p className="text-gray-700">
              <span className="font-semibold">Género:</span> {reservation.guest.gender}
            </p>
            <p className="text-gray-700">
              <span className="font-semibold">Documento:</span> {reservation.guest.documentType} - {reservation.guest.documentNumber}
            </p>
            <p className="text-gray-700">
              <span className="font-semibold">Check-in:</span> {reservation.checkIn}
            </p>
            <p className="text-gray-700">
              <span className="font-semibold">Check-out:</span> {reservation.checkOut}
            </p>
            <p className="text-gray-700">
              <span className="font-semibold">Emergencia:</span>{" "}
              {reservation.emergencyContact
                ? `${reservation.emergencyContact.fullName} - ${reservation.emergencyContact.phone}`
                : "No registrado"}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ReservationList;
