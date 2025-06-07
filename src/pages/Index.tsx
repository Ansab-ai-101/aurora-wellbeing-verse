
import { useState, useEffect } from "react";
import FeatureCard from "@/components/FeatureCard";
import GlowButton from "@/components/GlowButton";
import { useNavigate } from "react-router-dom";

const Index = () => {
  const navigate = useNavigate();
  const [textIndex, setTextIndex] = useState(0);
  const texts = [
    "AI-Powered Mental Wellness for the Future",
    "Connect with Licensed Psychiatrists Instantly",
    "Unlock Your Mental Potential Today"
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setTextIndex((prev) => (prev + 1) % texts.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen pt-16">
      {/* Hero Section */}
      <section className="relative overflow-hidden py-20 lg:py-32">
        <div className="absolute inset-0 bg-gradient-to-br from-neon-cyan/5 via-transparent to-neon-magenta/5"></div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-8 fade-in">
            <div className="inline-flex items-center glass px-4 py-2 rounded-full border border-white/20 mb-8">
              <div className="w-2 h-2 bg-neon-cyan rounded-full animate-pulse mr-3"></div>
              <span className="font-space text-sm text-white/80">Next-Gen Mental Wellness Platform</span>
            </div>

            <h1 className="font-orbitron font-bold text-4xl md:text-6xl lg:text-7xl leading-tight">
              <span className="text-gradient-aurora block">
                {texts[textIndex]}
              </span>
            </h1>

            <p className="font-space text-xl md:text-2xl text-white/70 max-w-3xl mx-auto leading-relaxed fade-in-delayed">
              Experience the future of mental health support with AI-powered tools, 
              real-time therapist matching, and a supportive community—all in one 
              sleek, intuitive platform.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-8 fade-in-delayed">
              <GlowButton 
                variant="primary" 
                size="lg"
                onClick={() => navigate("/chat")}
              >
                Start Chat
              </GlowButton>
              <GlowButton 
                variant="secondary" 
                size="lg"
                onClick={() => navigate("/therapist-finder")}
              >
                Find Therapist
              </GlowButton>
              <GlowButton 
                variant="outline" 
                size="lg"
                onClick={() => navigate("/wellness-toolkit")}
              >
                Explore Tools
              </GlowButton>
            </div>
          </div>

          {/* Floating Elements */}
          <div className="absolute top-20 left-10 w-20 h-20 bg-neon-cyan/20 rounded-full blur-xl float"></div>
          <div className="absolute bottom-20 right-10 w-32 h-32 bg-neon-magenta/20 rounded-full blur-2xl float-delayed"></div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 lg:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 fade-in">
            <h2 className="font-orbitron font-bold text-3xl md:text-5xl text-gradient-cyan mb-6">
              Your Mental Wellness Ecosystem
            </h2>
            <p className="font-space text-lg text-white/70 max-w-2xl mx-auto">
              Three powerful tools designed to support your mental health journey 
              with cutting-edge technology and human expertise.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <FeatureCard
              icon={
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
              }
              title="Community Chat"
              description="Connect with peers in a safe, moderated environment. Share experiences, find support, and build meaningful connections with others on similar journeys."
              link="/chat"
              delay={0}
            />

            <FeatureCard
              icon={
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
              }
              title="Live Therapist Matching"
              description="AI-powered real-time search connects you with licensed psychiatrists and therapists based on your specific needs, location, and availability."
              link="/therapist-finder"
              delay={200}
            />

            <FeatureCard
              icon={
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                </svg>
              }
              title="Wellness Toolkit"
              description="Interactive modules including guided meditation, cognitive journaling, mood tracking, and personalized mental health insights powered by AI."
              link="/wellness-toolkit"
              delay={400}
            />
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 lg:py-32">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="glass-strong rounded-3xl p-12 space-y-8 aurora-gradient fade-in">
            <h3 className="font-orbitron font-bold text-3xl md:text-4xl text-gradient-cyan">
              Ready to Transform Your Mental Wellness Journey?
            </h3>
            <p className="font-space text-lg text-white/80 max-w-2xl mx-auto">
              Join thousands of users who have already discovered the power of 
              AI-enhanced mental health support. Your journey to better mental 
              wellness starts here.
            </p>
            <GlowButton 
              variant="primary" 
              size="lg"
              onClick={() => navigate("/platform")}
            >
              Launch Platform
            </GlowButton>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;
