import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import HotJobsCard from './HotJobsCard';
const API_URL = import.meta.env.VITE_API_URL;

const HotJobs = () => {
    const [jobs, setJobs] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch(`${API_URL}/jobs/featured`)
            .then(res => res.json())
            .then(data => {
                setJobs(data);
                setLoading(false);
            });
    }, []);

    return (
        <div>
            <div className="text-center mt-16 mb-8 px-4">
                <h2 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-indigo-600 mb-2 transition duration-300">
                    Explore Job Openings
                </h2>
                <p className="mt-4 text-base text-gray-600 max-w-xl mx-auto">
                    Discover top opportunities across industries — from development and design to marketing and management. Your next career move starts here.
                </p>
            </div>

            {loading ? (
                <div className="text-center py-8">
                    <span className="loading loading-spinner loading-lg"></span>
                </div>
            ) : (
                <>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 px-6 py-8">
                        {jobs.map(job => (
                            <HotJobsCard key={job._id} job={job} />
                        ))}
                    </div>

                    {jobs.length >= 15 && (
                        <div className="text-center mt-4">
                            <Link to="/jobs" className="btn btn-primary">
                                Browse All Jobs →
                            </Link>
                        </div>
                    )}
                </>
            )}
        </div>
    );
};

export default HotJobs;