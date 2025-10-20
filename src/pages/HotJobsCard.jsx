import React from 'react';
import { MdLocationOn } from 'react-icons/md';
import { TbCurrencyTaka } from "react-icons/tb";
import { useNavigate } from 'react-router-dom';

const HotJobsCard = ({ job }) => {
  const navigate = useNavigate();

  const {
    _id,
    title,
    company,
    company_logo,
    requirements,
    description,
    location,
    salaryRange,
  } = job;

  const fallbackLogo = 'https://via.placeholder.com/64?text=Logo';

  const handleCardClick = () => {
    navigate(`/jobs/${_id}`);
  };

  const handleApplyClick = (e) => {
    e.stopPropagation();
    navigate(`/jobapply/${_id}`);
  };

  return (
    <div className="card bg-base-100 shadow-sm p-4 rounded-md hover:shadow-lg transition duration-300 cursor-pointer" onClick={handleCardClick}>
      {/* Top Section: Logo & Basic Info */}
      <div className="flex items-center gap-4 mb-4">
        <img
          className="w-16 h-16 rounded-full object-cover border border-gray-300"
          src={company_logo || fallbackLogo}
          alt={`${company} logo`}
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = fallbackLogo;
          }}
        />
        <div>
          <h4 className="text-xl font-semibold text-gray-800">{company}</h4>
          <p className="flex items-center gap-1 text-sm text-gray-600">
            <MdLocationOn className="text-red-500" />
            {location}
          </p>
        </div>
      </div>

      {/* Body Section: Title & Description */}
      <div className="card-body px-0">
        <h2 className="card-title text-lg font-bold">{title}</h2>
        <p className="text-sm text-gray-700 mt-2">{description}</p>

        <div className="flex flex-wrap gap-2 m-2">
          {requirements.map((skill, idx) => (
            <p
              key={idx}
              className="border-2 border-gray-100 rounded-md bg-indigo-100 text-center font-medium p-1 m-1 hover:text-blue-900"
            >
              {skill}
            </p>
          ))}
        </div>

        {/* Fixed Alignment for Salary and Button */}
        <div className="card-actions flex justify-between items-center mt-4">
          <p className="flex items-center font-bold text-gray-900">
            <TbCurrencyTaka className="text-xl font-bold text-gray-900" />
            Salary : {salaryRange.min} - {salaryRange.max}
          </p>
          <button className="btn btn-sm btn-primary" onClick={handleApplyClick}>
            Apply Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default HotJobsCard;