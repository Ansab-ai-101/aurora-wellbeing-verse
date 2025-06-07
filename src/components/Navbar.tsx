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

  // --- THIS IS THE FIX ---
  // The URL now points to the raw image file, which will display correctly.
  const logoUrl = "https://raw.githubusercontent.com/Ansab-ai-101/aurora-wellbeing-verse/main/public/logo1.PNG";

  return (
    <nav className="fixed top-0 w-full z-50 glass border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative flex items-center h-16">

          {/* Logo on the left */}
          <div className="flex-shrink-0">
            <Link to="/" className="flex items-center">
              <img
                src={logoUrl}
                alt="ReaLeader Logo"
                className="h-15 w-auto" // You can adjust the height here if needed
              />
            </Link>
          </div>

          {/* Container for the right-side elements using ml-auto to push right */}
          <div className="hidden md:flex items-center space-x-6 ml-auto">
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

          {/* Mobile menu button */}
          <div className="md:hidden ml-auto">
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

        {/* Mobile Navigation Menu */}
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
