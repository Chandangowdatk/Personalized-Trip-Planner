import React, { createContext, useContext, useState, useCallback } from 'react';
import { useAuth } from './AuthContext';
import { chatAPI } from '../services/api';

const ChatContext = createContext();

export const useChat = () => {
  const context = useContext(ChatContext);
  if (!context) {
    throw new Error('useChat must be used within a ChatProvider');
  }
  return context;
};

export const ChatProvider = ({ children }) => {
  const { user } = useAuth();
  const [sessionId, setSessionId] = useState(null);
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [suggestions, setSuggestions] = useState([]);

  const startSession = useCallback(async () => {
    if (!user) {
      console.log('❌ No user found, cannot start session');
      return;
    }
    
    try {
      console.log('🚀 Starting chat session for user:', user.id);
      setIsLoading(true);
      const response = await chatAPI.startSession(user.id);
      console.log('✅ Session started successfully:', response);
      setSessionId(response.session_id);
      setMessages([]);
      setSuggestions([]);
    } catch (error) {
      console.error('❌ Failed to start session:', error);
      console.error('Error details:', error.response?.data || error.message);
    } finally {
      setIsLoading(false);
    }
  }, [user]);

  const sendMessage = useCallback(async (message) => {
    if (!sessionId || !user) {
      console.log('❌ No session or user found, cannot send message');
      return;
    }

    console.log('📤 Sending message:', message, 'to session:', sessionId);

    const userMessage = {
      id: Date.now(),
      type: 'user',
      content: message,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setIsLoading(true);

    try {
      const response = await chatAPI.sendMessage({
        message,
        session_id: sessionId,
        user_id: user.id,
      });

      console.log('✅ Message sent successfully, response:', response);

      const agentMessage = {
        id: response.message_id,
        type: 'agent',
        content: response.response,
        timestamp: new Date(response.timestamp),
      };

      setMessages(prev => [...prev, agentMessage]);
      setSuggestions(response.suggestions || []);
    } catch (error) {
      console.error('❌ Failed to send message:', error);
      console.error('Error details:', error.response?.data || error.message);
      const errorMessage = {
        id: Date.now(),
        type: 'agent',
        content: 'Sorry, I encountered an error. Please try again.',
        timestamp: new Date(),
        isError: true,
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  }, [sessionId, user]);

  const clearChat = useCallback(() => {
    setMessages([]);
    setSuggestions([]);
  }, []);

  const value = {
    sessionId,
    messages,
    isLoading,
    suggestions,
    startSession,
    sendMessage,
    clearChat,
  };

  return (
    <ChatContext.Provider value={value}>
      {children}
    </ChatContext.Provider>
  );
};
