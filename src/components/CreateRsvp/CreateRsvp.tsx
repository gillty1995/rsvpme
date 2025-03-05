import axios from "axios";
import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
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
import addBtnStatic from "../../assets/add-btn.svg";
import addBtnGif from "../../assets/add-btn.gif";
import addedStatic from "../../assets/added.svg";

const CreateRsvp: React.FC = () => {
  const { eventId } = useParams<{ eventId: string }>();
  const navigate = useNavigate();
  const [eventDetails, setEventDetails] = useState<any>(null);
  const [rsvpName, setRsvpName] = useState<string>("");
  const [rsvpList, setRsvpList] = useState<string[]>([]);
  const [hoveredNavIndex, setHoveredNavIndex] = useState<number | null>(null);
  const [hoveredTrashIndex, setHoveredTrashIndex] = useState<number | null>(
    null
  );
  const [isDeleteModalOpen, setDeleteModalOpen] = useState<boolean>(false);
  const [rsvpToDelete, setRsvpToDelete] = useState<string | null>(null);

  const { isAuthenticated, user, getAccessTokenSilently } = useAuth0();
  const [showChat, setShowChat] = useState(false);

  const [isAttending, setIsAttending] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

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

  useEffect(() => {
    if (isAuthenticated && eventId) {
      checkIfAttending();
    }
  }, [isAuthenticated, eventId]);

  const handleAddToEventList = async () => {
    setLoading(true);
    try {
      const token = await getAccessTokenSilently();
      await axios.post(
        `${import.meta.env.VITE_API_URL}/api/events/${eventId}/add-to-list`,
        {},
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setIsAttending(true); // Update state to reflect RSVP status
    } catch (error) {
      console.error("Error adding event to list", error);
      setError("Failed to add event.");
    }
    setLoading(false);
  };

  const checkIfAttending = async () => {
    try {
      const token = await getAccessTokenSilently();
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/events/my-events`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      console.log("My Events API Response:", response.data);

      const attendingEvents = response.data.attendingEvents || [];

      // Log attending event IDs and check for UUID vs ObjectId
      console.log(
        "Attending Events IDs:",
        attendingEvents.map((event: any) => ({
          id: event._id,
          type: typeof event._id,
          uniqueUrl: event.uniqueUrl || "No UUID",
        }))
      );

      // Ensure eventId is properly formatted
      const formattedEventId = (eventId || "").trim();
      console.log(
        "Current Event ID:",
        formattedEventId,
        "Type:",
        typeof formattedEventId
      );

      // ✅ Compare both `_id` (MongoDB ObjectId) and `uniqueUrl` (UUID)
      const isEventAdded = attendingEvents.some(
        (event: any) =>
          event._id.toString().trim() === formattedEventId ||
          (event.uniqueUrl && event.uniqueUrl.trim() === formattedEventId)
      );

      console.log("Is attending:", isEventAdded);
      setIsAttending(isEventAdded);
    } catch (error) {
      console.error("Error checking RSVP status", error);
      setError("Failed to check RSVP status.");
    }
  };

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
    setRsvpToDelete(name);
    setDeleteModalOpen(true);
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
            {/* Add to List / Added button */}
            <div className="relative flex items-center">
              {isAuthenticated &&
                eventDetails &&
                user?.sub !== eventDetails.createdBy &&
                (!isAttending ? (
                  <motion.button
                    onClick={handleAddToEventList}
                    disabled={loading}
                    className="py-2 px-4 rounded-lg transition-all duration-300"
                    onMouseEnter={() => setHoveredNavIndex(2)}
                    onMouseLeave={() => setHoveredNavIndex(null)}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <img
                      src={hoveredNavIndex === 2 ? addBtnGif : addBtnStatic}
                      alt="Add to List"
                      className="w-5 h-5 hover:opacity-80 transition-all duration-300"
                    />
                  </motion.button>
                ) : (
                  <div className="relative group">
                    <motion.img
                      src={addedStatic}
                      alt="Added"
                      className="w-5 h-5 opacity-80 cursor-pointer"
                      initial={{ scale: 0.8, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ duration: 0.3 }}
                    />
                    {/* Tooltip appears on hover */}
                    <div className="absolute left-1/2 transform -translate-x-1/2 -top-8 bg-gray-800 text-white text-sm px-4 py-2 rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">
                      You're attending this event!
                    </div>
                  </div>
                ))}
            </div>

            {error && <p className="text-red-500 mt-4">{error}</p>}
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
          {/* Chat Toggle Button (Toggles Chat On/Off) */}
          <motion.button
            onClick={() => setShowChat(!showChat)}
            className="fixed bottom-4 right-4 bg-blue-600 text-white p-3 rounded-full shadow-lg hover:bg-blue-500 transition-all z-50"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            💬 Chat
          </motion.button>

          {/* Click Outside to Close Chat */}
          {showChat && (
            <div
              className="fixed inset-0 bg-black bg-opacity-50 z-40"
              onClick={() => setShowChat(false)}
            />
          )}

          {/* Chat Component (No Close Button) */}
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
