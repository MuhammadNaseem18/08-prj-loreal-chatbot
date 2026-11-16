/* DOM elements */
const chatForm = document.getElementById("chatForm");
const userInput = document.getElementById("userInput");
const chatWindow = document.getElementById("chatWindow");
const sendButton = document.getElementById("sendBtn");

// Replace this with the class-hosted Cloudflare Worker URL from your README.
const proxyUrl = "https://lorealchatbot.hadinaseem18.workers.dev/";

// This instruction keeps the chatbot focused on L'Oréal beauty advice.
const systemPrompt =
  "You are a helpful L'Oréal beauty advisor. Answer questions about L'Oréal products, skincare, haircare, makeup, fragrance, beauty routines, and beauty-related recommendations. Use a few relevant emojis naturally to make your answers friendly, but do not overuse them. For questions outside these topics, politely refuse and say that you can only help with L'Oréal products and beauty advice. Do not provide unrelated information, even if the user asks directly. Never invent product details; say when you are unsure.";

// Keep the conversation so the assistant can use earlier messages as context.
const messages = [{ role: "system", content: systemPrompt }];

// Set initial message
chatWindow.textContent = "👋 Hello! How can I help you today?";

function addMessage(text, sender) {
  const message = document.createElement("div");
  message.className = `msg ${sender}`;
  message.textContent = text;
  chatWindow.appendChild(message);
  chatWindow.scrollTop = chatWindow.scrollHeight;
}

/* Handle form submit */
chatForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  const messageText = userInput.value.trim();
  if (!messageText) {
    return;
  }

  // Show only the latest question and response in the chat window.
  chatWindow.replaceChildren();
  addMessage(messageText, "user");
  messages.push({ role: "user", content: messageText });
  userInput.value = "";
  sendButton.disabled = true;

  try {
    const response = await fetch(proxyUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ messages }),
    });

    if (!response.ok) {
      throw new Error(`Request failed with status ${response.status}`);
    }

    const data = await response.json();
    const reply = data.choices?.[0]?.message?.content;
    if (!reply) {
      throw new Error("The API returned no assistant message.");
    }

    messages.push({ role: "assistant", content: reply });
    addMessage(reply, "ai");
  } catch (error) {
    console.error("Chat request failed:", error);
    addMessage(
      "Sorry, I could not connect right now. Please check the chatbot proxy URL and try again.",
      "ai",
    );
  } finally {
    sendButton.disabled = false;
    userInput.focus();
  }
});
