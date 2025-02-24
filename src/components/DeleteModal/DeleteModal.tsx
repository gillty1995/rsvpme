import React from "react";
import ModalWithForm from "../ModalWithForm/ModalWithForm";

interface DeleteModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  name: string;
}

const DeleteModal: React.FC<DeleteModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  name,
}) => {
  return (
    <ModalWithForm title="Delete RSVP" isOpen={isOpen} onClose={onClose}>
      <p className="mb-4">
        Are you sure you want to delete {name} from the RSVP list?
      </p>
      <div className="flex justify-around">
        <button
          onClick={onClose}
          className="bg-gray-300 hover:bg-gray-400 transition-all duration-500 text-black py-2 px-4 rounded-md"
        >
          Cancel
        </button>
        <button
          onClick={onConfirm}
          className="bg-blue-500 hover:bg-blue-600 transition-all duration-500 text-white py-2 px-4 rounded-md"
        >
          Delete
        </button>
      </div>
    </ModalWithForm>
  );
};

export default DeleteModal;
