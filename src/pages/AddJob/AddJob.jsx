import React from "react";
import Swal from "sweetalert2";
import { useRef } from "react";
import { useNavigate } from 'react-router-dom';
import useAuth from "../../hooks/useAuth";

const AddJob = () => {
    const formRef = useRef();
    const navigate = useNavigate();
    const {user} = useAuth();


     const handleAddJob = e => {
  e.preventDefault();

  const formData = new FormData(e.target);
  const initialData = Object.fromEntries(formData.entries());
  console.log(initialData);

  const { min, max, currency, ...newJob } = initialData;
  console.log(min, max, currency, newJob);

  newJob.salaryRange = {
    min: parseInt(min),
    max: parseInt(max),
    currency
  };
  newJob.requirements = newJob.requirements.split('\n');
  newJob.responsibilities = newJob.responsibilities.split('\n');
  console.log(newJob);

   fetch('http://localhost:3000/jobs', {

    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },

    body: JSON.stringify(newJob),

   })
   .then(res => res.json())
   .then(data => {
    
     if (data.insertedId) {
            Swal.fire({
              position: "center",
              icon: "success",
              title: "job has been added !",
              showConfirmButton: true,
            }).then(() => {
              navigate('/myPostedJobs');
            });
            formRef.current.reset();
          }


   })



}



  return (
    <form ref={formRef} onSubmit={handleAddJob} className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md space-y-6">
      {/* Job Title */}
      <div>
        <label className="block font-semibold">Job Title</label>
        <input type="text" name="title" className="input input-bordered w-full" placeholder="Backend Developer" required />
      </div>

      {/* Company Name */}
      <div>
        <label className="block font-semibold">Company</label>
        <input type="text" name="company" className="input input-bordered w-full" placeholder="Amazon" required />
      </div>

      {/* Company Logo */}
      <div>
        <label className="block font-semibold">Company Logo (URL or Upload)</label>
        <input type="text" name="company_logo" className="input input-bordered w-full" placeholder="https://logo.com/image.png" />
      </div>

      {/* Location */}
      <div>
        <label className="block font-semibold">Location</label>
        <input type="text" name="location" className="input input-bordered w-full" placeholder="Mohakhali, Dhaka" required />
      </div>

      {/* Job Type */}
      <div>
        <label className="block font-semibold">Job Type</label>
        <select name="jobType" className="select select-bordered w-full" required>
          <option disabled selected value="">Select job type</option>
          <option value="Full-time">Full-time</option>
          <option value="Part-time">Part-time</option>
          <option value="Remote">Remote</option>
          <option value="Contract">Contract</option>
        </select>
      </div>

      {/* Category */}
      <div>
        <label className="block font-semibold">Category</label>
        <select name="category" className="select select-bordered w-full" required>
          <option disabled selected value="">Select category</option>
          <option value="Development">Development</option>
          <option value="Marketing">Marketing</option>
          <option value="Design">Design</option>
          <option value="Sales">Sales</option>
        </select>
      </div>

      {/* Salary Range */}
      <div className="grid grid-cols-3 gap-4">
        <div>
          <label className="block font-semibold">Salary Min</label>
          <input type="number" name="salaryRange.min" className="input input-bordered w-full" placeholder="60000" required />
        </div>
        <div>
          <label className="block font-semibold">Salary Max</label>
          <input type="number" name="salaryRange.max" className="input input-bordered w-full" placeholder="85000" required />
        </div>
        <div>
          <label className="block font-semibold">Currency</label>
          <select name="salaryRange.currency" className="select select-bordered w-full" required>
            <option value="৳">৳ BDT</option>
            <option value="$">$ USD</option>
            <option value="€">€ EUR</option>
          </select>
        </div>
      </div>

      {/* Deadline */}
      <div>
        <label className="block font-semibold">Application Deadline</label>
        <input type="date" name="applicationDeadline" className="input input-bordered w-full" required />
      </div>

      {/* Description */}
      <div>
        <label className="block font-semibold">Job Description</label>
        <textarea name="description" rows="5" className="textarea textarea-bordered w-full" placeholder="Write job description..." required></textarea>
      </div>

      {/* Requirements */}
      <div>
        <label className="block font-semibold">Requirements</label>
        <textarea name="requirements" rows="5" className="textarea textarea-bordered w-full" placeholder="Write job requirements..." required></textarea>
      </div>

      {/* Responsibilities */}
      <div>
        <label className="block font-semibold">Responsibilities</label>
        <textarea name="responsibilities" rows="5" className="textarea textarea-bordered w-full" placeholder="Write responsibilities..." required></textarea>
      </div>

      {/* Status */}
      <div>
        <label className="block font-semibold">Status</label>
        <select name="status" className="select select-bordered w-full" required>
          <option value="Active">Active</option>
          <option value="Closed">Closed</option>
          <option value="Draft">Draft</option>
        </select>
      </div>
      {/* HR Name */}
<div>
  <label className="block font-semibold">HR Contact Name</label>
  <input
    type="text"
    name="hr_name"
    className="input input-bordered w-full"
    placeholder="your name"
    required
  />
</div>

{/* HR Email */}
<div>
  <label className="block font-semibold">HR Contact Email</label>
  <input
    type="email"
    name="hr_email"

    defaultValue={user?.email || ''}
    className="input input-bordered w-full"
    placeholder="mrx@company.com"
    required
  />
</div>

      {/* Submit */}
      <div className="text-right">
        <button type="submit" className="btn btn-primary">Submit Job</button>
      </div>
    </form>
  );
};

export default AddJob;