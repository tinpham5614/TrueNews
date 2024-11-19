import React from "react";

function ArticleCard({ article, onLike, onDislike }) {
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
      <div className="px-6 pt-4 pb-2 mt-auto flex space-x-4">
        <button
          onClick={onLike}
          className="text-green-500 hover:text-green-700"
        >
          👍 {article.likeCount}
        </button>
        <button onClick={onDislike} className="text-red-500 hover:text-red-700">
          👎 {article.dislikeCount}
        </button>
      </div>
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
          <span className="text-blue-500 hover:text-blue-700 hover:underline">
            Read more
          </span>
        </div>
      </div>
    </div>
  );
}

export default ArticleCard;
