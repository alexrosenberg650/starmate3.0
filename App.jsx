import { useState } from "react";
import { sendMessageToGPT } from "./api";

const personas = [
  { name: "Jae", role: "Global Pop Idol", avatar: "/jae.png" },
  { name: "Elias", role: "Brooding Actor", avatar: "/elias.png" },
  { name: "Chase", role: "Charismatic Protector", avatar: "/chase.png" }
];

function PersonaCard({ name, role, avatar, onSelect }) {
  return (
    <div
      onClick={onSelect}
      className="p-4 border rounded-2xl shadow-lg text-center cursor-pointer hover:border-pink-500 transition-all"
    >
      <img
        src={avatar}
        alt={`${name} avatar`}
        className="rounded-full w-24 h-24 object-cover mx-auto mb-2"
      />
      <h2 className="text-lg font-bold">{name}</h2>
      <p className="text-sm text-gray-600">{role}</p>
    </div>
  );
}

export default function StarMateApp() {
  const [selectedPersona, setSelectedPersona] = useState(null);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSelect = (persona) => {
    setSelectedPersona(persona);
    setMessages([{ from: persona.name, text: `Hey, I'm ${persona.name}. Ask me anything 💬` }]);
  };

  const handleSend = async () => {
    if (!input.trim()) return;
    const updatedMessages = [...messages, { from: "User", text: input }];
    setMessages(updatedMessages);
    setInput("");
    setLoading(true);

    const response = await sendMessageToGPT(updatedMessages, `You are ${selectedPersona.name}, a charming and emotionally intelligent ${selectedPersona.role}. Respond in a romantic and human-like tone.`);
    setMessages([...updatedMessages, { from: selectedPersona.name, text: response }]);
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-pink-50 to-white p-6">
      <h1 className="text-4xl font-extrabold text-center mb-8 text-pink-600">✨ StarMate ✨</h1>

      {!selectedPersona ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
          {personas.map((p) => (
            <PersonaCard key={p.name} {...p} onSelect={() => handleSelect(p)} />
          ))}
        </div>
      ) : (
        <div className="max-w-2xl mx-auto bg-white shadow-lg rounded-2xl p-6">
          <div className="flex items-center space-x-4 mb-6">
            <img src={selectedPersona.avatar} className="w-16 h-16 rounded-full object-cover" />
            <div>
              <h2 className="text-xl font-semibold">{selectedPersona.name}</h2>
              <p className="text-sm text-gray-500">{selectedPersona.role}</p>
            </div>
          </div>

          <div className="space-y-4 max-h-96 overflow-y-auto mb-4">
            {messages.map((msg, i) => (
              <div
                key={i}
                className={`p-3 rounded-xl ${
                  msg.from === "User" ? "bg-pink-100 text-right ml-16" : "bg-gray-100 mr-16"
                }`}
              >
                <p className="text-sm text-gray-800">
                  <strong>{msg.from}:</strong> {msg.text}
                </p>
              </div>
            ))}
          </div>

          <div className="flex gap-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="flex-1 border rounded-xl px-4 py-2"
              placeholder="Type your message..."
            />
            <button
              onClick={handleSend}
              disabled={loading}
              className="bg-pink-500 text-white px-4 py-2 rounded-xl hover:bg-pink-600 transition"
            >
              {loading ? "..." : "Send"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

