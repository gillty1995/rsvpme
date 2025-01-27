import React, { useState } from "react";
import ModalWithForm from "../ModalWithForm/ModalWithForm";

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  openSignUp: () => void; // Function to open SignUpModal
}

const LoginModal: React.FC<LoginModalProps> = ({
  isOpen,
  onClose,
  openSignUp,
}) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Login submitted", { email, password });
    // Add your login logic here
  };

  return (
    <ModalWithForm title="Login" isOpen={isOpen} onClose={onClose}>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col space-y-4 text-left mt-8"
      >
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="p-2 border rounded focus:outline-none focus:ring focus:border-blue-300"
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="p-2 border rounded focus:outline-none focus:ring focus:border-blue-300"
          required
        />
        <button
          type="submit"
          className="bg-blue-500 text-white py-2 px-4 rounded-full hover:bg-blue-600 transition-all duration-300"
        >
          Log In
        </button>
        <button
          onClick={openSignUp} // Trigger SignUpModal
          type="button"
          className="text-blue-500 py-2 px-4 hover:text-blue-800 transition-all duration-300"
        >
          Don’t have an account? Sign Up
        </button>
      </form>
    </ModalWithForm>
  );
};

export default LoginModal;
