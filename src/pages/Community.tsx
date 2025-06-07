
import { useState } from "react";
import GlowButton from "@/components/GlowButton";
import { Users, MessageCircle, Heart, Shield, Plus, Search } from "lucide-react";

interface Group {
  id: string;
  name: string;
  description: string;
  members: number;
  category: string;
  isPrivate: boolean;
  lastActivity: string;
  image: string;
}

interface Post {
  id: string;
  author: string;
  content: string;
  timestamp: string;
  likes: number;
  replies: number;
  avatar: string;
  isAI?: boolean;
}

const Community = () => {
  const [activeTab, setActiveTab] = useState("groups");
  const [selectedGroup, setSelectedGroup] = useState<Group | null>(null);

  const supportGroups: Group[] = [
    {
      id: "1",
      name: "Anxiety Support Circle",
      description: "A safe space for those dealing with anxiety disorders to share experiences and coping strategies.",
      members: 234,
      category: "Anxiety",
      isPrivate: false,
      lastActivity: "2 hours ago",
      image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&h=300&fit=crop"
    },
    {
      id: "2",
      name: "Depression Recovery Group",
      description: "Supporting each other through the journey of depression recovery with understanding and hope.",
      members: 189,
      category: "Depression",
      isPrivate: true,
      lastActivity: "1 hour ago",
      image: "https://images.unsplash.com/photo-1559757175-0eb30cd8c063?w=400&h=300&fit=crop"
    },
    {
      id: "3",
      name: "Young Adults Mental Health",
      description: "Mental health support specifically for young adults navigating life transitions.",
      members: 156,
      category: "General",
      isPrivate: false,
      lastActivity: "30 minutes ago",
      image: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=400&h=300&fit=crop"
    },
    {
      id: "4",
      name: "Workplace Stress Management",
      description: "Dealing with work-related stress, burnout, and maintaining work-life balance.",
      members: 312,
      category: "Stress",
      isPrivate: false,
      lastActivity: "4 hours ago",
      image: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=400&h=300&fit=crop"
    }
  ];

  const communityPosts: Post[] = [
    {
      id: "1",
      author: "Sarah M.",
      content: "Just wanted to share that after months of anxiety, I finally had a good day today. Small victories matter! 💪",
      timestamp: "2 hours ago",
      likes: 24,
      replies: 8,
      avatar: "https://images.unsplash.com/photo-1494790108755-2616b612e5b4?w=100&h=100&fit=crop"
    },
    {
      id: "2",
      author: "AI Support Assistant",
      content: "Remember: It's okay to not be okay. Your feelings are valid, and seeking help is a sign of strength. Here are some grounding techniques that might help during difficult moments: 5-4-3-2-1 technique (5 things you see, 4 you touch, 3 you hear, 2 you smell, 1 you taste).",
      timestamp: "3 hours ago",
      likes: 45,
      replies: 12,
      avatar: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=100&h=100&fit=crop",
      isAI: true
    },
    {
      id: "3",
      author: "Mike T.",
      content: "Having trouble sleeping again. Any tips from the community? I've tried meditation apps but still struggling.",
      timestamp: "5 hours ago",
      likes: 12,
      replies: 15,
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop"
    }
  ];

  return (
    <div className="min-h-screen pt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="text-center mb-12 fade-in">
          <h1 className="font-orbitron font-bold text-4xl md:text-5xl text-gradient-cyan mb-6">
            Community Support
          </h1>
          <p className="font-space text-lg text-white/70 max-w-2xl mx-auto">
            Connect with others who understand your journey. Share experiences, find support, 
            and build meaningful connections in a safe, moderated environment.
          </p>
        </div>

        {/* Navigation Tabs */}
        <div className="flex flex-wrap justify-center gap-4 mb-8">
          {[
            { id: "groups", label: "Support Groups", icon: <Users className="w-4 h-4" /> },
            { id: "community", label: "Community Feed", icon: <MessageCircle className="w-4 h-4" /> },
            { id: "resources", label: "Resources", icon: <Heart className="w-4 h-4" /> }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center space-x-2 px-6 py-3 rounded-xl font-space transition-all duration-300 ${
                activeTab === tab.id
                  ? 'bg-gradient-to-r from-neon-cyan to-neon-magenta text-black font-semibold'
                  : 'glass border border-white/20 text-white/80 hover:bg-white/10'
              }`}
            >
              {tab.icon}
              <span>{tab.label}</span>
            </button>
          ))}
        </div>

        {/* Support Groups Tab */}
        {activeTab === "groups" && (
          <div className="space-y-8">
            {/* Create Group & Search */}
            <div className="flex flex-col sm:flex-row gap-4 justify-between items-center">
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-white/40" />
                <input
                  type="text"
                  placeholder="Search support groups..."
                  className="w-full bg-white/5 border border-white/20 rounded-lg pl-10 pr-4 py-3 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-neon-cyan focus:border-transparent font-space"
                />
              </div>
              <GlowButton variant="primary" className="flex items-center space-x-2">
                <Plus className="w-4 h-4" />
                <span>Create Group</span>
              </GlowButton>
            </div>

            {/* Groups Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {supportGroups.map((group, index) => (
                <div
                  key={group.id}
                  className="glass-strong rounded-2xl overflow-hidden border border-white/20 hover:border-white/40 transition-all duration-500 hover-scale cursor-pointer"
                  style={{ animationDelay: `${index * 150}ms` }}
                  onClick={() => setSelectedGroup(group)}
                >
                  {/* Group Image */}
                  <div className="relative h-48 overflow-hidden">
                    <img 
                      src={group.image} 
                      alt={group.name}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                    <div className="absolute top-3 right-3">
                      {group.isPrivate ? (
                        <div className="px-2 py-1 bg-yellow-500/20 rounded-full border border-yellow-500/30">
                          <span className="text-yellow-400 text-xs font-space">Private</span>
                        </div>
                      ) : (
                        <div className="px-2 py-1 bg-green-500/20 rounded-full border border-green-500/30">
                          <span className="text-green-400 text-xs font-space">Open</span>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Group Content */}
                  <div className="p-6 space-y-4">
                    <div>
                      <h3 className="font-orbitron font-bold text-lg text-gradient-cyan mb-2">
                        {group.name}
                      </h3>
                      <p className="font-space text-white/80 text-sm leading-relaxed">
                        {group.description}
                      </p>
                    </div>

                    <div className="flex justify-between items-center text-sm">
                      <div className="flex items-center space-x-4">
                        <span className="text-white/60 font-space">
                          <Users className="w-4 h-4 inline mr-1" />
                          {group.members} members
                        </span>
                      </div>
                      <span className="text-white/50 font-space text-xs">
                        {group.lastActivity}
                      </span>
                    </div>

                    <div className="flex items-center justify-between">
                      <span className="px-3 py-1 bg-white/10 rounded-full text-xs font-space text-white/80">
                        {group.category}
                      </span>
                      <GlowButton variant="outline" size="sm">
                        Join Group
                      </GlowButton>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Community Feed Tab */}
        {activeTab === "community" && (
          <div className="max-w-4xl mx-auto space-y-6">
            {/* Create Post */}
            <div className="glass-strong rounded-2xl p-6 border border-white/20">
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center">
                  <Users className="w-6 h-6 text-white" />
                </div>
                <div className="flex-1">
                  <textarea
                    placeholder="Share your thoughts, experiences, or ask for support..."
                    className="w-full bg-white/5 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-neon-cyan focus:border-transparent font-space resize-none"
                    rows={3}
                  />
                  <div className="flex justify-between items-center mt-4">
                    <div className="flex items-center space-x-2 text-sm text-white/60">
                      <Shield className="w-4 h-4" />
                      <span className="font-space">Safe space guidelines apply</span>
                    </div>
                    <GlowButton variant="primary" size="sm">
                      Share
                    </GlowButton>
                  </div>
                </div>
              </div>
            </div>

            {/* Posts Feed */}
            <div className="space-y-6">
              {communityPosts.map((post, index) => (
                <div
                  key={post.id}
                  className={`glass-strong rounded-2xl p-6 border transition-all duration-500 hover-scale ${
                    post.isAI 
                      ? 'border-neon-cyan/30 bg-gradient-to-r from-neon-cyan/5 to-neon-magenta/5' 
                      : 'border-white/20'
                  }`}
                  style={{ animationDelay: `${index * 200}ms` }}
                >
                  <div className="flex items-start space-x-4">
                    <div className="relative">
                      <img 
                        src={post.avatar}
                        alt={post.author}
                        className="w-12 h-12 rounded-full object-cover"
                      />
                      {post.isAI && (
                        <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-neon-cyan rounded-full border-2 border-black flex items-center justify-center">
                          <span className="text-black text-xs">🤖</span>
                        </div>
                      )}
                    </div>
                    
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-2">
                        <h4 className={`font-space font-semibold ${
                          post.isAI ? 'text-neon-cyan' : 'text-white'
                        }`}>
                          {post.author}
                        </h4>
                        {post.isAI && (
                          <span className="px-2 py-1 bg-neon-cyan/20 rounded-full text-xs font-space text-neon-cyan">
                            AI Support
                          </span>
                        )}
                        <span className="text-white/50 text-sm font-space">
                          {post.timestamp}
                        </span>
                      </div>
                      
                      <p className="font-space text-white/80 leading-relaxed mb-4">
                        {post.content}
                      </p>
                      
                      <div className="flex items-center space-x-6">
                        <button className="flex items-center space-x-2 text-white/60 hover:text-red-400 transition-colors">
                          <Heart className="w-4 h-4" />
                          <span className="font-space text-sm">{post.likes}</span>
                        </button>
                        <button className="flex items-center space-x-2 text-white/60 hover:text-neon-cyan transition-colors">
                          <MessageCircle className="w-4 h-4" />
                          <span className="font-space text-sm">{post.replies}</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Resources Tab */}
        {activeTab === "resources" && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: "Crisis Resources",
                description: "Immediate help and crisis intervention resources",
                icon: "🆘",
                color: "from-red-500 to-pink-500"
              },
              {
                title: "Self-Care Guides",
                description: "Practical self-care strategies and wellness tips",
                icon: "💆",
                color: "from-green-500 to-emerald-500"
              },
              {
                title: "Coping Strategies",
                description: "Evidence-based techniques for managing difficult emotions",
                icon: "🧠",
                color: "from-blue-500 to-cyan-500"
              },
              {
                title: "Community Guidelines",
                description: "How to maintain a safe and supportive environment",
                icon: "📋",
                color: "from-purple-500 to-indigo-500"
              },
              {
                title: "Mental Health Education",
                description: "Learn about different mental health conditions and treatments",
                icon: "📚",
                color: "from-yellow-500 to-orange-500"
              },
              {
                title: "Peer Support Training",
                description: "How to effectively support others in the community",
                icon: "🤝",
                color: "from-pink-500 to-rose-500"
              }
            ].map((resource, index) => (
              <div
                key={index}
                className="glass-strong rounded-2xl p-6 aurora-gradient hover-scale cursor-pointer"
                style={{ animationDelay: `${index * 150}ms` }}
              >
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-r ${resource.color} flex items-center justify-center text-2xl mb-4`}>
                  {resource.icon}
                </div>
                <h3 className="font-orbitron font-bold text-lg text-gradient-cyan mb-3">
                  {resource.title}
                </h3>
                <p className="font-space text-white/80 text-sm leading-relaxed mb-4">
                  {resource.description}
                </p>
                <GlowButton variant="outline" size="sm" className="w-full">
                  Access Resource
                </GlowButton>
              </div>
            ))}
          </div>
        )}

        {/* AI Moderation Notice */}
        <div className="mt-16 glass-strong rounded-2xl p-6 text-center border border-neon-cyan/30">
          <div className="flex items-center justify-center space-x-3 mb-4">
            <Shield className="w-6 h-6 text-neon-cyan" />
            <h3 className="font-orbitron font-bold text-lg text-gradient-cyan">
              AI-Moderated Safe Space
            </h3>
          </div>
          <p className="font-space text-white/80 max-w-3xl mx-auto">
            Our AI moderator works 24/7 to ensure this community remains a safe, supportive environment. 
            All conversations are monitored for harmful content, and immediate support is provided when needed.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Community;
