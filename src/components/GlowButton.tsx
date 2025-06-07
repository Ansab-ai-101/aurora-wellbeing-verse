
import { ReactNode } from "react";
import { Button } from "@/components/ui/button";

interface GlowButtonProps {
  children: ReactNode;
  variant?: "primary" | "secondary" | "outline";
  size?: "sm" | "md" | "lg";
  className?: string;
  onClick?: () => void;
  disabled?: boolean;
}

const GlowButton = ({ 
  children, 
  variant = "primary", 
  size = "md", 
  className = "",
  onClick,
  disabled = false
}: GlowButtonProps) => {
  const variants = {
    primary: "bg-gradient-to-r from-neon-cyan to-neon-magenta text-black font-semibold hover-scale neon-glow",
    secondary: "bg-transparent border-2 border-neon-cyan text-neon-cyan hover:bg-neon-cyan/10 neon-glow hover-scale",
    outline: "glass border-2 border-white/20 text-white hover:border-neon-cyan hover:text-neon-cyan hover-scale"
  };

  const sizes = {
    sm: "px-4 py-2 text-sm",
    md: "px-6 py-3 text-base",
    lg: "px-8 py-4 text-lg"
  };

  return (
    <Button
      onClick={onClick}
      disabled={disabled}
      className={`font-space ${variants[variant]} ${sizes[size]} ${className} transition-all duration-300 ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
    >
      {children}
    </Button>
  );
};

export default GlowButton;
