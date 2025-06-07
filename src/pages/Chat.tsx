
import AIChat from "@/components/AIChat";
import APIKeyNotice from "@/components/APIKeyNotice";

const Chat = () => {
  return (
    <div className="min-h-screen pt-16 flex">
      {/* Background Elements */}
      <div className="absolute inset-0 cosmic-bg opacity-30"></div>
      <div className="absolute top-32 left-20 w-32 h-32 bg-neon-cyan/10 rounded-full blur-3xl animate-float"></div>
      <div className="absolute bottom-32 right-20 w-40 h-40 bg-neon-magenta/10 rounded-full blur-3xl animate-float" style={{animationDelay: "2s"}}></div>
      
      {/* API Key Notice */}
      <APIKeyNotice />
      
      <div className="relative z-10 w-full max-w-4xl mx-auto p-6">
        <div className="glass-strong rounded-3xl h-[85vh] overflow-hidden border border-white/20 neon-glow">
          <AIChat />
        </div>
      </div>
    </div>
  );
};

export default Chat;
