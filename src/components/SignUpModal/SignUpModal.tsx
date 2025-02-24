import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import GoogleIcon from "../../assets/google-icon.svg";

interface SignUpModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const SignUpModal: React.FC<SignUpModalProps> = ({ isOpen, onClose }) => {
  const { loginWithRedirect } = useAuth0();

  return (
    <ModalWithForm title="Sign Up" isOpen={isOpen} onClose={onClose}>
      <div className="flex flex-col space-y-4 text-left mt-8">
        {/* Sign Up with Email Button */}
        <button
          onClick={() =>
            loginWithRedirect({
              authorizationParams: { screen_hint: "signup" },
            })
          }
          className="bg-blue-600 text-white py-3 px-6 rounded-lg font-medium hover:bg-blue-700 transition-all duration-300"
        >
          Sign Up with Email
        </button>

        {/* Sign Up with Google Button */}
        <button
          onClick={() =>
            loginWithRedirect({
              authorizationParams: {
                connection: "google-oauth2",
                screen_hint: "signup",
              },
            })
          }
          className="flex items-center justify-center bg-white text-gray-700 border border-gray-300 py-3 px-6 rounded-lg font-medium hover:bg-gray-100 transition-all duration-300 shadow-md"
        >
          <img src={GoogleIcon} alt="Google logo" className="w-5 h-5 mr-3" />
          Sign Up with Google
        </button>
      </div>
    </ModalWithForm>
  );
};

export default SignUpModal;
