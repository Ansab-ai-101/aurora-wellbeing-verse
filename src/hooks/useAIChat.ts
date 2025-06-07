
import { useState, useCallback } from 'react';

interface Message {
  id: string;
  content: string;
  role: 'user' | 'assistant';
  timestamp: Date;
}

interface UseAIChatReturn {
  messages: Message[];
  isLoading: boolean;
  error: string | null;
  sendMessage: (content: string) => Promise<void>;
  clearMessages: () => void;
}

export const useAIChat = (): UseAIChatReturn => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      content: "Hello! I'm your AI wellness companion. I'm here to listen, support, and help you navigate your mental health journey. How are you feeling today?",
      role: 'assistant',
      timestamp: new Date(),
    }
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const sendMessage = useCallback(async (content: string) => {
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
      // Using Hugging Face Inference API with DeepSeek model
      const response = await fetch(
        "https://api-inference.huggingface.co/models/deepseek-ai/DeepSeek-R1-0528-Qwen3-8B",
        {
          headers: {
            "Authorization": "Bearer hf_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx", // User will need to provide this
            "Content-Type": "application/json",
          },
          method: "POST",
          body: JSON.stringify({
            inputs: `You are a compassionate AI mental health companion. Respond with empathy, understanding, and helpful guidance. User says: ${content}`,
            parameters: {
              max_new_tokens: 200,
              temperature: 0.7,
              do_sample: true,
            }
          }),
        }
      );

      if (!response.ok) {
        throw new Error('Failed to get AI response');
      }

      const data = await response.json();
      const aiResponse = data[0]?.generated_text || "I'm here to help. Could you tell me more about what's on your mind?";

      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: aiResponse.replace(`You are a compassionate AI mental health companion. Respond with empathy, understanding, and helpful guidance. User says: ${content}`, '').trim(),
        role: 'assistant',
        timestamp: new Date(),
      };

      setMessages(prev => [...prev, assistantMessage]);
    } catch (err) {
      setError('Sorry, I encountered an issue. Please try again.');
      console.error('AI Chat Error:', err);
      
      // Fallback response
      const fallbackMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: "I apologize, but I'm having trouble connecting right now. However, I want you to know that your feelings are valid and you're not alone. Would you like to try sharing again, or would you prefer to explore our other wellness tools?",
        role: 'assistant',
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, fallbackMessage]);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const clearMessages = useCallback(() => {
    setMessages([
      {
        id: '1',
        content: "Hello! I'm your AI wellness companion. I'm here to listen, support, and help you navigate your mental health journey. How are you feeling today?",
        role: 'assistant',
        timestamp: new Date(),
      }
    ]);
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
