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
  };
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
      <h2 className="text-xl font-bold mb-4">Reservaciones</h2>
      <table className="w-full border-collapse">
        <thead>
          <tr className="bg-gray-200">
            <th className="border p-2">Huesped</th>
            <th className="border p-2">Correo</th>
            <th className="border p-2">Teléfono</th>
            <th className="border p-2">Entrada</th>
            <th className="border p-2">Salida</th>
          </tr>
        </thead>
        <tbody>
          {reservations.map((reservation) => (
            <tr key={reservation.id} className="border">
              <td className="border p-2">
                {reservation.guest.firstName} {reservation.guest.lastName}
              </td>
              <td className="border p-2">{reservation.guest.email}</td>
              <td className="border p-2">{reservation.guest.phone}</td>
              <td className="border p-2">{reservation.checkIn}</td>
              <td className="border p-2">{reservation.checkOut}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ReservationList;