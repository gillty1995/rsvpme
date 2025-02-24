import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import GoogleIcon from "../../assets/google-icon.svg";

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
  const { loginWithRedirect } = useAuth0();

  return (
    <ModalWithForm title="Log In" isOpen={isOpen} onClose={onClose}>
      <div className="flex flex-col space-y-4 text-left mt-8">
        {/* Log In with Email Button */}
        <button
          onClick={() => loginWithRedirect()}
          className="bg-blue-600 text-white py-3 px-6 rounded-lg font-medium hover:bg-blue-700 transition-all duration-300"
        >
          Log In with Email
        </button>

        {/* Log In with Google Button */}
        <button
          onClick={() =>
            loginWithRedirect({
              authorizationParams: { connection: "google-oauth2" },
            })
          }
          className="flex items-center justify-center bg-white text-gray-700 border border-gray-300 py-3 px-6 rounded-lg font-medium hover:bg-gray-100 transition-all duration-300 shadow-md"
        >
          <img src={GoogleIcon} alt="Google logo" className="w-5 h-5 mr-3" />
          Log In with Google
        </button>

        {/* Sign Up Link */}
        <button
          onClick={openSignUp}
          type="button"
          className="text-blue-500 py-2 px-4 hover:text-blue-800 transition-all duration-300"
        >
          Don’t have an account? <span className="font-medium">Sign Up</span>
        </button>
      </div>
    </ModalWithForm>
  );
};

export default LoginModal;
