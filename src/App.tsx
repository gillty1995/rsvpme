import React, { useRef } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Header from "./components/Header/Header";
import MainContent from "./components/MainContent/MainContent";
import About from "./components/About/About";
import Contact from "./components/Contact/Contact";
import RsvpForm from "./components/RsvpForm/RsvpForm";
import CreateRsvp from "./components/CreateRsvp/CreateRsvp";
import Rsvps from "./components/Rsvps/Rsvps";
import Footer from "./components/Footer/Footer";
import TermsOfService from "./components/TermsOfService/TermsOfService";
import PrivacyPolicy from "./components/PrivacyPolicy/PrivacyPolicy";

import RSVPImage from "./assets/beach-day.jpg";
import RSVPImage2 from "./assets/friends.jpg";
import RSVPImage3 from "./assets/party.jpg";
import RSVPImage4 from "./assets/dinner.jpg";
import RSVPImage5 from "./assets/pool-party.jpg";
import RSVPImage6 from "./assets/night-out.jpg";
import RSVPImage7 from "./assets/bonfire.jpg";
import RSVPImage8 from "./assets/sunset.jpg";

// Type for image data
interface ImageData {
  id: number;
  src: string;
}

const Home: React.FC = () => {
  const aboutRef = useRef<null | HTMLDivElement>(null);
  const contactRef = useRef<null | HTMLDivElement>(null);
  // const rsvpsRef = useRef<null | HTMLDivElement>(null);

  const images: ImageData[] = [
    { id: 1, src: RSVPImage },
    { id: 2, src: RSVPImage2 },
    { id: 3, src: RSVPImage3 },
    { id: 4, src: RSVPImage4 },
    { id: 5, src: RSVPImage5 },
    { id: 6, src: RSVPImage6 },
    { id: 7, src: RSVPImage7 },
    { id: 8, src: RSVPImage8 },
  ];

  const handleCreateRsvp = () => {
    // Navigate to the RSVP form
    window.location.href = "/rsvp-form";
  };

  return (
    <div className="min-h-screen bg-main-bg flex flex-col overflow-x-hidden">
      <Header aboutRef={aboutRef} contactRef={contactRef} />
      <MainContent images={images} onCreateRSVP={handleCreateRsvp} />
      <div ref={aboutRef}>
        <About />
      </div>
      <div ref={contactRef}>
        <Contact />
      </div>
      <Footer />
    </div>
  );
};

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/rsvp-form" element={<RsvpForm />} />
        <Route path="/created-rsvp/:eventId" element={<CreateRsvp />} />
        <Route path="/my-events" element={<Rsvps />} />
        <Route path="/terms" element={<TermsOfService />} />
        <Route path="/privacy" element={<PrivacyPolicy />} />
      </Routes>
    </Router>
  );
};

export default App;
