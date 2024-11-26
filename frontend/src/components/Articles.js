import React from "react";
import { useGetArticles } from "../hooks/useGetArticles";
import { ThreeDots } from "react-loader-spinner";
import ArticleCard from "./ArticleCard";
import { IoMdRefresh } from "react-icons/io";

function Articles() {
  const {
    articles,
    fetchNewArticles,
    handleLike,
    handleDislike,
    totalResults,
    loading,
    error,
  } = useGetArticles();

  const handleFetchNewArticles = () => {
    fetchNewArticles();
  };

  const handleLikeClick = (articleId) => {
    handleLike(articleId);
  };

  const handleDislikeClick = (articleId) => {
    handleDislike(articleId);
  };

  return (
    <div className="bg-gray-100 py-4 px-2">
      <div className="text-center">
        <p className="text-gray-600">
          {totalResults > 1
            ? `${totalResults} articles found`
            : `${totalResults} article found`}
        </p>
        <button
          onClick={handleFetchNewArticles}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-2"
        >
          <IoMdRefresh />
        </button>
      </div>
      {loading ? (
        <div className="flex justify-center items-center">
          <ThreeDots color="#007bff" height={50} width={50} />
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
          {articles.map((article, index) => {
            return (
              <ArticleCard
                key={index}
                article={article}
                onLike={() => handleLikeClick(article.id)}
                onDislike={() => handleDislikeClick(article.id)}
              />
            );
          })}
        </div>
      )}
      {error && <p>{error}</p>}
    </div>
  );
}

export default Articles;
