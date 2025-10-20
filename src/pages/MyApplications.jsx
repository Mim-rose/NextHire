import React from 'react'
import useAuth from '../hooks/useAuth'
import { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import axios from 'axios';


const MyApplications = () => {
    const {user} = useAuth();
    const [jobs, setJobs] = useState([]);

    useEffect(() => {
        fetchData();
    }, [user.email]);

    const fetchData = () => {
        axios.get(`http://localhost:3000/job-applications?email=${user.email}`, { withCredentials: true })
  .then(res => {
    const data = res.data;
    if (data.length === 0) {
      Swal.fire('No Applications', 'You have not applied for any jobs yet.', 'info');
    }
    setJobs(data);
  })
  .catch(error => {
    console.error('Error fetching applications:', error);
    Swal.fire('Error!', 'Could not fetch applications.', 'error');
  });

    }

    const handleDelete = (id) => {
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
            if (result.isConfirmed) {
                fetch(`http://localhost:3000/job-applications/${id}`, {
                    method: 'DELETE'
                })
                .then(res => res.json())
                .then(data => {
                    if (data.deletedCount > 0) {
                        Swal.fire(
                            'Deleted!',
                            'Your application has been deleted.',
                            'success'
                        );
                        fetchData();
                    }
                })
                .catch(error => {
                    console.error('Error:', error);
                    Swal.fire(
                        'Error!',
                        'Failed to delete application.',
                        'error'
                    );
                });
            }
        });
    }

    // Helper function to format salary
    const formatSalary = (range) => {
        if (!range) return 'Not specified';
        return `${range.currency} ${range.min} - ${range.max}`;
    };

    return (
        <div>
            <h2 className='text-3xl'>My Applications: {jobs.length}</h2>
            <div className="overflow-x-auto">
                <table className="table">
                    <thead>
                        <tr>
                            <th>
                                <label>
                                    <input type="checkbox" className="checkbox" />
                                </label>
                            </th>
                            <th>Job Details</th>
                            <th>Job Type</th>
                            <th>Category</th>
                            <th>Salary Range</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {jobs.map(job => (
                            <tr key={job._id}>
                                <th>
                                    <label>
                                        <input type="checkbox" className="checkbox" />
                                    </label>
                                </th>
                                <td>
                                    <div className="flex items-center gap-3">
                                        <div className="avatar">
                                            <div className="mask mask-squircle h-12 w-12">
                                                <img
                                                    src={job.company_logo}
                                                    alt="Company Logo" />
                                            </div>
                                        </div>
                                        <div>
                                            <div className="font-bold">{job.title}</div>
                                            <div className="text-sm opacity-50">{job.location}</div>
                                        </div>
                                    </div>
                                </td>
                                <td>{job.jobType}</td>
                                <td>{job.category}</td>
                                <td>{formatSalary(job.salaryRange)}</td>
                                <th>
                                    <button 
                                        className="btn btn-ghost btn-xs"
                                        onClick={() => handleDelete(job._id)}
                                    >
                                        Delete
                                    </button>
                                </th>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default MyApplications;