import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import Swal from 'sweetalert2';

const JobApply = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [job, setJob] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    fetch(`http://localhost:3000/jobs/${id}`)
      .then(res => {
        if (!res.ok) throw new Error('Failed to fetch job details');
        return res.json();
      })
      .then(data => setJob(data))
      .catch(err => {
        console.error(err);
        Swal.fire('Error', 'Failed to load job details', 'error');
      });
  }, [id]);

  const validateForm = (form) => {
    // Validate LinkedIn URL
    const linkedinRegex = /^(https?:\/\/)?(www\.)?linkedin\.com\/in\/.+/i;
    if (!linkedinRegex.test(form.linkedin.value)) {
      Swal.fire('Error', 'Please enter a valid LinkedIn profile URL', 'error');
      return false;
    }

    // Validate phone number
    const phoneRegex = /^[+]?[(]?[0-9]{1,4}[)]?[-\s./0-9]*$/;
    if (!phoneRegex.test(form.phone.value)) {
      Swal.fire('Error', 'Please enter a valid phone number', 'error');
      return false;
    }

    // Validate file sizes (max 5MB)
    if (form.resume.files[0]?.size > 5 * 1024 * 1024) {
      Swal.fire('Error', 'Resume file size should be less than 5MB', 'error');
      return false;
    }

    if (form.coverLetter.files[0]?.size > 5 * 1024 * 1024) {
      Swal.fire('Error', 'Cover letter file size should be less than 5MB', 'error');
      return false;
    }

    return true;
  };

  const handleSubmitApplication = async (e) => {
    e.preventDefault();
    
    if (!validateForm(e.target)) return;
    
    setIsSubmitting(true);
    const form = e.target;

    const formData = new FormData();
    formData.append('job_id', id);
    formData.append('applicant_email', user.email);
    formData.append('applicant_name', form.name.value);
    formData.append('applicant_phone', form.phone.value);
    formData.append('applicant_linkedin', form.linkedin.value);
    formData.append('applicant_notes', form.notes.value);
    formData.append('resume', form.resume.files[0]);
    
    if (form.coverLetter.files[0]) {
      formData.append('coverLetter', form.coverLetter.files[0]);
    }

    try {
      const response = await fetch('http://localhost:3000/job-applications', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Application failed');
      }

      const data = await response.json();
      
      if (data.insertedId) {
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Application submitted successfully!",
          showConfirmButton: true,
        }).then(() => {
          navigate('/myApplications');
        });
        form.reset();
      }
    } catch (error) {
      console.error('Application error:', error);
      Swal.fire('Error', error.message || 'Failed to submit application', 'error');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!job) {
    return (
      <div className="flex justify-center items-center h-64">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto bg-white shadow-md rounded-xl p-6 mt-10 mb-10">
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
              maxLength={100}
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

        <div className="mt-4">
          <label className="block text-sm font-medium mb-1">
            Phone Number <span className="text-red-500">*</span>
          </label>
          <input
            type="tel"
            name="phone"
            className="input input-bordered w-full"
            required
            placeholder="+1234567890"
            pattern="[+]?[0-9]{10,15}"
            title="Please enter a valid phone number"
          />
        </div>

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
            pattern="https?://(www\.)?linkedin\.com/in/.+"
            title="Please enter a valid LinkedIn profile URL"
          />
        </div>

        <div className="grid sm:grid-cols-2 gap-4 mt-4">
          <div>
            <label className="block text-sm font-medium mb-1">
              Resume <span className="text-red-500">*</span>
              <span className="text-gray-500 text-xs block">PDF, DOC, DOCX (Max 5MB)</span>
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
              <span className="text-gray-500 text-xs block">PDF, DOC, DOCX (Max 5MB)</span>
            </label>
            <input
              type="file"
              name="coverLetter"
              className="file-input file-input-bordered w-full"
              accept=".pdf,.doc,.docx"
            />
          </div>
        </div>

        <div className="mt-4">
          <label className="block text-sm font-medium mb-1">
            Why are you a great fit for this role?
          </label>
          <textarea
            name="notes"
            className="textarea textarea-bordered w-full rounded-md focus:outline-none focus:ring focus:ring-blue-200"
            placeholder="Briefly explain your qualifications and interest in this position..."
            rows="4"
            maxLength={500}
          ></textarea>
        </div>

        <div className="mt-4">
          <label className="flex items-center gap-2 text-sm text-gray-600">
            <input 
              type="checkbox" 
              required 
              className="checkbox checkbox-primary" 
            />
            I agree to the terms and privacy policy.
          </label>
        </div>

        <div className="mt-6 flex gap-4">
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="btn btn-outline w-1/2"
            disabled={isSubmitting}
          >
            Cancel
          </button>
          <button 
            type="submit" 
            className="btn btn-primary w-1/2"
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <>
                <span className="loading loading-spinner"></span>
                Submitting...
              </>
            ) : 'Submit Application'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default JobApply;