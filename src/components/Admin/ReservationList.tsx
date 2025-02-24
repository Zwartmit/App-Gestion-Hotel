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
    setReservations(getReservations());
  }, []);

  return (
    <div className="p-4 w-full bg-amber-50 text-black rounded-2xl">
      <h2 className="text-2xl font-bold mb-4 text-center">Lista de reservas</h2>

      {reservations.length === 0 ? (
        <p className="text-center text-gray-600">No hay reservaciones registradas.</p>
      ) : (
        <>
          <div className="hidden md:block">
            <div className="overflow-x-auto">
              <table className="w-full border-collapse shadow-lg">
                <thead>
                  <tr className="bg-gray-200 text-gray-800 text-sm md:text-base">
                    <th className="border p-1">Huésped</th>
                    <th className="border p-1">Correo</th>
                    <th className="border p-1">Teléfono</th>
                    <th className="border p-1">Fecha de Nacimiento</th>
                    <th className="border p-1">Género</th>
                    <th className="border p-1">Documento</th>
                    <th className="border p-1">Check-in</th>
                    <th className="border p-1">Check-out</th>
                    <th className="border p-1">Emergencia</th>
                  </tr>
                </thead>
                <tbody>
                  {reservations.map((reservation) => (
                    <tr key={reservation.id} className="border text-gray-900 text-sm md:text-base">
                      <td className="border p-1">{reservation.guest.firstName} {reservation.guest.lastName}</td>
                      <td className="border p-1">{reservation.guest.email}</td>
                      <td className="border p-1">{reservation.guest.phone}</td>
                      <td className="border p-1">{reservation.guest.dob}</td>
                      <td className="border p-1 capitalize">{reservation.guest.gender}</td>
                      <td className="border p-1">{reservation.guest.documentType} - {reservation.guest.documentNumber}</td>
                      <td className="border p-1">{reservation.checkIn}</td>
                      <td className="border p-1">{reservation.checkOut}</td>
                      <td className="border p-1">
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
                  <span className="font-semibold"><b>Correo:</b></span> {reservation.guest.email}
                </p>
                <p className="text-gray-700">
                  <span className="font-semibold"><b>Teléfono:</b></span> {reservation.guest.phone}
                </p>
                <p className="text-gray-700">
                  <span className="font-semibold"><b>Fecha de Nacimiento:</b></span> {reservation.guest.dob}
                </p>
                <p className="text-gray-700">
                  <span className="font-semibold"><b>Género:</b></span> {reservation.guest.gender}
                </p>
                <p className="text-gray-700">
                  <span className="font-semibold"><b>Documento:</b></span> {reservation.guest.documentType} - {reservation.guest.documentNumber}
                </p>
                <p className="text-gray-700">
                  <span className="font-semibold"><b>Check-in:</b></span> {reservation.checkIn}
                </p>
                <p className="text-gray-700">
                  <span className="font-semibold"><b>Check-out:</b></span> {reservation.checkOut}
                </p>
                <p className="text-gray-700">
                  <span className="font-semibold"><b>Contacto de emergencia:</b></span>{" "}
                  {reservation.emergencyContact
                    ? `${reservation.emergencyContact.fullName} - ${reservation.emergencyContact.phone}`
                    : "No registrado"}
                </p>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default ReservationList;
