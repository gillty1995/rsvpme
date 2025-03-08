import React from "react";
import { Link } from "react-router-dom";

const TermsOfService: React.FC = () => {
  return (
    <main className="min-h-screen flex justify-center items-center bg-gradient-to-r from-gray-300 via-white to-gray-400">
      <section className="max-w-3xl w-full bg-white p-8 rounded-lg shadow-lg text-center">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">
          Terms of Service
        </h1>
        <p className="text-lg text-gray-600 mb-6">
          By using RSVPMe, you agree to the following terms and conditions.
        </p>

        <div className="text-left space-y-6">
          <div>
            <h2 className="text-xl font-semibold text-gray-800">
              1. Use of the Service
            </h2>
            <p className="text-gray-600">
              RSVPMe allows users to create and manage event RSVPs. You agree
              not to use the service for any unlawful or harmful activity.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-gray-800">
              2. Third-Party APIs
            </h2>
            <p className="text-gray-600">
              We integrate third-party APIs for location and authentication
              services. These services have their own terms.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-gray-800">
              3. Limitation of Liability
            </h2>
            <p className="text-gray-600">
              RSVPMe is provided as-is. We are not liable for any issues arising
              from its use.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-gray-800">
              4. Changes to Terms
            </h2>
            <p className="text-gray-600">
              These terms may be updated over time. Continued use means you
              accept the new terms.
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

export default TermsOfService;
