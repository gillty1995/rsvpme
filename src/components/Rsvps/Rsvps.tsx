import React, { useEffect, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import axios from "axios";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

import DeleteEventOrRsvpModal from "../DeleteEventOrRsvpModal/DeleteEventOrRsvpModal";

import homeStatic from "../../assets/home.svg";
import homeGif from "../../assets/home.gif";
import trashStatic from "../../assets/trash.svg";
import trashGif from "../../assets/trash.gif";

interface RSVP {
  name: string;
  _id: string;
  type: string;
  location: string;
  description: string;
  uniqueUrl: string;
}

const Rsvps: React.FC = () => {
  const { isAuthenticated, getAccessTokenSilently } = useAuth0();
  const navigate = useNavigate();
  const [rsvps, setRsvps] = useState<RSVP[]>([]);
  const [attendingEvents, setAttendingEvents] = useState<RSVP[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [hoveredTrashIndex, setHoveredTrashIndex] = useState<number | null>(
    null
  );
  const [hoveredAttendingIndex, setHoveredAttendingIndex] = useState<
    number | null
  >(null);
  const [hoveredAttendingTrashIndex, setHoveredAttendingTrashIndex] = useState<
    number | null
  >(null);
  const [hoveredCreatedTrashIndex, setHoveredCreatedTrashIndex] = useState<
    number | null
  >(null);

  const [isDeleteModalOpen, setDeleteModalOpen] = useState<boolean>(false);
  const [itemToDelete, setItemToDelete] = useState<{
    name: string;
    type: string;
    location: string;
    uniqueUrl: string;
  } | null>(null);
  const [deleteType, setDeleteType] = useState<"event" | "rsvp">("event");

  const confirmDelete = (
    name: string,
    type: string,
    location: string,
    uniqueUrl: string,
    deleteType: "event" | "rsvp"
  ) => {
    setItemToDelete({ name, type, location, uniqueUrl });
    setDeleteType(deleteType);
    setDeleteModalOpen(true);
  };

  // Executes delete action
  const handleDeleteConfirmed = async () => {
    if (!itemToDelete) return;

    try {
      const token = await getAccessTokenSilently();
      const url =
        deleteType === "event"
          ? `${import.meta.env.VITE_API_URL}/api/events/${
              itemToDelete.uniqueUrl
            }`
          : `${import.meta.env.VITE_API_URL}/api/events/${
              itemToDelete.uniqueUrl
            }/remove-from-list`;

      await axios.delete(url, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (deleteType === "event") {
        setRsvps((prev) =>
          prev.filter((event) => event.uniqueUrl !== itemToDelete.uniqueUrl)
        );
      } else {
        setAttendingEvents((prev) =>
          prev.filter((event) => event.uniqueUrl !== itemToDelete.uniqueUrl)
        );
      }

      setDeleteModalOpen(false);
      setItemToDelete(null);
    } catch (err: any) {
      setError("Error deleting item");
    }
  };

  const formatLocation = (fullAddress: string) => {
    if (!fullAddress) return "Event Location";
    return fullAddress.split(",")[0].trim();
  };

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

        console.log("API Response:", response.data);

        setRsvps(
          response.data.createdEvents.map((event: any) => ({
            _id: event._id,
            name: event.name || "Untitled Event",
            type: event.type || "General Event",
            location: event.location || "Unknown Location",
            description: event.description || "No description available",
            uniqueUrl: event.uniqueUrl,
          })) || []
        );

        setAttendingEvents(
          response.data.attendingEvents.map((event: any) => ({
            _id: event._id,
            name: event.name || "Untitled Event",
            type: event.type || "General Event",
            location: event.location || "Unknown Location",
            description: event.description || "No description available",
            uniqueUrl: event.uniqueUrl,
          })) || []
        );
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
      <motion.button
        onClick={() => navigate("/")}
        className="mb-6 flex items-center gap-2 text-blue-500 hover:text-blue-700 transition-all duration-300"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        whileHover={{ scale: 1.05 }}
      >
        <motion.img
          src={isHovered ? homeGif : homeStatic}
          alt="Home"
          className="w-5 h-5"
          animate={{ opacity: isHovered ? 1 : 0.8 }}
          transition={{ duration: 0.2 }}
        />
        <span className="text-lg font-medium">Home</span>
      </motion.button>

      {loading && <p className="text-lg text-gray-600">Loading RSVPs...</p>}
      {error && <p className="text-lg text-red-500">{error}</p>}

      {/* Created Events Section */}
      <h2 className="text-2xl font-semibold text-gray-800 mb-4">
        Created Events
      </h2>
      <motion.ul
        className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 w-full max-w-5xl"
        initial="hidden"
        animate="visible"
        variants={{
          hidden: { opacity: 0 },
          visible: { opacity: 1, transition: { staggerChildren: 0.2 } },
        }}
      >
        {rsvps.map((rsvp, index) => (
          <motion.li
            key={rsvp._id}
            className="bg-white p-6 rounded-lg shadow-lg relative"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
            onMouseEnter={() => setHoveredTrashIndex(index)}
            onMouseLeave={() => setHoveredTrashIndex(null)}
          >
            <h2 className="text-xl font-bold">
              {rsvp.name} {rsvp.type} at {formatLocation(rsvp.location)}
            </h2>

            <button
              onClick={() => navigate(`/created-rsvp/${rsvp.uniqueUrl}`)}
              className="mt-4 text-blue-500 hover:text-blue-700 transition-colors duration-300"
            >
              View RSVP →
            </button>

            {/* Trash Button animation triggers only when hovering over it) */}
            {hoveredTrashIndex === index && (
              <motion.button
                onClick={() =>
                  confirmDelete(
                    rsvp.name,
                    rsvp.type,
                    formatLocation(rsvp.location),
                    rsvp.uniqueUrl,
                    "event"
                  )
                }
                className="absolute top-2 right-2 w-5 h-5"
                onMouseEnter={() => setHoveredCreatedTrashIndex(index)}
                onMouseLeave={() => setHoveredCreatedTrashIndex(null)}
                whileHover={{ scale: 1.2 }}
              >
                <motion.img
                  src={
                    hoveredCreatedTrashIndex === index ? trashGif : trashStatic
                  }
                  alt="Delete"
                  className="w-full h-full object-contain"
                  animate={{
                    opacity: hoveredCreatedTrashIndex === index ? 1 : 0.8,
                  }}
                  transition={{ duration: 0.2 }}
                />
              </motion.button>
            )}
          </motion.li>
        ))}
      </motion.ul>

      {/* Attending Events Section */}
      <h2 className="text-2xl font-semibold text-gray-800 mt-10 mb-4">
        Attending
      </h2>
      <motion.ul
        className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 w-full max-w-5xl"
        initial="hidden"
        animate="visible"
        variants={{
          hidden: { opacity: 0 },
          visible: { opacity: 1, transition: { staggerChildren: 0.2 } },
        }}
      >
        {attendingEvents.map((event, index) => (
          <motion.li
            key={event._id}
            className="bg-white p-6 rounded-lg shadow-lg relative"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
            onMouseEnter={() => setHoveredAttendingIndex(index)}
            onMouseLeave={() => setHoveredAttendingIndex(null)}
          >
            <h2 className="text-xl font-bold">
              {event.name} {event.type} at {formatLocation(event.location)}
            </h2>
            <button
              onClick={() => navigate(`/created-rsvp/${event.uniqueUrl}`)}
              className="mt-4 text-blue-500 hover:text-blue-700 transition-colors duration-300"
            >
              View RSVP →
            </button>

            {/* Delete Attendance Button (Only visible on hover) */}
            {hoveredAttendingIndex === index && (
              <motion.button
                onClick={() =>
                  confirmDelete(
                    event.name,
                    event.type,
                    formatLocation(event.location),
                    event.uniqueUrl,
                    "rsvp"
                  )
                }
                onMouseEnter={() => setHoveredAttendingTrashIndex(index)}
                onMouseLeave={() => setHoveredAttendingTrashIndex(null)}
                className="absolute top-2 right-2 w-5 h-5"
                whileHover={{ scale: 1.2 }}
              >
                <motion.img
                  src={
                    hoveredAttendingTrashIndex === index
                      ? trashGif
                      : trashStatic
                  }
                  alt="Remove Attendance"
                  className="w-full h-full object-contain"
                  animate={{
                    opacity: hoveredAttendingTrashIndex === index ? 1 : 0.8,
                  }}
                  transition={{ duration: 0.2 }}
                />
              </motion.button>
            )}
          </motion.li>
        ))}
      </motion.ul>
      {/* Delete Modal */}
      <DeleteEventOrRsvpModal
        isOpen={isDeleteModalOpen}
        onClose={() => setDeleteModalOpen(false)}
        onConfirm={handleDeleteConfirmed}
        itemName={itemToDelete?.name || ""}
        itemType={itemToDelete?.type || ""}
        itemLocation={itemToDelete?.location || ""}
      />
    </main>
  );
};

export default Rsvps;
