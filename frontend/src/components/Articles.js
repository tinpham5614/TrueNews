import React from "react";
import { useGetArticles } from "../hooks/useGetArticles";
import { ThreeDots } from "react-loader-spinner";
import ArticleCard from "./ArticleCard";
import {TbRefreshDot} from "react-icons/tb";

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
    <div>
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
          <TbRefreshDot />
        </button>
      </div>
      {loading ? (
        <div className="flex justify-center items-center">
          <ThreeDots color="#00BFFF" height={80} width={80} />
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
