interface Hotel {
    id: string;
    name: string;
    city: string;
    enabled: boolean;
  }
  
  export interface Room {
    id: string;
    hotelId: string;
    type: string;
    baseCost: number;
    taxes: number;
    enabled: boolean;
  }
  
  interface Reservation {
    id: string;
    roomId: string;
    guests: {
      firstName: string;
      lastName: string;
      dob: string;
      gender: string;
      documentType: string;
      documentNumber: string;
      email: string;
      phone: string;
    };
    emergencyContact: {
      fullName: string;
      phone: string;
    };
    checkIn: string;
    checkOut: string;
  }
  
  // Obtener hoteles
  export const getHotels = (): Hotel[] => {
    return JSON.parse(localStorage.getItem("hotels") || "[]");
  };
  
  // Guardar un nuevo hotel
  export const saveHotel = (hotel: Hotel) => {
    const hotels = getHotels();
    hotels.push(hotel);
    localStorage.setItem("hotels", JSON.stringify(hotels));
  };
  
  // Obtener habitaciones
  export const getRooms = (): Room[] => {
    return JSON.parse(localStorage.getItem("rooms") || "[]");
  };
  
  // Guardar una nueva habitación
  export const saveRoom = (room: Room) => {
    const rooms = getRooms();
    rooms.push(room);
    localStorage.setItem("rooms", JSON.stringify(rooms));
  };
  
  // Obtener reservas
  export const getReservations = (): Reservation[] => {
    const storedData = localStorage.getItem("reservations");
    return storedData ? JSON.parse(storedData) : [];
  };
  
  
  // Guardar una nueva reserva
  export const saveReservation = (reservation: Reservation) => {
    const reservations = getReservations();
    reservations.push(reservation);
    localStorage.setItem("reservations", JSON.stringify(reservations));
  };
  
  // Obtener habitaciones por hotel
  export const getRoomsByHotel = (hotelId: string): Room[] => {
    const rooms = getRooms();
    return rooms.filter((room) => room.hotelId === hotelId);
  };
  
  // Obtener hoteles habilitados
  export const getEnabledHotels = (): Hotel[] => {
    const hotels = JSON.parse(localStorage.getItem("hotels") || "[]");
    return hotels.filter((hotel: Hotel) => hotel.enabled);
  };

  // Obtener habitaciones habilitadas
  export const getEnabledRooms = (): Room[] => {
    const rooms = JSON.parse(localStorage.getItem("rooms") || "[]");
    return rooms.filter((room: Room) => room.enabled);
  };

  // Mostrar ciudades de hoteles habilitados
  export const getEnabledCities = (): string[] => {
    const hotels = getHotels();
    const enabledHotels = hotels.filter((hotel) => hotel.enabled);
    const cities = enabledHotels.map((hotel) => hotel.city);
    return [...new Set(cities)];
  };

  // Habilitar o deshabilitar un hotel
  export const toggleHotelStatus = (id: string, enabled: boolean) => {
    const hotels = getHotels();
    const updatedHotels = hotels.map((hotel) =>
      hotel.id === id ? { ...hotel, enabled } : hotel
    );
    localStorage.setItem("hotels", JSON.stringify(updatedHotels));
  };

  // Habilitar o deshabilitar una habitación
  export const toggleRoomStatus = (id: string, enabled: boolean) => {
    const rooms = getRooms();
    const updatedRooms = rooms.map((room) =>
      room.id === id ? { ...room, enabled } : room
    );
    localStorage.setItem("rooms", JSON.stringify(updatedRooms));
  };