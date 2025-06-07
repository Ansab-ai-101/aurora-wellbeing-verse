
import { AlertTriangle, ExternalLink } from "lucide-react";
import GlowButton from "./GlowButton";

const APIKeyNotice = () => {
  return (
    <div className="fixed top-20 right-4 z-50 max-w-sm">
      <div className="glass-strong border border-yellow-500/30 rounded-xl p-4 space-y-3">
        <div className="flex items-start space-x-3">
          <AlertTriangle className="w-5 h-5 text-yellow-400 flex-shrink-0 mt-0.5" />
          <div className="space-y-2">
            <h3 className="font-orbitron font-semibold text-sm text-yellow-400">
              API Key Required
            </h3>
            <p className="text-white/80 text-xs font-space leading-relaxed">
              To use the AI chat, you'll need a Hugging Face API token. Get one free at huggingface.co
            </p>
          </div>
        </div>
        <GlowButton 
          variant="outline" 
          size="sm"
          onClick={() => window.open('https://huggingface.co/settings/tokens', '_blank')}
          className="w-full flex items-center justify-center space-x-2"
        >
          <span>Get API Key</span>
          <ExternalLink className="w-3 h-3" />
        </GlowButton>
      </div>
    </div>
  );
};

export default APIKeyNotice;
