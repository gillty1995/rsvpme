import React, { useEffect, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import axios from "axios";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

import homeStatic from "../../assets/home.svg";
import homeGif from "../../assets/home.gif";

interface RSVP {
  _id: string;
  title: string;
  description: string;
  uniqueUrl: string;
}

const Rsvps: React.FC = () => {
  const { isAuthenticated, getAccessTokenSilently } = useAuth0();
  const navigate = useNavigate();
  const [rsvps, setRsvps] = useState<RSVP[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    if (!isAuthenticated) return;

    const fetchRsvps = async () => {
      setLoading(true);
      try {
        const token = await getAccessTokenSilently();
        const url = `${import.meta.env.VITE_API_URL}/api/events/my-events`;

        console.log("Fetching from URL:", url);
        const response = await axios.get(url, {
          headers: { Authorization: `Bearer ${token}` },
        });

        console.log("API Response:", response.data.events);
        setRsvps(response.data.events || []);
      } catch (err: any) {
        console.error(
          "Error fetching RSVPs:",
          err.response?.data || err.message
        );
        setError("Error fetching RSVPs");
      } finally {
        setLoading(false);
      }
    };

    fetchRsvps();
  }, [isAuthenticated, getAccessTokenSilently]);

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-gray-300 via-white to-gray-400">
        <p className="text-xl text-gray-700">
          Please log in to view your RSVPs.
        </p>
      </div>
    );
  }

  return (
    <main className="min-h-screen flex flex-col items-center py-16 px-4 bg-gradient-to-r from-gray-300 via-white to-gray-400">
      <motion.h1
        className="text-3xl font-semibold text-gray-800 mb-6"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        Your RSVPs
      </motion.h1>

      {/* Home Button */}
      <button
        onClick={() => navigate("/")}
        className="mb-6 flex items-center gap-2 text-blue-500 hover:text-blue-700 transition-all duration-300"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <img
          src={isHovered ? homeGif : homeStatic}
          alt="Home"
          className="w-5 h-5"
        />
        <span className="text-lg font-medium">Home</span>
      </button>

      {loading && <p className="text-lg text-gray-600">Loading RSVPs...</p>}
      {error && <p className="text-lg text-red-500">{error}</p>}

      {rsvps.length === 0 ? (
        <p className="text-lg text-gray-700">No RSVPs found.</p>
      ) : (
        <motion.ul
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 w-full max-w-5xl"
          initial="hidden"
          animate="visible"
          variants={{
            hidden: { opacity: 0 },
            visible: { opacity: 1, transition: { staggerChildren: 0.2 } },
          }}
        >
          {rsvps.map((rsvp) => (
            <motion.li
              key={rsvp._id}
              className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 cursor-pointer flex flex-col justify-between text-center"
              whileHover={{ scale: 1.03 }}
            >
              <h2 className="text-xl font-bold text-gray-800 ">{rsvp.title}</h2>
              <p className="text-gray-600 mt-2">{rsvp.description}</p>
              <button
                onClick={() => navigate(`/created-rsvp/${rsvp.uniqueUrl}`)}
                className="mt-4 text-blue-500 font-medium hover:text-blue-700 transition-all duration-300"
              >
                View RSVP →
              </button>
            </motion.li>
          ))}
        </motion.ul>
      )}
    </main>
  );
};

export default Rsvps;
