import React, { useState, useEffect, useRef } from "react";
import "./../styles/chatbot.css";
import api from "../api";
import { TbMessage2Bolt, TbSend } from "react-icons/tb";
import { IoMdClose } from "react-icons/io";
import { ThreeDots } from "react-loader-spinner";

const Chatbot = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false); // Loading indicator for better UX
  const messagesEndRef = useRef(null);

  // Fetch token if needed
  // const token = sessionStorage.getItem("token");
  const headers = {
    "Content-Type": "application/json",
    // ...(token && { Authorization: `Bearer ${token}` }), // Add Authorization only if token exists
  };

  const handleSendMessage = async () => {
    if (!input.trim()) {
      return;
    }

    const newMessage = {
      sender: "user",
      text: input,
    };
    setMessages((prevMessages) => [...prevMessages, newMessage]); // Add user message to state
    setInput("");
    setLoading(true); // Show loading indicator

    try {
      const response = await api.post(
        "chatbot/",
        { message: input },
        { headers }
      );
      const { systemResponse } = response.data;
      setMessages((prevMessages) => [
        ...prevMessages,
        { sender: "system", text: systemResponse },
      ]);
    } catch (err) {
      console.error("Failed to send message.", err);
      setMessages((prevMessages) => [
        ...prevMessages,
        {
          sender: "system",
          text: "Oops! Something went wrong. Please try again.",
        },
      ]);
    } finally {
      setLoading(false); // Hide loading indicator
    }
  };

  useEffect(() => {
    // Scroll to the bottom of the chat window
    if (messagesEndRef.current) {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  return (
    <div>
      <button
        className="chatbot__toggle"
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Toggle Chatbot"
      >
        <TbMessage2Bolt />
      </button>
      {isOpen && (
        <div className="chatbot">
          <div className="chatbot__header">
            <h3>Virtual Assistant</h3>
            <button
              onClick={() => setIsOpen(false)}
              className="chatbot__close"
              aria-label="Close Chatbot"
            >
              <IoMdClose />
            </button>
          </div>
          <div className="chatbot__messages">
            {messages.map((message, index) => (
              <div
                key={index}
                className={`chatbot__message chatbot__message--${message.sender}`}
              >
                {message.text.split("\n").map((text, index) => (
                  <React.Fragment key={index}>
                    {text}
                    <br />
                  </React.Fragment>
                ))}
              </div>
            ))}
            {loading && (
              <div className="chatbot__message chatbot__message--system">
                <ThreeDots color="#007bff" height={20} width={20} />
              </div>
            )}
          </div>
          <div className="chatbot__input">
            <input
              type="text"
              placeholder="Type a message..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={(e) => {
                if (e.key === "Enter") {
                  handleSendMessage();
                }
              }}
            />
            <button onClick={handleSendMessage} disabled={loading}>
              <TbSend />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Chatbot;
