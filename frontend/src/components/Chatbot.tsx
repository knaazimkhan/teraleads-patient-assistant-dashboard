import { useState } from "react";
import api from "../api/axios";

export default function Chatbot() {
  const [messages, setMessages] = useState<{ sender: string; text: string; }[]>([]);
  const [question, setQuestion] = useState("");

  const sendMessage = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const newMsg = { sender: "user", text: question };
    setMessages([...messages, newMsg]);
    setQuestion("");

    const res = await api.post("/chat", { question });
    setMessages((msgs) => [...msgs, { sender: "bot", text: res.data.reply }]);
  };

  return (
    <div className="bg-white p-4 rounded shadow">
      <h2 className="text-lg font-bold">AI Chat</h2>
      <div className="h-48 overflow-y-auto mb-2 border p-2">
        {messages.map((msg, i) => (
          <div
            key={i}
            className={msg.sender === "user" ? "text-right" : "text-left"}
          >
            <span
              className={`inline-block px-3 py-1 rounded ${
                msg.sender === "user" ? "bg-blue-100" : "bg-gray-200"
              }`}
            >
              {msg.text}
            </span>
          </div>
        ))}
      </div>
      <form onSubmit={sendMessage} className="flex gap-2">
        <input
          className="input flex-1"
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          placeholder="Ask something..."
        />
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded"
          type="submit"
        >
          Send
        </button>
      </form>
    </div>
  );
}
