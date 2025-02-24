import React, { useEffect, useState } from "react";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";

const Contact: React.FC = () => {
  const controls = useAnimation();
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.5 });

  useEffect(() => {
    if (inView) {
      controls.start("visible");
    }
  }, [inView, controls]);

  const [formData, setFormData] = useState({
    email: "",
    subject: "",
    message: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form Data:", formData);
  };

  return (
    <section
      ref={ref}
      className="py-16 px-6 bg-gradient-to-b from-transparent to-white"
    >
      <motion.div
        className="max-w-3xl mx-auto bg-white shadow-2xl border border-gray-200 rounded-xl p-8 text-center"
        initial="hidden"
        animate={controls}
        variants={{
          hidden: { opacity: 0, y: 50 },
          visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
        }}
      >
        <h2 className="text-3xl font-rale text-main-text mb-6 leading-snug">
          Have any questions? Suggestions? <br />
          Or simply want to tell us how much you love RSVPMe?
          <span className="bg-gradient-to-r from-blue-500 to-indigo-500 bg-clip-text text-transparent font-bold">
            {" "}
            Send us a message!
          </span>
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Email Input */}
          <motion.input
            type="email"
            name="email"
            placeholder="Your Email"
            value={formData.email}
            onChange={handleChange}
            className="w-full p-3 bg-gray-50 border border-gray-300 rounded-full shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all"
            whileFocus={{ scale: 1.05 }}
          />

          {/* Subject Input */}
          <motion.input
            type="text"
            name="subject"
            placeholder="Subject"
            value={formData.subject}
            onChange={handleChange}
            className="w-full p-3 bg-gray-50 border border-gray-300 rounded-full shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all"
            whileFocus={{ scale: 1.05 }}
          />

          {/* Message Input */}
          <motion.textarea
            name="message"
            placeholder="Your Message"
            rows={4}
            value={formData.message}
            onChange={handleChange}
            className="w-full p-3 bg-gray-50 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all"
            whileFocus={{ scale: 1.05 }}
          />

          {/* Send Button */}
          <motion.button
            type="submit"
            className="bg-gradient-to-r from-blue-500 to-indigo-500 text-white font-semibold py-3 px-8 rounded-full shadow-lg hover:shadow-blue-400/50 transition-all"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            Send Message
          </motion.button>
        </form>
      </motion.div>
    </section>
  );
};

export default Contact;
