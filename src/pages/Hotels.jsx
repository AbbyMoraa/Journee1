import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import BookingModal from "../components/BookingModal";

export default function Hotels() {
  const { destinationName } = useParams();
  const [hotels, setHotels] = useState([]);
  const [selectedHotel, setSelectedHotel] = useState(null);

  const customHotels = {
  Santorini: ["Aegean Blue Suites", "Caldera View Retreat", "Thalassa Boutique Hotel", "White Pearl Villa"],
  Bali: ["Ubud Serenity Resort", "Kuta Sands Villas", "Ocean Breeze Retreat", "Sunset Haven"],
  Maldives: ["Coral Reef Resort", "Azure Lagoon Villas", "Palm Shore Retreat", "Ocean Whisper Hotel"],
  Maui: ["Pacific Sunset Inn", "Tropical Breeze Resort", "Golden Bay Villas", "Haleakala Haven"],
  Tokyo: ["Shibuya Sky Hotel", "Sakura Tower", "Neon City Suites", "Imperial Garden Inn"],
  Barcelona: ["Gaudí View Hotel", "Catalonia Plaza", "Sunrise Rambla Suites", "Mediterraneo Inn"],
  Lisbon: ["Tejo View Retreat", "Alfama Boutique Hotel", "Sunset Bairro Suites", "Lisbon Breeze Inn"],
  "Swiss Alps": ["Alpine Dreams Resort", "Edelweiss Chalet", "SnowPeak Lodge", "Crystal Glacier Retreat"],
  Iceland: ["Aurora Skies Hotel", "Blue Lagoon Retreat", "Frost & Fire Lodge", "Northern Lights Inn"],
  Serengeti: ["Savanna Sunset Lodge", "Acacia Plains Retreat", "Serengeti Star Camp", "Wild Horizon Suites"],
  "Dubai Desert": ["Desert Oasis Resort", "Sands Mirage Hotel", "Starlit Dunes Villa", "Golden Sahara Inn"],
  "Amazon Rainforest": ["Jungle Canopy Lodge", "River Whisper Retreat", "Emerald Forest Inn", "Amazon Breeze Camp"],
};

  useEffect(() => {
    const fetchHotels = async () => {
      try {
        const response = await fetch(
          `https://api.pexels.com/v1/search?query=${destinationName}+hotel&per_page=9`,
          {
            headers: {
              Authorization: "mPHVzxGhOKepAwnrg0MGa493MrUTosy8HI8QZvYaaYErK9nZRlPog0p6",
            },
          }
        );

        const data = await response.json();

        const hotelNames =
          customHotels[destinationName] ||
          Array.from({ length: 6 }, (_, i) => `${destinationName} Resort ${i + 1}`);

        // Ensure every hotel has a valid ID
        const hotelData = data.photos.slice(0, hotelNames.length).map((photo, index) => ({
          id: photo.id ?? index, // fallback if photo.id undefined
          name: hotelNames[index],
          address: `${destinationName} City, Beach Road ${index + 10}`,
          rating: (Math.random() * (5 - 3.5) + 3.5).toFixed(1),
          image: photo.src.large,
        }));

        setHotels(hotelData);
      } catch (error) {
        console.error("Error fetching hotels:", error);
      }
    };

    fetchHotels();
  }, [destinationName]);

  return (
    <div className="min-h-screen bg-gradient-to-r from-[#F8E7C9] to-[#D1F0E1] py-12 px-6">
      <h1 className="text-4xl font-bold text-center text-teal-700 mb-10">
        Hotels in {destinationName}
      </h1>

      {hotels.length === 0 ? (
        <p className="text-center text-gray-500">No hotels found for {destinationName}.</p>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {hotels.map((hotel) => (
            <div
              key={hotel.id}
              className="bg-white rounded-2xl shadow-lg p-5 flex flex-col justify-between hover:scale-[1.02] transition-all duration-300"
            >
              <img
                src={hotel.image}
                alt={hotel.name}
                className="h-48 w-full object-cover rounded-lg"
              />
              <div className="mt-3">
                <h2 className="text-2xl font-semibold text-teal-700">{hotel.name}</h2>
                <p className="text-gray-500 text-sm">{hotel.address}</p>
                <p className="text-yellow-500 font-medium">⭐ {hotel.rating}</p>
                <button
                  onClick={() => setSelectedHotel(hotel)}
                  className="mt-4 bg-teal-600 text-white w-full py-2 rounded-lg hover:bg-teal-700 transition-all"
                >
                  Book Now
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {selectedHotel && (
        <BookingModal hotel={selectedHotel} onClose={() => setSelectedHotel(null)} />
      )}
    </div>
  );
}

