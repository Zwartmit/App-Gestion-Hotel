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
    <div className="p-4 bg-amber-50 text-black rounded-2xl">
      <h2 className="text-xl font-bold mb-4">Buscar habitaciones</h2>
      <div className="flex flex-col md:flex-row gap-4 mb-2">
        
        <label className="flex-1">
          <span className="font-semibold block mb-1">Fecha de entrada:</span>
          <input
            type="date"
            value={checkIn}
            onChange={(e) => setCheckIn(e.target.value)}
            className="border p-2 w-full text-white bg-[#021224] rounded-2xl"
          />
        </label>

        <label className="flex-1">
          <span className="font-semibold block mb-1">Fecha de salida:</span>
          <input
            type="date"
            value={checkOut}
            onChange={(e) => setCheckOut(e.target.value)}
            className="border p-2 w-full text-white bg-[#021224] rounded-2xl"
          />
        </label>
      </div>

      <label className="block mb-2">
        <span className="font-semibold">Ciudad:</span>
        <input
          type="text"
          placeholder="¿Dónde deseas hospedarte?"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          className="border p-2 w-full mt-1 rounded-2xl"
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
