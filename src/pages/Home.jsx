import { Link } from "react-router-dom";

export default function Home() {
  return (
    <main className="relative w-full bg-cover bg-center flex flex-col justify-center items-center text-center"
      style={{
        backgroundImage:
          "url('https://images.pexels.com/photos/1450353/pexels-photo-1450353.jpeg?_gl=1*vixuyz*_ga*MTQ0Mzk4OTAxNC4xNzU5MDYzNTA1*_ga_8JE65Q40S6*czE3NjE0OTY2MjckbzckZzEkdDE3NjE0OTgxMTYkajU2JGwwJGgw')",
      }}
    >
      <div className="absolute inset-0 bg-black/40"></div>

      <div className="relative z-10 flex flex-col justify-center items-center px-6 py-20 sm:py-32 md:py-40 min-h-screen">
        <h1 className="text-5xl md:text-6xl font-extrabold text-sky-100 mb-6 drop-shadow-lg">
          Roam the Earth with Journee
        </h1>
        <p className="text-white text-lg md:text-xl mb-8 drop-shadow-md max-w-xl">
          Discover breathtaking destinations, plan your next adventure, and make memories that last a lifetime.
        </p>

        <div className="flex flex-col sm:flex-row gap-4">
          <Link
            to="/destinations"
            className="bg-sky-200 text-amber-800 px-6 py-3 rounded-lg font-semibold hover:bg-blue-300 transition-colors"
          >
            Explore Destinations
          </Link>
        </div>
      </div>
    </main>
  );
}
