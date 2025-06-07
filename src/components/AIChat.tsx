
import { useState } from "react";
import { useAIChat } from "@/hooks/useAIChat";
import GlowButton from "./GlowButton";
import { Bot, User, Sparkles, RefreshCw } from "lucide-react";

const AIChat = () => {
  const { messages, isLoading, error, sendMessage, clearMessages } = useAIChat();
  const [input, setInput] = useState("");

  const handleSend = async () => {
    if (!input.trim()) return;
    
    const messageToSend = input;
    setInput("");
    await sendMessage(messageToSend);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="glass border-b border-white/10 p-4 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="relative">
            <div className="w-10 h-10 rounded-full bg-gradient-to-r from-neon-cyan to-neon-magenta flex items-center justify-center">
              <Bot className="w-5 h-5 text-black" />
            </div>
            <div className="absolute -top-1 -right-1 w-4 h-4 bg-neon-cyan rounded-full animate-pulse"></div>
          </div>
          <div>
            <h1 className="font-orbitron font-bold text-lg text-gradient-cyan">
              AI Wellness Companion
            </h1>
            <p className="text-white/60 text-sm font-space">DeepSeek AI • Always here to listen</p>
          </div>
        </div>
        <GlowButton 
          variant="outline" 
          size="sm" 
          onClick={clearMessages}
          className="flex items-center space-x-2"
        >
          <RefreshCw className="w-4 h-4" />
          <span>Reset</span>
        </GlowButton>
      </div>

      {/* Messages */}
      <div className="flex-1 p-6 overflow-y-auto space-y-6 bg-gradient-to-b from-transparent to-black/20">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex items-start space-x-4 ${
              message.role === 'user' ? 'flex-row-reverse space-x-reverse' : ''
            } fade-in`}
          >
            {/* Avatar */}
            <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${
              message.role === 'user' 
                ? 'bg-white/10 border border-white/20' 
                : 'bg-gradient-to-r from-neon-cyan to-neon-magenta'
            }`}>
              {message.role === 'user' ? (
                <User className="w-5 h-5 text-white" />
              ) : (
                <Bot className="w-5 h-5 text-black" />
              )}
            </div>

            {/* Message Content */}
            <div className={`max-w-md ${message.role === 'user' ? 'ml-4' : 'mr-4'}`}>
              <div
                className={`p-4 rounded-2xl ${
                  message.role === 'user'
                    ? 'bg-gradient-to-r from-neon-cyan/20 to-neon-magenta/20 border border-white/20 ml-auto'
                    : 'glass border border-white/20'
                } hover-scale`}
              >
                <p className="font-space text-sm text-white leading-relaxed">
                  {message.content}
                </p>
              </div>
              <div className={`text-xs text-white/40 mt-2 font-space ${
                message.role === 'user' ? 'text-right' : ''
              }`}>
                {message.timestamp.toLocaleTimeString()}
              </div>
            </div>
          </div>
        ))}

        {isLoading && (
          <div className="flex items-start space-x-4 fade-in">
            <div className="w-10 h-10 rounded-full bg-gradient-to-r from-neon-cyan to-neon-magenta flex items-center justify-center">
              <Bot className="w-5 h-5 text-black" />
            </div>
            <div className="glass border border-white/20 p-4 rounded-2xl mr-4">
              <div className="flex items-center space-x-2">
                <Sparkles className="w-4 h-4 text-neon-cyan animate-pulse" />
                <span className="font-space text-sm text-white/80">AI is thinking...</span>
              </div>
              <div className="flex space-x-1 mt-2">
                <div className="w-2 h-2 bg-neon-cyan rounded-full animate-bounce"></div>
                <div className="w-2 h-2 bg-neon-cyan rounded-full animate-bounce" style={{animationDelay: "0.1s"}}></div>
                <div className="w-2 h-2 bg-neon-cyan rounded-full animate-bounce" style={{animationDelay: "0.2s"}}></div>
              </div>
            </div>
          </div>
        )}

        {error && (
          <div className="text-center p-4 glass border border-red-500/20 rounded-lg">
            <p className="text-red-400 font-space text-sm">{error}</p>
          </div>
        )}
      </div>

      {/* Input */}
      <div className="glass border-t border-white/10 p-4">
        <div className="flex space-x-4 items-end">
          <div className="flex-1">
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Share what's on your mind..."
              className="w-full bg-white/5 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-neon-cyan focus:border-transparent font-space resize-none"
              rows={3}
              disabled={isLoading}
            />
          </div>
          <GlowButton 
            variant="primary" 
            onClick={handleSend}
            disabled={!input.trim() || isLoading}
            className="self-end"
          >
            Send
          </GlowButton>
        </div>
      </div>
    </div>
  );
};

export default AIChat;
