
import { useState } from "react";
import GlowButton from "@/components/GlowButton";

interface Therapist {
  id: string;
  name: string;
  specialty: string;
  rating: number;
  experience: string;
  location: string;
  availability: "Available Now" | "Available Today" | "Next Week";
  image: string;
  price: string;
}

const TherapistFinder = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedSpecialty, setSelectedSpecialty] = useState("All");
  const [selectedLocation, setSelectedLocation] = useState("All");
  const [isSearching, setIsSearching] = useState(false);

  const specialties = ["All", "Anxiety", "Depression", "PTSD", "Relationships", "Addiction", "ADHD"];
  const locations = ["All", "New York", "Los Angeles", "Chicago", "Houston", "Online"];

  const therapists: Therapist[] = [
    {
      id: "1",
      name: "Dr. Sarah Chen",
      specialty: "Anxiety & Depression",
      rating: 4.9,
      experience: "12 years",
      location: "New York",
      availability: "Available Now",
      image: "photo-1581091226825-a6a2a5aee158",
      price: "$120/session"
    },
    {
      id: "2",
      name: "Dr. Michael Rodriguez",
      specialty: "PTSD & Trauma",
      rating: 4.8,
      experience: "8 years",
      location: "Los Angeles",
      availability: "Available Today",
      image: "photo-1488590528505-98d2b5aba04b",
      price: "$150/session"
    },
    {
      id: "3",
      name: "Dr. Emily Watson",
      specialty: "Relationships & Family",
      rating: 4.9,
      experience: "15 years",
      location: "Online",
      availability: "Available Now",
      image: "photo-1470813740244-df37b8c1edcb",
      price: "$100/session"
    }
  ];

  const handleSearch = () => {
    setIsSearching(true);
    setTimeout(() => setIsSearching(false), 2000);
  };

  const getAvailabilityColor = (availability: string) => {
    switch (availability) {
      case "Available Now": return "text-neon-cyan";
      case "Available Today": return "text-yellow-400";
      default: return "text-white/60";
    }
  };

  return (
    <div className="min-h-screen pt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="text-center mb-12 fade-in">
          <h1 className="font-orbitron font-bold text-4xl md:text-5xl text-gradient-cyan mb-6">
            Find Your Perfect Therapist
          </h1>
          <p className="font-space text-lg text-white/70 max-w-2xl mx-auto">
            AI-powered matching connects you with licensed mental health professionals 
            in real-time. Search the galaxy for your perfect therapeutic match.
          </p>
        </div>

        {/* Search Section */}
        <div className="glass rounded-2xl p-8 mb-12 fade-in-delayed">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            <div className="relative">
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search therapists..."
                className="w-full bg-white/5 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-neon-cyan focus:border-transparent font-space"
              />
              {isSearching && (
                <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                  <div className="w-5 h-5 border-2 border-neon-cyan border-t-transparent rounded-full animate-spin"></div>
                </div>
              )}
            </div>

            <select
              value={selectedSpecialty}
              onChange={(e) => setSelectedSpecialty(e.target.value)}
              className="bg-white/5 border border-white/20 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-neon-cyan font-space"
            >
              {specialties.map(specialty => (
                <option key={specialty} value={specialty} className="bg-gray-800">
                  {specialty}
                </option>
              ))}
            </select>

            <select
              value={selectedLocation}
              onChange={(e) => setSelectedLocation(e.target.value)}
              className="bg-white/5 border border-white/20 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-neon-cyan font-space"
            >
              {locations.map(location => (
                <option key={location} value={location} className="bg-gray-800">
                  {location}
                </option>
              ))}
            </select>

            <GlowButton variant="primary" onClick={handleSearch}>
              {isSearching ? "Searching..." : "Search Galaxy"}
            </GlowButton>
          </div>

          <div className="flex flex-wrap gap-2">
            <span className="text-white/60 text-sm">Quick filters:</span>
            <button className="px-3 py-1 text-xs bg-white/10 rounded-full text-white/80 hover:bg-neon-cyan/20 transition-colors">
              Available Now
            </button>
            <button className="px-3 py-1 text-xs bg-white/10 rounded-full text-white/80 hover:bg-neon-cyan/20 transition-colors">
              Highly Rated
            </button>
            <button className="px-3 py-1 text-xs bg-white/10 rounded-full text-white/80 hover:bg-neon-cyan/20 transition-colors">
              Online Sessions
            </button>
          </div>
        </div>

        {/* Results */}
        <div className="space-y-6">
          {therapists.map((therapist, index) => (
            <div 
              key={therapist.id} 
              className="glass hover-scale rounded-2xl p-6 aurora-gradient transition-all duration-500"
              style={{ animationDelay: `${index * 200}ms` }}
            >
              <div className="flex flex-col lg:flex-row gap-6">
                <div className="lg:w-48 h-48 rounded-xl overflow-hidden">
                  <img
                    src={`https://images.unsplash.com/${therapist.image}?auto=format&fit=crop&w=300&h=300`}
                    alt={therapist.name}
                    className="w-full h-full object-cover"
                  />
                </div>

                <div className="flex-1 space-y-4">
                  <div className="flex flex-col sm:flex-row justify-between items-start">
                    <div>
                      <h3 className="font-orbitron font-bold text-xl text-gradient-cyan">
                        {therapist.name}
                      </h3>
                      <p className="font-space text-white/80">{therapist.specialty}</p>
                    </div>
                    <div className="text-right">
                      <div className="flex items-center space-x-1 mb-1">
                        <span className="text-yellow-400">★</span>
                        <span className="font-space text-white">{therapist.rating}</span>
                      </div>
                      <p className="font-space text-sm text-white/60">{therapist.experience} experience</p>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-4 text-sm">
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-neon-cyan rounded-full"></div>
                      <span className="text-white/80">{therapist.location}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className={`w-2 h-2 rounded-full ${
                        therapist.availability === "Available Now" ? "bg-neon-cyan animate-pulse" : "bg-yellow-400"
                      }`}></div>
                      <span className={getAvailabilityColor(therapist.availability)}>
                        {therapist.availability}
                      </span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-neon-magenta rounded-full"></div>
                      <span className="text-white/80">{therapist.price}</span>
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <GlowButton variant="primary" size="sm">
                      Book Session
                    </GlowButton>
                    <GlowButton variant="outline" size="sm">
                      View Profile
                    </GlowButton>
                    <GlowButton variant="secondary" size="sm">
                      Message
                    </GlowButton>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* CTA Section */}
        <div className="text-center mt-16">
          <div className="glass-strong rounded-2xl p-8 aurora-gradient">
            <h3 className="font-orbitron font-bold text-2xl text-gradient-cyan mb-4">
              Can't Find What You're Looking For?
            </h3>
            <p className="font-space text-white/80 mb-6">
              Our AI can help you find specialized therapists or connect you with our 24/7 crisis support.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <GlowButton variant="primary">
                AI-Powered Search
              </GlowButton>
              <GlowButton variant="secondary">
                Crisis Support
              </GlowButton>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TherapistFinder;
