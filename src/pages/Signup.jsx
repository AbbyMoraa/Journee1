import { useState } from "react";
import { auth } from "../firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";

export default function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      setMessage("Please fill in all fields");
      return;
    }

    try {
      await createUserWithEmailAndPassword(auth, email, password);
      setMessage("");
      navigate("/"); 
    } catch (error) {
      let msg = error.message;
      if (msg.includes("auth/email-already-in-use"))
        msg = "This email is already registered";
      if (msg.includes("auth/invalid-email")) msg = "Invalid email format";
      if (msg.includes("auth/weak-password")) msg = "Password should be at least 6 characters";
      setMessage(msg);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-[#F8E7C9] to-[#D1F0E1]">
      <div className="bg-white p-8 rounded-2xl shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center text-teal-700">Sign Up</h2>
        {message && (
          <p className="text-red-500 mb-4 text-center break-words">{message}</p>
        )}
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <button
            type="submit"
            className="bg-teal-700 text-white rounded-lg py-2 font-semibold hover:bg-teal-600 transition-colors"
          >
            Sign Up
          </button>
        </form>
        <p className="text-sm text-gray-500 mt-4 text-center">
          Already have an account?{" "}
          <span className="text-blue-500 cursor-pointer" onClick={() => navigate("/login")}>
            Login
          </span>
        </p>
      </div>
    </div>
  );
}
