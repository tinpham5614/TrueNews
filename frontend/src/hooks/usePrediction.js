// src/hooks/usePrediction.js
import { useState } from "react";
import api from "../api";
import getCSRFToken from "../utils/getCSRFToken"; // Assuming getCSRFToken is in utils

const usePrediction = () => {
  const [team1, setTeam1] = useState("");
  const [team2, setTeam2] = useState("");
  const [prediction, setPrediction] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    // CSRF Token retrieval
    const csrfToken = getCSRFToken();
    e.preventDefault();
    setLoading(true);
    setError(null);

    let isMounted = true;
    try {
      const response = await api.post(
        "/predict/",
        {
          team_1: team1,
          team_2: team2,
        },
        {
          headers: {
            "X-CSRFToken": csrfToken,
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      if (isMounted && response.data.prediction) {
        setPrediction(response.data.prediction);
      }
      setLoading(false);
    } catch (err) {
      setError("Failed to fetch prediction.");
    } finally {
      setLoading(false);
    }
    isMounted = false;
  };

  return {
    team1,
    team2,
    setTeam1,
    setTeam2,
    prediction,
    error,
    loading,
    handleSubmit,
  };
};

export default usePrediction;
