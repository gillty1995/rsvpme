import React from "react";
import { Link } from "react-router-dom";

const PrivacyPolicy: React.FC = () => {
  return (
    <main className="min-h-screen flex justify-center items-center bg-gradient-to-r from-gray-300 via-white to-gray-400">
      <section className="max-w-3xl w-full bg-white p-8 rounded-lg shadow-lg text-center">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">
          Privacy Policy
        </h1>
        <p className="text-lg text-gray-600 mb-6">
          Your privacy is important to us. This policy explains how we handle
          your data.
        </p>

        <div className="text-left space-y-6">
          <div>
            <h2 className="text-xl font-semibold text-gray-800">
              1. Information We Collect
            </h2>
            <p className="text-gray-600">
              RSVPMe may collect user login information (via Auth0) and event
              details.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-gray-800">
              2. How We Use Your Data
            </h2>
            <p className="text-gray-600">
              Your data is used for RSVP event management. We do not sell or
              share your data.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-gray-800">
              3. Third-Party Services
            </h2>
            <p className="text-gray-600">
              We use services like Google Maps and Auth0 for enhanced
              functionality.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-gray-800">
              4. Data Security
            </h2>
            <p className="text-gray-600">
              We implement industry-standard security measures to protect your
              personal data. While we strive to use the most advanced and secure
              methods available, no system is completely immune to potential
              security threats. We continuously monitor and update our security
              protocols to safeguard your information.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-gray-800">
              5. Changes to Policy
            </h2>
            <p className="text-gray-600">
              This policy may change. Continued use means you accept the
              updates.
            </p>
          </div>
        </div>

        <Link to="/" className="block mt-6 text-blue-500 hover:underline">
          Back to Home
        </Link>
      </section>
    </main>
  );
};

export default PrivacyPolicy;
