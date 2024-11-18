import { useEffect, useState } from "react";
import api from "../api";

export const useGetNews = () => {
  const [articles, setArticles] = useState([]);
  const [totalResults, setTotalResults] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  // Fetch articles using async/await
  useEffect(() => {
    fetchArticles();
    return () => {};
  }, []);

  const fetchArticles = async () => {
    try {
      const response = await api.get("get_news/");
      const { articles, totalResults } = response.data;
      setArticles(articles);
      setTotalResults(totalResults);
      setLoading(false);
    } catch (err) {
      setError("Failed to fetch articles.");
      setLoading(false);
    }
  };

  const fetchNewArticles = async () => {
    try {
      setLoading(true);
      await api.post("fetch_and_save_news/");
      fetchArticles(); // Refresh the articles from the database
    } catch (err) {
      setError("Failed to fetch new articles.");
      setLoading(false);
    }
  };

  return {
    articles,
    fetchNewArticles,
    totalResults,
    loading,
    error,
  };
};
