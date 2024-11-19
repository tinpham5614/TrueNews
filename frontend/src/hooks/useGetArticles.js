import { useEffect, useState } from "react";
import api from "../api";

export const useGetArticles = () => {
  const [articles, setArticles] = useState([]);
  const [totalResults, setTotalResults] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${sessionStorage.getItem("access_token")}`,
  };
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
      setError("Failed to fetch articles.", err);
      console.error("Failed to fetch articles.", err);
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
      const article = articles.find((article) => article.id === articleId);
      if (!article) {
        setError("Article not found.");
        return;
      }

      if (article.userInteraction === "like") {
        await api.post(`undo_like/${articleId}/`, {
          headers: headers,
        });

        article.likeCount -= 1;
        article.userInteraction = null;
      } else {
        if (article.userInteraction === "dislike") {
          await api.post(`undo_dislike/${articleId}/`, {
            headers: headers,
          });
          article.dislikeCount -= 1;
        }
        await api.post(`increment_like/${articleId}/`, {
          headers: headers,
        });
        article.likeCount += 1;
        article.userInteraction = "like";
      }

      setArticles([...articles]);
    } catch (err) {
      setError("Failed to like the article.");
      setLoading(false);
    }
  };

  const handleDislike = async (articleId) => {
    try {
      if (!articleId) {
        setError("Article ID is required.");
        return;
      }
      const article = articles.find((article) => article.id === articleId);
      if (!article) {
        setError("Article not found.");
        return;
      }

      if (article.userInteraction === "dislike") {
        await api.post(`undo_dislike/${articleId}/`, {
          headers: headers,
        });

        article.dislikeCount -= 1;
        article.userInteraction = null;
      } else {
        if (article.userInteraction === "like") {
          await api.post(`undo_like/${articleId}/`, {
            headers: headers,
          });
          article.likeCount -= 1;
        }
        await api.post(`increment_dislike/${articleId}/`, {
          headers: headers,
        });
        article.dislikeCount += 1;
        article.userInteraction = "dislike";
      }

      setArticles([...articles]);
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
