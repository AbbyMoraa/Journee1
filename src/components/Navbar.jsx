import React, { useState } from "react";
import { Link } from "react-router-dom";
import { auth } from "../firebase";

export default function Navbar({ user }) {
  const [isOpen, setIsOpen] = useState(false);

  const handleLogout = async () => {
    await auth.signOut();
    setIsOpen(false);
  };

  const links = [
    { name: "Home", path: "/" },
    { name: "Destinations", path: "/destinations" },
    { name: "About", path: "/about" },
  ];

  return (
    <nav className="fixed w-full top-0 left-0 z-50 bg-gradient-to-r from-[#F8E7C9] to-[#D1F0E1] shadow-md backdrop-blur-sm">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-10">
        <div className="flex justify-between h-16 items-center">
           <Link
            to="/"
            className="text-2xl font-bold text-amber-800 tracking-wide hover:text-teal-700 transition-colors"
          >
            JOURNEE
          </Link>

          <div className="hidden md:flex space-x-8 items-center">
            {links.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className="text-amber-900 hover:text-teal-700 transition-colors"
              >
                {link.name}
              </Link>
            ))}

            {user ? (
  <div className="flex items-center space-x-2">
     <div className="w-8 h-8 rounded-full bg-teal-600 text-white flex items-center justify-center font-semibold">
      {user.email[0].toUpperCase()}
    </div>
    <button
      onClick={handleLogout}
      className="text-amber-900 hover:text-teal-700 transition-colors"
    >
      Logout
    </button>
  </div>
) : (
  <Link
    to="/login"
    className="text-amber-900 hover:text-teal-700 transition-colors"
  >
    Login
  </Link>
)}

          </div>
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-amber-900 focus:outline-none"
            >
              <svg
                className="h-6 w-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                {isOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

       {isOpen && (
        <div className="md:hidden bg-gradient-to-r from-[#F8E7C9] to-[#D1F0E1] px-6 py-3 space-y-3 shadow-inner">
          {links.map((link) => (
            <Link
              key={link.name}
              to={link.path}
              onClick={() => setIsOpen(false)}
              className="block text-amber-900 hover:text-teal-700 transition-colors"
            >
              {link.name}
            </Link>
          ))}

          {user ? (
            <div className="flex flex-col space-y-2">
              <span className="text-amber-900 font-medium">
                {user.email.split("@")[0]}
              </span>
              <button
                onClick={handleLogout}
                className="text-amber-900 hover:text-teal-700 transition-colors text-left"
              >
                Logout
              </button>
            </div>
          ) : (
            <Link
              to="/login"
              onClick={() => setIsOpen(false)}
              className="text-amber-900 hover:text-teal-700 transition-colors block"
            >
              Login
            </Link>
          )}
        </div>
      )}
    </nav>
  );
}

