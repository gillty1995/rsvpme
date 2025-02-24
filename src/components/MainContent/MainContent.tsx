import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

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

  const wordVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.4, duration: 0.6 },
    }),
  };

  const paragraphVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { delay: 1.5, duration: 1.2 },
    },
  };

  return (
    <main className="text-center py-16 pb-0 px-0">
      {/* Header Section */}
      <section className="text-xl mb-11 pb-5 pt-0 mt-0">
        <div className="font-rale text-main-text">
          {/* Word-by-word animation */}
          <h2 className="font-regular text-3xl">
            {["Effortless", "Event Planning,", "Made Simple"].map(
              (word, index) => (
                <motion.span
                  key={word}
                  custom={index}
                  variants={wordVariants}
                  initial="hidden"
                  animate="visible"
                  className="inline-block mr-2"
                >
                  {word}
                </motion.span>
              )
            )}
          </h2>
          {/* Paragraph animations */}
          <motion.p
            className="mt-4 font-extralight"
            variants={paragraphVariants}
            initial="hidden"
            animate="visible"
          >
            Select your event, add your invitees, and send out invitations in
            just a few clicks.
          </motion.p>
          <motion.p
            className="mt-4 font-extralight max-w-xs sm:max-w-sm md:max-w-md leading-regular mx-auto"
            variants={paragraphVariants}
            initial="hidden"
            animate="visible"
          >
            Stay connected with attendees through our chat feature and easily
            track who can make it!
          </motion.p>
        </div>
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
          className="absolute font-semibold top-8 left-1/2 transform -translate-x-1/2 bg-blue-500/50 text-white py-2 px-6 rounded-full hover:bg-gradient-to-r from-blue-500 to-indigo-500 hover:shadow-lg hover:scale-110 transition-all duration-300 ease-in-out"
        >
          Create RSVP
        </button>
      </section>
    </main>
  );
};

export default MainContent;
