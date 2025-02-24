import React, { ReactNode, useEffect } from "react";
import { motion } from "framer-motion"; // Import motion for animation

interface ModalWithFormProps {
  title: string;
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
}

const ModalWithForm: React.FC<ModalWithFormProps> = ({
  title,
  isOpen,
  onClose,
  children,
}) => {
  useEffect(() => {
    // Close modal on Escape key press
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [onClose]);

  // Close modal when clicking outside of it
  const handleModalClick = (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent the click from propagating to the backdrop
    onClose(); // Close the modal
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 p-4"
      onClick={handleModalClick}
    >
      <div
        className="bg-white p-6 rounded-lg shadow-lg w-96 text-center relative"
        onClick={(e) => e.stopPropagation()}
      >
        <motion.button
          onClick={onClose}
          className="absolute top-0 right-1 p-2 text-black"
          initial={{ rotate: 0, opacity: 0 }}
          animate={{ rotate: 45, opacity: 1 }}
          exit={{ rotate: 0, opacity: 0 }}
          transition={{ duration: 0.3 }}
          whileHover={{ scale: 1.1, rotate: 90 }}
          whileTap={{ scale: 0.9 }}
        >
          <span className="text-xl">X</span>
        </motion.button>

        <h2 className="text-2xl font-medium mb-4">{title}</h2>
        {children}
      </div>
    </div>
  );
};

export default ModalWithForm;
