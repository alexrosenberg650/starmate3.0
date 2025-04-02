export async function sendMessageToGPT(messages, systemMessage) {
  const res = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer YOUR_OPENAI_API_KEY"
    },
    body: JSON.stringify({
      model: "gpt-4",
      messages: [
        { role: "system", content: systemMessage },
        ...messages.map(msg => ({
          role: msg.from === "User" ? "user" : "assistant",
          content: msg.text
        }))
      ]
    })
  });
  const data = await res.json();
  return data?.choices?.[0]?.message?.content || "Something went wrong.";
}