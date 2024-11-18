import React from "react";
import { useGetNews } from "../hooks/useGetNews";
import { ThreeDots } from "react-loader-spinner";
import ArticleCard from "./ArticleCard";

function Articles() {
  const { articles, fetchNewArticles, totalResults, loading, error } = useGetNews();

  const handleFetchNewArticles = () => {
    fetchNewArticles();
  }

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
          Get New Articles
        </button>
      </div>
      {loading ? (
        <div className="flex justify-center items-center">
          <ThreeDots color="#00BFFF" height={80} width={80} />
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
          {articles.map((article, index) => (
            <ArticleCard key={index} article={article} />
          ))}
        </div>
      )}
      {error && <p>{error}</p>}
    </div>
  );
}

export default Articles;
