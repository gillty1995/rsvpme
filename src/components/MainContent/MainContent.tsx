import React, { useState, useEffect } from "react";

// Type for image data
interface ImageData {
  id: number;
  src: string;
}

interface MainContentProps {
  images: ImageData[];
  onCreateRSVP: () => void;
}

const MainContent: React.FC<MainContentProps> = ({ images, onCreateRSVP }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) =>
        prevIndex === images.length - 1 ? 0 : prevIndex + 1
      );
    }, 5000);

    return () => clearInterval(interval);
  }, [images.length]);

  return (
    <main className="text-center py-16 pb-0 px-0">
      {/* Header Section */}
      <section className="text-xl mb-11 pb-5 pt-0 mt-0">
        <h2 className="font-rale font-regular text-main-text text-3xl">
          Effortless Event Planning, Made Simple
        </h2>
        <p className="mt-4 font-rale font-extralight text-main-text">
          Select your event, add your invitees, and send out invitations in just
          a few clicks.
        </p>
        <p className="mt-4 font-rale font-extralight text-main-text max-w-xs sm:max-w-sm md:max-w-md leading-regular mx-auto">
          Stay connected with attendees through our chat feature and easily
          track who can make it!
        </p>
      </section>

      {/* Image Slider Section */}
      <section className="relative overflow-hidden w-full h-[500px]">
        {images.map((image, index) => (
          <img
            key={image.id}
            src={image.src}
            alt={`Slide ${index + 1}`}
            className={`absolute w-full h-full object-cover object-[center_35%] transition-opacity duration-1000 ${
              index === currentIndex ? "opacity-100" : "opacity-0"
            }`}
          />
        ))}
        <button
          onClick={onCreateRSVP}
          className="absolute top-8 left-1/2 transform -translate-x-1/2 bg-blue-500/50 text-white text-xl py-2 px-6 rounded-full hover:bg-blue-600 transition-all duration-500 ease-in-out"
        >
          Create RSVP
        </button>
      </section>
    </main>
  );
};

export default MainContent;
