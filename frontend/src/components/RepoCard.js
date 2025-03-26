import React from "react";

const RepoCard = ({ repo }) => {
  return (
    <div className="bg-white shadow-md rounded-lg p-5 mb-5 border border-gray-200">
      <a href={repo.html_url} target="_blank" rel="noopener noreferrer" className="text-xl font-semibold text-blue-600 hover:underline">
        {repo.full_name}
      </a>
      <p className="text-gray-600 mt-2">{repo.description}</p>
      <div className="flex items-center text-gray-500 mt-3">
        <span className="mr-3">⭐ {repo.stargazers_count}</span>
        <span className="mr-3">🍴 {repo.forks_count}</span>
        <span>⏳ {new Date().toLocaleDateString()}</span>
      </div>
    </div>
  );
};

export default RepoCard;
