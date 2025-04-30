import React, { useEffect, useState } from "react";
import axios from "axios";

const AdminChatHistory = () => {
  const [messages, setMessages] = useState([]);

  const fetchMessages = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/chat/admin");
      setMessages(response.data);
    } catch (error) {
      console.error("Error fetching messages", error);
    }
  };

  useEffect(() => {
    fetchMessages();
  }, []);

  return (
    <div>
      <h3>Messages for Admin</h3>
      <div>
        {messages.map((msg, index) => (
          <div key={index} style={{ marginBottom: "10px" }}>
            <strong>{msg.from}:</strong>
            <p>{msg.message}</p>
            <small>{new Date(msg.createdAt).toLocaleString()}</small>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminChatHistory;
