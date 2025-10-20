import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import HotJobsCard from './HotJobsCard';

const AllJobs = () => {
  const [jobs, setJobs] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [hasMore, setHasMore] = useState(true);

  useEffect(() => {
    const fetchJobs = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch(`http://localhost:3000/jobs/all?page=${page}&limit=20`);
        if (!res.ok) throw new Error('Failed to fetch jobs');
        const newJobs = await res.json();
        
        setJobs(prev => {
          // Remove duplicates
          const existingIds = new Set(prev.map(j => j._id));
          const filteredNew = newJobs.filter(job => !existingIds.has(job._id));
          return [...prev, ...filteredNew];
        });
        
        setHasMore(newJobs.length > 0);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, [page]);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 text-center">All Job Opportunities</h1>
      
      {/* Search/Filters Component */}
      <div className="mb-8">
        {/* Implement search/filters here */}
      </div>

      {/* Error State */}
      {error && (
        <div className="alert alert-error mb-4">
          {error} <button onClick={() => window.location.reload()}>Retry</button>
        </div>
      )}

      {/* Jobs Grid */}
      {jobs.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {jobs.map(job => (
            <HotJobsCard key={job._id} job={job} />
          ))}
        </div>
      ) : (
        !loading && (
          <div className="text-center py-12">
            <p className="text-lg text-gray-600 mb-4">No jobs found</p>
            <Link to="/" className="btn btn-primary">
              Browse Featured Jobs
            </Link>
          </div>
        )
      )}

      {/* Load More Button */}
      {!loading && hasMore && jobs.length > 0 && (
        <div className="text-center mt-8">
          <button 
            onClick={() => setPage(p => p + 1)}
            className="btn btn-primary"
            disabled={loading}
          >
            Load More Jobs
          </button>
        </div>
      )}

      {loading && (
        <div className="text-center py-8">
          <span className="loading loading-spinner loading-lg"></span>
          <p>Loading jobs...</p>
        </div>
      )}

      {!hasMore && jobs.length > 0 && (
        <div className="text-center py-4 text-gray-500">
          You've reached the end of the list
        </div>
      )}
    </div>
  );
};

export default AllJobs;