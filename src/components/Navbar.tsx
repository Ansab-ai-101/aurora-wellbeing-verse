
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const navItems = [
    { name: "Home", path: "/" },
    { name: "Community Chat", path: "/chat" },
    { name: "Find Therapist", path: "/therapist-finder" },
    { name: "Wellness Tools", path: "/wellness-toolkit" },
    { name: "Platform", path: "/platform" },
  ];

  return (
    <nav className="fixed top-0 w-full z-50 glass border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-br from-neon-cyan to-neon-magenta rounded-full neon-glow"></div>
            <span className="font-orbitron font-bold text-xl text-gradient-cyan">
              Re-Leader 2.0
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            {navItems.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                className={`font-space text-sm transition-all duration-300 hover:text-neon-cyan ${
                  location.pathname === item.path
                    ? "text-neon-cyan neon-glow"
                    : "text-white/80"
                }`}
              >
                {item.name}
              </Link>
            ))}
            <Button className="bg-gradient-to-r from-neon-cyan to-neon-magenta text-black font-semibold hover-scale neon-glow">
              Get Started
            </Button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsOpen(!isOpen)}
              className="text-white/80 hover:text-neon-cyan"
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden glass-strong rounded-lg mt-2 p-4 space-y-2">
            {navItems.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                onClick={() => setIsOpen(false)}
                className={`block font-space text-sm py-2 transition-all duration-300 hover:text-neon-cyan ${
                  location.pathname === item.path
                    ? "text-neon-cyan"
                    : "text-white/80"
                }`}
              >
                {item.name}
              </Link>
            ))}
            <Button className="w-full bg-gradient-to-r from-neon-cyan to-neon-magenta text-black font-semibold">
              Get Started
            </Button>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
