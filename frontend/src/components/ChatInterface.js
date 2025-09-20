import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Send, 
  Mic, 
  MicOff, 
  MapPin, 
  Calendar, 
  DollarSign, 
  Users,
  Sparkles,
  ArrowRight,
  X,
  RefreshCw
} from 'lucide-react';
import { useChat } from '../contexts/ChatContext';
import { useAuth } from '../contexts/AuthContext';
import toast from 'react-hot-toast';

const ChatInterface = () => {
  const { user } = useAuth();
  const { 
    sessionId, 
    messages, 
    isLoading, 
    suggestions, 
    startSession, 
    sendMessage, 
    clearChat 
  } = useChat();
  
  const [inputMessage, setInputMessage] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(true);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Start session when component mounts
  useEffect(() => {
    if (user && !sessionId) {
      startSession();
    }
  }, [user, sessionId, startSession]);

  // Focus input when component mounts
  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const handleSendMessage = async (message = inputMessage) => {
    if (!message.trim() || isLoading) return;

    setInputMessage('');
    setShowSuggestions(false);
    await sendMessage(message);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleSuggestionClick = (suggestion) => {
    handleSendMessage(suggestion);
  };

  const handleVoiceToggle = () => {
    if (isRecording) {
      // Stop recording
      setIsRecording(false);
      toast.success('Voice recording stopped');
    } else {
      // Start recording
      setIsRecording(true);
      toast.success('Voice recording started');
      // In a real app, you'd integrate with Web Speech API here
    }
  };

  const handleClearChat = () => {
    clearChat();
    setShowSuggestions(true);
    toast.success('Chat cleared');
  };

  const quickActions = [
    { icon: <MapPin className="w-4 h-4" />, text: "Find destinations", prompt: "I want to explore new destinations" },
    { icon: <Calendar className="w-4 h-4" />, text: "Plan a trip", prompt: "Help me plan a 5-day trip" },
    { icon: <DollarSign className="w-4 h-4" />, text: "Budget planning", prompt: "I have a budget of ₹50,000 for my trip" },
    { icon: <Users className="w-4 h-4" />, text: "Group travel", prompt: "I'm planning a family trip with kids" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-500 via-primary-600 to-primary-700 flex flex-col">
      {/* Header */}
      <div className="bg-white/10 backdrop-blur-sm border-b border-white/20 px-6 py-4">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center">
              <Sparkles className="w-6 h-6 text-primary-600" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-white">TripPlanner AI</h1>
              <p className="text-primary-100 text-sm">Your personal travel assistant</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            <button
              onClick={handleClearChat}
              className="p-2 text-primary-200 hover:text-white hover:bg-white/20 rounded-lg transition-colors"
              title="Clear chat"
            >
              <RefreshCw className="w-5 h-5" />
            </button>
            <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
              <span className="text-white text-sm font-medium">
                {user?.name?.charAt(0) || 'U'}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Chat Messages */}
      <div className="flex-1 overflow-y-auto px-6 py-6">
        <div className="max-w-4xl mx-auto">
          <AnimatePresence>
            {messages.length === 0 && showSuggestions && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="text-center mb-8"
              >
                <div className="w-20 h-20 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center mx-auto mb-6">
                  <Sparkles className="w-10 h-10 text-white" />
                </div>
                <h2 className="text-2xl font-bold text-white mb-4">
                  Welcome to TripPlanner AI! 🌟
                </h2>
                <p className="text-primary-100 text-lg mb-8 max-w-2xl mx-auto">
                  I'm your personal travel assistant. Tell me about your dream trip and I'll help you plan everything from destinations to bookings!
                </p>
                
                {/* Quick Actions */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                  {quickActions.map((action, index) => (
                    <motion.button
                      key={index}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => handleSuggestionClick(action.prompt)}
                      className="bg-white/20 backdrop-blur-sm border border-white/30 rounded-xl p-4 text-left hover:bg-white/30 transition-all duration-200"
                    >
                      <div className="flex items-center space-x-3 mb-2">
                        <div className="text-primary-300">
                          {action.icon}
                        </div>
                        <span className="text-white font-medium text-sm">
                          {action.text}
                        </span>
                      </div>
                    </motion.button>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Messages */}
          <div className="space-y-6">
            {messages.map((message) => (
              <motion.div
                key={message.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div className={`max-w-xs md:max-w-md lg:max-w-lg ${message.type === 'user' ? 'chat-bubble-user' : 'chat-bubble-agent'}`}>
                  <div className="whitespace-pre-wrap">
                    {message.content}
                  </div>
                  <div className={`text-xs mt-2 ${message.type === 'user' ? 'text-primary-100' : 'text-gray-500'}`}>
                    {new Date(message.timestamp).toLocaleTimeString([], { 
                      hour: '2-digit', 
                      minute: '2-digit' 
                    })}
                  </div>
                </div>
              </motion.div>
            ))}

            {/* Loading indicator */}
            {isLoading && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex justify-start"
              >
                <div className="chat-bubble-agent">
                  <div className="flex items-center space-x-2">
                    <div className="typing-indicator">
                      <div></div>
                      <div></div>
                      <div></div>
                      <div></div>
                    </div>
                    <span className="text-gray-500 text-sm">AI is thinking...</span>
                  </div>
                </div>
              </motion.div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Suggestions */}
          {suggestions.length > 0 && !isLoading && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-6"
            >
              <p className="text-primary-100 text-sm mb-3">Quick suggestions:</p>
              <div className="flex flex-wrap gap-2">
                {suggestions.map((suggestion, index) => (
                  <button
                    key={index}
                    onClick={() => handleSuggestionClick(suggestion)}
                    className="bg-white/20 backdrop-blur-sm border border-white/30 text-white px-4 py-2 rounded-full text-sm hover:bg-white/30 transition-colors"
                  >
                    {suggestion}
                  </button>
                ))}
              </div>
            </motion.div>
          )}
        </div>
      </div>

      {/* Input Area */}
      <div className="bg-white/10 backdrop-blur-sm border-t border-white/20 px-6 py-4">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-end space-x-3">
            <div className="flex-1 relative">
              <textarea
                ref={inputRef}
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Tell me about your dream trip... (e.g., 'I want a 5-day adventure trip in the mountains with a budget of ₹50,000')"
                className="w-full px-4 py-3 pr-12 bg-white/90 backdrop-blur-sm border border-white/30 rounded-xl resize-none focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200"
                rows="1"
                style={{ minHeight: '48px', maxHeight: '120px' }}
                disabled={isLoading}
              />
              <button
                onClick={handleVoiceToggle}
                className={`absolute right-3 top-1/2 transform -translate-y-1/2 p-2 rounded-lg transition-colors ${
                  isRecording 
                    ? 'text-red-500 hover:bg-red-50' 
                    : 'text-gray-500 hover:bg-gray-100'
                }`}
                disabled={isLoading}
              >
                {isRecording ? <MicOff className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
              </button>
            </div>
            
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => handleSendMessage()}
              disabled={!inputMessage.trim() || isLoading}
              className="bg-primary-500 hover:bg-primary-600 disabled:bg-gray-400 text-white p-3 rounded-xl transition-colors disabled:cursor-not-allowed"
            >
              <Send className="w-5 h-5" />
            </motion.button>
          </div>
          
          <div className="flex items-center justify-between mt-3 text-xs text-primary-200">
            <span>Press Enter to send, Shift+Enter for new line</span>
            <span>{inputMessage.length}/500</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatInterface;
