import React, { useState } from "react";
import LoginModal from "../LoginModal/LoginModal";
import SignUpModal from "../SignUpModal/SignUpModal";

const Header: React.FC = () => {
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isSignUpModalOpen, setIsSignUpModalOpen] = useState(false);

  const handleLoginOpen = () => {
    setIsLoginModalOpen(true);
    setIsSignUpModalOpen(false); // Close SignUpModal if it's open
  };
  const handleLoginClose = () => setIsLoginModalOpen(false);

  const handleSignUpOpen = () => {
    setIsSignUpModalOpen(true);
    setIsLoginModalOpen(false); // Close LoginModal if it's open
  };
  const handleSignUpClose = () => setIsSignUpModalOpen(false);

  return (
    <>
      <header className="bg-gradient-to-b from-header-bg to-bg-gradient p-4 flex justify-between items-center">
        <div className="font-rale font-thin text-header-text text-5xl absolute left-1/2 transform -translate-x-1/2">
          R S V P Me
        </div>
        <nav className="ml-auto">
          <ul className="flex space-x-4">
            <li>
              <button
                className="text-white text-lg hover:text-gray-200"
                onClick={handleLoginOpen}
              >
                Login
              </button>
            </li>
            <li>
              <button className="text-white text-lg hover:text-gray-200">
                About
              </button>
            </li>
            <li>
              <button className="text-white text-lg hover:text-gray-200">
                Contact
              </button>
            </li>
          </ul>
        </nav>
      </header>

      {/* Modals */}
      <LoginModal
        isOpen={isLoginModalOpen}
        onClose={handleLoginClose}
        openSignUp={handleSignUpOpen} // Pass the openSignUp function to LoginModal
      />
      <SignUpModal isOpen={isSignUpModalOpen} onClose={handleSignUpClose} />
    </>
  );
};

export default Header;
