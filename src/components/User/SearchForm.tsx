import { useState } from "react";

interface SearchFormProps {
  onSearch: (filters: {
    checkIn: string;
    checkOut: string;
    city: string;
  }) => void;
}

const SearchForm = ({ onSearch }: SearchFormProps) => {
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [city, setCity] = useState("");

  const handleSearch = () => {
    onSearch({ checkIn, checkOut, city });
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Search Hotels</h2>
      <input
        type="date"
        value={checkIn}
        onChange={(e) => setCheckIn(e.target.value)}
        className="border p-2 mb-2"
      />
      <input
        type="date"
        value={checkOut}
        onChange={(e) => setCheckOut(e.target.value)}
        className="border p-2 mb-2"
      />
      <input
        type="text"
        placeholder="City"
        value={city}
        onChange={(e) => setCity(e.target.value)}
        className="border p-2 mb-2"
      />
      <button onClick={handleSearch} className="bg-blue-500 text-white p-2">
        Search
      </button>
    </div>
  );
};

export default SearchForm;