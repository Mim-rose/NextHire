import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import Swal from 'sweetalert2';
const API_URL = import.meta.env.VITE_API_URL;

const JobApply = () => {
  const { id } = useParams();
  const {user} = useAuth();
  console.log(id, user);
  const [job, setJob] = useState(null);

  useEffect(() => {
    fetch(`${API_URL}/jobs/${id}`)
      .then(res => res.json())
      .then(data => setJob(data))
      .catch(err => console.error(err));
  }, [id]);

  if (!job)
    return (
      <p className="text-center py-10 text-gray-600 text-lg">
        Loading job details...
      </p>
    );

  const handleSubmitApplication = (e) => {
    e.preventDefault();
    const form = e.target;

    // ✅ USE FORMDATA FOR FILE UPLOADS
    const formData = new FormData();
    formData.append('job_id', id);
    formData.append('applicant_email', user.email);
    formData.append('applicant_name', form.name.value);
    formData.append('applicant_phone', form.phone.value);
    formData.append('applicant_linkedin', form.linkedin.value);
    formData.append('resume', form.resume.files[0]);
    
    if (form.coverLetter.files[0]) {
      formData.append('coverLetter', form.coverLetter.files[0]);
    }

    // ✅ SEND FORMDATA (NO HEADERS NEEDED)
    fetch(`${API_URL}/job-applications`, {
      method: 'POST',
      body: formData, // ✅ Send FormData directly
    })
      .then(res => res.json())
      .then(data => {
        if (data.insertedId) {
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: "Application submitted successfully!",
            showConfirmButton: false,
            timer: 1500
          });
          form.reset();
        }
      })
      .catch(err => {
        console.error(err);
        Swal.fire('Error', 'Failed to submit application', 'error');
      });
  };

  return (
    <div className="max-w-3xl mx-auto bg-white shadow-md rounded-xl p-6 mt-10">
        <h2 className="text-4xl font-semibold text-center text-gray-800 mb-2 tracking-tight">
          Apply for <span className="text-blue-600">{job.title}</span>
        </h2>
        <p className="text-center text-sm text-gray-500 mb-6 font-medium">
          {job.company} • {job.location}
        </p>

      <form onSubmit={handleSubmitApplication}>
        {/* Personal Info */}
        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">
              Full Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="name"
              defaultValue={user?.displayName || ''}
              className="input input-bordered w-full"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">
              Email Address <span className="text-red-500">*</span>
            </label>
            <input
              type="email"
              name="email"
              defaultValue={user?.email || ''}
              className="input input-bordered w-full bg-gray-100"
              readOnly
            />
          </div>
        </div>

        {/* Contact */}
        <div className="mt-4">
          <label className="block text-sm font-medium mb-1">
            Phone Number <span className="text-red-500">*</span>
          </label>
          <input
            type="tel"
            name="phone"
            className="input input-bordered w-full"
            required
          />
        </div>

        {/* LinkedIn */}
        <div className="mt-4">
          <label className="block text-sm font-medium mb-1">
            LinkedIn Profile URL <span className="text-red-500">*</span>
          </label>
          <input
            type="url"
            name="linkedin"
            placeholder="https://linkedin.com/in/yourname"
            className="input input-bordered w-full"
            required
          />
        </div>

        {/* Resume & Cover Letter */}
        <div className="grid sm:grid-cols-2 gap-4 mt-4">
          <div>
            <label className="block text-sm font-medium mb-1">
              Resume <span className="text-red-500">*</span>
            </label>
            <input
              type="file"
              name="resume"
              className="file-input file-input-bordered w-full"
              accept=".pdf,.doc,.docx"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">
              Cover Letter <span className="text-gray-400 text-sm">(optional)</span>
            </label>
            <input
              type="file"
              name="coverLetter"
              className="file-input file-input-bordered w-full"
              accept=".pdf,.doc,.docx"
            />
          </div>
        </div>

        {/* Additional Info */}
        <div className="mt-4">
          <textarea
            name="notes"
            className="textarea textarea-bordered w-full rounded-md focus:outline-none focus:ring focus:ring-blue-200"
            placeholder="Why are you a great fit for this role?"
            rows="4"
          ></textarea>
        </div>

        {/* Consent */}
        <div className="mt-4">
          <label className="flex items-center gap-2 text-sm text-gray-600">
            <input type="checkbox" required className="checkbox checkbox-primary" />
            I agree to the terms and privacy policy.
          </label>
        </div>

        {/* Submit Button */}
        <div className="mt-6">
          <button type="submit" className="btn btn-primary w-full">
            Submit Application
          </button>
        </div>
      </form>
    </div>
  );
};

export default JobApply;