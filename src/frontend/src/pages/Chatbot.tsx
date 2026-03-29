import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useActor } from "@/hooks/useActor";
import { useQuery } from "@tanstack/react-query";
import { Bot, Send, Sparkles, User } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import type { ChatbotRule } from "../backend";

interface Message {
  id: string;
  role: "user" | "bot";
  text: string;
}

const WELCOME: Message = {
  id: "welcome",
  role: "bot",
  text: "Hello! 👋 I'm your empowerHER safety assistant. I can help you with:\n• Emergency contacts & helplines\n• Women's legal rights\n• Safety tips and precautions\n• Guidance on difficult situations\n\nHow can I help you today?",
};

const QUICK_CHIPS = [
  "Emergency Helplines",
  "Safety Tips",
  "Know My Rights",
  "Domestic Violence Help",
  "Workplace Harassment",
  "Laws in India",
];

function getBotResponse(input: string, rules: ChatbotRule[]): string {
  const lower = input.toLowerCase();
  for (const rule of rules) {
    if (rule.keywords.some((kw) => lower.includes(kw.toLowerCase()))) {
      return rule.response;
    }
  }
  return "I'm here to help with women's safety topics. Ask me about:\n• Emergency helplines\n• Your legal rights\n• Safety tips\n\nFor immediate emergencies, please call 112 or 1091.";
}

export default function Chatbot() {
  const { actor } = useActor();
  const [messages, setMessages] = useState<Message[]>([WELCOME]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const { data: rules = [], isLoading } = useQuery({
    queryKey: ["chatbotRules"],
    queryFn: () => actor!.getAllChatbotRules(),
    enabled: !!actor,
  });

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  });

  const sendMessage = (text: string) => {
    const trimmed = text.trim();
    if (!trimmed) return;
    const userMsg: Message = {
      id: `user-${Date.now()}`,
      role: "user",
      text: trimmed,
    };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setIsTyping(true);
    setTimeout(() => {
      const botMsg: Message = {
        id: `bot-${Date.now()}`,
        role: "bot",
        text: getBotResponse(trimmed, rules),
      };
      setMessages((prev) => [...prev, botMsg]);
      setIsTyping(false);
    }, 900);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    sendMessage(input);
  };

  return (
    <div className="py-8 px-4">
      <div className="max-w-2xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-6"
        >
          <div
            className="inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium mb-4"
            style={{
              background: "linear-gradient(135deg, #D7D3FF, #CFC8FF)",
              color: "#2B1236",
            }}
          >
            <Sparkles className="w-4 h-4" />
            AI Safety Assistant
          </div>
          <h1
            className="text-3xl font-extrabold mb-2"
            style={{ color: "#2B1236" }}
          >
            Safety Chatbot
          </h1>
          <p className="text-muted-foreground text-sm">
            {isLoading
              ? "Loading responses..."
              : "Available 24/7 to guide you on safety, rights, and support."}
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-card rounded-3xl shadow-card overflow-hidden flex flex-col"
          style={{ height: "520px" }}
        >
          <div
            className="px-5 py-4 flex items-center gap-3 border-b"
            style={{ background: "linear-gradient(135deg, #2B1236, #3A1A4C)" }}
          >
            <div
              className="w-9 h-9 rounded-xl flex items-center justify-center"
              style={{ background: "rgba(255,255,255,0.15)" }}
            >
              <Bot className="w-5 h-5" style={{ color: "#F3A0A8" }} />
            </div>
            <div>
              <p className="text-white font-semibold text-sm">empowerHER Bot</p>
              <div className="flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-green-400" />
                <p
                  className="text-xs"
                  style={{ color: "rgba(255,255,255,0.6)" }}
                >
                  Online — always here for you
                </p>
              </div>
            </div>
          </div>

          <div
            className="flex-1 overflow-y-auto p-4 space-y-3"
            style={{ background: "#F8F7FC" }}
          >
            <AnimatePresence>
              {messages.map((msg) => (
                <motion.div
                  key={msg.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className={`flex items-end gap-2 ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                >
                  {msg.role === "bot" && (
                    <div
                      className="w-7 h-7 rounded-xl flex-shrink-0 flex items-center justify-center mb-1"
                      style={{
                        background: "linear-gradient(135deg, #D7D3FF, #CFC8FF)",
                      }}
                    >
                      <Bot className="w-4 h-4" style={{ color: "#2B1236" }} />
                    </div>
                  )}
                  <div
                    className={`max-w-[80%] px-4 py-3 text-sm leading-relaxed whitespace-pre-line ${msg.role === "user" ? "chat-user" : "chat-bot"}`}
                    style={{ fontSize: "13px" }}
                  >
                    {msg.text}
                  </div>
                  {msg.role === "user" && (
                    <div
                      className="w-7 h-7 rounded-xl flex-shrink-0 flex items-center justify-center mb-1"
                      style={{
                        background: "linear-gradient(135deg, #F3A0A8, #f07b87)",
                      }}
                    >
                      <User className="w-4 h-4" style={{ color: "#2B1236" }} />
                    </div>
                  )}
                </motion.div>
              ))}
              {isTyping && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex items-end gap-2"
                >
                  <div
                    className="w-7 h-7 rounded-xl flex-shrink-0 flex items-center justify-center"
                    style={{
                      background: "linear-gradient(135deg, #D7D3FF, #CFC8FF)",
                    }}
                  >
                    <Bot className="w-4 h-4" style={{ color: "#2B1236" }} />
                  </div>
                  <div className="chat-bot px-4 py-3 flex items-center gap-1">
                    <span
                      className="w-2 h-2 rounded-full animate-bounce"
                      style={{ background: "#2B1236", animationDelay: "0ms" }}
                    />
                    <span
                      className="w-2 h-2 rounded-full animate-bounce"
                      style={{ background: "#2B1236", animationDelay: "150ms" }}
                    />
                    <span
                      className="w-2 h-2 rounded-full animate-bounce"
                      style={{ background: "#2B1236", animationDelay: "300ms" }}
                    />
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
            <div ref={messagesEndRef} />
          </div>

          <div
            className="px-4 py-2 flex gap-2 overflow-x-auto border-t"
            style={{ background: "#faf9fd" }}
          >
            {QUICK_CHIPS.map((chip) => (
              <button
                type="button"
                key={chip}
                onClick={() => sendMessage(chip)}
                className="flex-shrink-0 text-xs font-medium px-3 py-1.5 rounded-full border transition-all hover:scale-105"
                style={{
                  borderColor: "#D7D3FF",
                  color: "#2B1236",
                  background: "white",
                }}
                data-ocid="chatbot.toggle"
              >
                {chip}
              </button>
            ))}
          </div>

          <form
            onSubmit={handleSubmit}
            className="p-4 border-t bg-white flex gap-2"
          >
            <Input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type your message…"
              className="flex-1 rounded-xl border-0 bg-muted text-sm"
              data-ocid="chatbot.input"
            />
            <Button
              type="submit"
              disabled={!input.trim() || isTyping}
              className="rounded-xl px-4 text-white"
              style={{
                background: "linear-gradient(135deg, #2B1236, #3A1A4C)",
              }}
              data-ocid="chatbot.submit_button"
            >
              <Send className="w-4 h-4" />
            </Button>
          </form>
        </motion.div>
      </div>
    </div>
  );
}
