import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { MdLocationOn, MdCategory, MdDateRange } from 'react-icons/md';
import { TbCurrencyTaka } from 'react-icons/tb';
import { FaBriefcase, FaShareAlt, FaCheckCircle } from 'react-icons/fa';
import DJ6 from '../assets/images/DJ6.jpg';

const fallbackLogo = 'https://via.placeholder.com/64?text=Logo';
const API_URL = import.meta.env.VITE_API_URL;

const JobDetails = () => {
  const { id } = useParams();
  const [job, setJob] = useState(null);

  useEffect(() => {
    fetch(`${API_URL}/jobs/${id}`)
      .then(res => res.json())
      .then(data => setJob(data))
      .catch(err => console.error(err));
  }, [id]);

  if (!job) return <div className="text-center py-10">Loading job details...</div>;

  const {
    _id,
    title,
    company,
    company_logo,
    location,
    salaryRange,
    jobType,
    category,
    applicationDeadline,
    requirements,
    responsibilities,
  } = job;

  // Manually added qualifications
  const qualifications = [
    "Bachelor’s degree in relevant field (e.g. Marketing, Engineering, CS)",
    "2+ years of experience in a similar role",
    "Strong communication and analytical skills",
    "Experience with collaborative tools and agile teams",
  ];

  return (
    <div className="max-w-5xl mx-auto px-4 py-6">
      
      {/* 🖼️ DJP8 Image */}
      <div className="mb-8">
        <img
          src={DJ6}
          alt="DJP8"
          className="w-full h-64 object-cover rounded-md shadow-md"
        />
      </div>

      {/* 🗂️ Job Card */}
      <div className="bg-white p-6 rounded-lg shadow-md">

        {/* Top: Company Info */}
        <div className="flex items-center gap-4 mb-6">
          <img
            src={company_logo || fallbackLogo}
            alt={`${company} logo`}
            className="w-16 h-16 rounded-full border border-gray-300 object-cover"
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = fallbackLogo;
            }}
          />
          <div>
            <h2 className="text-2xl font-semibold text-gray-800">{title}</h2>
            <p className="text-sm text-gray-600">{company}</p>
          </div>
        </div>

        {/* Meta Info */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
          <div className="flex items-center text-gray-700">
            <MdLocationOn className="text-red-500 mr-2" />
            <span>{location}</span>
          </div>
          <div className="flex items-center text-gray-700">
            <TbCurrencyTaka className="text-green-500 mr-2" />
            <span>৳ {salaryRange?.min} - {salaryRange?.max}</span>
          </div>
          <div className="flex items-center text-gray-700">
            <FaBriefcase className="text-blue-500 mr-2" />
            <span>{jobType}</span>
          </div>
          <div className="flex items-center text-gray-700">
            <MdCategory className="text-purple-500 mr-2" />
            <span>{category}</span>
          </div>
          <div className="flex items-center text-gray-700">
            <MdDateRange className="text-orange-500 mr-2" />
            <span>Apply by: {applicationDeadline}</span>
          </div>
        </div>

        {/* Responsibilities */}
        <div className="mb-6">
          <h3 className="text-lg font-bold mb-2">Responsibilities</h3>
          <ul className="list-disc list-inside text-gray-700 space-y-1">
            {responsibilities?.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        </div>

        {/* Qualifications */}
        <div className="mb-6">
          <h3 className="text-lg font-bold mb-2">Qualifications</h3>
          <ul className="list-disc list-inside text-gray-700 space-y-1">
            {qualifications.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        </div>

        {/* Requirements */}
        <div className="mb-6">
          <h3 className="text-lg font-bold mb-2">Required Skills</h3>
          <div className="flex flex-wrap gap-2">
            {requirements?.map((skill, idx) => (
              <span
                key={idx}
                className="px-3 py-1 bg-indigo-100 text-indigo-800 rounded-full text-sm hover:bg-indigo-200 cursor-pointer transition"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>

        {/* Apply & Share */}
        <div className="flex justify-between items-center mt-8">
          
          <Link to={`/jobapply/${_id}`}        >   
             <button className="btn btn-primary">Apply Now</button>
          
                     </Link>


          <button className="btn btn-outline flex items-center gap-2">
            <FaShareAlt /> Share
          </button>
        </div>

      </div>
    </div>
  );
};

export default JobDetails;