import React from "react";
import ModalWithForm from "../ModalWithForm/ModalWithForm";

interface ShareRsvpModalProps {
  isOpen: boolean;
  onClose: () => void;
  uniqueURL: string;
}

const ShareRsvpModal: React.FC<ShareRsvpModalProps> = ({
  isOpen,
  onClose,
  uniqueURL,
}) => {
  return (
    <ModalWithForm title="Share Your RSVP" isOpen={isOpen} onClose={onClose}>
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
  );
};

export default ShareRsvpModal;
