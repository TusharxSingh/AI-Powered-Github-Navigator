import React, { useEffect, useState } from "react";
import axios from "axios";

const RepoList = () => {
  const [repos, setRepos] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios
      .get("http://127.0.0.1:8000/api/repos/?language=python")
      .then((response) => setRepos(response.data))
      .catch((error) => setError(error.message));
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-5">
      <h1 className="text-4xl font-bold text-center text-blue-600 mb-6">
        
      </h1>

      {error && <p className="text-red-500 text-center">{error}</p>}

      <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {repos.map((repo) => (
          <div
            key={repo.id}
            className="bg-white shadow-md rounded-lg p-4 border border-gray-200 hover:shadow-lg transition"
          >
            <h2 className="text-xl font-semibold text-gray-900">
              <a href={repo.html_url} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">
                {repo.full_name}
              </a>
            </h2>
            <p className="text-gray-600 mt-2">{repo.description || "No description available."}</p>
            <div className="flex items-center justify-between mt-3 text-sm text-gray-500">
              <span>⭐ {repo.stargazers_count}</span>
              <span>🍴 {repo.forks_count}</span>
              <span>🕒 {new Date(repo.updated_at).toLocaleDateString()}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RepoList;
