
import { useState } from "react";
import GlowButton from "@/components/GlowButton";

const Platform = () => {
  const [selectedWidget, setSelectedWidget] = useState<string | null>(null);

  const stats = [
    { label: "Chat Messages", value: "1,247", trend: "+12%" },
    { label: "Therapist Sessions", value: "8", trend: "+2" },
    { label: "Tools Used", value: "23", trend: "+5%" },
    { label: "Wellness Score", value: "78", trend: "+15%" }
  ];

  const notifications = [
    { id: "1", type: "tip", message: "Your stress levels seem elevated today. Try a 5-minute breathing exercise.", time: "5 min ago" },
    { id: "2", type: "session", message: "Upcoming therapy session with Dr. Sarah Chen in 2 hours", time: "1 hour ago" },
    { id: "3", type: "achievement", message: "Congratulations! You've completed 7 days of consistent journaling.", time: "3 hours ago" }
  ];

  const moodData = [
    { day: "Mon", mood: 7 },
    { day: "Tue", mood: 6 },
    { day: "Wed", mood: 8 },
    { day: "Thu", mood: 7 },
    { day: "Fri", mood: 9 },
    { day: "Sat", mood: 8 },
    { day: "Sun", mood: 8 }
  ];

  return (
    <div className="min-h-screen pt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-12 fade-in">
          <div>
            <h1 className="font-orbitron font-bold text-4xl text-gradient-cyan mb-2">
              Welcome back, Alex
            </h1>
            <p className="font-space text-white/70">
              Your mental wellness journey continues. Here's how you're doing today.
            </p>
          </div>
          <div className="flex space-x-3 mt-4 lg:mt-0">
            <GlowButton variant="primary">
              Quick Check-in
            </GlowButton>
            <GlowButton variant="outline">
              Emergency Support
            </GlowButton>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12 fade-in-delayed">
          {stats.map((stat, index) => (
            <div
              key={stat.label}
              className="glass hover-scale rounded-xl p-6 aurora-gradient cursor-pointer"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="flex justify-between items-start mb-2">
                <h3 className="font-space text-sm text-white/70">{stat.label}</h3>
                <span className="text-neon-cyan text-xs">{stat.trend}</span>
              </div>
              <div className="font-orbitron font-bold text-2xl text-white">{stat.value}</div>
              <div className="w-full h-1 bg-white/10 rounded-full mt-3">
                <div className="h-full bg-gradient-to-r from-neon-cyan to-neon-magenta rounded-full" style={{width: "75%"}}></div>
              </div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Mood Tracker */}
            <div className="glass rounded-2xl p-6 aurora-gradient">
              <div className="flex justify-between items-center mb-6">
                <h2 className="font-orbitron font-bold text-xl text-gradient-cyan">
                  Weekly Mood Tracker
                </h2>
                <GlowButton variant="outline" size="sm">
                  View Details
                </GlowButton>
              </div>
              
              <div className="flex justify-between items-end h-32 mb-4">
                {moodData.map((day, index) => (
                  <div key={day.day} className="flex flex-col items-center space-y-2">
                    <div 
                      className="w-8 bg-gradient-to-t from-neon-cyan to-neon-magenta rounded-t-lg"
                      style={{ height: `${day.mood * 10}%` }}
                    ></div>
                    <span className="text-xs text-white/60">{day.day}</span>
                  </div>
                ))}
              </div>
              
              <div className="text-center">
                <span className="font-space text-sm text-white/70">
                  Average mood this week: <span className="text-neon-cyan font-semibold">7.6/10</span>
                </span>
              </div>
            </div>

            {/* Recent Activity */}
            <div className="glass rounded-2xl p-6 aurora-gradient">
              <h2 className="font-orbitron font-bold text-xl text-gradient-cyan mb-6">
                Recent Activity
              </h2>
              
              <div className="space-y-4">
                <div className="flex items-center space-x-4 p-3 glass rounded-lg">
                  <div className="w-10 h-10 bg-neon-cyan/20 rounded-full flex items-center justify-center">
                    🧘
                  </div>
                  <div className="flex-1">
                    <h4 className="font-space font-semibold text-white text-sm">Meditation Session</h4>
                    <p className="text-white/60 text-xs">15 minutes • Stress Relief</p>
                  </div>
                  <span className="text-white/60 text-xs">2 hours ago</span>
                </div>
                
                <div className="flex items-center space-x-4 p-3 glass rounded-lg">
                  <div className="w-10 h-10 bg-neon-magenta/20 rounded-full flex items-center justify-center">
                    📓
                  </div>
                  <div className="flex-1">
                    <h4 className="font-space font-semibold text-white text-sm">Journal Entry</h4>
                    <p className="text-white/60 text-xs">Cognitive journaling • Positive thoughts</p>
                  </div>
                  <span className="text-white/60 text-xs">Yesterday</span>
                </div>
                
                <div className="flex items-center space-x-4 p-3 glass rounded-lg">
                  <div className="w-10 h-10 bg-yellow-400/20 rounded-full flex items-center justify-center">
                    💬
                  </div>
                  <div className="flex-1">
                    <h4 className="font-space font-semibold text-white text-sm">Community Chat</h4>
                    <p className="text-white/60 text-xs">General Support • 12 messages</p>
                  </div>
                  <span className="text-white/60 text-xs">2 days ago</span>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-8">
            {/* Quick Actions */}
            <div className="glass rounded-2xl p-6 aurora-gradient">
              <h3 className="font-orbitron font-bold text-lg text-gradient-cyan mb-6">
                Quick Actions
              </h3>
              
              <div className="space-y-3">
                <GlowButton variant="primary" className="w-full">
                  Start Meditation
                </GlowButton>
                <GlowButton variant="secondary" className="w-full">
                  Journal Entry
                </GlowButton>
                <GlowButton variant="outline" className="w-full">
                  Book Session
                </GlowButton>
                <GlowButton variant="outline" className="w-full">
                  Join Chat
                </GlowButton>
              </div>
            </div>

            {/* Notifications */}
            <div className="glass rounded-2xl p-6 aurora-gradient">
              <div className="flex justify-between items-center mb-6">
                <h3 className="font-orbitron font-bold text-lg text-gradient-cyan">
                  Notifications
                </h3>
                <div className="w-2 h-2 bg-neon-cyan rounded-full animate-pulse"></div>
              </div>
              
              <div className="space-y-4">
                {notifications.map((notification) => (
                  <div key={notification.id} className="p-3 glass rounded-lg border-l-2 border-neon-cyan/50">
                    <p className="font-space text-sm text-white/90 mb-1">
                      {notification.message}
                    </p>
                    <span className="text-white/60 text-xs">{notification.time}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Wellness Score */}
            <div className="glass rounded-2xl p-6 aurora-gradient text-center">
              <h3 className="font-orbitron font-bold text-lg text-gradient-cyan mb-4">
                Wellness Score
              </h3>
              
              <div className="relative w-24 h-24 mx-auto mb-4">
                <svg className="w-24 h-24 transform -rotate-90" viewBox="0 0 36 36">
                  <path
                    className="text-white/20"
                    stroke="currentColor"
                    strokeWidth="3"
                    fill="none"
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                  />
                  <path
                    className="text-neon-cyan"
                    stroke="currentColor"
                    strokeWidth="3"
                    strokeDasharray="78, 100"
                    strokeLinecap="round"
                    fill="none"
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                  />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="font-orbitron font-bold text-xl text-white">78</span>
                </div>
              </div>
              
              <p className="font-space text-sm text-white/70">
                Great progress! Keep up the good work.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Platform;
