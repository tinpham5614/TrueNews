import React from "react";
import { FaThumbsUp, FaThumbsDown } from "react-icons/fa";
import { useNavigate } from "react-router-dom";


function ArticleCard({ article, onLike, onDislike }) {
  const isAuthenticated = !!sessionStorage.getItem("access_token");
  const navigate = useNavigate();

  const navigateToLogin = () => {
    navigate("/login");
  }

  return (
    <div className="max-w-sm rounded overflow-hidden shadow-lg m-4 flex flex-col">
      {/* Article content */}
      <a
        href={article.url}
        target="_blank"
        rel="noreferrer"
        className="flex flex-col h-full"
      >
        {/* Image */}
        <img
          className="w-full h-48 object-cover"
          src={article.urlToImage}
          alt={article.title}
        />
      </a>
      {/* Article details */}
      <div className="px-6 py-4 flex-grow">
        {/* Title */}
        <div className="font-bold text-lg">{article.title}</div>

        {/* Author */}
        {article.author && (
          <div className="text-sm text-gray-700 mb-2">
            <span className="italic">By {article.author}</span>
          </div>
        )}

        {/* Description */}
        <p className="text-gray-700 text-base max-h-24 overflow-hidden">
          {article.description}
        </p>

        {/* Source */}
        <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mt-2">
          {article.source}
        </span>
      </div>
      {/* Like and Display interactions */}
      {isAuthenticated ? (
        <div className="px-6 pt-4 pb-2 mt-auto ml-auto flex space-x-4">
          <button
            onClick={onLike}
            className={
              article.userInteraction === "like" ? "text-green-500" : ""
            }
          >
            <FaThumbsUp className="mr-1" /> {article.likeCount}
          </button>
          <button
            onClick={onDislike}
            className={
              article.userInteraction === "dislike" ? "text-red-500" : ""
            }
          >
            <FaThumbsDown className="mr-1" /> {article.dislikeCount}
          </button>
        </div>
      ) : (
        <div className="px-6 pt-4 pb-2 mt-auto ml-auto flex space-x-4">
          <button
            className="text-gray-500 cursor-not-allowed"
            onClick={navigateToLogin}
          >
            <FaThumbsUp className="mr-1" /> {article.likeCount}
          </button>
          <button
            className="text-gray-500 cursor-not-allowed"
            onClick={navigateToLogin}
          >
            <FaThumbsDown className="mr-1" /> {article.dislikeCount}
          </button>
        </div>
      )}

      {/* Published date and Read more */}
      <div className="flex flex-row">
        <div className="px-6 pt-4 pb-2">
          {article.publishedAt && (
            <span className="text-gray-700 text-sm">
              {new Date(article.publishedAt).toDateString()}
            </span>
          )}
        </div>
        <div className="px-6 pt-4 pb-2 ml-auto mt-auto">
          <a
            href={article.url}
            target="_blank"
            rel="noreferrer"
            className="flex flex-col h-full"
          >
            <span className="text-blue-500 hover:text-blue-700 hover:underline">
              Read more
            </span>
          </a>
        </div>
      </div>
    </div>
  );
}

export default ArticleCard;
