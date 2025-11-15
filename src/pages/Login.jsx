import React, { useState, useContext } from "react";
import api from "../api/axios";
import { AuthContext } from "../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";
import { FaUserLock } from "react-icons/fa";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();
  const [err, setErr] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErr("");
    try {
      const res = await api.post("/api/auth/login", { email, password });
      login(res.data.user, res.data.token);
      navigate("/editor");
    } catch (error) {
      setErr(error?.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      {/* Left Side - Branding */}
      <div className="hidden md:flex w-1/2 bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 items-center justify-center relative overflow-hidden">
        <div className="text-center text-white z-10">
          <h1 className="text-5xl font-extrabold mb-4 drop-shadow-lg">
            Resume <span className="text-yellow-300">Builder</span>
          </h1>
          <p className="text-lg opacity-90">
            Craft your professional resume in minutes with our modern editor ✨
          </p>
        </div>
        {/* Decorative bubbles */}
        <div className="absolute w-72 h-72 bg-pink-400 rounded-full mix-blend-multiply filter blur-2xl opacity-30 animate-blob -top-16 -left-16"></div>
        <div className="absolute w-72 h-72 bg-yellow-400 rounded-full mix-blend-multiply filter blur-2xl opacity-30 animate-blob animation-delay-2000 top-1/3 -right-16"></div>
        <div className="absolute w-72 h-72 bg-green-400 rounded-full mix-blend-multiply filter blur-2xl opacity-30 animate-blob animation-delay-4000 bottom-10 left-1/3"></div>
      </div>

      {/* Right Side - Form */}
      <div className="flex w-full md:w-1/2 justify-center items-center bg-gray-50 p-6">
        <div className="w-full max-w-md bg-white/80 backdrop-blur-lg shadow-2xl rounded-2xl p-8">
          <div className="flex flex-col items-center mb-6">
            <FaUserLock className="text-4xl text-blue-600 mb-2" />
            <h2 className="text-2xl font-bold text-gray-800">Welcome Back</h2>
            <p className="text-gray-500 text-sm">
              Login to continue building your resume
            </p>
          </div>
          {err && (
            <div className="bg-red-100 text-red-600 px-3 py-2 mb-3 rounded-md text-sm">
              {err}
            </div>
          )}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <input
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 outline-none transition"
                placeholder="Email Address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                type="email"
                required
              />
            </div>
            <div>
              <input
                type="password"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 outline-none transition"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg shadow-md transition">
              Login
            </button>
          </form>

          <div className="mt-6 text-center text-sm text-gray-600">
            Don’t have an account?{" "}
            <Link
              to="/signup"
              className="text-blue-600 hover:underline font-medium"
            >
              Sign Up
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
