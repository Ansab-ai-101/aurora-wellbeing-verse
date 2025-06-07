
import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import GlowButton from './GlowButton';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Settings, Eye, EyeOff, Check, X } from 'lucide-react';

const HuggingFaceSettings = () => {
  const { user } = useAuth();
  const [apiKey, setApiKey] = useState('');
  const [showKey, setShowKey] = useState(false);
  const [hasKey, setHasKey] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    if (user) {
      checkExistingKey();
    }
  }, [user]);

  const checkExistingKey = async () => {
    try {
      const { data, error } = await supabase
        .from('user_api_keys')
        .select('id')
        .eq('user_id', user?.id)
        .eq('service_name', 'huggingface')
        .maybeSingle();

      if (error) throw error;
      setHasKey(!!data);
    } catch (error: any) {
      console.error('Error checking API key:', error);
    }
  };

  const saveApiKey = async () => {
    if (!apiKey.trim()) {
      setError('Please enter your Hugging Face API token');
      return;
    }

    setLoading(true);
    setError('');
    setSuccess('');

    try {
      // Simple encryption (in production, use proper encryption)
      const encryptedKey = btoa(apiKey);

      const { error } = await supabase
        .from('user_api_keys')
        .upsert({
          user_id: user?.id,
          service_name: 'huggingface',
          encrypted_key: encryptedKey,
          updated_at: new Date().toISOString(),
        });

      if (error) throw error;
      
      setSuccess('API token saved successfully!');
      setHasKey(true);
      setApiKey('');
    } catch (error: any) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const removeApiKey = async () => {
    setLoading(true);
    try {
      const { error } = await supabase
        .from('user_api_keys')
        .delete()
        .eq('user_id', user?.id)
        .eq('service_name', 'huggingface');

      if (error) throw error;
      
      setHasKey(false);
      setSuccess('API token removed successfully!');
    } catch (error: any) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  if (!user) return null;

  return (
    <Dialog>
      <DialogTrigger asChild>
        <GlowButton variant="outline" size="sm" className="flex items-center space-x-2">
          <Settings className="w-4 h-4" />
          <span>HF Settings</span>
          {hasKey && <Check className="w-3 h-3 text-green-400" />}
        </GlowButton>
      </DialogTrigger>
      <DialogContent className="glass-strong border border-white/20 text-white">
        <DialogHeader>
          <DialogTitle className="font-orbitron text-gradient-cyan">Hugging Face Settings</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4">
          <p className="text-white/70 text-sm font-space">
            Enter your Hugging Face API token to enable AI chat functionality. 
            Get one free at{' '}
            <a 
              href="https://huggingface.co/settings/tokens" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-neon-cyan hover:underline"
            >
              huggingface.co/settings/tokens
            </a>
          </p>

          {hasKey ? (
            <div className="space-y-4">
              <div className="flex items-center space-x-2 p-3 rounded-lg bg-green-500/20 border border-green-500/30">
                <Check className="w-4 h-4 text-green-400" />
                <span className="text-green-400 text-sm font-space">API token is configured</span>
              </div>
              <GlowButton
                variant="secondary"
                onClick={removeApiKey}
                disabled={loading}
                className="w-full"
              >
                Remove API Token
              </GlowButton>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="apiKey" className="text-white/90 font-space">API Token</Label>
                <div className="relative">
                  <Input
                    id="apiKey"
                    type={showKey ? 'text' : 'password'}
                    value={apiKey}
                    onChange={(e) => setApiKey(e.target.value)}
                    className="glass border-white/20 text-white placeholder-white/50 focus:ring-neon-cyan focus:border-neon-cyan pr-10"
                    placeholder="hf_..."
                  />
                  <button
                    type="button"
                    onClick={() => setShowKey(!showKey)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-white/50 hover:text-white"
                  >
                    {showKey ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <GlowButton
                variant="primary"
                onClick={saveApiKey}
                disabled={loading}
                className="w-full"
              >
                Save API Token
              </GlowButton>
            </div>
          )}

          {error && (
            <div className="flex items-center space-x-2 p-3 rounded-lg bg-red-500/20 border border-red-500/30">
              <X className="w-4 h-4 text-red-400" />
              <span className="text-red-400 text-sm font-space">{error}</span>
            </div>
          )}

          {success && (
            <div className="flex items-center space-x-2 p-3 rounded-lg bg-green-500/20 border border-green-500/30">
              <Check className="w-4 h-4 text-green-400" />
              <span className="text-green-400 text-sm font-space">{success}</span>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default HuggingFaceSettings;
