import React, { useEffect, useState } from "react";
import axios from "axios";
import RepoCard from "./RepoCard";

const RepoList = () => {
  const [repos, setRepos] = useState([]);
  const [language, setLanguage] = useState("python");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchRepos = async (lang) => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get(
        `http://127.0.0.1:8000/api/repos/?language=${lang}`
      );
      setRepos(response.data);
    } catch (error) {
      setError("Oops! Could not fetch repositories.");
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchRepos(language); // Fetch initial popular repos
  }, []);

  const handleSearch = () => {
    if (language.trim() !== "") {
      fetchRepos(language);
    }
  };

  const handleRefresh = () => {
    fetchRepos(language); // Random page each time!
  };

  return (
    <div className="min-h-screen bg-gray-100 p-5">
      <h1 className="text-4xl font-bold text-center text-blue-600 mb-6">
        🔍 GitHub Repository Explorer
      </h1>

      <div className="max-w-xl mx-auto mb-6 flex items-center space-x-2">
        <input
          type="text"
          placeholder="Search topic or language e.g. react, machine learning"
          value={language}
          onChange={(e) => setLanguage(e.target.value)}
          className="flex-1 px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <button
          onClick={handleSearch}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          Search
        </button>
        <button
          onClick={handleRefresh}
          className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
        >
          Refresh
        </button>
      </div>

      {error && <p className="text-red-500 text-center">{error}</p>}

      {loading ? (
        <p className="text-center text-gray-500">Loading...</p>
      ) : (
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {repos.map((repo) => (
            <RepoCard key={repo.id} repo={repo} />
          ))}
        </div>
      )}
    </div>
  );
};

export default RepoList;
