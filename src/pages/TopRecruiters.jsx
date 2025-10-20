import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom"; // ✅ Add this

const TopRecruiters = ({ showAll = false }) => {
  const [companies, setCompanies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCompanies = async () => {
      try {
        const endpoint = showAll
          ? "http://localhost:3000/api/companies/all"
          : "http://localhost:3000/api/companies";

        const res = await fetch(endpoint);

        if (!res.ok) {
          throw new Error("Network response was not ok");
        }

        const data = await res.json();

        if (Array.isArray(data)) {
          setCompanies(data);
        } else {
          throw new Error("Unexpected response format");
        }
      } catch (err) {
        console.error("Failed to fetch companies:", err);
        setError("Unable to load recruiters at the moment.");
      } finally {
        setLoading(false);
      }
    };

    fetchCompanies();
  }, [showAll]);

  if (loading) {
    return (
      <section className="py-14 px-4 bg-white text-center">
        <p className="text-gray-500 text-lg">Loading top recruiters...</p>
      </section>
    );
  }

  if (error) {
    return (
      <section className="py-14 px-4 bg-white text-center">
        <p className="text-red-500 text-lg">{error}</p>
      </section>
    );
  }

  const visibleCompanies = showAll ? companies : companies.slice(0, 16);

  return (
    <section className="py-14 px-4 bg-white">
      <div className="text-center mb-10">
        <h2 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-indigo-600 mb-2">
          {showAll ? "All Companies" : "Top Recruiters"}
        </h2>
        <p className="text-gray-600 text-lg">
          Discover your next career move, freelance gig, or internship.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
        {visibleCompanies.map((company) => (
          <Link
            to={`/companies/${encodeURIComponent(company.name)}`} // ✅ Make it clickable
            key={company.name}
            className="bg-gray-50 rounded-xl p-6 shadow hover:shadow-lg transition duration-300 block"
          >
            <img
              src={company.logo || "/default-logo.png"}
              alt={`${company.name} logo`}
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = "/default-logo.png";
              }}
              className="h-12 w-12 object-contain mb-4 mx-auto"
            />
            <h3 className="text-lg font-semibold text-center text-gray-800 mb-1">
              {company.name}
            </h3>
            <div className="flex justify-center items-center text-yellow-500 mb-2">
              {[...Array(5)].map((_, idx) => (
                <span
                  key={idx}
                  className={
                    idx < Math.round(company.rating)
                      ? "text-yellow-500"
                      : "text-gray-300"
                  }
                >
                  ★
                </span>
              ))}
              <span className="ml-2 text-sm text-gray-600">
                ({company.reviews} reviews)
              </span>
            </div>
            <p className="text-sm text-center text-gray-500 mb-1">
              {company.location}
            </p>
            <p className="text-sm text-center text-indigo-600 font-medium">
              {company.jobCount} job opening{company.jobCount > 1 ? "s" : ""}
            </p>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default TopRecruiters;