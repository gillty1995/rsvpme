import React from "react";
import Header from "./components/Header/Header";
import MainContent from "./components/MainContent/MainContent";
import Footer from "./components/Footer/Footer";
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

const App: React.FC = () => {
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

  return (
    <div className="min-h-screen bg-main-bg flex flex-col">
      <Header />
      <MainContent
        images={images}
        onCreateRSVP={() => alert("Redirect to Create RSVP form")}
      />
      <Footer />
    </div>
  );
};

export default App;
