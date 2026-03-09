import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, X, Send } from "lucide-react";

interface ChatModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

interface Message {
  role: "user" | "bot";
  text: string;
}

const botResponses: Record<string, string> = {
  skills: "I'm proficient in React, TypeScript, Node.js, and Tailwind CSS for full-stack development. I'm also exploring cybersecurity (network security, ethical hacking) and data science (Python, ML, Pandas).",
  frontend: "My frontend expertise includes React.js, TypeScript, HTML5/CSS3, Tailwind CSS, and modern build tools like Vite. I focus on creating responsive, accessible, and performant interfaces.",
  cybersecurity: "I'm on an exciting journey into cybersecurity! I'm learning about network security, ethical hacking with tools like Wireshark and Nmap, Linux administration, and OWASP security principles.",
  "data science": "I'm exploring data science with Python, Pandas, NumPy, and scikit-learn. I've built projects involving sentiment analysis, sales forecasting, and data visualization dashboards.",
  projects: "I've worked on e-commerce dashboards, portfolio websites, network vulnerability scanners, phishing detection systems, sales forecasting models, and sentiment analysis tools. Check out the Projects section for details!",
  contact: "You can reach me at maadesh@gmail.com, find me on LinkedIn at linkedin.com/in/maadesh-rubiga, or check out my code on GitHub at github.com/maadesh-rubiga.",
  hello: "Hey there! 👋 I'm Maadesh's portfolio assistant. Ask me about skills, projects, cybersecurity, data science, or how to get in touch!",
  hi: "Hello! 👋 Welcome to Maadesh's portfolio. I can tell you about his skills, projects, and experience. What would you like to know?",
};

function getBotResponse(input: string): string {
  const lower = input.toLowerCase();
  for (const [key, value] of Object.entries(botResponses)) {
    if (lower.includes(key)) return value;
  }
  return "Great question! I can tell you about Maadesh's skills (frontend, cybersecurity, data science), projects, or contact info. What interests you?";
}

const ChatModal = ({ open, onOpenChange }: ChatModalProps) => {
  const [messages, setMessages] = useState<Message[]>([
    { role: "bot", text: "Hi! 👋 I'm Maadesh's portfolio assistant. Ask me about skills, projects, or contact info!" },
  ]);
  const [input, setInput] = useState("");
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages]);

  const send = () => {
    if (!input.trim()) return;
    const userMsg = input.trim();
    setMessages((prev) => [...prev, { role: "user", text: userMsg }]);
    setInput("");
    setTimeout(() => {
      setMessages((prev) => [...prev, { role: "bot", text: getBotResponse(userMsg) }]);
    }, 600);
  };

  return (
    <>
      <motion.button
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 1.5, type: "spring" }}
        onClick={() => onOpenChange(true)}
        className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full bg-primary text-primary-foreground flex items-center justify-center shadow-lg shadow-primary/30 hover:scale-110 transition-transform"
        aria-label="Open chat"
      >
        <MessageCircle size={24} />
      </motion.button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="fixed bottom-24 right-6 z-50 w-[360px] max-h-[500px] rounded-2xl bg-card border border-border shadow-2xl flex flex-col overflow-hidden"
          >
            <div className="px-5 py-4 border-b border-border flex items-center justify-between">
              <div>
                <h3 className="font-bold font-display text-sm">Chat with Maadesh</h3>
                <p className="text-xs text-muted-foreground">Ask me anything</p>
              </div>
              <button onClick={() => onOpenChange(false)} className="text-muted-foreground hover:text-foreground transition-colors">
                <X size={18} />
              </button>
            </div>

            <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-3 min-h-[300px]">
              {messages.map((msg, i) => (
                <div key={i} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
                  <div
                    className={`max-w-[80%] px-4 py-2.5 rounded-2xl text-sm leading-relaxed ${
                      msg.role === "user"
                        ? "bg-primary text-primary-foreground rounded-br-md"
                        : "bg-muted text-foreground rounded-bl-md"
                    }`}
                  >
                    {msg.text}
                  </div>
                </div>
              ))}
            </div>

            <div className="px-4 py-3 border-t border-border flex gap-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && send()}
                placeholder="Type a message..."
                className="flex-1 px-4 py-2 rounded-xl bg-muted border border-border text-foreground placeholder:text-muted-foreground text-sm focus:outline-none focus:border-primary/50"
              />
              <button
                onClick={send}
                className="w-10 h-10 rounded-xl bg-primary text-primary-foreground flex items-center justify-center hover:shadow-primary/25 hover:shadow-lg transition-all"
              >
                <Send size={16} />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default ChatModal;
