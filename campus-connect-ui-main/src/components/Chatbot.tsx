import { useState, useEffect, useRef } from "react";
import API from "@/api/api";
import { MessageCircle, Send } from "lucide-react";

export default function Chatbot() {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<any[]>([
    {
      type: "bot",
      text: "👋 Hi! I'm your Campus Event Assistant.\nAsk me about upcoming events, categories, or your bookings!",
    },
  ]);

  const chatRef = useRef<HTMLDivElement>(null);

  // auto scroll when new message comes
  useEffect(() => {
    chatRef.current?.scrollTo({
      top: chatRef.current.scrollHeight,
      behavior: "smooth",
    });
  }, [messages]);

  const sendMessage = async (text?: string) => {
    const userMessage = text || message;
    if (!userMessage.trim()) return;

    try {
      const token = localStorage.getItem("token");

      const res = await API.post(
        "/chat",
        { message: userMessage },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setMessages((prev) => [
        ...prev,
        { type: "user", text: userMessage },
        { type: "bot", text: res.data.reply },
      ]);

      setMessage("");
    } catch (error: any) {
      console.error("Chat error:", error);

      let errorMessage = "⚠️ Unable to get response.";

      if (error?.response?.data?.reply) {
        errorMessage = error.response.data.reply;
      }

      setMessages((prev) => [
        ...prev,
        { type: "user", text: userMessage },
        { type: "bot", text: errorMessage },
      ]);

      setMessage("");
    }
  };

  return (
    <>
      {/* Floating Chat Icon */}
      <div
        onClick={() => setOpen(!open)}
        className="fixed bottom-6 right-6 bg-blue-600 text-white p-4 rounded-full shadow-lg cursor-pointer hover:bg-blue-700"
      >
        <MessageCircle size={24} />
      </div>

      {/* Chat Window */}
      {open && (
        <div className="fixed bottom-24 right-6 w-96 h-[520px] bg-white rounded-xl shadow-2xl flex flex-col overflow-hidden">

          {/* Header */}
          <div className="bg-blue-700 text-white p-4">
            <h2 className="font-semibold text-lg">Campus AI Assistant</h2>
            <p className="text-sm opacity-90">Ask about events & bookings</p>
          </div>

          {/* Chat Messages */}
          <div
            ref={chatRef}
            className="flex-1 overflow-y-auto p-4 space-y-3 bg-gray-50"
          >
            {messages.map((m, i) => (
              <div key={i}>
                {m.type === "user" ? (
                  <p className="text-right text-sm">🙋 {m.text}</p>
                ) : (
                  <div className="bg-gray-200 p-3 rounded-lg text-sm whitespace-pre-line">
                    🤖 {m.text}
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Quick Buttons */}
          <div className="p-3 flex flex-wrap gap-2 border-t bg-white">
            <button
              onClick={() => sendMessage("next event")}
              className="text-sm border px-3 py-1 rounded-full"
            >
              What is the next event?
            </button>

            <button
              onClick={() => sendMessage("tech")}
              className="text-sm border px-3 py-1 rounded-full"
            >
              Show tech events
            </button>

            <button
              onClick={() => sendMessage("this week")}
              className="text-sm border px-3 py-1 rounded-full"
            >
              Events this week
            </button>

            <button
              onClick={() => sendMessage("my bookings")}
              className="text-sm border px-3 py-1 rounded-full"
            >
              My bookings
            </button>
          </div>

          {/* Input Box */}
          <div className="flex border-t">
            <input
              className="flex-1 p-3 outline-none"
              placeholder="Ask about campus events..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />

            <button
              onClick={() => sendMessage()}
              className="p-3 text-blue-600"
            >
              <Send size={20} />
            </button>
          </div>
        </div>
      )}
    </>
  );
}