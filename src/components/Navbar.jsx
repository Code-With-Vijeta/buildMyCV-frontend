import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

export default function Navbar() {
  const { user, logout } = useContext(AuthContext);
  const nav = useNavigate();

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Link to="/" className="text-2xl font-bold text-indigo-600">BuildMyCV</Link>
          <Link to="/editor" className="text-gray-600 hover:text-indigo-600 transition">Editor</Link>
        </div>
        <div>
          {!user ? (
            <>
              <Link to="/login" className="text-sm mr-4 hover:text-indigo-600 transition">Login</Link>
              <Link to="/signup" className="text-sm hover:text-indigo-600 transition">Signup</Link>
            </>
          ) : (
            <div className="flex items-center space-x-3">
              <span className="text-sm">Hi, {user.name}</span>
              <button
                className="text-sm bg-indigo-600 text-white px-3 py-1 rounded hover:bg-indigo-700 transition"
                onClick={() => { logout(); nav("/"); }}
              >
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}
