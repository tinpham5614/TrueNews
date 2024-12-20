import api from "./api"; // Axios instance, which we’ll set up in the next section

export const loginUser = async (username, password) => {
  try {
    const response = await api.post("/token/", { username, password });

    // Check if tokens are in the response
    if (response.data.access && response.data.refresh) {
      sessionStorage.setItem("access_token", response.data.access);
      sessionStorage.setItem("refresh_token", response.data.refresh);
      return true; // Login success
    }
  } catch (error) {
    console.error("Login failed", error);
    return false; // Login failed
  }
};

export const registerUser = async (payload) => {
  try {
    const response = await api.post("register/", payload);
    const registered = response.status === 201;
    return registered; // Registration success   
  } catch (error) {
    console.error("Registration failed", error);
    return false; // Registration failed
  }
};

export const logoutUser = () => {
  sessionStorage.removeItem("access_token");
  sessionStorage.removeItem("refresh_token");
  // Optionally, clear user-related data from your app’s state
  window.location.href = "/"; // Redirect to login page
};
