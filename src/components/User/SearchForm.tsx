import { useState } from "react";

interface SearchFormProps {
  onSearch: (filters: {
    checkIn: string;
    checkOut: string;
    city: string;
    guests: number;
  }) => void;
}

const SearchForm = ({ onSearch }: SearchFormProps) => {
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [city, setCity] = useState("");
  const [guests, /* setGuests */] = useState(1);

  const handleSearch = () => {
    if (guests < 1) {
      alert("Debe haber al menos 1 huésped.");
      return;
    }
    onSearch({ checkIn, checkOut, city, guests });
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Buscar habitaciones</h2>
      
      <label className="block mb-2">
        <span className="font-semibold">Fecha de entrada:</span>
        <input
          type="date"
          value={checkIn}
          onChange={(e) => setCheckIn(e.target.value)}
          className="border p-2 w-full mt-1"
        />
      </label>

      <label className="block mb-2">
        <span className="font-semibold">Fecha de salida:</span>
        <input
          type="date"
          value={checkOut}
          onChange={(e) => setCheckOut(e.target.value)}
          className="border p-2 w-full mt-1"
        />
      </label>

      <label className="block mb-2">
        <span className="font-semibold">Ciudad:</span>
        <input
          type="text"
          placeholder="¿Dónde deseas hospedarte?"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          className="border p-2 w-full mt-1"
        />
      </label>

      {/* <label className="block mb-4">
        <span className="font-semibold">Número de huéspedes:</span>
        <input
          type="number"
          min="1"
          value={guests}
          onChange={(e) => setGuests(Number(e.target.value))}
          className="border p-2 w-full mt-1"
        />
      </label> */}
      <br />

      <button 
        onClick={handleSearch} 
        className="bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 transition"
      >
        Buscar
      </button>
    </div>
  );
};

export default SearchForm;
