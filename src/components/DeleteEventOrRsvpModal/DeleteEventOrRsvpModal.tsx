import React from "react";
import ModalWithForm from "../ModalWithForm/ModalWithForm";

interface DeleteEventOrRsvpModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  itemName: string;
  itemType: string;
  itemLocation: string;
}

const DeleteEventOrRsvpModal: React.FC<DeleteEventOrRsvpModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  itemName,
  itemType,
  itemLocation,
}) => {
  return (
    <ModalWithForm title="Confirm Deletion" isOpen={isOpen} onClose={onClose}>
      {/* Event title formatted like it is in the cards */}
      <h2 className="text-xl font-bold text-gray-800 mb-2">
        {itemName} {itemType} at {itemLocation}
      </h2>

      <p className="mb-4 text-gray-700">
        Are you sure you want to delete this event?
      </p>

      <div className="flex justify-center space-x-4">
        <button
          onClick={onClose}
          className="bg-gray-300 text-gray-700 px-4 py-2 rounded hover:bg-gray-400 transition-all"
        >
          Cancel
        </button>
        <button
          onClick={onConfirm}
          className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition-all"
        >
          Delete
        </button>
      </div>
    </ModalWithForm>
  );
};

export default DeleteEventOrRsvpModal;
