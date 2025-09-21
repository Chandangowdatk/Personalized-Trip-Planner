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
    
    // Navigate to home page after a brief delay
    setTimeout(() => {
      navigate('/home');
    }, 1000);
  };

  const features = [
    {
      icon: <Sparkles className="w-8 h-8 text-primary-500" />,
      title: "Hyper-Personalization",
      description: "Beyond basic preferences - our AI understands context, safety needs, dietary restrictions, and cultural nuances to create truly personalized experiences."
    },
    {
      icon: <Globe className="w-8 h-8 text-primary-500" />,
      title: "Real-time Adaptation",
      description: "Dynamic itineraries that adjust to weather, delays, and spontaneous discoveries. No more rigid plans that break when reality hits."
    },
    {
      icon: <Clock className="w-8 h-8 text-primary-500" />,
      title: "One-Click Booking",
      description: "Consolidate 3.7 platforms into one. Book flights, hotels, activities, and transport with a single click and payment."
    },
    {
      icon: <Shield className="w-8 h-8 text-primary-500" />,
      title: "Travel Guardian",
      description: "Proactive monitoring for disruptions, safety alerts, and cultural guidance. Your AI co-pilot watches over your entire journey."
    }
  ];

  const stats = [
    { number: "16-20h", label: "Hours Saved on Planning" },
    { number: "47%", label: "Budget Overrun Prevented" },
    { number: "3.7", label: "Platforms Consolidated" },
    { number: "7min", label: "From Idea to Booked Trip" }
  ];

  return (
    <div className="min-h-screen gradient-travel">
      {/* Navigation */}
      <nav className="relative z-10 px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center space-x-2"
          >
            <div className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-lg flex items-center justify-center border border-white/30">
              <MapPin className="w-6 h-6 text-white" />
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
              Turn 47 Hours of
              <span className="block gradient-text">Travel Anxiety</span>
              into 7 Minutes of Joy
            </h1>
            
            <p className="text-xl md:text-2xl text-primary-100 mb-8 max-w-3xl mx-auto leading-relaxed">
              Stop juggling 3.7 different platforms and endless browser tabs. Our AI travel co-pilot 
              transforms your vague travel dreams into fully booked, hyper-personalized adventures.
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

      {/* Problem Statement Section */}
      <section className="relative px-6 py-20">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              The Travel Planning Crisis
            </h2>
            <p className="text-xl text-primary-100 max-w-4xl mx-auto leading-relaxed">
              Travelers spend 16-20 hours navigating an "information maze" across 3.7 different platforms, 
              leading to 47% budget overruns and 19% booking abandonment due to frustration.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8 mb-16">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.6 }}
              className="text-center"
            >
              <div className="w-16 h-16 bg-gradient-to-br from-danger-400 to-danger-500 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                <span className="text-2xl">😰</span>
              </div>
              <h3 className="text-xl font-semibold text-white mb-3">Decision Fatigue</h3>
              <p className="text-primary-100">
                Juggling dozens of browser tabs, comparing prices, and second-guessing every choice
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="text-center"
            >
              <div className="w-16 h-16 bg-gradient-to-br from-warning-400 to-warning-500 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                <span className="text-2xl">💸</span>
              </div>
              <h3 className="text-xl font-semibold text-white mb-3">Budget Anxiety</h3>
              <p className="text-primary-100">
                A ₹25,000 trip becomes ₹36,900 due to hidden fees, peak pricing, and poor optimization
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="text-center"
            >
              <div className="w-16 h-16 bg-gradient-to-br from-accent-400 to-accent-500 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                <span className="text-2xl">🤔</span>
              </div>
              <h3 className="text-xl font-semibold text-white mb-3">Generic Recommendations</h3>
              <p className="text-primary-100">
                Same tourist hotspots, fake reviews, and one-size-fits-all suggestions that miss your needs
              </p>
            </motion.div>
          </div>
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
                className="card-ocean p-6 text-center hover:shadow-2xl transition-all duration-300 hover:scale-105"
              >
                <div className="flex justify-center mb-4">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold text-primary-800 mb-3">
                  {feature.title}
                </h3>
                <p className="text-primary-700 leading-relaxed">
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
              From Information Overload to Travel Bliss
            </h2>
            <p className="text-xl text-primary-100 max-w-3xl mx-auto">
              We solve the "tourist trip design problem" that humans struggle with
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                step: "01",
                title: "Share Your Vision",
                description: "Tell us your travel dreams - from 'adventure in mountains' to specific needs like dietary restrictions or safety concerns.",
                icon: <Heart className="w-8 h-8" />
              },
              {
                step: "02",
                title: "AI Solves the Puzzle",
                description: "Our AI tackles the complex 'tourist trip design problem' - optimizing routes, timing, and costs while considering real-time factors.",
                icon: <Sparkles className="w-8 h-8" />
              },
              {
                step: "03",
                title: "Dynamic Itinerary",
                description: "Get a living itinerary that adapts to weather, delays, and discoveries. No more rigid plans that break.",
                icon: <Calendar className="w-8 h-8" />
              },
              {
                step: "04",
                title: "Seamless Execution",
                description: "One click books everything - flights, hotels, activities, transport. No more juggling multiple platforms.",
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
                  <div className="w-20 h-20 bg-gradient-to-br from-primary-400 to-primary-500 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                    <div className="text-white">
                      {step.icon}
                    </div>
                  </div>
                  <div className="absolute -top-2 -right-2 w-8 h-8 bg-gradient-to-br from-accent-500 to-accent-600 text-white rounded-full flex items-center justify-center text-sm font-bold shadow-lg">
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
            className="card-luxury p-12"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-luxury-800 mb-6">
              Stop Being Your Own Travel Agent
            </h2>
            <p className="text-xl text-luxury-700 mb-8 max-w-2xl mx-auto">
              End the 16-20 hour research marathon and decision fatigue. Let our AI travel co-pilot 
              handle the complex optimization while you focus on the excitement of discovery.
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
            <div className="w-8 h-8 bg-white/20 backdrop-blur-sm rounded-lg flex items-center justify-center border border-white/30">
              <MapPin className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold text-white">TripPlanner AI</span>
          </div>
          <p className="text-primary-200">
            © 2024 TripPlanner AI. All rights reserved. Powered by Google Cloud AI and Vertex AI Agent Engine.
          </p>
          <p className="text-primary-300 text-sm mt-2">
            Solving the "tourist trip design problem" with hyper-personalized, real-time adaptive travel planning.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
