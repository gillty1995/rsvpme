import axios from "axios";
import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom"; // Import useNavigate for navigation
import { format } from "date-fns";
import { motion } from "framer-motion";
import { useAuth0 } from "@auth0/auth0-react";

import DeleteModal from "../DeleteModal/DeleteModal";
import Chat from "../Chat/Chat";

import trashStatic from "../../assets/trash.svg";
import trashGif from "../../assets/trash.gif";
import homeStatic from "../../assets/home.svg";
import homeGif from "../../assets/home.gif";
import shareStatic from "../../assets/share.svg";
import shareGif from "../../assets/share.gif";

const CreateRsvp: React.FC = () => {
  const { eventId } = useParams<{ eventId: string }>();
  const navigate = useNavigate(); // Initialize navigate hook
  const [eventDetails, setEventDetails] = useState<any>(null);
  const [rsvpName, setRsvpName] = useState<string>("");
  const [rsvpList, setRsvpList] = useState<string[]>([]);
  const [hoveredNavIndex, setHoveredNavIndex] = useState<number | null>(null);
  const [hoveredTrashIndex, setHoveredTrashIndex] = useState<number | null>(
    null
  );
  const [isDeleteModalOpen, setDeleteModalOpen] = useState<boolean>(false);
  const [rsvpToDelete, setRsvpToDelete] = useState<string | null>(null);

  const { isAuthenticated } = useAuth0();
  const [showChat, setShowChat] = useState(false);

  // Load RSVP list from localStorage on component mount
  useEffect(() => {
    if (eventId) {
      const savedRsvpList = localStorage.getItem(`rsvpList-${eventId}`);
      if (savedRsvpList) {
        setRsvpList(JSON.parse(savedRsvpList));
      }
    }
  }, [eventId]);

  // Fetch event details when the eventId is available
  useEffect(() => {
    if (eventId) {
      axios
        .get(`${import.meta.env.VITE_API_URL}/api/events/${eventId}`)
        .then((response) => {
          setEventDetails(response.data.event);
        })
        .catch((error) => {
          console.error("Error fetching event details", error);
        });
    }
  }, [eventId]);

  // Handle adding an RSVP name to the list
  const handleAddRsvp = () => {
    if (rsvpName.trim() !== "") {
      const updatedList = [...rsvpList, rsvpName];
      setRsvpList(updatedList);
      if (eventId) {
        localStorage.setItem(
          `rsvpList-${eventId}`,
          JSON.stringify(updatedList)
        );
      }
      setRsvpName(""); // Clear the input field
    }
  };

  // Handle deleting an RSVP name from the list
  const handleDeleteRsvp = (name: string) => {
    setRsvpToDelete(name); // Store the name of the RSVP to delete
    setDeleteModalOpen(true); // Open the delete modal
  };

  const confirmDelete = () => {
    if (rsvpToDelete) {
      const updatedList = rsvpList.filter((rsvp) => rsvp !== rsvpToDelete);
      setRsvpList(updatedList);
      if (eventId) {
        localStorage.setItem(
          `rsvpList-${eventId}`,
          JSON.stringify(updatedList)
        );
      }
    }
    setDeleteModalOpen(false); // Close the modal after confirmation
    setRsvpToDelete(null); // Reset the RSVP to delete
  };

  // Handle home button click to navigate to the home page
  const handleHomeClick = () => {
    navigate("/"); // Redirect to the home page
  };

  // Handle share button click
  const handleShareClick = () => {
    if (eventDetails) {
      const shareMessage = `Check out this event: ${eventDetails.name} ${eventDetails.type} at ${eventDetails.location}. RSVP now!\n${window.location.href}`;

      if (navigator.share) {
        navigator.share({
          text: shareMessage,
        });
      } else {
        alert("Share functionality is not supported on this device.");
      }
    }
  };

  return (
    <main className="min-h-screen flex flex-col items-center justify-center py-16 px-4 bg-gradient-to-r from-gray-300 via-white to-gray-400">
      <motion.p
        className="mt-4 mb-4 font-rale font-extralight text-main-text text-lg text-center"
        initial="hidden"
        animate="visible"
        variants={{
          hidden: { opacity: 0, y: 20 },
          visible: {
            opacity: 1,
            y: 0,
            transition: { delay: 0.4, duration: 0.6 },
          },
        }}
      >
        You’re about to RSVP for an event! Here are the details.
      </motion.p>

      {/* Animated RSVP Details Section */}
      <section className="text-xl mb-8 text-center">
        <motion.div
          className="inline-block"
          initial="hidden"
          animate="visible"
          variants={{
            hidden: { opacity: 0, y: 20 },
            visible: {
              opacity: 1,
              y: 0,
              transition: { delay: 0.6, duration: 0.6 },
            },
          }}
        >
          <span className="inline-block border-b border-gray-40 font-rale font-regular text-main-text text-3xl">
            {eventDetails ? (
              <>
                {eventDetails.name || "Event Title"}{" "}
                {eventDetails.type || "Event Type"} at{" "}
                {eventDetails.location || "Event Location"}
              </>
            ) : (
              "Loading event details..."
            )}
          </span>
        </motion.div>
      </section>

      {eventDetails ? (
        <div className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-lg">
          {/* RSVP details */}
          <motion.p
            className="text-lg mb-2"
            initial="hidden"
            animate="visible"
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: {
                opacity: 1,
                y: 0,
                transition: { delay: 1, duration: 1.2 },
              },
            }}
          >
            <strong>Event:</strong> {eventDetails.name} {eventDetails.type}
          </motion.p>
          <motion.p
            className="text-lg mb-2"
            initial="hidden"
            animate="visible"
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: {
                opacity: 1,
                y: 0,
                transition: { delay: 1.3, duration: 1.2 },
              },
            }}
          >
            <strong>Time:</strong>{" "}
            {format(new Date(eventDetails.date), "MMM d, yyyy h:mm a")}
          </motion.p>
          <motion.p
            className="text-lg mb-2"
            initial="hidden"
            animate="visible"
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: {
                opacity: 1,
                y: 0,
                transition: { delay: 1.6, duration: 1.2 },
              },
            }}
          >
            <strong>Location:</strong> {eventDetails.location}
          </motion.p>
          <motion.p
            className="text-lg mb-2"
            initial="hidden"
            animate="visible"
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: {
                opacity: 1,
                y: 0,
                transition: { delay: 1.9, duration: 1.2 },
              },
            }}
          >
            <strong>Description:</strong>{" "}
            {eventDetails.description || "No description available"}
          </motion.p>

          {/* Add buttons */}
          <div className="flex justify-between mb-2">
            <button
              onClick={handleHomeClick}
              className="py-2 px-4 rounded-lg transition-all duration-300"
              onMouseEnter={() => setHoveredNavIndex(0)}
              onMouseLeave={() => setHoveredNavIndex(null)}
            >
              <img
                src={hoveredNavIndex === 0 ? homeGif : homeStatic}
                alt="Home"
                className="w-5 h-5 hover:opacity-80 transition-all duration-300"
              />
            </button>
            <button
              onClick={handleShareClick}
              className="py-2 px-4 rounded-lg transition-all duration-300"
              onMouseEnter={() => setHoveredNavIndex(1)}
              onMouseLeave={() => setHoveredNavIndex(null)}
            >
              <img
                src={hoveredNavIndex === 1 ? shareGif : shareStatic}
                alt="Share"
                className="w-4 h-4 hover:opacity-80 transition-all duration-300"
              />
            </button>
          </div>

          {/* RSVP Form */}
          <div className="mb-4">
            <input
              type="text"
              value={rsvpName}
              onChange={(e) => setRsvpName(e.target.value)}
              placeholder="Enter your name"
              className="w-full p-3 border border-gray-300 rounded-md"
            />
          </div>

          <button
            onClick={handleAddRsvp}
            className="bg-blue-500 text-white py-2 px-4 rounded-full hover:bg-blue-600 transition-all duration-500 w-full"
          >
            Add Your Name
          </button>
          {/* RSVP List */}
          <ul className="mt-4">
            {rsvpList.length > 0 ? (
              rsvpList.map((rsvp, index) => (
                <li key={index} className="flex items-center justify-between">
                  {rsvp}
                  <button
                    onClick={() => handleDeleteRsvp(rsvp)}
                    onMouseEnter={() => setHoveredTrashIndex(index)}
                    onMouseLeave={() => setHoveredTrashIndex(null)}
                    className="ml-2 w-5 h-5"
                  >
                    <img
                      src={hoveredTrashIndex === index ? trashGif : trashStatic}
                      alt="Delete"
                      className="w-full h-full object-contain"
                    />
                  </button>
                </li>
              ))
            ) : (
              <p>No one has RSVP'd yet.</p>
            )}
          </ul>
        </div>
      ) : (
        <p>Loading event details...</p>
      )}

      {isAuthenticated && (
        <>
          {/* ✅ Chat Toggle Button (Toggles Chat On/Off) */}
          <motion.button
            onClick={() => setShowChat(!showChat)}
            className="fixed bottom-4 right-4 bg-blue-600 text-white p-3 rounded-full shadow-lg hover:bg-blue-500 transition-all z-50"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            💬 Chat
          </motion.button>

          {/* ✅ Click Outside to Close Chat */}
          {showChat && (
            <div
              className="fixed inset-0 bg-black bg-opacity-50 z-40"
              onClick={() => setShowChat(false)}
            />
          )}

          {/* ✅ Chat Component (No Close Button) */}
          {showChat && (
            <div className="fixed bottom-16 right-4 z-50">
              <Chat eventId={eventId as string} />
            </div>
          )}
        </>
      )}

      <DeleteModal
        isOpen={isDeleteModalOpen}
        onClose={() => setDeleteModalOpen(false)}
        onConfirm={confirmDelete}
        name={rsvpToDelete || ""}
      />
    </main>
  );
};

export default CreateRsvp;
