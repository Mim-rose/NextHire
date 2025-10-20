import React from 'react'
import { useParams } from 'react-router-dom'

const ViewApplications = () => {
  const {job_id} = useParams();
  
  return (
    <div>
      <h2 className="text-3xl"> Applications for this job {job_id}</h2>
    </div>
  )
}

export default ViewApplications;