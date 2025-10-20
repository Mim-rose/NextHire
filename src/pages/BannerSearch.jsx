import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const BannerSearch = () => {
  const [companies, setCompanies] = useState([]);
  const [locations, setLocations] = useState([]);

  const [company, setCompany] = useState("");
  const [location, setLocation] = useState("");
  const [keyword, setKeyword] = useState("");

  const navigate = useNavigate();

  // Fetch companies
  useEffect(() => {
    fetch('http://localhost:3000/api/companies')
      .then(res => res.json())
      .then(data => {
        setCompanies(data);
      })
      .catch(console.error);
  }, []);

  // Fetch locations
  useEffect(() => {
    fetch('http://localhost:3000/api/locations')
      .then(res => res.json())
      .then(data => {
        setLocations(data);
      })
      .catch(console.error);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Combine all non-empty fields into a single query string
    const queryParts = [company, location, keyword.trim()].filter(Boolean);
    const query = queryParts.join(" ");
    navigate(`/search?q=${encodeURIComponent(query)}`);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className=" relative flex flex-col md:flex-row max-w-2xl shadow-lg rounded-md bg-white overflow-hidden"
      role="search"
    >
      {/* Company dropdown */}
      <select
        value={company}
        onChange={(e) => setCompany(e.target.value)}
        className="px-4 py-3 border-r border-gray-200 focus:outline-none focus:ring-1 focus:ring-indigo-500 appearance-none text-gray-700 z-10"
        aria-label="Select company"
      >
        <option value="">All Companies</option>
        {companies.map((comp) => (
          <option key={comp.name} value={comp.name}>
            {comp.name}
          </option>
        ))}
      </select>

      {/* Location dropdown */}
      <select
        value={location}
        onChange={(e) => setLocation(e.target.value)}
        className="px-4 py-3 border-r border-gray-200 focus:outline-none focus:ring-1 focus:ring-indigo-500 appearance-none text-gray-700"
        aria-label="Select location"
      >
        <option value="">All Locations</option>
        {locations.map((loc) => (
          <option key={loc} value={loc}>
            {loc}
          </option>
        ))}
      </select>

      {/* Keyword input */}
      <input
        type="search"
        value={keyword}
        onChange={(e) => setKeyword(e.target.value)}
        placeholder="Your keyword..."
        className="flex-grow px-4 py-3 focus:outline-none focus:ring-1 focus:ring-indigo-500"
        aria-label="Enter keywords"
      />

      {/* Search button */}
      <button
        type="submit"
        className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-3 font-semibold transition"
        aria-label="Search jobs"
      >
        Search
      </button>
    </form>
  );
};

export default BannerSearch;