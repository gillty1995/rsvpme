import React, { useState } from "react";
import ModalWithForm from "../ModalWithForm/ModalWithForm";

const eventOptions = [
  "Birthday Party",
  "Anniversary Party",
  "Christmas",
  "Hannukah",
  "Lunch",
  "Team Meeting",
  "Thanksgiving Dinner",
  "Dinner Party",
  "Pool Party",
  "Pizza Party",
];

const RsvpForm: React.FC = () => {
  const [eventName, setEventName] = useState("");
  const [eventType, setEventType] = useState(eventOptions[0]);
  const [customMessage, setCustomMessage] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [uniqueURL, setUniqueURL] = useState("");

  const handleShareRSVP = () => {
    // Generate a unique URL (placeholder logic)
    const newUniqueURL = `https://example.com/rsvp/${Date.now()}`;
    setUniqueURL(newUniqueURL);
    setShowModal(true);
  };

  return (
    <main className="text-center py-16 px-4">
      {/* Header */}
      <section className="text-xl mb-11 pb-5">
        <h2 className="font-rale font-regular text-main-text text-3xl">
          Welcome to my RSVP List for{" "}
          <span className="inline-block border-b border-gray-400 w-1/2">
            <input
              type="text"
              placeholder="Event Title"
              value={eventName}
              maxLength={30}
              onChange={(e) => setEventName(e.target.value)}
              className="bg-transparent text-center text-3xl outline-none w-full"
            />
          </span>
          !
        </h2>
        <p className="mt-4 font-rale font-extralight text-main-text">
          Fill out the form to share your RSVP event!
        </p>
      </section>

      {/* Event Form */}
      <form className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-lg">
        {/* Event Type Dropdown */}
        <div className="mb-4">
          <label htmlFor="eventType" className="block mb-2 text-lg font-medium">
            Event Type
          </label>
          <select
            id="eventType"
            value={eventType}
            onChange={(e) => setEventType(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-md"
          >
            {eventOptions.map((event, index) => (
              <option key={index} value={event}>
                {event}
              </option>
            ))}
          </select>
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
          className="bg-green-500 text-white py-2 px-4 rounded-full hover:bg-green-600 transition-all duration-300 w-full"
        >
          Share RSVP
        </button>
      </form>

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
