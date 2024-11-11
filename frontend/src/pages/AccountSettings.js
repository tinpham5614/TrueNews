// AccountSettings.js
import React, { useState } from "react";
import api from "../api"; // Import your Axios instance

const AccountSettings = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleUpdate = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setMessage("Passwords do not match");
      return;
    }

    try {
      // Example API request for updating account settings
      const response = await api.put("/user/account/", { email, password });

      if (response.status === 200) {
        setMessage("Account updated successfully");
      } else {
        setMessage("Failed to update account");
      }
    } catch (error) {
      console.error("Error updating account", error);
      setMessage("Error updating account");
    }
  };

  return (
    <div className="flex justify-center items-center">
      <div className="bg-white shadow-md rounded p-6 w-full max-w-md">
        <h2 className="text-2xl font-bold mb-4">Account Settings</h2>
        <form onSubmit={handleUpdate}>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="Enter new email"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              New Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="Enter new password"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Confirm New Password
            </label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="Confirm new password"
              required
            />
          </div>
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full"
          >
            Update Account
          </button>
        </form>
        {message && <p className="text-red-500 mt-4">{message}</p>}
      </div>
    </div>
  );
};

export default AccountSettings;
