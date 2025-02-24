import React, { useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion"; // Import Framer Motion
import LoginModal from "../LoginModal/LoginModal";
import SignUpModal from "../SignUpModal/SignUpModal";

interface HeaderProps {
  aboutRef: React.RefObject<HTMLDivElement>;
  contactRef: React.RefObject<HTMLDivElement>;
  rsvpsRef: React.RefObject<HTMLDivElement>;
}

const Header: React.FC<HeaderProps> = ({ aboutRef, contactRef }) => {
  const { logout, isAuthenticated } = useAuth0();
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isSignUpModalOpen, setIsSignUpModalOpen] = useState(false);
  const navigate = useNavigate();

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

  const scrollToSection = (ref: React.RefObject<HTMLDivElement>) => {
    if (ref.current) {
      ref.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      <header className="bg-gradient-to-b from-header-bg to-bg-gradient p-4 flex justify-between items-center">
        {/* Logo */}
        <div className="font-rale font-thin text-header-text text-5xl absolute left-1/2 transform -translate-x-1/2">
          R S V P Me
        </div>

        {/* Navigation */}
        <nav className="ml-auto">
          <ul className="flex space-x-4">
            {/* Show different buttons based on authentication status */}
            {isAuthenticated ? (
              <>
                <li>
                  <motion.button
                    className="text-white text-lg hover:text-gray-200"
                    onClick={() => logout()}
                    whileHover={{ scale: 1.1 }} // Add hover bounce animation
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    Logout
                  </motion.button>
                </li>
                <li>
                  <motion.button
                    className="text-white text-lg hover:text-gray-200"
                    onClick={() => navigate(`/my-events`)}
                    whileHover={{ scale: 1.1 }} // Add hover bounce animation
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    RSVP's
                  </motion.button>
                </li>
              </>
            ) : (
              <li>
                <motion.button
                  className="text-white text-lg hover:text-gray-200"
                  onClick={handleLoginOpen}
                  whileHover={{ scale: 1.1 }} // Add hover bounce animation
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  Login
                </motion.button>
              </li>
            )}

            {/* Always show About and Contact buttons */}
            <li>
              <motion.button
                className="text-white text-lg hover:text-gray-200"
                onClick={() => scrollToSection(aboutRef)}
                whileHover={{ scale: 1.1 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                About
              </motion.button>
            </li>
            <li>
              <motion.button
                className="text-white text-lg hover:text-gray-200"
                onClick={() => scrollToSection(contactRef)}
                whileHover={{ scale: 1.1 }} // Add hover bounce animation
                transition={{ type: "spring", stiffness: 300 }}
              >
                Contact
              </motion.button>
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
