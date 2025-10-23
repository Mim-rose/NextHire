import React, { useState, useContext } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import Lottie from "lottie-react";
import SignUpLottieData from "../assets/SignUp.json";
import AuthContext from "../context/AuthContext";
import { FcGoogle } from "react-icons/fc";

const SignIn = () => {
  const {
    signIn,
    signInWithGoogle,
    resetPassword,
    loading,
    error,
    success,
    clearAuthState,
  } = useContext(AuthContext);

  const [showPassword, setShowPassword] = useState(false);
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [resetEmail, setResetEmail] = useState("");
  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from?.pathname || "/";

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    clearAuthState();
    try {
      const user = await signIn(formData.email, formData.password);
      if (user) {
        navigate(from, { replace: true });
      }
    } catch (error) {
      // Error handled in AuthProvider
    }
  };

  // ✅ NEW: Google Sign-In Handler
  const handleGoogleSignIn = async () => {
    clearAuthState();
    try {
      const result = await signInWithGoogle();
      if (result) {
        navigate(from, { replace: true });
      }
    } catch (error) {
      // Error handled in AuthProvider
    }
  };

  const handlePasswordReset = async (e) => {
    e.preventDefault();
    await resetPassword(resetEmail);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 items-center justify-center min-h-screen bg-gray-50 px-4 py-12 gap-8">
      {/* Form Section */}
      <div className="w-full max-w-md p-8 bg-white rounded-xl shadow-lg">
        <h2 className="text-3xl font-bold mb-6 text-center bg-gradient-to-r from-purple-400 to-indigo-500 bg-clip-text text-transparent">
          {showForgotPassword ? "Reset Password" : "Sign In"}
        </h2>

        {error && (
  <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-lg">
    {error}
    {error.includes("No account found") && (
      <p className="mt-2">
        <Link to="/signup" className="text-indigo-600 underline">
          Create an account
        </Link>
      </p>
    )}
  </div>
)}
        {success && (
          <div className="mb-4 p-3 bg-green-100 text-green-700 rounded-lg">
            {success}
          </div>
        )}

        {showForgotPassword ? (
          <form onSubmit={handlePasswordReset} className="space-y-4">
            <input
              type="email"
              value={resetEmail}
              onChange={(e) => setResetEmail(e.target.value)}
              placeholder="your@email.com"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg"
              required
              autoComplete="email"
            />
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-indigo-600 text-white py-3 rounded-lg disabled:opacity-70"
            >
              {loading ? "Sending..." : "Send Reset Link"}
            </button>
            <button
              type="button"
              onClick={() => {
                setShowForgotPassword(false);
                clearAuthState();
              }}
              className="w-full mt-2 text-indigo-600 hover:underline"
            >
              Back to Login
            </button>
          </form>
        ) : (
          <>
            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="Email"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                required
                autoComplete="email"
              />
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  placeholder="Password"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                  required
                  autoComplete="current-password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((prev) => !prev)}
                  className="absolute right-3 top-2.5 text-gray-500"
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-indigo-600 text-white py-3 rounded-lg disabled:opacity-70"
              >
                {loading ? "Signing In..." : "Login"}
              </button>
            </form>

            <div className="mt-4 text-center space-y-2">
              <button
                onClick={() => {
                  setShowForgotPassword(true);
                  clearAuthState();
                }}
                className="text-indigo-600 hover:underline"
              >
                Forgot Password?
              </button>
              <p>
                Don't have an account?{" "}
                <Link to="/signup" className="text-indigo-600 hover:underline">
                  Sign Up
                </Link>
              </p>
              <button
                onClick={handleGoogleSignIn}
                disabled={loading}
                className="w-full py-2 bg-white text-gray-800 border border-gray-300 rounded-lg hover:bg-gray-100 flex items-center justify-center gap-2"
              >
                <FcGoogle className="text-xl" />
                Sign in with Google
              </button>
            </div>
          </>
        )}
      </div>

      {/* Animation Section */}
      <div className="hidden md:flex items-center justify-center">
        <div className="w-full max-w-sm lg:max-w-md">
          <Lottie animationData={SignUpLottieData} loop />
        </div>
      </div>
    </div>
  );
};

export default SignIn;