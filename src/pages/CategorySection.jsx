import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  FaBriefcase, FaPenNib, FaChartBar, FaPaintBrush, FaCode,
  FaBullhorn, FaProductHunt, FaBug, FaShieldAlt
} from "react-icons/fa";

const API_URL = import.meta.env.VITE_API_URL;

const iconMap = {
  "Business": <FaBriefcase />,
  "Content": <FaPenNib />,
  "Data Science": <FaChartBar />,
  "Design": <FaPaintBrush />,
  "Development": <FaCode />,
  "Marketing": <FaBullhorn />,
  "Product Management": <FaProductHunt />,
  "QA": <FaBug />,
  "Security": <FaShieldAlt />
};

const CategorySection = () => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    fetch(`${API_URL}/api/categories`)
      .then(res => res.json())
      .then(data => setCategories(data));
  }, []);

  return (
    <section className="py-14 px-4 bg-gradient-to-b from-white to-gray-50">
      {/* Header */}
      <div className="text-center mb-10">
        <h2 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-indigo-600 mb-2 transition duration-300">
          Browse by Category
        </h2>
        <p className="text-gray-600 text-lg">
          Find the job that's perfect for you. <br className="sm:hidden" />
          About <span className="text-indigo-600 font-semibold">800+ new jobs</span> every day.
        </p>
      </div>

      {/* Category Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-4 gap-6">
        {categories.slice(0, 8).map((cat, i) => (
          <Link
            key={i}
            to={`/jobs/category/${cat}`}
            className="bg-white shadow-md rounded-xl p-6 text-center hover:shadow-xl transition duration-300 transform hover:-translate-y-1"
          >
            <div className="flex items-center justify-center h-16 w-16 mx-auto mb-4 rounded-full bg-indigo-50">
  <div className="text-3xl text-indigo-600">
    {iconMap[cat] || <FaBriefcase />}
  </div>
</div>
            
            <h3 className="font-semibold text-lg text-gray-800 mb-1">{cat}</h3>
            <p className="text-sm text-gray-500">Explore jobs</p>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default CategorySection;