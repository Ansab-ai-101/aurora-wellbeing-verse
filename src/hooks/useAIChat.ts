
import { useState, useCallback } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';

interface Message {
  id: string;
  content: string;
  role: 'user' | 'assistant';
  timestamp: Date;
}

export const useAIChat = () => {
  const { user } = useAuth();
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const sendMessage = useCallback(async (content: string) => {
    if (!user) {
      setError('Please log in to use the chat');
      return;
    }

    const userMessage: Message = {
      id: Date.now().toString(),
      content,
      role: 'user',
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setIsLoading(true);
    setError(null);

    try {
      // Get the user's Hugging Face API key
      const { data: keyData, error: keyError } = await supabase
        .from('user_api_keys')
        .select('encrypted_key')
        .eq('user_id', user.id)
        .eq('service_name', 'huggingface')
        .maybeSingle();

      if (keyError || !keyData) {
        throw new Error('Hugging Face API token not found. Please contact support.');
      }

      // Decrypt the API key (simple base64 decoding)
      const apiKey = atob(keyData.encrypted_key);

      // Enhanced system prompt for psychiatrist role
      const systemPrompt = `You are Dr. AI, a compassionate and professional AI psychiatrist with extensive training in mental health care. Your role is to:

1. LISTEN ACTIVELY: Show genuine empathy and understanding
2. ASSESS THOUGHTFULLY: Identify potential mental health concerns without diagnosing
3. SUPPORT THERAPEUTICALLY: Offer evidence-based coping strategies and therapeutic techniques
4. GUIDE SAFELY: Recognize crisis situations and provide appropriate resources
5. MAINTAIN BOUNDARIES: Remember you're an AI assistant, not a replacement for human therapy

Communication Style:
- Be warm, non-judgmental, and professional
- Use person-first language
- Ask open-ended questions to encourage exploration
- Validate emotions and experiences
- Provide practical, actionable advice
- Maintain appropriate therapeutic boundaries

Areas of Focus:
- Anxiety and stress management
- Depression and mood disorders
- Relationship issues
- Sleep and wellness
- Coping strategies
- Mindfulness and grounding techniques
- Crisis intervention guidance

Remember: Always encourage professional help for serious concerns and maintain patient confidentiality.`;

      // Prepare conversation context
      const conversationHistory = messages.slice(-10).map(msg => ({
        role: msg.role,
        content: msg.content
      }));

      const fullPrompt = `${systemPrompt}\n\nConversation History:\n${conversationHistory.map(msg => `${msg.role}: ${msg.content}`).join('\n')}\n\nUser: ${content}\n\nDr. AI:`;

      // Call Hugging Face API
      const response = await fetch(
        'https://api-inference.huggingface.co/models/microsoft/DialoGPT-large',
        {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${apiKey}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            inputs: fullPrompt,
            parameters: {
              max_new_tokens: 512,
              temperature: 0.7,
              do_sample: true,
              return_full_text: false,
              repetition_penalty: 1.1,
            },
            options: {
              wait_for_model: true,
            }
          }),
        }
      );

      if (!response.ok) {
        const errorData = await response.json().catch(() => null);
        throw new Error(
          errorData?.error || 
          'Failed to get response from AI. Please try again.'
        );
      }

      const data = await response.json();
      let aiResponse = '';

      if (Array.isArray(data) && data[0]?.generated_text) {
        aiResponse = data[0].generated_text.trim();
      } else if (data.generated_text) {
        aiResponse = data.generated_text.trim();
      } else {
        // Fallback response if the model doesn't respond properly
        aiResponse = `I understand you're reaching out, and I want you to know that I'm here to listen and support you. Sometimes our AI systems need a moment to process complex thoughts and emotions.

Could you help me understand better by sharing a bit more about what you're experiencing right now? Whether it's anxiety, sadness, stress, or any other feeling - I'm here to provide a safe space for you to express yourself.

Remember, seeking support is a sign of strength, and you've taken an important step by reaching out today.`;
      }

      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: aiResponse || 'I understand your concern. Could you share more details about what you\'re experiencing so I can better support you?',
        role: 'assistant',
        timestamp: new Date(),
      };

      setMessages(prev => [...prev, assistantMessage]);
    } catch (error: any) {
      console.error('AI Chat error:', error);
      
      // Provide a supportive fallback response
      const fallbackMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: `I apologize, but I'm experiencing some technical difficulties right now. However, I want you to know that your mental health matters, and I encourage you to:

• Take some deep breaths and practice grounding techniques
• Reach out to a trusted friend, family member, or mental health professional
• If you're in crisis, please contact a crisis hotline or emergency services
• Remember that you're not alone, and help is available

Is there anything specific I can help you with right now using our other wellness tools?`,
        role: 'assistant',
        timestamp: new Date(),
      };
      
      setMessages(prev => [...prev, fallbackMessage]);
      setError('Connection issue occurred, but I\'m still here to support you.');
    } finally {
      setIsLoading(false);
    }
  }, [user, messages]);

  const clearMessages = useCallback(() => {
    setMessages([]);
    setError(null);
  }, []);

  return {
    messages,
    isLoading,
    error,
    sendMessage,
    clearMessages,
  };
};
