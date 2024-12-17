import React, { ReactNode } from "react";

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
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96 text-center">
        <h2 className="text-2xl font-medium mb-4">{title}</h2>
        {children}
        <button
          onClick={onClose}
          className="mt-4 bg-blue-500 text-white py-2 px-4 rounded-full hover:bg-blue-600 transition-all duration-300"
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default ModalWithForm;
