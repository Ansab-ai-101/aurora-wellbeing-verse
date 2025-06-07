import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import GlowButton from "./GlowButton";
import HuggingFaceSettings from "./HuggingFaceSettings";
import { LogOut, User } from "lucide-react";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const { user, signOut } = useAuth();

  const navItems = [
    { name: "Home", path: "/" },
    { name: "Community Chat", path: "/chat" },
    { name: "Find Therapist", path: "/therapist-finder" },
    { name: "Wellness Tools", path: "/wellness-toolkit" },
    { name: "Platform", path: "/platform" },
  ];

  // --- HOW TO GET YOUR GITHUB IMAGE URL ---
  // 1. Go to your image file in your GitHub repository.
  // 2. Click the "Download raw file" button.
  // 3. Copy the URL from your browser's address bar.
  // It should look like: https://raw.githubusercontent.com/YourUser/YourRepo/main/path/to/your-logo.png
  const logoUrl = "https://raw.githubusercontent.com/Ansab-ai-101/aurora-wellbeing-verse/main/public/logo1.png"; // Replace with your actual raw logo URL

  return (
    <nav className="fixed top-0 w-full z-50 glass border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* --- CHANGED: Logo Section --- */}
          {/* Added flex-shrink-0 to prevent the logo from shrinking on smaller screens */}
          <div className="flex-shrink-0">
            <Link to="/" className="flex items-center space-x-3">
              {/* Replaced the div with an img tag for your logo */}
              <img
                src={logoUrl}
                alt="ReaLeader Logo"
                className="h-8 w-auto" // Adjust size as needed
              />
              <span className="font-orbitron font-bold text-xl text-gradient-cyan">
                ReaLeader
              </span>
            </Link>
          </div>

          {/* --- CHANGED: Desktop Navigation & Auth Section --- */}
          {/* Grouped navigation links and auth buttons together in a single container */}
          <div className="hidden md:flex items-center space-x-6">
            {/* Navigation Links */}
            <div className="flex items-center space-x-6">
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
            </div>

            {/* Auth Section */}
            <div className="flex items-center space-x-3">
              {user ? (
                <>
                  <HuggingFaceSettings />
                  <div className="flex items-center space-x-2 px-3 py-1 glass rounded-full border border-white/20">
                    <User className="w-4 h-4 text-neon-cyan" />
                    <span className="text-white/80 text-sm font-space">{user.email}</span>
                  </div>
                  <GlowButton
                    variant="outline"
                    size="sm"
                    onClick={signOut}
                    className="flex items-center space-x-2"
                  >
                    <LogOut className="w-4 h-4" />
                    <span>Logout</span>
                  </GlowButton>
                </>
              ) : (
                <Link to="/auth">
                  <GlowButton variant="primary">
                    Get Started
                  </GlowButton>
                </Link>
              )}
            </div>
          </div>

          {/* Mobile menu button (no changes) */}
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

        {/* Mobile Navigation (no functional changes) */}
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
            {user ? (
              <div className="space-y-2 pt-2 border-t border-white/20">
                <div className="flex items-center space-x-2 text-white/80 text-sm">
                  <User className="w-4 h-4" />
                  <span>{user.email}</span>
                </div>
                <HuggingFaceSettings />
                <GlowButton
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    signOut();
                    setIsOpen(false);
                  }}
                  className="w-full"
                >
                  Logout
                </GlowButton>
              </div>
            ) : (
              <Link to="/auth" onClick={() => setIsOpen(false)}>
                <GlowButton className="w-full">
                  Get Started
                </GlowButton>
              </Link>
            )}
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
