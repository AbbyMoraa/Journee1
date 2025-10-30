import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const destinationsList = [
  { name: "Santorini", location: "Greece", type: "beach" },
  { name: "Bali", location: "Indonesia", type: "beach" },
  { name: "Maldives", location: "Maldives", type: "beach" },
  { name: "Maui", location: "Hawaii", type: "beach" },
  { name: "Tokyo", location: "Japan", type: "city" },
  { name: "Barcelona", location: "Spain", type: "city" },
  { name: "Lisbon", location: "Portugal", type: "city" },
  { name: "Swiss Alps", location: "Switzerland", type: "snow" },
  { name: "Iceland", location: "Iceland", type: "snow" },
  { name: "Serengeti", location: "Tanzania", type: "safari" },
  { name: "Dubai Desert", location: "UAE", type: "desert" },
  { name: "Amazon Rainforest", location: "Brazil", type: "forest" },
];

const typeQueries = {
  beach: "tropical beach ocean",
  city: "modern city skyline night lights",
  snow: "snow mountain alps winter landscape",
  safari: "african safari animals nature",
  desert: "sand dunes desert sunset",
  forest: "rainforest jungle trees nature sunlight",
};

const fallbackImages = {
  safari:
    "https://images.pexels.com/photos/259447/pexels-photo-259447.jpeg?auto=compress&cs=tinysrgb&w=1200",
  desert:
    "https://images.pexels.com/photos/248797/pexels-photo-248797.jpeg?auto=compress&cs=tinysrgb&w=1200",
  forest:
    "https://images.pexels.com/photos/145939/pexels-photo-145939.jpeg?auto=compress&cs=tinysrgb&w=1200",
  beach:
    "https://images.pexels.com/photos/457882/pexels-photo-457882.jpeg?auto=compress&cs=tinysrgb&w=1200",
  city:
    "https://images.pexels.com/photos/3586966/pexels-photo-3586966.jpeg?auto=compress&cs=tinysrgb&w=1200",
  snow:
    "https://images.pexels.com/photos/547115/pexels-photo-547115.jpeg?auto=compress&cs=tinysrgb&w=1200",
};

export default function Destinations() {
  const navigate = useNavigate();
  const [photosByType, setPhotosByType] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedType, setSelectedType] = useState("");

  useEffect(() => {
    const fetchPhotosByType = async () => {
      try {
        const allPhotos = {};
        for (let [type, query] of Object.entries(typeQueries)) {
          const res = await fetch(
            `https://api.pexels.com/v1/search?query=${query}&per_page=12`,
            {
              headers: {
                Authorization:
                  "mPHVzxGhOKepAwnrg0MGa493MrUTosy8HI8QZvYaaYErK9nZRlPog0p6",
              },
            }
          );
          if (!res.ok) throw new Error(`Failed to fetch ${type} photos`);
          const data = await res.json();
          allPhotos[type] = data.photos;
        }
        setPhotosByType(allPhotos);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchPhotosByType();
  }, []);

  const filteredDestinations = selectedType
    ? destinationsList.filter((dest) => dest.type === selectedType)
    : destinationsList;

  if (loading)
    return <p className="p-8 text-center text-gray-500">Loading destinations...</p>;
  if (error)
    return <p className="p-8 text-center text-red-500">{error}</p>;

  return (
    <section className="pt-24 pb-12 px-6 bg-gradient-to-r from-[#F8E7C9] to-[#D1F0E1] min-h-screen">
      <div className="text-center mb-10">
        <h1 className="text-4xl font-extrabold text-teal-700 mb-2">
          Find Your Dream Destination
        </h1>
        <p className="text-gray-500">
          Choose your vibe — from beaches to cities, safaris, and snowy peaks.
        </p>
      </div>

      <div className="mb-8 flex justify-center">
        <select
          value={selectedType}
          onChange={(e) => setSelectedType(e.target.value)}
          className="border border-gray-300 bg-white text-gray-700 shadow-sm rounded-xl px-5 py-3 focus:ring-2 focus:ring-teal-400 focus:outline-none transition-all"
        >
          <option value="">All Trips</option>
          <option value="beach">Beach Trips</option>
          <option value="city">City Trips</option>
          <option value="snow">Snow Trips</option>
          <option value="safari">Safari Trips</option>
          <option value="desert">Desert Trips</option>
          <option value="forest">Forest Trips</option>
        </select>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredDestinations.map((dest, index) => {
          const photos = photosByType[dest.type];
          const randomPhoto =
            photos && photos.length > 0
              ? photos[Math.floor(Math.random() * photos.length)]
              : { src: { large: fallbackImages[dest.type] } };

          return (
            <div
              key={index}
              onClick={() => navigate(`/hotels/${dest.name}`)}
              className="bg-white rounded-2xl shadow-lg overflow-hidden cursor-pointer hover:scale-[1.03] transition-transform hover:shadow-2xl duration-300"
            >
              <img
                src={randomPhoto.src.large}
                alt={dest.name}
                className="w-full h-60 object-cover"
                loading="lazy"
              />
              <div className="p-4">
                <h3 className="font-bold text-lg text-teal-700">{dest.name}</h3>
                <p className="text-gray-500 text-sm">{dest.location}</p>
                <p className="text-gray-400 text-xs mt-1">Photo by Pexels</p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}


