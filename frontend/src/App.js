import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from 'react-query';
import { Toaster } from 'react-hot-toast';

import LandingPage from './components/LandingPage';
import HomePage from './components/HomePage';
import ChatInterface from './components/ChatInterface';
import ItineraryDashboard from './components/ItineraryDashboard';
import ProfilePage from './components/ProfilePage';
import { AuthProvider } from './contexts/AuthContext';
import { ChatProvider } from './contexts/ChatContext';

// Create a client
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
});

function App() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate app initialization
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-primary-500 to-primary-700 flex items-center justify-center">
        <div className="text-center">
          <div className="typing-indicator mb-4">
            <div></div>
            <div></div>
            <div></div>
            <div></div>
          </div>
          <h2 className="text-2xl font-bold text-white mb-2">Personalized Trip Planner</h2>
          <p className="text-primary-100">Initializing your travel companion...</p>
        </div>
      </div>
    );
  }

  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <ChatProvider>
          <Router>
            <div className="App">
              <Routes>
                <Route path="/" element={<LandingPage />} />
                <Route path="/home" element={<HomePage />} />
                <Route path="/chat" element={<ChatInterface />} />
                <Route path="/itinerary" element={<ItineraryDashboard />} />
                <Route path="/profile" element={<ProfilePage />} />
              </Routes>
              <Toaster
                position="top-right"
                toastOptions={{
                  duration: 4000,
                  style: {
                    background: '#363636',
                    color: '#fff',
                  },
                  success: {
                    duration: 3000,
                    iconTheme: {
                      primary: '#22c55e',
                      secondary: '#fff',
                    },
                  },
                  error: {
                    duration: 5000,
                    iconTheme: {
                      primary: '#ef4444',
                      secondary: '#fff',
                    },
                  },
                }}
              />
            </div>
          </Router>
        </ChatProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;
