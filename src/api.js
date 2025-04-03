export async function sendMessageToGPT(messages, systemPrompt) {
  const API_KEY = import.meta.env.VITE_OPENAI_API_KEY;

  const response = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${API_KEY}`
    },
    body: JSON.stringify({
      model: "gpt-4-1106-preview",
      messages: [
        { role: "system", content: systemPrompt },
        ...messages.map((msg) => ({
          role: msg.from === "User" ? "user" : "assistant",
          content: msg.text
        }))
      ],
      temperature: 0.85
    })
  });

  const data = await response.json();
  return (
    (data.choices && data.choices[0] && data.choices[0].message && data.choices[0].message.content) ||
    "Sorry, something went wrong."
  );
}
