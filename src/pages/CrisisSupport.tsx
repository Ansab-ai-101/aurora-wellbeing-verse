
import GlowButton from "@/components/GlowButton";
import { Phone, MessageCircle, Shield, Clock, Users, Heart } from "lucide-react";

const CrisisSupport = () => {
  const crisisResources = [
    {
      name: "National Suicide Prevention Lifeline",
      number: "988",
      description: "24/7 free and confidential support for people in distress",
      available: "24/7"
    },
    {
      name: "Crisis Text Line",
      number: "Text HOME to 741741",
      description: "24/7 crisis support via text message",
      available: "24/7"
    },
    {
      name: "SAMHSA National Helpline",
      number: "1-800-662-4357",
      description: "Treatment referral and information service",
      available: "24/7"
    }
  ];

  return (
    <div className="min-h-screen pt-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Emergency Header */}
        <div className="text-center mb-12 fade-in">
          <div className="w-20 h-20 bg-gradient-to-r from-red-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-6 neon-glow">
            <Shield className="w-10 h-10 text-white" />
          </div>
          <h1 className="font-orbitron font-bold text-4xl md:text-5xl text-gradient-cyan mb-6">
            Crisis Support
          </h1>
          <p className="font-space text-lg text-white/70 max-w-2xl mx-auto">
            If you're experiencing a mental health emergency, you're not alone. 
            Immediate help is available 24/7.
          </p>
        </div>

        {/* Emergency Notice */}
        <div className="glass-strong rounded-2xl p-6 mb-8 border-2 border-red-500/30 bg-gradient-to-r from-red-500/10 to-pink-500/10">
          <div className="text-center space-y-4">
            <h2 className="font-orbitron font-bold text-xl text-red-400">
              🚨 If you're in immediate danger, call 911 🚨
            </h2>
            <p className="font-space text-white/80">
              For life-threatening emergencies, contact your local emergency services immediately.
            </p>
          </div>
        </div>

        {/* Crisis Resources */}
        <div className="space-y-6 mb-12">
          <h2 className="font-orbitron font-bold text-2xl text-gradient-cyan text-center mb-8">
            Immediate Crisis Resources
          </h2>
          
          {crisisResources.map((resource, index) => (
            <div
              key={index}
              className="glass-strong rounded-2xl p-6 border border-white/20 hover:border-neon-cyan/50 transition-all duration-300"
            >
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <h3 className="font-orbitron font-bold text-lg text-white mb-2">
                    {resource.name}
                  </h3>
                  <p className="font-space text-white/80 mb-3">
                    {resource.description}
                  </p>
                  <div className="flex items-center space-x-4 text-sm">
                    <div className="flex items-center space-x-2 text-green-400">
                      <Clock className="w-4 h-4" />
                      <span className="font-space">{resource.available}</span>
                    </div>
                  </div>
                </div>
                <div className="text-center">
                  <div className="font-orbitron font-bold text-xl text-neon-cyan mb-3">
                    {resource.number}
                  </div>
                  <GlowButton variant="primary" size="sm">
                    <Phone className="w-4 h-4 mr-2" />
                    Call Now
                  </GlowButton>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Immediate Support Options */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          <div className="glass-strong rounded-2xl p-6 text-center space-y-4">
            <MessageCircle className="w-12 h-12 text-neon-cyan mx-auto" />
            <h3 className="font-orbitron font-bold text-lg text-gradient-cyan">
              AI Crisis Chat
            </h3>
            <p className="font-space text-white/80 text-sm">
              Chat with our specialized crisis AI for immediate support and guidance
            </p>
            <GlowButton variant="primary" className="w-full">
              Start Crisis Chat
            </GlowButton>
          </div>

          <div className="glass-strong rounded-2xl p-6 text-center space-y-4">
            <Users className="w-12 h-12 text-neon-magenta mx-auto" />
            <h3 className="font-orbitron font-bold text-lg text-gradient-cyan">
              Peer Support
            </h3>
            <p className="font-space text-white/80 text-sm">
              Connect with trained peer supporters who understand your experience
            </p>
            <GlowButton variant="secondary" className="w-full">
              Find Peer Support
            </GlowButton>
          </div>
        </div>

        {/* Self-Care Resources */}
        <div className="glass-strong rounded-2xl p-8 text-center">
          <Heart className="w-16 h-16 text-red-400 mx-auto mb-6" />
          <h2 className="font-orbitron font-bold text-2xl text-gradient-cyan mb-6">
            You Matter
          </h2>
          <p className="font-space text-white/80 max-w-2xl mx-auto mb-8 leading-relaxed">
            Your life has value, and you deserve support. Crisis situations are temporary, 
            even though they may not feel that way right now. Help is available, and recovery is possible.
          </p>
          
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="glass rounded-lg p-4">
              <h4 className="font-orbitron font-semibold text-white mb-2">Breathe</h4>
              <p className="text-xs text-white/70 font-space">Take slow, deep breaths. In for 4, hold for 4, out for 4.</p>
            </div>
            <div className="glass rounded-lg p-4">
              <h4 className="font-orbitron font-semibold text-white mb-2">Ground</h4>
              <p className="text-xs text-white/70 font-space">Name 5 things you see, 4 you hear, 3 you feel, 2 you smell, 1 you taste.</p>
            </div>
            <div className="glass rounded-lg p-4">
              <h4 className="font-orbitron font-semibold text-white mb-2">Connect</h4>
              <p className="text-xs text-white/70 font-space">Reach out to someone you trust or use one of the resources above.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CrisisSupport;
