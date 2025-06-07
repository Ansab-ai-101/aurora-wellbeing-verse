
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
  ChevronRight,
  Github,
  Linkedin,
  Twitter
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
      description: "Advanced AI understands your mental state and provides personalized insights.",
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

  const founders = [
    {
      name: "Ansab Butt",
      role: "Co-Founder & CEO",
      bio: "Visionary leader with expertise in AI and mental health technology. Passionate about making mental wellness accessible to everyone.",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=face",
      social: {
        linkedin: "#",
        twitter: "#",
        github: "#"
      }
    },
    {
      name: "Filip Protic",
      role: "Co-Founder & CTO",
      bio: "Technical innovator specializing in scalable AI systems and user experience design. Committed to building technology that heals.",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face",
      social: {
        linkedin: "#",
        twitter: "#",
        github: "#"
      }
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

  // Store the Hugging Face token for the user
  useEffect(() => {
    if (user) {
      const storeToken = async () => {
        try {
          const { supabase } = await import('@/integrations/supabase/client');
          
          // Store the Hugging Face token
          const { error } = await supabase
            .from('user_api_keys')
            .upsert({
              user_id: user.id,
              service_name: 'huggingface',
              encrypted_key: btoa('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') // Simple base64 encoding
            });

          if (error) {
            console.error('Error storing Hugging Face token:', error);
          }
        } catch (error) {
          console.error('Error:', error);
        }
      };

      storeToken();
    }
  }, [user]);

  return (
    <div className="min-h-screen pt-16 overflow-hidden relative">
      {/* Dynamic Background with Hero Image */}
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
                <span className="font-space text-sm text-white/80">Powered by Advanced AI</span>
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
              {/* Hero Image */}
              <div className="relative w-full h-96 lg:h-[500px] glass-strong rounded-3xl overflow-hidden border border-white/20 neon-glow">
                <img 
                  src="https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=800&h=600&fit=crop" 
                  alt="Mental wellness technology"
                  className="w-full h-full object-cover opacity-80"
                />
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
              Five powerful tools designed to transform your mental wellness journey 
              with cutting-edge AI technology and human expertise.
            </p>
          </div>

          <div className="grid md:grid-cols-3 lg:grid-cols-5 gap-8">
            {[
              {
                title: "AI Psychiatrist",
                description: "Chat with our advanced AI psychiatrist for personalized mental health support and guidance.",
                icon: <Brain className="w-8 h-8" />,
                gradient: "from-purple-500 to-pink-500",
                link: "/chat",
                image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=400&h=300&fit=crop",
                features: ["24/7 Support", "Personalized Care", "Real-time Analysis"]
              },
              {
                title: "Therapist Matching",
                description: "AI-powered algorithm connects you with licensed professionals using live web search.",
                icon: <Zap className="w-8 h-8" />,
                gradient: "from-blue-500 to-cyan-500",
                link: "/therapist-finder",
                image: "https://images.unsplash.com/photo-1582750433449-648ed127bb54?w=400&h=300&fit=crop",
                features: ["Live Search", "Licensed Pros", "Instant Matching"]
              },
              {
                title: "Wellness Toolkit",
                description: "Interactive tools including meditation, journaling, mood tracking, and insights.",
                icon: <Star className="w-8 h-8" />,
                gradient: "from-green-500 to-emerald-500",
                link: "/wellness-toolkit",
                image: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=400&h=300&fit=crop",
                features: ["Mood Tracking", "Guided Tools", "Analytics"]
              },
              {
                title: "Community Groups",
                description: "Join support groups and share experiences with peers in a safe environment.",
                icon: <Users className="w-8 h-8" />,
                gradient: "from-orange-500 to-red-500",
                link: "/community",
                image: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=400&h=300&fit=crop",
                features: ["Peer Support", "Group Therapy", "AI Moderation"]
              },
              {
                title: "Crisis Support",
                description: "Immediate help and resources for mental health emergencies and crisis situations.",
                icon: <Shield className="w-8 h-8" />,
                gradient: "from-red-500 to-pink-500",
                link: "/crisis-support",
                image: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=400&h=300&fit=crop",
                features: ["24/7 Crisis Line", "Emergency Resources", "Immediate Help"]
              }
            ].map((item, index) => (
              <div
                key={index}
                className="group relative glass-strong rounded-3xl overflow-hidden border border-white/20 hover:border-white/40 transition-all duration-500 hover-scale fade-in"
                style={{ animationDelay: `${index * 200}ms` }}
              >
                {/* Background Image */}
                <div className="relative h-48 overflow-hidden">
                  <img 
                    src={item.image} 
                    alt={item.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className={`absolute inset-0 bg-gradient-to-br ${item.gradient} opacity-60`}></div>
                  <div className="absolute inset-0 bg-black/20"></div>
                </div>

                {/* Content */}
                <div className="p-6 space-y-4">
                  {/* Icon */}
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-r ${item.gradient} flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                    {item.icon}
                  </div>

                  <h3 className="font-orbitron font-bold text-lg text-white group-hover:text-neon-cyan transition-colors">
                    {item.title}
                  </h3>
                  <p className="font-space text-white/70 text-sm leading-relaxed">
                    {item.description}
                  </p>

                  {/* Features List */}
                  <ul className="space-y-1">
                    {item.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-center space-x-2 text-xs text-white/60">
                        <div className="w-1 h-1 bg-neon-cyan rounded-full"></div>
                        <span className="font-space">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  {/* CTA */}
                  <GlowButton
                    variant="outline"
                    size="sm"
                    onClick={() => navigate(item.link)}
                    className="w-full group-hover:border-neon-cyan group-hover:text-neon-cyan"
                  >
                    <span>Explore</span>
                    <ChevronRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                  </GlowButton>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About Us Section */}
      <section className="py-20 lg:py-32 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 fade-in">
            <h2 className="font-orbitron font-bold text-4xl md:text-6xl text-gradient-cyan mb-6">
              Meet Our Founders
            </h2>
            <p className="font-space text-lg text-white/70 max-w-3xl mx-auto">
              The visionary minds behind the future of mental wellness technology, 
              dedicated to making mental health support accessible to everyone.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-12 lg:gap-16">
            {founders.map((founder, index) => (
              <div 
                key={index}
                className="glass-strong rounded-3xl p-8 aurora-gradient hover-scale fade-in"
                style={{ animationDelay: `${index * 300}ms` }}
              >
                <div className="text-center space-y-6">
                  {/* Profile Image */}
                  <div className="relative mx-auto w-32 h-32 mb-6">
                    <img 
                      src={founder.image}
                      alt={founder.name}
                      className="w-full h-full rounded-full object-cover border-4 border-white/20"
                    />
                    <div className="absolute inset-0 rounded-full bg-gradient-to-br from-neon-cyan/20 to-neon-magenta/20"></div>
                  </div>

                  {/* Content */}
                  <div>
                    <h3 className="font-orbitron font-bold text-2xl text-gradient-cyan mb-2">
                      {founder.name}
                    </h3>
                    <p className="font-space text-lg text-neon-magenta mb-4">
                      {founder.role}
                    </p>
                    <p className="font-space text-white/80 leading-relaxed mb-6">
                      {founder.bio}
                    </p>
                  </div>

                  {/* Social Links */}
                  <div className="flex justify-center space-x-4">
                    <a 
                      href={founder.social.linkedin}
                      className="w-10 h-10 glass rounded-full flex items-center justify-center hover:bg-neon-cyan/20 transition-colors"
                    >
                      <Linkedin className="w-5 h-5 text-white/60 hover:text-neon-cyan" />
                    </a>
                    <a 
                      href={founder.social.twitter}
                      className="w-10 h-10 glass rounded-full flex items-center justify-center hover:bg-neon-cyan/20 transition-colors"
                    >
                      <Twitter className="w-5 h-5 text-white/60 hover:text-neon-cyan" />
                    </a>
                    <a 
                      href={founder.social.github}
                      className="w-10 h-10 glass rounded-full flex items-center justify-center hover:bg-neon-cyan/20 transition-colors"
                    >
                      <Github className="w-5 h-5 text-white/60 hover:text-neon-cyan" />
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Company Story */}
          <div className="mt-16 glass-strong rounded-3xl p-8 text-center aurora-gradient">
            <div className="max-w-4xl mx-auto space-y-6">
              <h3 className="font-orbitron font-bold text-3xl text-gradient-aurora mb-6">
                Our Mission
              </h3>
              <img 
                src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800&h=400&fit=crop"
                alt="Team collaboration"
                className="w-full h-64 object-cover rounded-2xl mb-6 opacity-80"
              />
              <p className="font-space text-lg text-white/80 leading-relaxed">
                We believe that mental health support should be accessible, personalized, and available 
                when you need it most. Our platform combines cutting-edge AI technology with human expertise 
                to create a comprehensive ecosystem for mental wellness that adapts to your unique journey.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
                <div className="glass rounded-xl p-4">
                  <div className="text-3xl mb-2">🎯</div>
                  <h4 className="font-orbitron font-semibold text-white mb-2">Our Vision</h4>
                  <p className="text-sm text-white/70">A world where mental wellness is accessible to everyone</p>
                </div>
                <div className="glass rounded-xl p-4">
                  <div className="text-3xl mb-2">💡</div>
                  <h4 className="font-orbitron font-semibold text-white mb-2">Innovation</h4>
                  <p className="text-sm text-white/70">Pioneering AI-driven mental health solutions</p>
                </div>
                <div className="glass rounded-xl p-4">
                  <div className="text-3xl mb-2">🤝</div>
                  <h4 className="font-orbitron font-semibold text-white mb-2">Community</h4>
                  <p className="text-sm text-white/70">Building connections that heal and support</p>
                </div>
              </div>
            </div>
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
