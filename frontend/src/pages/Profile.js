// Profile.js
import React, { useEffect, useState } from "react";
import { logoutUser } from "../Authentication";
import api from "../api";

const Profile = () => {
  const [userData, setUserData] = useState(null);

  // Fetch user data when the component mounts
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await api.get("/user/profile/"); // Adjust the endpoint as needed
        setUserData(response.data);
      } catch (error) {
        console.error("Failed to fetch user data", error);
      }
    };
    fetchUserData();
  }, []);

  return (
    <div className="flex justify-center items-center">
      <div className="bg-white shadow-md rounded p-6 w-full max-w-md">
        <h2 className="text-2xl font-bold mb-4">Profile</h2>
        {userData ? (
          <div>
            <p>
              <strong>Username:</strong> {userData.username}
            </p>
            <p>
              <strong>Email:</strong> {userData.email}
            </p>
            {/* Add more fields as needed */}
          </div>
        ) : (
          <p>Loading...</p>
        )}
        <button
          onClick={logoutUser}
          className="mt-4 bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default Profile;
