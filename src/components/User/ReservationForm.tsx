import { useState } from "react";
import { saveReservation } from "../../utils/storage";

const ReservationForm = ({ roomId, onSuccess }: { roomId: string; onSuccess: () => void }) => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [emergencyContact, setEmergencyContact] = useState("");

  const handleSubmit = () => {
    const reservation = {
      id: Date.now().toString(),
      roomId,
      guest: {
        firstName,
        lastName,
        email,
        phone,
        dob: "",
        gender: "",
        documentType: "",
        documentNumber: "",
      },
      emergencyContact: {
        fullName: emergencyContact,
        phone: "",
      },
      checkIn: "",
      checkOut: "",
    };
    saveReservation(reservation);
    onSuccess();
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Reservation Form</h2>
      <input
        type="text"
        placeholder="First Name"
        value={firstName}
        onChange={(e) => setFirstName(e.target.value)}
        className="border p-2 mb-2"
      />
      <input
        type="text"
        placeholder="Last Name"
        value={lastName}
        onChange={(e) => setLastName(e.target.value)}
        className="border p-2 mb-2"
      />
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="border p-2 mb-2"
      />
      <input
        type="text"
        placeholder="Phone"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
        className="border p-2 mb-2"
      />
      <input
        type="text"
        placeholder="Emergency Contact"
        value={emergencyContact}
        onChange={(e) => setEmergencyContact(e.target.value)}
        className="border p-2 mb-2"
      />
      <button onClick={handleSubmit} className="bg-blue-500 text-white p-2">
        Confirm Reservation
      </button>
    </div>
  );
};

export default ReservationForm;