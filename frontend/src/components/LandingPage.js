import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  MapPin, 
  Calendar, 
  DollarSign, 
  Users, 
  Sparkles, 
  ArrowRight,
  Globe,
  Clock,
  Shield,
  Heart
} from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

const LandingPage = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [isLoading, setIsLoading] = useState(false);

  const handleGetStarted = async () => {
    setIsLoading(true);
    
    // Simulate user login (in production, integrate with actual auth)
    const userData = {
      id: `user_${Date.now()}`,
      name: 'Traveler',
      email: 'traveler@example.com',
    };
    
    login(userData);
    
    // Navigate to chat after a brief delay
    setTimeout(() => {
      navigate('/chat');
    }, 1000);
  };

  const features = [
    {
      icon: <Sparkles className="w-8 h-8 text-primary-500" />,
      title: "AI-Powered Planning",
      description: "Our advanced AI understands your preferences and creates personalized itineraries in minutes."
    },
    {
      icon: <Globe className="w-8 h-8 text-primary-500" />,
      title: "Real-time Data",
      description: "Get live updates on weather, events, and local conditions to optimize your trip."
    },
    {
      icon: <Clock className="w-8 h-8 text-primary-500" />,
      title: "7-Minute Booking",
      description: "From idea to booked trip in just 7 minutes with our one-click booking system."
    },
    {
      icon: <Shield className="w-8 h-8 text-primary-500" />,
      title: "24/7 Support",
      description: "Your AI travel companion is always available to help during your journey."
    }
  ];

  const stats = [
    { number: "50K+", label: "Happy Travelers" },
    { number: "₹2.5Cr+", label: "Saved on Trips" },
    { number: "98%", label: "Satisfaction Rate" },
    { number: "7min", label: "Average Planning Time" }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-500 via-primary-600 to-primary-700">
      {/* Navigation */}
      <nav className="relative z-10 px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center space-x-2"
          >
            <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center">
              <MapPin className="w-6 h-6 text-primary-600" />
            </div>
            <span className="text-2xl font-bold text-white">TripPlanner AI</span>
          </motion.div>
          
          <motion.button
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="btn-secondary"
            onClick={handleGetStarted}
            disabled={isLoading}
          >
            {isLoading ? 'Starting...' : 'Get Started'}
          </motion.button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative px-6 py-20">
        <div className="max-w-7xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
              From Idea to
              <span className="block gradient-text">Booked Trip</span>
              in 7 Minutes
            </h1>
            
            <p className="text-xl md:text-2xl text-primary-100 mb-8 max-w-3xl mx-auto leading-relaxed">
              Your AI-powered travel companion that creates hyper-personalized itineraries, 
              handles real-time adjustments, and books everything with one click.
            </p>

            <motion.button
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3, duration: 0.5 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="btn-primary text-lg px-8 py-4 mb-12"
              onClick={handleGetStarted}
              disabled={isLoading}
            >
              {isLoading ? (
                <div className="flex items-center space-x-2">
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  <span>Starting Your Journey...</span>
                </div>
              ) : (
                <div className="flex items-center space-x-2">
                  <span>Start Planning Now</span>
                  <ArrowRight className="w-5 h-5" />
                </div>
              )}
            </motion.button>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-20"
          >
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-white mb-2">
                  {stat.number}
                </div>
                <div className="text-primary-200 text-sm md:text-base">
                  {stat.label}
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="relative px-6 py-20 bg-white/10 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Why Choose TripPlanner AI?
            </h2>
            <p className="text-xl text-primary-100 max-w-3xl mx-auto">
              Experience the future of travel planning with our cutting-edge AI technology
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                whileHover={{ y: -5 }}
                className="card p-6 text-center hover:shadow-2xl transition-all duration-300"
              >
                <div className="flex justify-center mb-4">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold text-gray-800 mb-3">
                  {feature.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="relative px-6 py-20">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              How It Works
            </h2>
            <p className="text-xl text-primary-100 max-w-3xl mx-auto">
              Get your perfect trip in just 4 simple steps
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                step: "01",
                title: "Tell Us Your Dream",
                description: "Share your travel preferences, budget, and interests through our conversational interface.",
                icon: <Heart className="w-8 h-8" />
              },
              {
                step: "02",
                title: "AI Creates Your Plan",
                description: "Our AI analyzes your preferences and generates a personalized itinerary with real-time data.",
                icon: <Sparkles className="w-8 h-8" />
              },
              {
                step: "03",
                title: "Review & Customize",
                description: "Review your itinerary, make adjustments, and see real-time cost breakdowns.",
                icon: <Calendar className="w-8 h-8" />
              },
              {
                step: "04",
                title: "One-Click Booking",
                description: "Book your entire trip with a single click. Everything is handled automatically.",
                icon: <DollarSign className="w-8 h-8" />
              }
            ].map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                className="text-center"
              >
                <div className="relative mb-6">
                  <div className="w-20 h-20 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center mx-auto mb-4">
                    <div className="text-primary-500">
                      {step.icon}
                    </div>
                  </div>
                  <div className="absolute -top-2 -right-2 w-8 h-8 bg-accent-500 text-white rounded-full flex items-center justify-center text-sm font-bold">
                    {step.step}
                  </div>
                </div>
                <h3 className="text-xl font-semibold text-white mb-3">
                  {step.title}
                </h3>
                <p className="text-primary-100 leading-relaxed">
                  {step.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative px-6 py-20">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="card p-12"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">
              Ready to Transform Your Travel Planning?
            </h2>
            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
              Join thousands of travelers who have discovered the future of trip planning. 
              Start your journey in just 7 minutes.
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="btn-primary text-lg px-8 py-4"
              onClick={handleGetStarted}
              disabled={isLoading}
            >
              {isLoading ? 'Starting...' : 'Start Your Journey Now'}
            </motion.button>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative px-6 py-12 border-t border-white/20">
        <div className="max-w-7xl mx-auto text-center">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center">
              <MapPin className="w-5 h-5 text-primary-600" />
            </div>
            <span className="text-xl font-bold text-white">TripPlanner AI</span>
          </div>
          <p className="text-primary-200">
            © 2024 TripPlanner AI. All rights reserved. Powered by Google Cloud AI.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
