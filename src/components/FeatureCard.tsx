
import { ReactNode } from "react";
import { Link } from "react-router-dom";

interface FeatureCardProps {
  icon: ReactNode;
  title: string;
  description: string;
  link: string;
  delay?: number;
}

const FeatureCard = ({ icon, title, description, link, delay = 0 }: FeatureCardProps) => {
  return (
    <Link to={link} className="block">
      <div 
        className="glass hover-scale rounded-2xl p-8 h-full transition-all duration-500 group aurora-gradient"
        style={{ animationDelay: `${delay}ms` }}
      >
        <div className="flex flex-col items-center text-center space-y-6">
          <div className="w-16 h-16 rounded-full bg-gradient-to-br from-neon-cyan to-neon-magenta flex items-center justify-center neon-glow group-hover:pulse-glow transition-all duration-300">
            {icon}
          </div>
          
          <h3 className="font-orbitron font-bold text-xl text-gradient-cyan">
            {title}
          </h3>
          
          <p className="font-space text-white/80 leading-relaxed">
            {description}
          </p>
          
          <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-neon-cyan to-transparent opacity-50"></div>
          
          <span className="inline-flex items-center font-space text-sm text-neon-cyan group-hover:text-white transition-colors duration-300">
            Explore
            <svg className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </span>
        </div>
      </div>
    </Link>
  );
};

export default FeatureCard;
