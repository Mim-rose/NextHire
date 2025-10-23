import React, { useEffect, useState } from 'react';
import useAuth from '../hooks/useAuth';
import { Link } from 'react-router-dom';
const API_URL = import.meta.env.VITE_API_URL;

const MyPostedJobs = () => {
  const [jobs, setJobs] = useState([]);
  const { user } = useAuth();

  useEffect(() => {
    fetch(`${API_URL}/jobs?email=${user.email}`)
      .then(res => res.json())
      .then(data => setJobs(data));
  }, [user.email]);

  return (
    <div>
      <h2 className="text-3xl mb-4">My Posted Jobs: {jobs.length}</h2>

      <div className="overflow-x-auto">
        <table className="table table-xs">
          <thead>
            <tr>
              <th>#</th>
              <th>Title</th>
              <th>Type</th>
              <th>Company</th>
              <th>Location</th>
              <th>Salary</th>
              <th>Deadline</th>
              <th> Application Count</th>
              <th> View Application </th>


            </tr>
          </thead>
          <tbody>
            {jobs.map((job, index) => (
              <tr key={job._id || index}>
                <th>{index + 1}</th>
                <td>{job.title}</td>
                <td>{job.jobType}</td>
                <td>{job.company}</td>
                <td>{job.location}</td>
                <td>{`${job.salaryRange?.min || ''} - ${job.salaryRange?.max || ''} ${job.salaryRange?.currency || ''}`}</td>
                <td>{job.applicationDeadline}</td>
                <td> {job.applicationCount} </td>
                <td>
  <Link to={`/viewApplications/${job._id}`}>
    <button >View Applications</button>
  </Link>
</td>
   
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MyPostedJobs;
