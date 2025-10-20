// src/pages/CompanyJobs.jsx
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import HotJobsCard from "./HotJobsCard";
const CompanyJobs = () => {
  const { companyName } = useParams();
  const [jobs, setJobs] = useState([]);

 useEffect(() => {
  const encodedName = encodeURIComponent(companyName);
  fetch(`http://localhost:3000/api/companies/${encodedName}`)
    .then((res) => {
      if (!res.ok) {
        throw new Error("Network response was not ok");
      }
      return res.json();
    })
    .then((data) => setJobs(data.jobs || []))
    .catch((err) => console.error("Failed to fetch company jobs:", err));
}, [companyName]);

  return (
    <div className="px-4 py-6">
      <h2 className="text-xl font-bold mb-4">Jobs at {companyName}</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {jobs.map((job) => (
          <HotJobsCard key={job._id} job={job} />
        ))}
      </div>
    </div>
  );
};

export default CompanyJobs;