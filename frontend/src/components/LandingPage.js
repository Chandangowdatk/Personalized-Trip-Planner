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
  Heart,
  Compass,
  Plane,
  Mountain,
  Palmtree,
  Camera,
  Sunset,
  Navigation,
  Map,
  Star,
  Zap
} from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import AuthModal from './AuthModal';

const LandingPage = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);

  // Redirect if already authenticated
  React.useEffect(() => {
    if (isAuthenticated) {
      navigate('/home');
    }
  }, [isAuthenticated, navigate]);

  const handleGetStarted = () => {
    setIsAuthModalOpen(true);
  };

  const handleAuthSuccess = () => {
    // Navigate to home page after successful authentication
    setTimeout(() => {
      navigate('/home');
    }, 500);
  };

  const features = [
    {
      icon: <Sparkles className="w-10 h-10" />,
      title: "Hyper-Personalization",
      description: "AI understands your unique context, safety needs, dietary restrictions, and cultural preferences",
      color: "from-blue-500 to-cyan-500",
      emoji: "✨"
    },
    {
      icon: <Zap className="w-10 h-10" />,
      title: "Real-time Adaptation",
      description: "Dynamic itineraries that adjust to weather, delays, and spontaneous discoveries",
      color: "from-purple-500 to-pink-500",
      emoji: "⚡"
    },
    {
      icon: <DollarSign className="w-10 h-10" />,
      title: "One-Click Booking",
      description: "Consolidate 3.7 platforms into one seamless booking experience",
      color: "from-green-500 to-emerald-500",
      emoji: "💳"
    },
    {
      icon: <Shield className="w-10 h-10" />,
      title: "Travel Guardian",
      description: "Proactive safety monitoring, cultural guidance, and disruption management",
      color: "from-orange-500 to-red-500",
      emoji: "🛡️"
    }
  ];

  const stats = [
    { number: "16-20h", label: "Hours Saved", icon: <Clock className="w-6 h-6" /> },
    { number: "47%", label: "Budget Saved", icon: <DollarSign className="w-6 h-6" /> },
    { number: "3.7", label: "Platforms United", icon: <Globe className="w-6 h-6" /> },
    { number: "7min", label: "To Booked Trip", icon: <Sparkles className="w-6 h-6" /> }
  ];

  const travelDestinations = [
    { icon: <Mountain className="w-8 h-8" />, name: "Mountains", color: "from-green-400 to-emerald-600" },
    { icon: <Palmtree className="w-8 h-8" />, name: "Beaches", color: "from-cyan-400 to-blue-600" },
    { icon: <Camera className="w-8 h-8" />, name: "Cities", color: "from-purple-400 to-pink-600" },
    { icon: <Sunset className="w-8 h-8" />, name: "Deserts", color: "from-orange-400 to-red-600" }
  ];

  return (
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-sky-50 via-blue-50 to-indigo-100">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Floating travel icons */}
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute text-blue-200/20"
            initial={{ 
              x: Math.random() * window.innerWidth,
              y: Math.random() * window.innerHeight,
            }}
            animate={{
              y: [0, -30, 0],
              rotate: [0, 360],
              opacity: [0.2, 0.5, 0.2]
            }}
            transition={{
              duration: 10 + Math.random() * 20,
              repeat: Infinity,
              delay: Math.random() * 5,
            }}
          >
            {i % 4 === 0 && <Plane className="w-8 h-8" />}
            {i % 4 === 1 && <Compass className="w-8 h-8" />}
            {i % 4 === 2 && <Map className="w-8 h-8" />}
            {i % 4 === 3 && <Star className="w-8 h-8" />}
          </motion.div>
        ))}
      </div>

      {/* Navigation */}
      <nav className="relative z-20 px-6 py-6 bg-white/80 backdrop-blur-md shadow-sm">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center space-x-3"
          >
            <div className="relative">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg">
                <MapPin className="w-7 h-7 text-white" />
              </div>
              <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-400 rounded-full animate-pulse" />
            </div>
            <div>
              <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent" style={{ fontFamily: 'Poppins, sans-serif' }}>
                GoWanderLust
              </span>
              <p className="text-xs text-gray-500 font-medium">Your AI Travel Co-Pilot</p>
            </div>
          </motion.div>
          
          <motion.button
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-full font-semibold shadow-lg hover:shadow-xl transition-all flex items-center space-x-2"
            onClick={handleGetStarted}
          >
            <span>Get Started</span>
            <ArrowRight className="w-4 h-4" />
          </motion.button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative z-10 px-6 pt-20 pb-32">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              {/* Badge */}
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2 }}
                className="inline-flex items-center space-x-2 bg-blue-100 text-blue-700 px-4 py-2 rounded-full mb-6 shadow-md"
              >
                <Sparkles className="w-4 h-4" />
                <span className="text-sm font-semibold">Powered by AI • Trusted by Travelers</span>
              </motion.div>

              <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold text-gray-900 mb-6 leading-tight" style={{ fontFamily: 'Poppins, sans-serif' }}>
                Turn Travel 
                <span className="block bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                  Anxiety into Joy
                </span>
              </h1>
              
              <p className="text-xl md:text-2xl text-gray-600 mb-8 leading-relaxed">
                Stop juggling <span className="font-bold text-blue-600">3.7 platforms</span> and <span className="font-bold text-purple-600">47 hours</span> of planning. 
                Let AI transform your travel dreams into <span className="font-bold text-pink-600">reality in 7 minutes</span>. ✈️
              </p>

              <motion.button
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 text-white text-lg px-10 py-5 rounded-full font-bold shadow-2xl hover:shadow-blue-500/50 transition-all flex items-center space-x-3 mb-8"
                onClick={handleGetStarted}
              >
                <span>Start Your Journey</span>
                <ArrowRight className="w-6 h-6" />
              </motion.button>

              {/* Quick stats */}
              <div className="flex flex-wrap gap-4">
                {stats.slice(0, 3).map((stat, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 + index * 0.1 }}
                    className="flex items-center space-x-2 bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full shadow-md"
                  >
                    <div className="text-blue-600">{stat.icon}</div>
                    <div>
                      <div className="font-bold text-gray-900">{stat.number}</div>
                      <div className="text-xs text-gray-600">{stat.label}</div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Right Visual */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="relative"
            >
              {/* Main Card */}
              <div className="relative bg-white rounded-3xl shadow-2xl p-8 border border-gray-100">
                <div className="absolute -top-4 -right-4 w-24 h-24 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center shadow-xl">
                  <span className="text-4xl">🌍</span>
                </div>
                
                {/* Travel destinations grid */}
                <div className="mb-6">
                  <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center">
                    <Navigation className="w-5 h-5 mr-2 text-blue-600" />
                    Choose Your Adventure
                  </h3>
                  <div className="grid grid-cols-2 gap-3">
                    {travelDestinations.map((dest, index) => (
                      <motion.div
                        key={index}
                        whileHover={{ scale: 1.05, y: -2 }}
                        className={`bg-gradient-to-br ${dest.color} p-4 rounded-2xl text-white cursor-pointer shadow-lg`}
                      >
                        <div className="flex flex-col items-center text-center">
                          {dest.icon}
                          <span className="font-semibold mt-2">{dest.name}</span>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>

                {/* AI Suggestion Preview */}
                <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-4 border border-blue-100">
                  <div className="flex items-start space-x-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center flex-shrink-0">
                      <Sparkles className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-gray-900 mb-1">AI Travel Assistant</p>
                      <p className="text-sm text-gray-600">
                        "I found 3 perfect destinations matching your preferences! 🎉"
                      </p>
                      <motion.div 
                        className="flex space-x-2 mt-3"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 1, duration: 0.5 }}
                      >
                        <span className="bg-white px-3 py-1 rounded-full text-xs font-medium text-gray-700 shadow-sm">🏖️ Maldives</span>
                        <span className="bg-white px-3 py-1 rounded-full text-xs font-medium text-gray-700 shadow-sm">🏔️ Switzerland</span>
                        <span className="bg-white px-3 py-1 rounded-full text-xs font-medium text-gray-700 shadow-sm">🌸 Japan</span>
                      </motion.div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Floating elements */}
              <motion.div
                animate={{ y: [0, -20, 0] }}
                transition={{ duration: 4, repeat: Infinity }}
                className="absolute -bottom-6 -left-6 bg-gradient-to-br from-green-400 to-emerald-500 w-20 h-20 rounded-2xl shadow-xl flex items-center justify-center"
              >
                <span className="text-3xl">✈️</span>
              </motion.div>
              
              <motion.div
                animate={{ y: [0, 20, 0] }}
                transition={{ duration: 5, repeat: Infinity }}
                className="absolute -top-6 -left-6 bg-gradient-to-br from-pink-400 to-red-500 w-16 h-16 rounded-2xl shadow-xl flex items-center justify-center"
              >
                <span className="text-2xl">🎒</span>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="relative z-10 px-6 py-20 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl md:text-5xl font-extrabold text-white mb-4" style={{ fontFamily: 'Poppins, sans-serif' }}>
              The Numbers Speak 📊
            </h2>
            <p className="text-xl text-white/90 max-w-2xl mx-auto">
              Real impact from thousands of stress-free travelers
            </p>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.05, y: -5 }}
                className="bg-white/20 backdrop-blur-lg rounded-3xl p-6 text-center border border-white/30 shadow-xl"
              >
                <div className="text-white mb-3 flex justify-center">{stat.icon}</div>
                <div className="text-4xl md:text-5xl font-extrabold text-white mb-2">
                  {stat.number}
                </div>
                <div className="text-white/90 font-medium">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="relative z-10 px-6 py-24 bg-white">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-6" style={{ fontFamily: 'Poppins, sans-serif' }}>
              Why Travelers Love GoWanderLust 💙
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Experience the future of travel planning with cutting-edge AI technology
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                whileHover={{ y: -10, scale: 1.02 }}
                className="group relative bg-gradient-to-br from-gray-50 to-white rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all border border-gray-100 overflow-hidden"
              >
                {/* Gradient overlay on hover */}
                <div className={`absolute inset-0 bg-gradient-to-br ${feature.color} opacity-0 group-hover:opacity-10 transition-opacity duration-300`} />
                
                {/* Emoji badge */}
                <div className="absolute top-4 right-4 text-3xl opacity-50 group-hover:opacity-100 transition-opacity">
                  {feature.emoji}
                </div>
                
                <div className={`w-16 h-16 bg-gradient-to-br ${feature.color} rounded-2xl flex items-center justify-center mb-6 text-white shadow-lg group-hover:scale-110 transition-transform`}>
                  {feature.icon}
                </div>
                
                <h3 className="text-xl font-bold text-gray-900 mb-3">
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
      <section className="relative z-10 px-6 py-24 bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-6" style={{ fontFamily: 'Poppins, sans-serif' }}>
              Your Journey in 4 Simple Steps 🚀
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              From dream to reality in minutes, not hours
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                step: "01",
                title: "Share Your Dream",
                description: "Tell us your travel vision - budget, style, interests, and dreams",
                icon: <Heart className="w-8 h-8" />,
                color: "from-pink-500 to-rose-500",
                emoji: "💭"
              },
              {
                step: "02",
                title: "AI Magic",
                description: "Our AI analyzes millions of options to find your perfect match",
                icon: <Sparkles className="w-8 h-8" />,
                color: "from-purple-500 to-indigo-500",
                emoji: "✨"
              },
              {
                step: "03",
                title: "Smart Itinerary",
                description: "Get a dynamic plan that adapts to real-time conditions",
                icon: <Calendar className="w-8 h-8" />,
                color: "from-blue-500 to-cyan-500",
                emoji: "📅"
              },
              {
                step: "04",
                title: "One-Click Book",
                description: "Book everything seamlessly in one place, one payment",
                icon: <Zap className="w-8 h-8" />,
                color: "from-green-500 to-emerald-500",
                emoji: "⚡"
              }
            ].map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.15, duration: 0.6 }}
                className="relative"
              >
                {/* Connecting line */}
                {index < 3 && (
                  <div className="hidden lg:block absolute top-16 left-full w-full h-0.5 bg-gradient-to-r from-gray-300 to-transparent -translate-x-4" />
                )}
                
                <div className="bg-white rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all group">
                  <div className="relative mb-6">
                    <div className={`w-20 h-20 bg-gradient-to-br ${step.color} rounded-2xl flex items-center justify-center mx-auto shadow-xl group-hover:scale-110 transition-transform`}>
                      <div className="text-white">
                        {step.icon}
                      </div>
                    </div>
                    <div className="absolute -top-2 -right-2 w-12 h-12 bg-white rounded-full flex items-center justify-center text-2xl font-extrabold text-gray-900 shadow-lg border-4 border-white">
                      {step.step}
                    </div>
                    <div className="absolute -bottom-3 -right-3 text-4xl">
                      {step.emoji}
                    </div>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3 text-center">
                    {step.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed text-center">
                    {step.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative z-10 px-6 py-24 bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600 overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute inset-0 opacity-10">
          {[...Array(10)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                scale: [1, 1.5, 1],
                opacity: [0.3, 0.6, 0.3],
              }}
              transition={{
                duration: 3 + Math.random() * 2,
                repeat: Infinity,
                delay: Math.random() * 2,
              }}
            >
              <div className="w-32 h-32 bg-white rounded-full blur-3xl" />
            </motion.div>
          ))}
        </div>

        <div className="max-w-4xl mx-auto text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="text-6xl mb-6">🌟</div>
            <h2 className="text-4xl md:text-6xl font-extrabold text-white mb-6 leading-tight" style={{ fontFamily: 'Poppins, sans-serif' }}>
              Ready to Transform Your Travel Experience?
            </h2>
            <p className="text-xl md:text-2xl text-white/90 mb-10 max-w-2xl mx-auto leading-relaxed">
              Join thousands of smart travelers who've ditched the stress and embraced AI-powered planning
            </p>
            
            <motion.button
              whileHover={{ scale: 1.05, y: -3 }}
              whileTap={{ scale: 0.95 }}
              className="bg-white text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 text-xl px-12 py-6 rounded-full font-extrabold shadow-2xl hover:shadow-white/30 transition-all inline-flex items-center space-x-3"
              style={{ backgroundColor: 'white' }}
              onClick={handleGetStarted}
            >
              <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                Start Planning for Free
              </span>
              <div className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 rounded-full p-2">
                <ArrowRight className="w-6 h-6 text-white" />
              </div>
            </motion.button>

            <p className="text-white/80 mt-6 text-sm">
              ✨ No credit card required • 🎉 Get started in 30 seconds
            </p>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 px-6 py-12 bg-gray-900 text-white">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
                <MapPin className="w-6 h-6 text-white" />
              </div>
              <div>
                <span className="text-xl font-bold" style={{ fontFamily: 'Poppins, sans-serif' }}>GoWanderLust</span>
                <p className="text-xs text-gray-400">Powered by Google Cloud AI</p>
              </div>
            </div>
            
            <div className="text-center md:text-right">
              <p className="text-gray-400 text-sm">
                © 2024 GoWanderLust. All rights reserved.
              </p>
              <p className="text-gray-500 text-xs mt-1">
                Making travel planning joyful, one trip at a time 🌍✈️
              </p>
            </div>
          </div>
        </div>
      </footer>

      {/* Authentication Modal */}
      <AuthModal 
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        onSuccess={handleAuthSuccess}
      />
    </div>
  );
};

export default LandingPage;