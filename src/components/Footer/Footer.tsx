import React from "react";
import { Link } from "react-router-dom";
import { FaGithub, FaLinkedin } from "react-icons/fa";

const Footer: React.FC = () => {
  return (
    <footer className="bg-gradient-to-b from-bg-gradient to-footer-bg text-footer-text py-6 px-4 w-full mt-auto pb-11">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between md:items-center items-start text-left">
        {/* Left Section - API Links */}
        <div className="mb-4 md:mb-0">
          <h2 className="text-lg font-semibold">APIs Used:</h2>
          <ul className="text-sm">
            <li>
              <a
                href="https://auth0.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:underline"
              >
                Auth0 (Authentication)
              </a>
            </li>
            <li>
              <a
                href="https://developers.google.com/maps"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:underline"
              >
                Google Maps (Location Search)
              </a>
            </li>
            <li>
              <a
                href="https://framer.com/motion"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:underline"
              >
                Framer Motion (Animations)
              </a>
            </li>
          </ul>
        </div>

        {/* Center Section - Copyright & Legal Links */}
        <div className="text-sm mt-4 md:mt-0">
          <p>&copy; 2024 RSVPMe. All rights reserved.</p>
          <div className="mt-2 md:space-x-4 flex flex-col md:flex-row items-start md:items-center space-y-2 md:space-y-0">
            <Link to="/terms" className="hover:underline">
              Terms of Service
            </Link>
            <span className="hidden md:inline">|</span>
            <Link to="/privacy" className="hover:underline">
              Privacy Policy
            </Link>
          </div>
        </div>

        {/* Right Section - GitHub & LinkedIn Links */}
        <div className="space-y-2 mt-4 md:mt-0">
          {/* GitHub Link */}
          <a
            href="https://github.com/gillty1995/rsvpme"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center space-x-2 hover:text-gray-300 transition"
          >
            <FaGithub className="text-2xl" />
            <span className="text-sm">GitHub Repository</span>
          </a>

          {/* LinkedIn Link */}
          <a
            href="https://www.linkedin.com/in/gillty/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center space-x-2 hover:text-gray-300 transition"
          >
            <FaLinkedin className="text-2xl text-blue-500" />
            <span className="text-sm">Connect on LinkedIn</span>
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
