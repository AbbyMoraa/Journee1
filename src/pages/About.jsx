export default function About() {
  return (
    <div className="relative bg-gradient-to-r from-[#F8E7C9] to-[#D1F0E1] min-h-screen flex flex-col justify-center items-center px-6 py-20 text-center">
      <div className="relative z-10 max-w-3xl">
        <h1 className="text-4xl md:text-5xl font-bold text-teal-700 mb-6">
          About Journee
        </h1>
        <p className="text-gray-700 mb-6 leading-relaxed">
          Journee was created with a single vision — to make discovering the world simpler,
          smarter, and more inspiring. Whether you dream of unwinding on sunlit beaches,
          exploring vibrant cities, or hiking through snow-capped peaks, Journee helps
          you plan your perfect adventure with ease and confidence.
        </p>
        <p className="text-gray-700 mb-8 leading-relaxed">
          Our platform brings together handpicked destinations, breathtaking imagery, and
          intuitive booking tools — so every trip you take feels effortless, exciting, and
          uniquely yours.
        </p>

        <h2 className="text-2xl font-semibold text-teal-600 mb-3">
          Why Choose Journee?
        </h2>
        <ul className="text-gray-700 space-y-2 mb-10">
          <li> -Curated destinations from across the globe</li>
          <li> -Real-time visuals powered by the Pexels API</li>
          <li> -Simple, traveler-friendly experience</li>
          <li> -Built with passion for explorers everywhere</li>
        </ul>

        <h2 className="text-2xl font-semibold text-teal-600 mb-3">
          Contact Us
        </h2>
        <p className="text-gray-700 mb-2">
          Have questions, suggestions, or partnership ideas? We’d love to hear from you.
        </p>
        <p className="text-gray-700">
          📧 <span className="font-medium">Email:</span> support@journee.com
        </p>
        <p className="text-gray-700">
          📞 <span className="font-medium">Phone:</span> +254712345678
        </p>
        <p className="text-gray-700">
          📍 <span className="font-medium">Location:</span> 123 Wanderlust Ave, Travel City, Earth
        </p>
      </div>
    </div>
  );
}
