
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import GlowButton from "@/components/GlowButton";
import { 
  Brain, 
  Sparkles, 
  Zap, 
  Shield, 
  Users, 
  Rocket,
  Star,
  ArrowRight,
  Play,
  ChevronRight
} from "lucide-react";

const Index = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [activeFeature, setActiveFeature] = useState(0);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const features = [
    {
      icon: <Brain className="w-8 h-8" />,
      title: "AI-Powered Analysis",
      description: "Advanced DeepSeek AI understands your mental state and provides personalized insights.",
      color: "from-purple-500 to-pink-500"
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: "Community Support",
      description: "Connect with peers in a safe, moderated environment for shared experiences.",
      color: "from-blue-500 to-cyan-500"
    },
    {
      icon: <Shield className="w-8 h-8" />,
      title: "Privacy First",
      description: "Your data is encrypted and protected with enterprise-grade security.",
      color: "from-green-500 to-emerald-500"
    },
    {
      icon: <Zap className="w-8 h-8" />,
      title: "Real-time Matching",
      description: "Instantly connect with licensed therapists based on your specific needs.",
      color: "from-yellow-500 to-orange-500"
    }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveFeature((prev) => (prev + 1) % features.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div className="min-h-screen pt-16 overflow-hidden relative">
      {/* Dynamic Background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-black via-purple-900/20 to-black"></div>
        <div 
          className="absolute w-96 h-96 bg-gradient-to-r from-neon-cyan/20 to-neon-magenta/20 rounded-full blur-3xl animate-float"
          style={{
            left: mousePosition.x * 0.02 + 'px',
            top: mousePosition.y * 0.02 + 'px',
          }}
        ></div>
        <div className="absolute top-1/4 right-1/4 w-64 h-64 bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-full blur-2xl animate-float" style={{animationDelay: "2s"}}></div>
        <div className="absolute bottom-1/4 left-1/4 w-80 h-80 bg-gradient-to-r from-blue-500/10 to-cyan-500/10 rounded-full blur-3xl animate-float" style={{animationDelay: "4s"}}></div>
      </div>

      {/* Hero Section */}
      <section className="relative py-20 lg:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div className="space-y-8 fade-in">
              <div className="inline-flex items-center glass px-6 py-3 rounded-full border border-white/20 mb-8">
                <Sparkles className="w-4 h-4 text-neon-cyan mr-3 animate-pulse" />
                <span className="font-space text-sm text-white/80">Powered by DeepSeek AI</span>
                <div className="ml-3 w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
              </div>

              <h1 className="font-orbitron font-bold text-5xl md:text-7xl leading-tight">
                <span className="block text-gradient-aurora">Mental Wellness</span>
                <span className="block text-gradient-cyan">Reimagined</span>
              </h1>

              <p className="font-space text-xl md:text-2xl text-white/70 leading-relaxed">
                Experience the future of mental health with AI-powered insights, 
                real-time therapist matching, and a supportive community—all in one 
                revolutionary platform.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 pt-8">
                {user ? (
                  <GlowButton 
                    variant="primary" 
                    size="lg"
                    onClick={() => navigate("/chat")}
                    className="flex items-center space-x-2"
                  >
                    <Play className="w-5 h-5" />
                    <span>Start AI Chat</span>
                  </GlowButton>
                ) : (
                  <GlowButton 
                    variant="primary" 
                    size="lg"
                    onClick={() => navigate("/auth")}
                    className="flex items-center space-x-2"
                  >
                    <Rocket className="w-5 h-5" />
                    <span>Get Started Free</span>
                  </GlowButton>
                )}
                <GlowButton 
                  variant="outline" 
                  size="lg"
                  onClick={() => navigate("/wellness-toolkit")}
                  className="flex items-center space-x-2"
                >
                  <span>Explore Tools</span>
                  <ArrowRight className="w-5 h-5" />
                </GlowButton>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-6 pt-8 border-t border-white/10">
                {[
                  { number: "10K+", label: "Active Users" },
                  { number: "500+", label: "Therapists" },
                  { number: "99.9%", label: "Uptime" }
                ].map((stat, index) => (
                  <div key={index} className="text-center">
                    <div className="font-orbitron font-bold text-2xl text-gradient-cyan">{stat.number}</div>
                    <div className="font-space text-sm text-white/60">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Visual */}
            <div className="relative">
              {/* Main Visual Container */}
              <div className="relative w-full h-96 lg:h-[500px] glass-strong rounded-3xl overflow-hidden border border-white/20 neon-glow">
                {/* Animated Background */}
                <div className="absolute inset-0 bg-gradient-to-br from-neon-cyan/20 via-purple-500/20 to-neon-magenta/20"></div>
                
                {/* Floating Elements */}
                <div className="absolute inset-0 overflow-hidden">
                  {[...Array(6)].map((_, i) => (
                    <div
                      key={i}
                      className="absolute w-4 h-4 bg-white/20 rounded-full animate-float"
                      style={{
                        left: `${20 + i * 15}%`,
                        top: `${10 + i * 12}%`,
                        animationDelay: `${i * 0.5}s`,
                        animationDuration: `${3 + i * 0.5}s`
                      }}
                    ></div>
                  ))}
                </div>

                {/* Central Brain Visualization */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="relative">
                    <div className="w-32 h-32 bg-gradient-to-r from-neon-cyan to-neon-magenta rounded-full opacity-80 animate-pulse"></div>
                    <div className="absolute inset-4 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full opacity-60 animate-pulse" style={{animationDelay: "0.5s"}}></div>
                    <div className="absolute inset-8 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full opacity-40 animate-pulse" style={{animationDelay: "1s"}}></div>
                    <Brain className="absolute inset-0 m-auto w-16 h-16 text-white animate-pulse" />
                  </div>
                </div>

                {/* Feature Indicators */}
                <div className="absolute bottom-6 left-6 right-6">
                  <div className="flex space-x-2 justify-center">
                    {features.map((_, index) => (
                      <div
                        key={index}
                        className={`w-2 h-2 rounded-full transition-all duration-300 ${
                          index === activeFeature ? 'bg-neon-cyan' : 'bg-white/30'
                        }`}
                      ></div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Floating Feature Cards */}
              {features.map((feature, index) => (
                <div
                  key={index}
                  className={`absolute glass-strong rounded-xl p-4 border border-white/20 transition-all duration-500 ${
                    index === activeFeature ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
                  }`}
                  style={{
                    top: index % 2 === 0 ? '20%' : '60%',
                    left: index % 2 === 0 ? '-20%' : '110%',
                    width: '200px',
                  }}
                >
                  <div className={`w-8 h-8 rounded-lg bg-gradient-to-r ${feature.color} flex items-center justify-center mb-3`}>
                    {feature.icon}
                  </div>
                  <h3 className="font-orbitron font-semibold text-sm text-white mb-2">{feature.title}</h3>
                  <p className="font-space text-xs text-white/70">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-20 lg:py-32 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 fade-in">
            <h2 className="font-orbitron font-bold text-4xl md:text-6xl text-gradient-cyan mb-6">
              Revolutionary Features
            </h2>
            <p className="font-space text-lg text-white/70 max-w-3xl mx-auto">
              Three powerful tools designed to transform your mental wellness journey 
              with cutting-edge AI technology and human expertise.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: "AI Community Chat",
                description: "Engage with our advanced DeepSeek AI for personalized mental health support and connect with a supportive community.",
                icon: <Brain className="w-8 h-8" />,
                gradient: "from-purple-500 to-pink-500",
                link: "/chat",
                features: ["24/7 AI Support", "Community Forums", "Anonymous Mode"]
              },
              {
                title: "Smart Therapist Matching",
                description: "AI-powered algorithm instantly connects you with licensed professionals based on your unique needs and preferences.",
                icon: <Zap className="w-8 h-8" />,
                gradient: "from-blue-500 to-cyan-500",
                link: "/therapist-finder",
                features: ["Real-time Matching", "Licensed Professionals", "Secure Booking"]
              },
              {
                title: "Wellness Toolkit",
                description: "Comprehensive suite of interactive tools including meditation, journaling, mood tracking, and personalized insights.",
                icon: <Star className="w-8 h-8" />,
                gradient: "from-green-500 to-emerald-500",
                link: "/wellness-toolkit",
                features: ["Mood Tracking", "Guided Meditation", "Progress Analytics"]
              }
            ].map((item, index) => (
              <div
                key={index}
                className="group relative glass-strong rounded-3xl p-8 border border-white/20 hover:border-white/40 transition-all duration-500 hover-scale fade-in"
                style={{ animationDelay: `${index * 200}ms` }}
              >
                {/* Background Gradient */}
                <div className={`absolute inset-0 bg-gradient-to-br ${item.gradient} opacity-0 group-hover:opacity-10 rounded-3xl transition-opacity duration-500`}></div>
                
                {/* Icon */}
                <div className={`w-16 h-16 rounded-2xl bg-gradient-to-r ${item.gradient} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                  {item.icon}
                </div>

                {/* Content */}
                <h3 className="font-orbitron font-bold text-xl text-white mb-4 group-hover:text-neon-cyan transition-colors">
                  {item.title}
                </h3>
                <p className="font-space text-white/70 mb-6 leading-relaxed">
                  {item.description}
                </p>

                {/* Features List */}
                <ul className="space-y-2 mb-6">
                  {item.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center space-x-2 text-sm text-white/60">
                      <div className="w-1.5 h-1.5 bg-neon-cyan rounded-full"></div>
                      <span className="font-space">{feature}</span>
                    </li>
                  ))}
                </ul>

                {/* CTA */}
                <GlowButton
                  variant="outline"
                  onClick={() => navigate(item.link)}
                  className="w-full group-hover:border-neon-cyan group-hover:text-neon-cyan"
                >
                  <span>Explore</span>
                  <ChevronRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                </GlowButton>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 lg:py-32 relative">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="glass-strong rounded-3xl p-12 space-y-8 border border-white/20 neon-glow fade-in">
            <div className="flex justify-center space-x-4 mb-6">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-6 h-6 text-yellow-400 fill-current" />
              ))}
            </div>
            
            <h3 className="font-orbitron font-bold text-3xl md:text-5xl text-gradient-aurora">
              Ready to Transform Your Mental Wellness?
            </h3>
            
            <p className="font-space text-lg text-white/80 max-w-2xl mx-auto leading-relaxed">
              Join thousands of users who have already discovered the power of 
              AI-enhanced mental health support. Your journey to better mental 
              wellness starts here.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-8">
              {user ? (
                <GlowButton 
                  variant="primary" 
                  size="lg"
                  onClick={() => navigate("/platform")}
                  className="flex items-center space-x-2"
                >
                  <Rocket className="w-5 h-5" />
                  <span>Launch Platform</span>
                </GlowButton>
              ) : (
                <GlowButton 
                  variant="primary" 
                  size="lg"
                  onClick={() => navigate("/auth")}
                  className="flex items-center space-x-2"
                >
                  <Rocket className="w-5 h-5" />
                  <span>Start Free Today</span>
                </GlowButton>
              )}
            </div>

            <div className="text-sm text-white/50 font-space">
              No credit card required • Free forever plan available
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;
