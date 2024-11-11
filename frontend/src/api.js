import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8000/api/", // Replace with your backend URL
  headers: {
    "Content-Type": "application/json",
  },
});

// Interceptor to add Authorization header
api.interceptors.request.use(
  (config) => {
    const token = sessionStorage.getItem("access_token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Interceptor to handle expired tokens (401 errors)
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (
      error.response &&
      error.response.status === 401 &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true;
      const refreshToken = sessionStorage.getItem("refresh_token");

      if (refreshToken) {
        try {
          const response = await axios.post(
            "http://localhost:8000/api/token/refresh/",
            { refresh: refreshToken }
          );
          const newAccessToken = response.data.access;

          // Update tokens in local storage
          sessionStorage.setItem("access_token", newAccessToken);

          // Retry the original request with the new access token
          originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
          return api(originalRequest);
        } catch (refreshError) {
          console.error("Token refresh failed", refreshError);
          // Handle logout if refresh fails
          logoutUser();
        }
      }
    }
    return Promise.reject(error);
  }
);

export default api;

export const logoutUser = () => {
  sessionStorage.removeItem("access_token");
  sessionStorage.removeItem("refresh_token");
  // Optionally, clear user-related data from your app’s state
  window.location.href = "/login"; // Redirect to login page
};
