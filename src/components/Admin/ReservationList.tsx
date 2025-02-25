import { useEffect, useState } from "react";
import { getReservations, getRooms, getHotels } from "../../utils/storage";

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

interface Room {
  id: string;
  type: string;
  hotelId: string;
}

interface Hotel {
  id: string;
  name: string;
  city: string; // Se agrega la ciudad al hotel
}

const ReservationList = () => {
  const [reservations, setReservations] = useState<Reservation[]>([]);
  const [rooms, setRooms] = useState<Room[]>([]);
  const [hotels, setHotels] = useState<Hotel[]>([]);

  useEffect(() => {
    setReservations(getReservations());
    setRooms(getRooms());
    setHotels(getHotels());
  }, []);

  const getRoomDetails = (roomId: string) => {
    const room = rooms.find((room) => room.id === roomId);
    if (!room) return { type: "Desconocido", hotelName: "Desconocido", city: "Desconocido" };

    const hotel = hotels.find((hotel) => hotel.id === room.hotelId);
    return {
      type: room.type,
      hotelName: hotel ? hotel.name : "Desconocido",
      city: hotel ? hotel.city : "Desconocido",
    };
  };

  return (
    <div className="p-4 w-full bg-white text-black rounded-2xl">
      <h2 className="text-3xl font-bold mb-6 text-center text-blue-600">Lista de reservas</h2>

      {reservations.length === 0 ? (
        <p className="text-center text-gray-600">No hay reservaciones registradas.</p>
      ) : (
        <div className="flex flex-col space-y-6">
          {reservations.map((reservation) => {
            const { type, hotelName, city } = getRoomDetails(reservation.roomId);
            return (
              <div key={reservation.id} className="border rounded-lg p-6 shadow-md bg-white max-w-md mx-auto">
                <p className="font-bold text-lg text-blue-600 text-center">
                  👤 {reservation.guest.firstName} {reservation.guest.lastName}
                </p>
                <div className="mt-4 space-y-2 text-center">
                  <p className="text-gray-700"><b>🚻 Género:</b> {reservation.guest.gender}</p>
                  <p className="text-gray-700"><b>📞 Teléfono:</b> {reservation.guest.phone}</p>
                  <p className="text-gray-700"><b>🆔 Documento:</b> {reservation.guest.documentType} - {reservation.guest.documentNumber}</p>
                  <p className="text-gray-700"><b>📧 Correo:</b> {reservation.guest.email}</p>
                  <p className="text-gray-700"><b>🎂 Fecha de Nacimiento:</b> {reservation.guest.dob}</p>
                  <p className="text-gray-700">
                    <b>🚨 Contacto de emergencia:</b>{" "}
                    {reservation.emergencyContact
                      ? `${reservation.emergencyContact.fullName} - ${reservation.emergencyContact.phone}`
                      : "No registrado"}
                  </p>
                  <div className="w-full h-[2px] bg-gradient-to-r from-[#cccccc] via-[#BE8922] to-[#cccccc] mx-auto m-6"></div>
                  <p className="text-gray-700"><b>📅 Check-in:</b> {reservation.checkIn}</p>
                  <p className="text-gray-700"><b>📅 Check-out:</b> {reservation.checkOut}</p>
                  <p className="text-gray-700"><b>🛏️ Habitación:</b> {type}</p>
                  <p className="text-gray-700"><b>🏨 Hotel:</b> {hotelName}</p>
                  <p className="text-gray-700"><b>📍 Ciudad:</b> {city}</p>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default ReservationList;
