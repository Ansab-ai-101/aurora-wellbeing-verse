
import { useState } from "react";
import GlowButton from "@/components/GlowButton";

interface Message {
  id: string;
  text: string;
  sender: "user" | "other";
  timestamp: Date;
  avatar?: string;
}

const Chat = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      text: "Welcome to the Re-Leader community! How are you feeling today?",
      sender: "other",
      timestamp: new Date(),
      avatar: "AI"
    }
  ]);
  const [newMessage, setNewMessage] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  const rooms = [
    { name: "General Support", active: true, count: 127 },
    { name: "Anxiety Relief", active: false, count: 89 },
    { name: "Depression Support", active: false, count: 156 },
    { name: "Mindfulness", active: false, count: 203 },
    { name: "Daily Check-ins", active: false, count: 78 }
  ];

  const handleSendMessage = () => {
    if (!newMessage.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: newMessage,
      sender: "user",
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setNewMessage("");
    setIsTyping(true);

    // Simulate AI response
    setTimeout(() => {
      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        text: "Thank you for sharing. Your feelings are valid and you're not alone in this journey. What would help you feel more supported right now?",
        sender: "other",
        timestamp: new Date(),
        avatar: "AI"
      };
      setMessages(prev => [...prev, aiResponse]);
      setIsTyping(false);
    }, 2000);
  };

  return (
    <div className="min-h-screen pt-16 flex">
      {/* Sidebar */}
      <div className="w-80 glass border-r border-white/10 p-6 hidden lg:block">
        <div className="space-y-6">
          <div>
            <h2 className="font-orbitron font-bold text-xl text-gradient-cyan mb-4">
              Community Rooms
            </h2>
            <div className="space-y-2">
              {rooms.map((room) => (
                <div
                  key={room.name}
                  className={`p-3 rounded-lg cursor-pointer transition-all duration-300 ${
                    room.active 
                      ? "glass-strong border border-neon-cyan/50 neon-glow" 
                      : "hover:glass"
                  }`}
                >
                  <div className="flex justify-between items-center">
                    <span className="font-space text-sm text-white">
                      {room.name}
                    </span>
                    <span className="text-xs text-white/60 bg-white/10 px-2 py-1 rounded-full">
                      {room.count}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>

          <div>
            <h3 className="font-orbitron font-semibold text-lg text-white/80 mb-3">
              Pinned Topics
            </h3>
            <div className="space-y-2 text-sm">
              <div className="text-white/60">🌟 Daily Wellness Tips</div>
              <div className="text-white/60">💭 Thought Sharing</div>
              <div className="text-white/60">🎯 Goal Setting</div>
            </div>
          </div>
        </div>
      </div>

      {/* Chat Area */}
      <div className="flex-1 flex flex-col">
        {/* Chat Header */}
        <div className="glass border-b border-white/10 p-4">
          <div className="flex items-center space-x-3">
            <div className="w-3 h-3 bg-neon-cyan rounded-full animate-pulse"></div>
            <h1 className="font-orbitron font-bold text-xl text-gradient-cyan">
              General Support
            </h1>
            <span className="text-white/60 text-sm">127 online</span>
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 p-6 overflow-y-auto space-y-6">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}
            >
              <div className={`max-w-md ${message.sender === "user" ? "order-2" : ""}`}>
                <div
                  className={`p-4 rounded-2xl ${
                    message.sender === "user"
                      ? "bg-gradient-to-r from-neon-cyan to-neon-magenta text-black ml-4"
                      : "glass border border-white/20 mr-4"
                  }`}
                >
                  <p className="font-space text-sm">{message.text}</p>
                </div>
                <div className={`text-xs text-white/60 mt-1 ${message.sender === "user" ? "text-right" : ""}`}>
                  {message.avatar && `${message.avatar} • `}
                  {message.timestamp.toLocaleTimeString()}
                </div>
              </div>
            </div>
          ))}

          {isTyping && (
            <div className="flex justify-start">
              <div className="glass border border-white/20 p-4 rounded-2xl mr-4">
                <div className="flex space-x-1">
                  <div className="w-2 h-2 bg-neon-cyan rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-neon-cyan rounded-full animate-bounce" style={{animationDelay: "0.1s"}}></div>
                  <div className="w-2 h-2 bg-neon-cyan rounded-full animate-bounce" style={{animationDelay: "0.2s"}}></div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Message Input */}
        <div className="glass border-t border-white/10 p-4">
          <div className="flex space-x-4">
            <input
              type="text"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
              placeholder="Share your thoughts with the community..."
              className="flex-1 bg-white/5 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-neon-cyan focus:border-transparent font-space"
            />
            <GlowButton variant="primary" onClick={handleSendMessage}>
              Send
            </GlowButton>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chat;
