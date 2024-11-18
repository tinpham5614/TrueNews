import React from "react";

function ArticleCard({ article }) {
  return (
    <div className="max-w-sm rounded overflow-hidden shadow-lg m-4 flex flex-col">
      <a
        href={article.url}
        target="_blank"
        rel="noreferrer"
        className="flex flex-col h-full"
      >
        <img className="w-full h-48 object-cover" src={article.urlToImage} alt={article.title} />
        <div className="px-6 py-4 flex-grow">
          <div className="font-bold text-lg">{article.title}</div>
          {article.author && (
            <div className="text-sm text-gray-700 mb-2">
              <span className="italic">By {article.author}</span>
            </div>
          )}
          <p className="text-gray-700 text-base max-h-24 overflow-hidden">
            {article.description}
          </p>
          <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mt-2">
            {article.source}
          </span>
        </div>
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
      </a>
    </div>
  );
}

export default ArticleCard;
