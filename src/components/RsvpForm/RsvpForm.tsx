// auth0
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { eventOptions } from "../../utils/eventOptions";
import { useAuth0 } from "@auth0/auth0-react";

const RsvpForm: React.FC = () => {
  const [eventName, setEventName] = useState("");
  const [eventType, setEventType] = useState("");
  const [eventTime, setEventTime] = useState("");
  const [customMessage, setCustomMessage] = useState("");
  const [location, setLocation] = useState("");
  const [, setUniqueURL] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const navigate = useNavigate();

  // Use Auth0 hook to check user authentication
  const { user, isAuthenticated, loginWithRedirect, getAccessTokenSilently } =
    useAuth0();

  // Log the user ID if the user is authenticated
  useEffect(() => {
    if (isAuthenticated && user?.sub) {
      console.log("User is logged in. UserID:", user.sub);
    }
  }, [isAuthenticated, user]);

  const handleCreateRSVP = async () => {
    if (!isAuthenticated) {
      // Redirect to login if the user is not authenticated
      loginWithRedirect();
      return;
    }

    setLoading(true);
    setError(null);

    // Get the JWT token
    const token = await getAccessTokenSilently();

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/events`,
        {
          name: eventName,
          type: eventType,
          date: eventTime,
          location,
          description: customMessage,
          createdBy: user?.sub || undefined, // You can still send the userId if needed in the request body
        },
        {
          headers: token ? { Authorization: `Bearer ${token}` } : {},
        }
      );

      console.log("User ID (createdBy):", user?.sub);

      const { eventUrl } = response.data.event;
      if (eventUrl) {
        const eventId = eventUrl.split("/").pop();
        setUniqueURL(eventUrl);
        localStorage.setItem("eventType", eventType);

        navigate(`/created-rsvp/${eventId}`);
      } else {
        throw new Error("Event URL not found");
      }
    } catch (err: any) {
      setError("There was an error creating your event. Please try again.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    navigate("/");
  };

  return (
    <main className="text-center py-16 px-4 bg-gradient-to-r from-gray-300 via-white to-gray-400">
      <p className="mt-4 mb-8 font-rale font-extralight text-main-text text-lg">
        Fill out the form to create your RSVP event!
      </p>
      <section className="text-xl mb-8">
        <h2 className="font-rale font-regular text-main-text text-3xl mb-4">
          Welcome to my RSVP List for
        </h2>
        <div className="inline-block">
          <span className="inline-block border-b border-gray-40 font-rale font-regular text-main-text text-3xl">
            {eventName || "Event Title"} {eventType || "Event Type"} at{" "}
            {location || "Event Location"}!
          </span>
        </div>
      </section>
      {error && <p className="text-red-500 mb-4">{error}</p>}{" "}
      {/* Display Error */}
      <form className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-lg">
        {/* Input fields for event details */}
        <div className="flex flex-col sm:flex-row gap-4 mb-4">
          <div className="flex-1">
            <label
              htmlFor="eventName"
              className="block mb-2 text-lg font-medium"
            >
              Event Title
            </label>
            <input
              type="text"
              id="eventName"
              value={eventName}
              onChange={(e) => setEventName(e.target.value)}
              placeholder="Enter event title"
              className={`w-full p-3 border border-gray-300 rounded-md ${
                eventName ? "text-black" : "text-gray-400"
              }`}
            />
          </div>

          <div className="flex-1">
            <label
              htmlFor="eventType"
              className="block mb-2 text-lg font-medium"
            >
              Event Type
            </label>
            <select
              id="eventType"
              value={eventType}
              onChange={(e) => setEventType(e.target.value)}
              className={`w-full p-3 border border-gray-300 rounded-md ${
                eventType ? "text-black" : "text-gray-400"
              }`}
            >
              <option value="" disabled>
                Select option
              </option>
              {eventOptions.map((event, index) => (
                <option key={index} value={event}>
                  {event}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* More input fields */}
        <div className="mb-4">
          <label htmlFor="location" className="block mb-2 text-lg font-medium">
            Event Location
          </label>
          <input
            type="text"
            id="location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            placeholder="Enter event location"
            className="w-full p-3 border border-gray-300 rounded-md"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="eventTime" className="block mb-2 text-lg font-medium">
            Event Time
          </label>
          <input
            type="datetime-local"
            id="eventTime"
            value={eventTime}
            onChange={(e) => setEventTime(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-md"
          />
        </div>

        <div className="mb-4">
          <label
            htmlFor="customMessage"
            className="block mb-2 text-lg font-medium"
          >
            Custom Message (Optional)
          </label>
          <textarea
            id="customMessage"
            value={customMessage}
            onChange={(e) => setCustomMessage(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-md"
            rows={4}
          />
        </div>

        <button
          type="button"
          onClick={handleCreateRSVP}
          disabled={loading}
          className="bg-blue-500 text-white py-2 px-4 rounded-full hover:bg-blue-600 transition-all duration-500 w-full"
        >
          {loading ? "Creating..." : "Create RSVP"}
        </button>
      </form>
      <button
        onClick={handleCancel}
        className="mt-4 text-blue-500 py-2 px-4 hover:text-blue-800 transition-all duration-300"
      >
        Cancel
      </button>
    </main>
  );
};

export default RsvpForm;
