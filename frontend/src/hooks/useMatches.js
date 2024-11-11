import { useEffect, useState } from "react";
import api from "../api";

export const useMatches = () => {
  const [matches, setMatches] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch matches using async/await
  useEffect(() => {
    let isMounted = true;
    const fetchMatches = async () => {
      try {
        const response = await api.get("/matches/");
        if (isMounted && response.data) {
          setMatches(response.data);
        }
        setLoading(false);
      } catch (err) {
        setError("Failed to fetch matches.");
        setLoading(false);
      }
    };

    fetchMatches();
    return () => {
      isMounted = false;
    };
  }, []);
  return {
    matches,
    loading,
    error,
  };
};
