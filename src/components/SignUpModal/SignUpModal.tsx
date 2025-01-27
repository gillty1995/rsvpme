import React, { useState } from "react";
import ModalWithForm from "../ModalWithForm/ModalWithForm";

interface SignUpModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const SignUpModal: React.FC<SignUpModalProps> = ({ isOpen, onClose }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Sign Up submitted", { email, password });
    // Add your signup logic here
  };

  const handleThirdPartyLogin = (platform: string) => {
    console.log(`Sign up via ${platform}`);
    // Add Google, Apple, etc., sign up logic here
  };

  return (
    <ModalWithForm title="Sign Up" isOpen={isOpen} onClose={onClose}>
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
          Sign Up
        </button>
      </form>

      {/* Social Media Buttons */}
      <div className="flex justify-center space-x-4 mt-4">
        <button
          onClick={() => handleThirdPartyLogin("Google")}
          className="bg-red-500 text-white py-2 px-4 rounded-full hover:bg-red-600 transition-all duration-300"
        >
          Sign Up with Google
        </button>
        <button
          onClick={() => handleThirdPartyLogin("Apple")}
          className="bg-black text-white py-2 px-4 rounded-full hover:bg-gray-800 transition-all duration-300"
        >
          Sign Up with Apple
        </button>
      </div>
    </ModalWithForm>
  );
};

export default SignUpModal;
