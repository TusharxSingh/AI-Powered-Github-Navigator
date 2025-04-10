import React, { useEffect, useState } from "react";
import { FaStar, FaCodeBranch, FaGithub } from "react-icons/fa";
import { FiSearch } from "react-icons/fi";
import "bootstrap/dist/css/bootstrap.min.css";

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

  const filteredRepos = repos.filter((repo) =>
    repo.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="container mt-5">
      {/* Header */}
      <h1 className="merich-heading custom-heading text-center display-4 mb-4">
        <FaGithub className="me-2" />
        My GitHub Navigator
      </h1>

      {/* Search */}
      <div className="mb-5 text-center">
        <div className="input-group w-50 mx-auto">
          <span className="input-group-text">
            <FiSearch />
          </span>
          <input
            type="text"
            className="form-control"
            placeholder="Search Repos..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      {/* Loading/Error */}
      {isLoading ? (
        <div className="text-center text-muted">Loading repositories...</div>
      ) : error ? (
        <div className="alert alert-danger text-center">{error}</div>
      ) : (
        <div className="row g-4">
          {filteredRepos.map((repo, index) => (
            <div className="col-md-6" key={repo.id}>
              <div className="card h-100 shadow-sm">
                <div className="card-body">
                  {/* Repo Number */}
                  <h5 className="card-title text-secondary">#{index + 1}</h5>

                  {/* Avatar */}
                  <img
                    src={repo.owner.avatar_url}
                    alt="Owner"
                    className="rounded-circle border border-2 mb-3"
                    width="60"
                    height="60"
                  />

                  {/* Repo Name */}
                  <h4 className="card-title">{repo.name}</h4>

                  {/* Description */}
                  <p className="card-text">
                    {repo.description || "No description available"}
                  </p>

                  {/* Stars & Forks */}
                  <div className="d-flex justify-content-between mb-3">
                    <span className="text-warning">
                      <FaStar /> {repo.stargazers_count}
                    </span>
                    <span className="text-success">
                      <FaCodeBranch /> {repo.forks_count}
                    </span>
                  </div>

                  {/* Language & Link */}
                  <div className="d-flex justify-content-between align-items-center">
                    {repo.language && (
                      <span className="badge bg-secondary">{repo.language}</span>
                    )}
                    <a
                      href={repo.html_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn btn-outline-primary btn-sm"
                    >
                      View Repository
                    </a>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default App;
