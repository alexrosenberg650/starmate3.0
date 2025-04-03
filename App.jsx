import { useState } from "react";
import { sendMessageToGPT } from "./api";

export default function StarMateApp() {
  const [selectedPersona, setSelectedPersona] = useState(null);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");

const personas = [
  { name: "Jae", role: "Global Pop Idol", avatar: "/jae.png" },
  { name: "Elias", role: "Brooding Actor", avatar: "/elias.png" },
  { name: "Chase", role: "Charismatic Protector", avatar: "/chase.png" }
];


  const getPersonaPrompt = (name) => {
    if (name === "Jae") return "You are Jae, a sweet and romantic pop idol.";
    if (name === "Elias") return "You are Elias, a mysterious and poetic actor.";
    if (name === "Chase") return "You are Chase, a protective and loyal heartthrob.";
    return "";
  };

  const handleSend = async () => {
    if (!input.trim()) return;
    const newMsg = { from: "User", text: input };
    const updated = [...messages, newMsg];
    setMessages(updated);
    setInput("");
    const reply = await sendMessageToGPT(updated, getPersonaPrompt(selectedPersona.name));
    setMessages([...updated, { from: selectedPersona.name, text: reply }]);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-pink-100 to-blue-100 p-6">
      <h1 className="text-4xl font-bold text-gray-800 mb-8">StarMate</h1>
      {!selectedPersona ? (
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {personas.map((p) => (
            <div key={p.name} onClick={() => setSelectedPersona(p)}
              className="p-4 bg-white rounded-xl shadow text-center cursor-pointer hover:border-pink-500 border transition-all">
              <img src={p.avatar} alt={p.name} className="rounded-full w-24 h-24 object-cover mx-auto mb-2" />
              <h2 className="text-lg font-semibold">{p.name}</h2>
              <p className="text-sm text-gray-600">{p.role}</p>
            </div>
          ))}
        </div>
      ) : (
        <div className="w-full max-w-md bg-white rounded-2xl shadow p-4 space-y-4">
          <div className="text-center">
            <img src={selectedPersona.avatar} className="rounded-full w-20 h-20 mx-auto mb-2" />
            <h2 className="text-xl font-bold">{selectedPersona.name}</h2>
            <p className="text-sm text-gray-500">{selectedPersona.role}</p>
          </div>
          <div className="h-64 overflow-y-auto space-y-2 border-t pt-2">
            {messages.map((m, i) => (
              <div key={i}
                className={`p-3 rounded-xl max-w-xs ${
                  m.from === "User" ? "bg-blue-100 ml-auto text-right" : "bg-pink-100"
                }`}>
                <p className="text-sm text-gray-800">{m.text}</p>
              </div>
            ))}
          </div>
          <div className="flex gap-2">
            <input value={input} onChange={e => setInput(e.target.value)}
              placeholder="Type a message..."
              className="flex-grow p-2 border rounded-lg" />
            <button onClick={handleSend}
              className="bg-pink-500 text-white px-4 rounded hover:bg-pink-600">Send</button>
          </div>
        </div>
      )}
    </div>
  );
}
