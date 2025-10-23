import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import HotJobsCard from "./HotJobsCard";
const CategoryJobs = () => {
  const { categoryName } = useParams();
  const [jobs, setJobs] = useState([]);
  const API_URL = import.meta.env.VITE_API_URL;


  useEffect(() => {
    fetch(`${API_URL}/jobs/category/${categoryName}`)
      .then(res => res.json())
      .then(data => setJobs(data));
  }, [categoryName]);

  return (
    <div className="max-w-6xl mx-auto mt-8 grid gap-6 md:grid-cols-3">
      {jobs.map(job => (
        <HotJobsCard key={job._id} job={job} />
      ))}
    </div>
  );
};

export default CategoryJobs;