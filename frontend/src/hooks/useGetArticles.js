import { useEffect, useState } from "react";
import api from "../api";

export const useGetArticles = () => {
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
      const response = await api.get("get_articles/");
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
      await api.post("fetch_and_save_articles/");
      fetchArticles(); // Refresh the articles from the database
    } catch (err) {
      setError("Failed to fetch new articles.");
      setLoading(false);
    }
  };

  const handleLike = async (articleId) => {
    try {
      if (!articleId) {
        setError("Article ID is required.");
        return;
      }
      await api.post(`increment_like_count/${articleId}/`);
    } catch (err) {
      setError("Failed to like the article.");
      setLoading(false);
    }
  };

  const handleDislike = async (articleId) => {
    if (!articleId) {
      setError("Article ID is required.");
      return;
    }
    try {
      await api.post(`increment_dislike_count/${articleId}/`);
    } catch (err) {
      setError("Failed to dislike the article.");
      setLoading(false);
    }
  };

  return {
    articles,
    fetchNewArticles,
    handleLike,
    handleDislike,
    totalResults,
    loading,
    error,
  };
};
