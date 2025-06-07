
import { useState } from "react";
import { useAIChat } from "@/hooks/useAIChat";
import GlowButton from "./GlowButton";
import { Bot, User, Sparkles, RefreshCw, Heart, Brain } from "lucide-react";

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
      {/* Enhanced Header */}
      <div className="glass border-b border-white/10 p-6 flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <div className="relative">
            <div className="w-12 h-12 rounded-full bg-gradient-to-r from-neon-cyan to-neon-magenta flex items-center justify-center neon-glow">
              <Brain className="w-6 h-6 text-black" />
            </div>
            <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-400 rounded-full animate-pulse border-2 border-black"></div>
          </div>
          <div>
            <h1 className="font-orbitron font-bold text-xl text-gradient-cyan">
              AI Psychiatrist
            </h1>
            <p className="text-white/60 text-sm font-space flex items-center space-x-2">
              <Heart className="w-3 h-3 text-red-400" />
              <span>Your personal mental health companion</span>
            </p>
          </div>
        </div>
        <div className="flex items-center space-x-3">
          <div className="px-3 py-1 bg-green-500/20 rounded-full border border-green-500/30">
            <span className="text-green-400 text-xs font-space">Online</span>
          </div>
          <GlowButton 
            variant="outline" 
            size="sm" 
            onClick={clearMessages}
            className="flex items-center space-x-2"
          >
            <RefreshCw className="w-4 h-4" />
            <span>New Session</span>
          </GlowButton>
        </div>
      </div>

      {/* Welcome Message */}
      {messages.length === 0 && (
        <div className="p-6 border-b border-white/10">
          <div className="glass-strong rounded-2xl p-6 text-center space-y-4">
            <div className="w-16 h-16 bg-gradient-to-r from-neon-cyan to-neon-magenta rounded-full flex items-center justify-center mx-auto mb-4">
              <Brain className="w-8 h-8 text-black" />
            </div>
            <h2 className="font-orbitron font-bold text-lg text-gradient-cyan">
              Welcome to Your AI Psychiatrist
            </h2>
            <p className="font-space text-white/70 text-sm leading-relaxed max-w-md mx-auto">
              I'm here to provide personalized mental health support. Share what's on your mind, 
              and I'll offer professional insights, coping strategies, and a safe space to explore your thoughts.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-6">
              <button 
                onClick={() => setInput("I'm feeling anxious about work")}
                className="glass rounded-lg p-3 text-xs text-white/80 hover:bg-white/10 transition-colors"
              >
                💼 Work Anxiety
              </button>
              <button 
                onClick={() => setInput("I'm having trouble sleeping")}
                className="glass rounded-lg p-3 text-xs text-white/80 hover:bg-white/10 transition-colors"
              >
                😴 Sleep Issues
              </button>
              <button 
                onClick={() => setInput("I feel overwhelmed lately")}
                className="glass rounded-lg p-3 text-xs text-white/80 hover:bg-white/10 transition-colors"
              >
                🌊 Feeling Overwhelmed
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Messages */}
      <div className="flex-1 p-6 overflow-y-auto space-y-6 bg-gradient-to-b from-transparent to-black/20">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex items-start space-x-4 ${
              message.role === 'user' ? 'flex-row-reverse space-x-reverse' : ''
            } fade-in`}
          >
            {/* Enhanced Avatar */}
            <div className={`w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0 ${
              message.role === 'user' 
                ? 'bg-gradient-to-r from-purple-500 to-pink-500 border-2 border-white/20' 
                : 'bg-gradient-to-r from-neon-cyan to-neon-magenta neon-glow'
            }`}>
              {message.role === 'user' ? (
                <User className="w-6 h-6 text-white" />
              ) : (
                <Brain className="w-6 h-6 text-black" />
              )}
            </div>

            {/* Enhanced Message Content */}
            <div className={`max-w-2xl ${message.role === 'user' ? 'ml-4' : 'mr-4'}`}>
              <div
                className={`p-5 rounded-2xl ${
                  message.role === 'user'
                    ? 'bg-gradient-to-r from-purple-500/20 to-pink-500/20 border border-purple-500/30 ml-auto'
                    : 'glass-strong border border-white/20 bg-gradient-to-r from-white/5 to-white/10'
                } hover-scale`}
              >
                <p className="font-space text-sm text-white leading-relaxed whitespace-pre-wrap">
                  {message.content}
                </p>
              </div>
              <div className={`text-xs text-white/40 mt-2 font-space flex items-center space-x-2 ${
                message.role === 'user' ? 'justify-end' : ''
              }`}>
                <span>{message.timestamp.toLocaleTimeString()}</span>
                {message.role === 'assistant' && (
                  <>
                    <span>•</span>
                    <span className="text-green-400">AI Psychiatrist</span>
                  </>
                )}
              </div>
            </div>
          </div>
        ))}

        {isLoading && (
          <div className="flex items-start space-x-4 fade-in">
            <div className="w-12 h-12 rounded-full bg-gradient-to-r from-neon-cyan to-neon-magenta flex items-center justify-center neon-glow">
              <Brain className="w-6 h-6 text-black" />
            </div>
            <div className="glass-strong border border-white/20 p-5 rounded-2xl mr-4">
              <div className="flex items-center space-x-3">
                <Sparkles className="w-5 h-5 text-neon-cyan animate-pulse" />
                <span className="font-space text-sm text-white/80">Analyzing and preparing response...</span>
              </div>
              <div className="flex space-x-1 mt-3">
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

      {/* Enhanced Input */}
      <div className="glass border-t border-white/10 p-6">
        <div className="flex space-x-4 items-end">
          <div className="flex-1">
            <div className="relative">
              <textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Share your thoughts, feelings, or concerns..."
                className="w-full bg-white/5 border border-white/20 rounded-xl px-4 py-4 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-neon-cyan focus:border-transparent font-space resize-none min-h-[80px]"
                rows={3}
                disabled={isLoading}
              />
              <div className="absolute bottom-2 right-2 text-xs text-white/40 font-space">
                Press Enter to send, Shift+Enter for new line
              </div>
            </div>
          </div>
          <GlowButton 
            variant="primary" 
            size="lg"
            onClick={handleSend}
            disabled={!input.trim() || isLoading}
            className="self-end flex items-center space-x-2"
          >
            <span>Send</span>
            <Heart className="w-4 h-4" />
          </GlowButton>
        </div>
        
        {/* Privacy Notice */}
        <div className="mt-3 text-center">
          <p className="text-xs text-white/40 font-space">
            🔒 Your conversations are private and secure. This AI provides support but doesn't replace professional therapy.
          </p>
        </div>
      </div>
    </div>
  );
};

export default AIChat;
