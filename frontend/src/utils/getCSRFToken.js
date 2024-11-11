import api from "../api";
import { getCookie } from "./getCookie";

// Fetch CSRF token when the app loads
const getCSRFToken = async () => {
  const csrfToken = getCookie("csrftoken");
  if (!csrfToken) {
    try {
      const response = await api.get("/csrf/", {
        withCredentials: true,
      });
      console.log("CSRF cookie set:", response.data.detail);
    } catch (error) {
      console.error("Failed to set CSRF cookie:", error);
    }
  }
  return getCookie("csrftoken"); // Return the CSRF token from the cookie
};

// Call this function when your app initializes
export default getCSRFToken;
