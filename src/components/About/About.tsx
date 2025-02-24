import React, { useEffect } from "react";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";

const steps = [
  {
    id: 1,
    title: "Step 1",
    description:
      "Simply click Create RSVP, fill in the form, and share with your friends and family! No sign-up required!",
  },
  {
    id: 2,
    title: "Step 2",
    description: "See who can attend via your RSVP's attendee list!",
  },
  {
    id: 3,
    title: "Step 3",
    description:
      "Sign up to save your RSVPs, access our chat feature, and stay in contact with anyone who received your RSVP!",
  },
];

const About: React.FC = () => {
  const controls = useAnimation();
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.9 });

  useEffect(() => {
    if (inView) {
      controls.start("visible");
    }
  }, [inView, controls]);

  return (
    <section ref={ref} className=" py-16 px-6">
      <div className="max-w-5xl mx-auto text-center">
        <h2 className="text-3xl font-rale text-main-text mb-12">
          How RSVP Me Works
        </h2>

        {/* Steps container */}
        <motion.div
          className="flex justify-center items-center space-x-8"
          initial="hidden"
          animate={controls}
          variants={{
            hidden: { opacity: 0, y: 50 },
            visible: { opacity: 1, y: 0, transition: { staggerChildren: 0.7 } },
          }}
        >
          {steps.map((step, _index) => (
            <motion.div
              key={step.id}
              className="bg-gradient-to-r from-blue-400 to-light-gray p-6 text-text-dark rounded-lg w-72 shadow-lg"
              variants={{
                hidden: { opacity: 0, y: 50 },
                visible: { opacity: 1, y: 0 },
              }}
              whileHover={{ scale: 1.1 }}
            >
              <h3 className="text-xl font-rale font-bold mb-3">{step.title}</h3>
              <p className="text-sm font-mont">{step.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default About;
