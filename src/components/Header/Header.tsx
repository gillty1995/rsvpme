import React, { useState, useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { FaBars, FaTimes } from "react-icons/fa"; // Import icons
import LoginModal from "../LoginModal/LoginModal";
import SignUpModal from "../SignUpModal/SignUpModal";

interface HeaderProps {
  aboutRef: React.RefObject<HTMLDivElement>;
  contactRef: React.RefObject<HTMLDivElement>;
}

const Header: React.FC<HeaderProps> = ({ aboutRef, contactRef }) => {
  const { logout, isAuthenticated } = useAuth0();
  const navigate = useNavigate();

  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isSignUpModalOpen, setIsSignUpModalOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 900);

  // Update state on window resize
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 900);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleLoginOpen = () => {
    setIsLoginModalOpen(true);
    setIsSignUpModalOpen(false);
  };
  const handleLoginClose = () => setIsLoginModalOpen(false);

  const handleSignUpOpen = () => {
    setIsSignUpModalOpen(true);
    setIsLoginModalOpen(false);
  };
  const handleSignUpClose = () => setIsSignUpModalOpen(false);

  const scrollToSection = (ref: React.RefObject<HTMLDivElement>) => {
    if (ref.current) {
      ref.current.scrollIntoView({ behavior: "smooth" });
    }
    setIsMenuOpen(false); // Close menu when clicking a link
  };

  return (
    <>
      <header className="bg-gradient-to-b from-header-bg to-bg-gradient p-4 flex justify-between items-center relative">
        {/* Logo */}
        <div className="font-rale font-thin text-header-text text-3xl sm:text-5xl absolute left-1/2 transform -translate-x-1/2">
          R S V P Me
        </div>

        {/* Mobile Menu Button */}
        {isMobile ? (
          <motion.button
            className="text-white text-2xl z-50 ml-auto"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            whileHover={{ scale: 1.1 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            {isMenuOpen ? <FaTimes /> : <FaBars />}
          </motion.button>
        ) : (
          // Desktop Navigation
          <nav className="ml-auto">
            <ul className="flex space-x-4">
              {isAuthenticated ? (
                <>
                  <li>
                    <motion.button
                      className="text-white text-lg hover:text-gray-200"
                      onClick={() => logout()}
                      whileHover={{ scale: 1.1 }}
                      transition={{ type: "spring", stiffness: 300 }}
                    >
                      Logout
                    </motion.button>
                  </li>
                  <li>
                    <motion.button
                      className="text-white text-lg hover:text-gray-200"
                      onClick={() => navigate(`/my-events`)}
                      whileHover={{ scale: 1.1 }}
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
                    whileHover={{ scale: 1.1 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    Login
                  </motion.button>
                </li>
              )}
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
                  whileHover={{ scale: 1.1 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  Contact
                </motion.button>
              </li>
            </ul>
          </nav>
        )}

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMobile && isMenuOpen && (
            <motion.div
              className="fixed inset-0 bg-black bg-opacity-80 z-40 flex flex-col items-center justify-center space-y-6"
              initial={{ opacity: 0, y: -50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -50 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
            >
              <ul className="text-white text-xl text-center space-y-6">
                {isAuthenticated ? (
                  <>
                    <li>
                      <motion.button
                        className="hover:text-gray-300"
                        onClick={() => {
                          logout();
                          setIsMenuOpen(false);
                        }}
                        whileHover={{ scale: 1.1 }}
                        transition={{ type: "spring", stiffness: 300 }}
                      >
                        Logout
                      </motion.button>
                    </li>
                    <li>
                      <motion.button
                        className="hover:text-gray-300"
                        onClick={() => {
                          navigate(`/my-events`);
                          setIsMenuOpen(false);
                        }}
                        whileHover={{ scale: 1.1 }}
                        transition={{ type: "spring", stiffness: 300 }}
                      >
                        RSVP's
                      </motion.button>
                    </li>
                  </>
                ) : (
                  <li>
                    <motion.button
                      className="hover:text-gray-300"
                      onClick={handleLoginOpen}
                      whileHover={{ scale: 1.1 }}
                      transition={{ type: "spring", stiffness: 300 }}
                    >
                      Login
                    </motion.button>
                  </li>
                )}
                <li>
                  <motion.button
                    className="hover:text-gray-300"
                    onClick={() => scrollToSection(aboutRef)}
                    whileHover={{ scale: 1.1 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    About
                  </motion.button>
                </li>
                <li>
                  <motion.button
                    className="hover:text-gray-300"
                    onClick={() => scrollToSection(contactRef)}
                    whileHover={{ scale: 1.1 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    Contact
                  </motion.button>
                </li>
              </ul>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* Modals */}
      <LoginModal
        isOpen={isLoginModalOpen}
        onClose={handleLoginClose}
        openSignUp={handleSignUpOpen}
      />
      <SignUpModal isOpen={isSignUpModalOpen} onClose={handleSignUpClose} />
    </>
  );
};

export default Header;
