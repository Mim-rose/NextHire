import React, { useState } from "react";
import {
  createUserWithEmailAndPassword,
  sendEmailVerification,
  signInWithPopup,
  GoogleAuthProvider,
  updateProfile,
} from "firebase/auth";
import { Link, useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import Lottie from "lottie-react";
import animationData from "../assets/SignUp.json"; // ✅ Your lottie file
import { auth } from "../firebase/firebase.init";
import { FcGoogle } from "react-icons/fc";

const SignUp = () => {
  // -----------------------------------------------
  // 🔧 State variables to manage input interactions
  // -----------------------------------------------
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // -----------------------------------------------
  // 🔧 Error handling states for password inputs
  // -----------------------------------------------
  const [passwordError, setPasswordError] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");

  // ✅ Success message tracking
  const [success, setSuccess] = useState(false);

  // -----------------------------------------------
  // 📦 Form data state to track user inputs
  // -----------------------------------------------
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    photo: "",
    password: "",
    confirmPassword: "",
  });

  const navigate = useNavigate(); // 🚪 for redirecting after signup

  // -----------------------------------------------
  // 🧠 Handle input changes dynamically
  // -----------------------------------------------
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // -----------------------------------------------
  // 🔒 Regex-based password validator
  // -----------------------------------------------
  const validatePassword = (password) => {
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{6,}$/;
    return regex.test(password);
  };

  // -----------------------------------------------
  // 🔐 Google Sign In handler
  // -----------------------------------------------
  const handleGoogleSignIn = () => {
    const provider = new GoogleAuthProvider();
    // Add try-catch for better error handling
    signInWithPopup(auth, provider)
      .then(() => {
        alert("Signed in with Google successfully");
        navigate("/");
      })
      .catch((error) => {
        console.error("Google Sign-In Error:", error);
        alert(error.message);
      });
  };

  // -----------------------------------------------
  // 🚀 Form submit handler (Sign Up logic)
  // -----------------------------------------------
  const handleSubmit = async (e) => {
    e.preventDefault();
    const { name, email, password, confirmPassword, photo } = formData;

    // Reset previous errors and success
    setPasswordError("");
    setConfirmPasswordError("");
    setSuccess(false);

    // ✅ Password validation using regex
    if (!validatePassword(password)) {
      setPasswordError(
        "Password must be 6+ chars and include uppercase, lowercase, number, special char."
      );
      return;
    }

    // ✅ Confirm password match check
    if (password !== confirmPassword) {
      setConfirmPasswordError("Passwords do not match.");
      return;
    }

    try {
      // ✅ Create account using Firebase
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);

      // ✅ Update user profile with name & photo
      await updateProfile(auth.currentUser, {
        displayName: name,
        photoURL: photo,
      });

      // ✅ Send email verification
      await sendEmailVerification(auth.currentUser);

      setSuccess(true);
      alert("Signup successful. Please verify your email.");

      // ✅ Clear the form
      setFormData({
        name: "",
        email: "",
        photo: "",
        password: "",
        confirmPassword: "",
      });

      // ✅ Redirect to homepage
      navigate("/");
    } catch (error) {
      console.error("Signup Error:", error);
      alert(error.message);
    }
  };

  // -----------------------------------------------------
  // 🖼️ Final JSX: Form left, Lottie animation right
  // -----------------------------------------------------
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 items-center justify-center min-h-screen bg-gray-50 px-4 py-12 gap-8">

      {/* ✅ Sign Up Form Box */}
      <div className="bg-white p-8 rounded-xl shadow-lg w-full md:w-[420px] md:mr-8">
        <h2 className="text-2xl font-bold text-center mb-6">Create an Account</h2>
        <form onSubmit={handleSubmit}>
          {/* Full Name */}
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            placeholder="Full Name"
            className="w-full mb-4 px-4 py-2 border border-gray-300 rounded"
            required
            autoComplete="name" // ✅ Added for better form handling
          />

          {/* Email */}
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            placeholder="Email"
            className="w-full mb-4 px-4 py-2 border border-gray-300 rounded"
            required
            autoComplete="email" // ✅ Added for better form handling
          />

          {/* Photo URL */}
          <input
            type="text"
            name="photo"
            value={formData.photo}
            onChange={handleInputChange}
            placeholder="Photo URL"
            className="w-full mb-4 px-4 py-2 border border-gray-300 rounded"
            
            autoComplete="photo" // ✅ Added for better form handling
          />

          {/* Password */}
          <div className="relative mb-4">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              placeholder="Password"
              className="w-full px-4 py-2 border border-gray-300 rounded"
              required
              autoComplete="new-password" // ✅ Fixes DOM warning
            />
            <span
              className="absolute right-3 top-3 cursor-pointer text-gray-600"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </span>
            {passwordError && <p className="text-red-500 text-sm mt-1">{passwordError}</p>}
          </div>

          {/* Confirm Password */}
          <div className="relative mb-4">
            <input
              type={showConfirmPassword ? "text" : "password"}
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleInputChange}
              placeholder="Confirm Password"
              className="w-full px-4 py-2 border border-gray-300 rounded"
              required
              autoComplete="new-password" // ✅ Fixes DOM warning
            />
            <span
              className="absolute right-3 top-3 cursor-pointer text-gray-600"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            >
              {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
            </span>
            {confirmPasswordError && (
              <p className="text-red-500 text-sm mt-1">{confirmPasswordError}</p>
            )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
          >
            Sign Up
          </button>
        </form>

        {/* Sign In Link */}
        <p className="text-center mt-4 text-gray-700">
          Already have an account?{" "}
          <Link to="/signin" className="text-blue-500 hover:underline">
            Sign In
          </Link>
        </p>

        {/* Google Sign In Button */}
        <div className="mt-4 text-center">
          <button
            onClick={handleGoogleSignIn}
             className="w-full py-2 bg-white text-gray-800 border border-gray-300 rounded-lg hover:bg-gray-100 flex items-center justify-center gap-2"
          >
            <FcGoogle className="text-xl" />

            Sign in with Google
          </button>
        </div>

        {/* Success message */}
        {success && (
          <p className="text-green-600 text-center mt-4">
            Successfully signed up! Please check your email.
          </p>
        )}
      </div>

      {/* ✅ Lottie Animation Section */}
      <div className="md:w-[400px] w-[300px] mt-8 md:mt-0">
        <Lottie animationData={animationData} loop={true} />
      </div>
    </div>
  );
};

export default SignUp;