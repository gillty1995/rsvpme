import React, { useState, useEffect, useRef } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { motion } from "framer-motion";

interface ChatProps {
  eventId: string;
}

const Chat: React.FC<ChatProps> = ({ eventId }) => {
  const { user, isAuthenticated, getAccessTokenSilently } = useAuth0();
  const [messages, setMessages] = useState<
    { userId: string; email: string; message: string }[]
  >([]);
  const [newMessage, setNewMessage] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isAuthenticated) return;

    const fetchMessages = async () => {
      try {
        const token = await getAccessTokenSilently();
        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/api/chat/${eventId}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        const data = await response.json();

        setMessages(
          data.messages.map((msg: any) => ({
            userId: msg.userId,
            email: msg.email || "Unknown",
            message: msg.message,
          }))
        );
      } catch (error) {
        console.error("Error fetching chat messages:", error);
      }
    };

    fetchMessages();
  }, [isAuthenticated, eventId, getAccessTokenSilently]);

  // ✅ Scroll to the latest message when messages update
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  const sendMessage = async () => {
    if (!newMessage.trim()) return;

    try {
      const token = await getAccessTokenSilently();
      await fetch(`${import.meta.env.VITE_API_URL}/api/chat/${eventId}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ message: newMessage }),
      });

      setMessages([
        ...messages,
        {
          userId: user?.sub || "",
          email: user?.email || "Unknown",
          message: newMessage,
        },
      ]);
      setNewMessage("");
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  return (
    <div className="fixed bottom-20 right-4 bg-white shadow-lg p-4 rounded-lg w-80 max-h-96 overflow-y-auto z-50">
      <h2 className="text-lg font-semibold">Event Chat</h2>
      <div className="mt-2 space-y-2">
        {messages.map((msg, index) => (
          <div key={index} className="p-2 rounded-lg bg-gray-200">
            <span className="block text-xs text-gray-500">{msg.email}</span>
            <span className="block">{msg.message}</span>
          </div>
        ))}
        {/* Invisible div to auto-scroll to */}
        <div ref={messagesEndRef} />
      </div>
      <input
        type="text"
        className="w-full p-2 border rounded mt-2"
        placeholder="Type a message..."
        value={newMessage}
        onChange={(e) => setNewMessage(e.target.value)}
        onKeyPress={(e) => e.key === "Enter" && sendMessage()}
      />
      <motion.button
        onClick={sendMessage}
        className="w-full mt-2 bg-blue-500 text-white py-2 rounded"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        Send
      </motion.button>
    </div>
  );
};

export default Chat;
