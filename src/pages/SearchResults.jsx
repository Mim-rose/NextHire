// src/pages/SearchResults.jsx
import { useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import HotJobsCard from "./HotJobsCard";
import Fuse from "fuse.js"; // Optional fuzzy matching

const SearchResults = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get("q");
  const [jobs, setJobs] = useState([]);
  const [filteredJobs, setFilteredJobs] = useState([]);

  useEffect(() => {
    if (!query) return;

    fetch(`http://localhost:3000/api/search?q=${encodeURIComponent(query)}`)
      .then((res) => res.json())
      .then((data) => {
        setJobs(data);

        // Optional fuzzy matching
        const fuse = new Fuse(data, {
          keys: ["title", "company", "category", "location", "description"],
          threshold: 0.4,
        });

        const results = fuse.search(query);
        setFilteredJobs(results.length ? results.map(r => r.item) : data);
      })
      .catch((err) => console.error("Search failed:", err));
  }, [query]);

  return (
    <div className="px-4 py-6">
      <h2 className="text-xl font-bold mb-4">
        Search Results for: <span className="text-indigo-600">{query}</span>
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredJobs.map((job) => (
          <HotJobsCard key={job._id} job={job} />
        ))}
      </div>
    </div>
  );
};

export default SearchResults;