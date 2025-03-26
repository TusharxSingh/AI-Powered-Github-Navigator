import React, { useEffect, useState } from "react";
import { FaStar, FaCodeBranch, FaGithub } from "react-icons/fa"; 
import { FiSearch } from "react-icons/fi"; 

// Function to get alternating vibrant colors
const getCardColors = (index) => {
    const colors = [
        "bg-blue-500", 
        "bg-red-500",
        "bg-green-500",
        "bg-purple-500",
        "bg-yellow-500"
    ];
    return colors[index % colors.length]; // Cycle through colors
};

// Loading Skeleton Component
const LoadingSkeleton = () => {
  return (
    <div className="flex justify-center items-center min-h-screen">
      <p className="text-gray-700 text-lg animate-pulse">Loading repositories...</p>
    </div>
  );
};

const App = () => {
  const [repos, setRepos] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    fetch("http://127.0.0.1:8001/api/repos/")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        setRepos(data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setError(error.message);
        setIsLoading(false);
      });
  }, []);

  // Filter repositories based on search
  const filteredRepos = repos.filter(repo =>
    repo.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-300 p-4 md:p-8">
      <div className="max-w-5xl mx-auto">
        
        {/* Header with GitHub Icon */}
        <h1 className="text-4xl md:text-6xl font-extrabold text-center flex items-center justify-center gap-3 text-gray-800 mb-8">
          <FaGithub /> My GitHub Navigator
        </h1>

        {/* Search Bar */}
        <div className="flex items-center justify-center mb-10">
          <div className="relative">
            <FiSearch className="absolute left-3 top-3 text-gray-500" />
            <input
              type="text"
              placeholder="Search Repos..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 pr-4 py-2 rounded-lg border border-gray-400 focus:outline-none focus:ring focus:ring-blue-300"
            />
          </div>
        </div>

        {isLoading ? (
          <LoadingSkeleton />
        ) : error ? (
          <p className="text-red-500 text-center">{error}</p>
        ) : (
          <div className="flex flex-col gap-8">
            {filteredRepos.map((repo, index) => {
              const cardColor = getCardColors(index); // Get alternating color
              return (
                <div
                  key={repo.id}
                  className={`p-6 border-2 border-gray-400 shadow-lg rounded-lg ${cardColor} text-white`}
                >
                  {/* Repo Number */}
                  <h3 className="text-lg font-bold mb-2">#{index + 1}</h3>

                  {/* Repo Owner Avatar */}
                  <img
                    src={repo.owner.avatar_url}
                    alt="Repo Owner"
                    className="w-16 h-16 rounded-full mb-4 border-4 border-white"
                  />

                  {/* Repo Name */}
                  <h2 className="text-2xl font-bold truncate">{repo.name}</h2>

                  {/* Repo Description */}
                  <p className="text-base opacity-90 mb-4">
                    {repo.description || "No description available"}
                  </p>

                  {/* Ratings (Stars) and Likes (Forks) */}
                  <div className="flex justify-between items-center mb-4">
                    <span className="flex items-center gap-1 text-yellow-300">
                      <FaStar /> {repo.stargazers_count}
                    </span>
                    <span className="flex items-center gap-1 text-green-300">
                      <FaCodeBranch /> {repo.forks_count}
                    </span>
                  </div>

                  {/* Language & View Repo Button */}
                  <div className="flex justify-between items-center">
                    {repo.language && (
                      <span className="px-3 py-1 rounded-full text-sm font-medium bg-white/30">
                        {repo.language}
                      </span>
                    )}
                    <a
                      href={repo.html_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-white/30 hover:bg-white/50 px-4 py-2 rounded-full transition-all duration-300 font-semibold text-sm"
                    >
                      View Repository
                    </a>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default App;
