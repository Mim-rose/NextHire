import { FiSend } from "react-icons/fi";
import { useState } from "react";

const SubscriptionSection = () => {
  const [email, setEmail] = useState("");

  const handleSubscribe = () => {
    if (!email) return alert("Please enter your email.");
    // TODO: Send email to backend or service
    alert(`Subscribed with: ${email}`);
    setEmail("");
  };

  return (
    <section className="bg-slate-50 mb-12 py-12 px-4 text-gray-800">
      <div className="max-w-3xl mx-auto text-center">
        <h2 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-indigo-600 mb-4">
          Stay Updated with New Opportunities
        </h2>
        <p className="text-lg text-gray-600 mb-6">
          Subscribe to get the latest job postings, company updates, and career tips.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full sm:w-2/3 px-4 py-3 rounded-md border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:outline-none bg-white text-gray-800"
          />
          <button
            onClick={handleSubscribe}
            className="bg-indigo-600 text-white px-6 py-3 rounded-md font-semibold flex items-center gap-2 hover:bg-indigo-700 transition"
          >
            <FiSend className="text-xl" />
            Subscribe
          </button>
        </div>
      </div>
    </section>
  );
};

export default SubscriptionSection;