
import { useState } from "react";
import GlowButton from "@/components/GlowButton";

interface Tool {
  id: string;
  name: string;
  description: string;
  icon: string;
  category: string;
  duration: string;
  difficulty: "Beginner" | "Intermediate" | "Advanced";
}

const WellnessToolkit = () => {
  const [selectedTool, setSelectedTool] = useState<Tool | null>(null);
  const [demoMode, setDemoMode] = useState(false);

  const tools: Tool[] = [
    {
      id: "meditation",
      name: "Guided Meditation",
      description: "AI-powered meditation sessions tailored to your current emotional state and stress levels.",
      icon: "🧘",
      category: "Mindfulness",
      duration: "5-30 min",
      difficulty: "Beginner"
    },
    {
      id: "journaling",
      name: "Cognitive Journaling",
      description: "Smart journaling with AI insights to help identify patterns and improve mental clarity.",
      icon: "📓",
      category: "Self-Reflection",
      duration: "10-20 min",
      difficulty: "Intermediate"
    },
    {
      id: "tracker",
      name: "Mental Health Score",
      description: "Real-time mood tracking with personalized analytics and wellness recommendations.",
      icon: "📊",
      category: "Analytics",
      duration: "2-5 min",
      difficulty: "Beginner"
    },
    {
      id: "breathing",
      name: "Breathing Exercises",
      description: "Synchronized breathing patterns with biofeedback to reduce anxiety and stress.",
      icon: "🫁",
      category: "Breathwork",
      duration: "3-15 min",
      difficulty: "Beginner"
    },
    {
      id: "sleep",
      name: "Sleep Optimization",
      description: "AI-analyzed sleep patterns with personalized recommendations for better rest.",
      icon: "😴",
      category: "Sleep",
      duration: "Ongoing",
      difficulty: "Intermediate"
    },
    {
      id: "cognitive",
      name: "Cognitive Behavioral Tools",
      description: "Interactive CBT exercises to challenge negative thought patterns and build resilience.",
      icon: "🧠",
      category: "Therapy",
      duration: "15-45 min",
      difficulty: "Advanced"
    }
  ];

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "Beginner": return "text-green-400";
      case "Intermediate": return "text-yellow-400";
      case "Advanced": return "text-red-400";
      default: return "text-white/60";
    }
  };

  return (
    <div className="min-h-screen pt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="text-center mb-12 fade-in">
          <h1 className="font-orbitron font-bold text-4xl md:text-5xl text-gradient-cyan mb-6">
            Wellness Toolkit
          </h1>
          <p className="font-space text-lg text-white/70 max-w-2xl mx-auto mb-8">
            Interactive modules powered by AI to support your mental wellness journey. 
            Each tool adapts to your needs and provides personalized insights.
          </p>

          <div className="flex items-center justify-center space-x-4">
            <span className="font-space text-white/80">Demo Mode</span>
            <button
              onClick={() => setDemoMode(!demoMode)}
              className={`relative w-12 h-6 rounded-full transition-colors duration-300 ${
                demoMode ? "bg-neon-cyan" : "bg-white/20"
              }`}
            >
              <div
                className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-transform duration-300 ${
                  demoMode ? "translate-x-7" : "translate-x-1"
                }`}
              ></div>
            </button>
            {demoMode && (
              <span className="text-neon-cyan font-space text-sm animate-pulse">
                🎯 Walkthrough Active
              </span>
            )}
          </div>
        </div>

        {/* Tools Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {tools.map((tool, index) => (
            <div
              key={tool.id}
              className="glass hover-scale rounded-2xl p-6 aurora-gradient cursor-pointer transition-all duration-500"
              style={{ animationDelay: `${index * 100}ms` }}
              onClick={() => setSelectedTool(tool)}
            >
              <div className="text-center space-y-4">
                <div className="text-4xl mb-4">{tool.icon}</div>
                
                <h3 className="font-orbitron font-bold text-xl text-gradient-cyan">
                  {tool.name}
                </h3>
                
                <p className="font-space text-white/80 text-sm leading-relaxed">
                  {tool.description}
                </p>
                
                <div className="flex justify-between items-center text-xs">
                  <span className="bg-white/10 px-2 py-1 rounded-full text-white/80">
                    {tool.category}
                  </span>
                  <span className="text-white/60">{tool.duration}</span>
                </div>
                
                <div className="flex justify-between items-center">
                  <span className={`text-xs ${getDifficultyColor(tool.difficulty)}`}>
                    {tool.difficulty}
                  </span>
                  <GlowButton variant="primary" size="sm">
                    Launch Tool
                  </GlowButton>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Featured Section */}
        <div className="glass-strong rounded-3xl p-8 aurora-gradient mb-16">
          <div className="text-center space-y-6">
            <h2 className="font-orbitron font-bold text-3xl text-gradient-cyan">
              AI-Powered Wellness Insights
            </h2>
            <p className="font-space text-white/80 max-w-3xl mx-auto">
              Our advanced AI analyzes your usage patterns, mood data, and progress to provide 
              personalized recommendations and adaptive content that evolves with your mental health journey.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
              <div className="glass rounded-xl p-4 text-center">
                <div className="text-2xl mb-2">🎯</div>
                <h4 className="font-orbitron font-semibold text-white mb-2">Personalized</h4>
                <p className="text-sm text-white/70">Content adapts to your unique needs and progress</p>
              </div>
              
              <div className="glass rounded-xl p-4 text-center">
                <div className="text-2xl mb-2">📈</div>
                <h4 className="font-orbitron font-semibold text-white mb-2">Analytics</h4>
                <p className="text-sm text-white/70">Track your wellness journey with detailed insights</p>
              </div>
              
              <div className="glass rounded-xl p-4 text-center">
                <div className="text-2xl mb-2">🤖</div>
                <h4 className="font-orbitron font-semibold text-white mb-2">AI-Driven</h4>
                <p className="text-sm text-white/70">Machine learning optimizes your experience</p>
              </div>
            </div>
          </div>
        </div>

        {/* Modal for Tool Demo */}
        {selectedTool && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <div className="glass-strong rounded-2xl p-8 max-w-2xl w-full max-h-[80vh] overflow-y-auto">
              <div className="flex justify-between items-center mb-6">
                <h3 className="font-orbitron font-bold text-2xl text-gradient-cyan">
                  {selectedTool.icon} {selectedTool.name}
                </h3>
                <button
                  onClick={() => setSelectedTool(null)}
                  className="text-white/60 hover:text-white transition-colors"
                >
                  ✕
                </button>
              </div>
              
              <div className="space-y-6">
                <p className="font-space text-white/80">
                  {selectedTool.description}
                </p>
                
                <div className="grid grid-cols-3 gap-4 text-center">
                  <div>
                    <div className="text-xs text-white/60 mb-1">Category</div>
                    <div className="font-space text-sm text-white">{selectedTool.category}</div>
                  </div>
                  <div>
                    <div className="text-xs text-white/60 mb-1">Duration</div>
                    <div className="font-space text-sm text-white">{selectedTool.duration}</div>
                  </div>
                  <div>
                    <div className="text-xs text-white/60 mb-1">Level</div>
                    <div className={`font-space text-sm ${getDifficultyColor(selectedTool.difficulty)}`}>
                      {selectedTool.difficulty}
                    </div>
                  </div>
                </div>
                
                {/* Demo Preview */}
                <div className="glass rounded-xl p-6 border-2 border-neon-cyan/30">
                  <div className="text-center space-y-4">
                    <div className="w-16 h-16 bg-gradient-to-br from-neon-cyan to-neon-magenta rounded-full flex items-center justify-center mx-auto neon-glow">
                      <span className="text-2xl">{selectedTool.icon}</span>
                    </div>
                    <h4 className="font-orbitron font-semibold text-lg text-white">
                      Live Demo Preview
                    </h4>
                    <p className="font-space text-white/70 text-sm">
                      This tool would provide an interactive experience tailored to your current state and goals.
                    </p>
                    <div className="flex justify-center space-x-3">
                      <GlowButton variant="primary">
                        Start Session
                      </GlowButton>
                      <GlowButton variant="outline">
                        Learn More
                      </GlowButton>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default WellnessToolkit;
