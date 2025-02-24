import React, { useEffect, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import axios from "axios";
import { motion } from "framer-motion";

interface RSVP {
  _id: string;
  title: string;
  description: string;
  uniqueUrl: string;
}

const Rsvps: React.FC = () => {
  const { isAuthenticated, getAccessTokenSilently } = useAuth0();
  const [rsvps, setRsvps] = useState<RSVP[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!isAuthenticated) return;

    const fetchRsvps = async () => {
      setLoading(true);
      try {
        const token = await getAccessTokenSilently();

        // Correct API URL (matches backend)
        const url = `${import.meta.env.VITE_API_URL}/api/events/my-events`;

        console.log("Fetching from URL:", url);

        // Send request with Authorization header
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
    return <p>Please log in to view your RSVPs.</p>;
  }

  if (loading) {
    return <p>Loading RSVPs...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div>
      <h1>Your RSVPs</h1>
      {rsvps.length === 0 ? (
        <p>No RSVPs found.</p>
      ) : (
        <ul>
          {rsvps.map((rsvp) => (
            <motion.li
              key={rsvp._id}
              className="rsvp-item"
              whileHover={{ scale: 1.05 }}
            >
              <h2>{rsvp.title}</h2>
              <p>{rsvp.description}</p>
              <span>View RSVP</span>
            </motion.li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Rsvps;
