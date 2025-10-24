// src/pages/CompanyJobs.jsx
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import HotJobsCard from "./HotJobsCard";

const API_URL = import.meta.env.VITE_API_URL;

const CompanyJobs = () => {
  const { companyName } = useParams();
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    const encodedName = encodeURIComponent(companyName);

    fetch(`${API_URL}/api/companies/${encodedName}`)
      .then((res) => {
        if (!res.ok) {
          throw new Error("Network response was not ok");
        }
        return res.json();
      })
      .then((data) => {
        console.log("Fetched company jobs:", data);
        setJobs(data.jobs || []);
      })
      .catch((err) => console.error("Failed to fetch company jobs:", err));
  }, [companyName]);

  return (
    <div className="px-4 py-6">
      <h2 className="text-xl font-bold mb-4">Jobs at {companyName}</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {jobs.length > 0 ? (
          jobs.map((job) => <HotJobsCard key={job._id} job={job} />)
        ) : (
          <p>No jobs found for this company.</p>
        )}
      </div>
    </div>
  );
};

export default CompanyJobs;
