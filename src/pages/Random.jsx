import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import Swal from 'sweetalert2';


const JobApply = () => {
  const { id } = useParams();
  const {user} = useAuth();
  console.log(id, user);
  const [job, setJob] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:3000/jobs/${id}`)
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

    const name = form.name.value;
    const email = form.email.value;
    const phone = form.phone.value;
    const linkedin = form.linkedin.value;
    const resume = form.resume.files[0];
    const coverLetter = form.coverLetter.files[0] || null;

    console.log({
      name,
      email,
      phone,
      linkedin,
      resume,
      coverLetter,
    });

    const jobApplication = {
  job_id: id,
  applicant_email: user.email,
  applicant_name: name,
  applicant_phone: phone,
  applicant_linkedin: linkedin,
  applicant_resume: resume,        // ✅ Clear
  applicant_coverLetter: coverLetter // ✅ Clear
};
       // TODO: Send data to backend or Firebase
        fetch('http://localhost:3000/job-applications', {
  method: 'POST',
  headers: {
    'content-type': 'application/json',
  },
  body: JSON.stringify(jobApplication),
})
  .then(res => res.json())
  .then(data => {
    if (data.insertedId) {
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Your work has been saved",
        showConfirmButton: false,
        timer: 1500
      });
    }
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
              className="input input-bordered w-full"
              required
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