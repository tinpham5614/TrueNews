// App.js
import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Profile from "./pages/Profile";
import PrivateRoute from "./components/PrivateRoute";
import AccountSettings from "./pages/AccountSettings";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleDropdown = () => setIsDropdownOpen((prev) => !prev);
  // Check if the user is authenticated when the component mounts
  useEffect(() => {
    const token = sessionStorage.getItem("access_token");
    setIsAuthenticated(!!token); // Set to true if token exists
  }, []);
  return (
    <Router>
      <nav className="bg-gray-800 p-4 text-white flex justify-between">
        <ul className="flex space-x-6">
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/about">About</Link>
          </li>
        </ul>
        <div className="relative">
          {!isAuthenticated ? (
            <div className="flex space-x-4">
              <Link to="/login">Login</Link>
              <Link to="/register">Register</Link>
            </div>
          ) : (
            <button
              onClick={toggleDropdown}
              className="focus:outline-none text-white"
            >
              Account
            </button>
          )}
          {isDropdownOpen && (
            <ul className="absolute right-0 mt-2 bg-white text-black shadow-lg rounded p-2">
              <li>
                <Link to="/profile" className="block px-4 py-2">
                  Profile
                </Link>
              </li>
              <li>
                <Link to="/settings" className="block px-4 py-2">
                  Account Settings
                </Link>
              </li>
              <li>
                <button
                  onClick={() => {
                    sessionStorage.removeItem("access_token");
                    window.location.href = "/login";
                  }}
                  className="block w-full text-left px-4 py-2"
                >
                  Logout
                </button>
              </li>
            </ul>
          )}
        </div>
      </nav>
      <div className="container mx-auto p-4">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route
            path="/profile"
            element={
              <PrivateRoute>
                <Profile />
              </PrivateRoute>
            }
          />
          <Route path="/settings" element={<AccountSettings />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
