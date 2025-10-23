import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
const API_URL = import.meta.env.VITE_API_URL;

const BrowseCategories = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    fetch(`${API_URL}/api/categories`)
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data)) {
          setCategories(data);
        } else {
          console.error("⚠️ Unexpected category response:", data);
          setError(true);
        }
        setLoading(false);
      })
      .catch(err => {
        console.error("❌ Failed to fetch categories:", err);
        setError(true);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <p className="px-3 py-2 text-gray-500">Loading categories…</p>;
  }

  if (error || categories.length === 0) {
    return <p className="px-3 py-2 text-red-500">No categories available</p>;
  }

  return (
    <ul className="space-y-1">
      {categories.map((cat, i) => {
        const label = cat.charAt(0).toUpperCase() + cat.slice(1);
        return (
          <li key={i}>
            <Link
              to={`/jobs/category/${cat}`}
              className="block px-3 py-2 hover:bg-indigo-50 rounded-md hover:text-indigo-600 transition duration-150"
            >
              {label}
            </Link>
          </li>
        );
      })}
    </ul>
  );
};

export default BrowseCategories;