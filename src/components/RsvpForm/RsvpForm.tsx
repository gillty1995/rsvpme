import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import ModalWithForm from "../ModalWithForm/ModalWithForm";

import { eventOptions } from "../../utils/eventOptions";

const RsvpForm: React.FC = () => {
  const [eventName, setEventName] = useState("");
  const [eventType, setEventType] = useState("");
  const [customMessage, setCustomMessage] = useState("");
  const [location, setLocation] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [uniqueURL, setUniqueURL] = useState("");

  const navigate = useNavigate();

  const handleShareRSVP = () => {
    const newUniqueURL = `https://example.com/rsvp/${Date.now()}`;
    setUniqueURL(newUniqueURL);
    setShowModal(true);
  };

  const handleCancel = () => {
    navigate("/");
  };

  return (
    <main className="text-center py-16 px-4">
      {/* Instruction */}
      <p className="mt-4 mb-8 font-rale font-extralight text-main-text text-lg">
        Fill out the form to share your RSVP event!
      </p>

      {/* Header */}
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

      {/* Event Form */}
      <form className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-lg">
        {/* Title Input and Event Type Dropdown */}
        <div className="flex flex-col sm:flex-row gap-4 mb-4">
          {/* Title Input */}
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
              placeholder="Enter event title"
              value={eventName}
              maxLength={30}
              onChange={(e) => setEventName(e.target.value)}
              className={`w-full p-3 border border-gray-300 rounded-md ${
                eventName ? "text-black" : "text-gray-400"
              }`}
            />
          </div>

          {/* Event Type Dropdown */}
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

        {/* Location Input */}
        <div className="mb-4">
          <label htmlFor="location" className="block mb-2 text-lg font-medium">
            Event Location
          </label>
          <input
            type="text"
            id="location"
            placeholder="Enter event location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className={`w-full p-3 border border-gray-300 rounded-md ${
              location ? "text-black" : "text-gray-400"
            }`}
          />
        </div>

        {/* Custom Message */}
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
          ></textarea>
        </div>

        {/* Share RSVP Button */}
        <button
          type="button"
          onClick={handleShareRSVP}
          className="bg-blue-500 text-white py-2 px-4 rounded-full hover:bg-blue-600 transition-all duration-500 w-full"
        >
          Share RSVP
        </button>
      </form>

      <button
        onClick={handleCancel}
        className="mt-4 text-blue-500 py-2 px-4 hover:text-blue-800 transition-all duration-300"
      >
        Cancel
      </button>

      {/* Modal for Sharing RSVP */}
      <ModalWithForm
        title="Share Your RSVP"
        isOpen={showModal}
        onClose={() => setShowModal(false)}
      >
        <p className="mb-4">
          Copy and share this link to invite others to RSVP to your event:
        </p>
        <div className="flex items-center gap-2 mb-4">
          <input
            type="text"
            value={uniqueURL}
            readOnly
            className="w-full p-2 border border-gray-300 rounded-md"
          />
          <button
            onClick={() => navigator.clipboard.writeText(uniqueURL)}
            className="bg-blue-500 text-white py-2 px-4 rounded-full hover:bg-blue-600 transition-all duration-300"
          >
            Copy
          </button>
        </div>
        <button
          onClick={() => console.log("Email functionality here")}
          className="bg-gray-500 text-white py-2 px-4 rounded-full hover:bg-gray-600 transition-all duration-300"
        >
          Email
        </button>
        <button
          onClick={() => console.log("Text functionality here")}
          className="bg-gray-500 text-white py-2 px-4 rounded-full hover:bg-gray-600 transition-all duration-300 ml-2"
        >
          Text
        </button>
      </ModalWithForm>
    </main>
  );
};

export default RsvpForm;
