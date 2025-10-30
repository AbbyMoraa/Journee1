import  { useState } from "react";

export default function BookingModal({ hotel, onClose }) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    dates: "",
  });
  const [message, setMessage] = useState("");

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Booking attempt:", { formData, hotel });

    if (!formData.name || !formData.email || !formData.dates) {
      setMessage("Please fill all fields");
      console.log("Incomplete form data", formData);
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setMessage("Please enter a valid email");
      console.log("Invalid email format", formData.email);
      return;
    }

    alert("✅ Confirmed! You have booked.");

    console.log("Booking confirmed for:", {
      hotelName: hotel?.name || "Unnamed Hotel",
      userName: formData.name,
      email: formData.email,
      dates: formData.dates,
    });

    setMessage(`Booking confirmed for ${hotel?.name || "the hotel"}! ✅`);
    setFormData({ name: "", email: "", dates: "" });

    setTimeout(() => {
      setMessage("");
      onClose();
    }, 1500);
  };

  return (
    <div className="fixed inset-0 bg-gradient-to-r from-[#F8E7C9] to-[#D1F0E1] backdrop-blur-sm flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-2xl shadow-2xl max-w-md w-full relative animate-fade-in">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-400 hover:text-gray-600 text-xl"
        >
          ✕
        </button>

        <h2 className="text-2xl font-bold text-teal-700 mb-4 text-center">
          Book {hotel?.name || "Hotel"}
        </h2>

        <img
          src={hotel?.image || ""}
          alt={hotel?.name || "Hotel"}
          className="w-full h-40 object-cover rounded-lg mb-4"
        />

        {message && (
          <p className="text-center text-teal-600 mb-3 font-medium">{message}</p>
        )}

        <form onSubmit={handleSubmit} className="space-y-3">
          <input
            type="text"
            name="name"
            placeholder="Your Name"
            value={formData.name}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-teal-400"
          />
          <input
            type="email"
            name="email"
            placeholder="Your Email"
            value={formData.email}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-teal-400"
          />
          <input
            type="text"
            name="dates"
            placeholder="Travel Dates"
            value={formData.dates}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-teal-400"
          />
          <button
            type="submit"
            className="w-full bg-teal-600 text-white py-2 rounded-lg hover:bg-teal-700"
          >
            Confirm Booking
          </button>
        </form>
      </div>
    </div>
  );
}
