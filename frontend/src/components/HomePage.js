import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
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
  MessageCircle,
  Compass,
  Navigation,
  Zap,
  Target,
  BookOpen,
  Smartphone,
  TrendingUp,
  Star,
  ChevronRight,
  Play,
  Settings,
  History,
  Share2,
  User,
  LogOut,
  ChevronDown,
  Mail,
  Bell
} from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import toast from 'react-hot-toast';

const HomePage = () => {
  const navigate = useNavigate();
  const { user, signOut } = useAuth();
  const [hoveredCard, setHoveredCard] = useState(null);
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
  const profileDropdownRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (profileDropdownRef.current && !profileDropdownRef.current.contains(event.target)) {
        setIsProfileDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleStartPlanning = () => {
    navigate('/chat');
  };

  const handleQuickAction = (action) => {
    // Handle quick actions - for now, navigate to chat with context
    navigate('/chat', { state: { quickAction: action } });
  };

  const handleLogout = async () => {
    try {
      await signOut();
      toast.success('Logged out successfully!');
      navigate('/');
    } catch (error) {
      toast.error('Failed to logout. Please try again.');
    }
  };

  const getInitials = (name) => {
    if (!name) return 'U';
    return name
      .split(' ')
      .map(word => word[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  const coreFeatures = [
    {
      id: 'personalized-planning',
      icon: <Sparkles className="w-8 h-8" />,
      title: "AI Trip Planning",
      description: "Hyper-personalized itineraries that understand your context, safety needs, and cultural preferences",
      color: "from-blue-500 to-blue-600",
      action: "Start Planning",
      stats: "7 min avg"
    },
    {
      id: 'real-time-adaptation',
      icon: <Zap className="w-8 h-8" />,
      title: "Real-time Adaptation",
      description: "Dynamic itineraries that adjust to weather, delays, and spontaneous discoveries",
      color: "from-purple-500 to-purple-600",
      action: "Live Updates",
      stats: "24/7 monitoring"
    },
    {
      id: 'one-click-booking',
      icon: <DollarSign className="w-8 h-8" />,
      title: "One-Click Booking",
      description: "Consolidate 3.7 platforms into one seamless booking experience",
      color: "from-green-500 to-green-600",
      action: "Book Now",
      stats: "47% savings"
    },
    {
      id: 'travel-guardian',
      icon: <Shield className="w-8 h-8" />,
      title: "Travel Guardian",
      description: "Proactive safety monitoring, cultural guidance, and disruption management",
      color: "from-red-500 to-red-600",
      action: "Stay Safe",
      stats: "100% coverage"
    }
  ];

  const quickActions = [
    {
      id: 'group-planning',
      icon: <Users className="w-6 h-6" />,
      title: "Group Planning",
      description: "Collaborative trip planning with friends and family",
      color: "bg-blue-100 text-blue-600"
    },
    {
      id: 'budget-optimizer',
      icon: <TrendingUp className="w-6 h-6" />,
      title: "Budget Optimizer",
      description: "Smart cost tracking and optimization",
      color: "bg-green-100 text-green-600"
    },
    {
      id: 'cultural-compass',
      icon: <Compass className="w-6 h-6" />,
      title: "Cultural Compass",
      description: "Local etiquette and language support",
      color: "bg-purple-100 text-purple-600"
    },
    {
      id: 'last-mile-nav',
      icon: <Navigation className="w-6 h-6" />,
      title: "Last-Mile Navigation",
      description: "Multi-modal transport options",
      color: "bg-orange-100 text-orange-600"
    }
  ];

  const recentTrips = [
    {
      id: 1,
      destination: "Rajasthan Heritage Tour",
      date: "Dec 15-20, 2024",
      status: "Planned",
      color: "bg-amber-100 text-amber-800"
    },
    {
      id: 2,
      destination: "Goa Beach Adventure",
      date: "Nov 28-30, 2024",
      status: "Completed",
      color: "bg-green-100 text-green-800"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex items-center space-x-3"
            >
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center">
                <MapPin className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">TripPlanner AI</h1>
                <p className="text-sm text-gray-500">Welcome back, {user?.name || 'Traveler'}!</p>
              </div>
            </motion.div>
            
            <div className="flex items-center space-x-4">
              {/* Notifications */}
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="relative p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <Bell className="w-5 h-5" />
                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
              </motion.button>

              {/* User Profile Dropdown */}
              <div className="relative" ref={profileDropdownRef}>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setIsProfileDropdownOpen(!isProfileDropdownOpen)}
                  className="flex items-center space-x-3 p-2 hover:bg-gray-50 rounded-lg transition-colors"
                >
                  {/* User Avatar */}
                  <div className="relative">
                    {user?.photoURL ? (
                      <img
                        src={user.photoURL}
                        alt={user.name}
                        className="w-10 h-10 rounded-full object-cover ring-2 ring-blue-500"
                      />
                    ) : (
                      <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-semibold ring-2 ring-blue-500">
                        {getInitials(user?.name)}
                      </div>
                    )}
                    <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
                  </div>

                  {/* User Info */}
                  <div className="hidden md:block text-left">
                    <p className="text-sm font-semibold text-gray-900">
                      {user?.name || 'User'}
                    </p>
                    <p className="text-xs text-gray-500">
                      {user?.email || 'user@example.com'}
                    </p>
                  </div>

                  <ChevronDown 
                    className={`w-4 h-4 text-gray-500 transition-transform ${
                      isProfileDropdownOpen ? 'rotate-180' : ''
                    }`}
                  />
                </motion.button>

                {/* Dropdown Menu */}
                <AnimatePresence>
                  {isProfileDropdownOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: -10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: -10, scale: 0.95 }}
                      transition={{ duration: 0.15 }}
                      className="absolute right-0 mt-2 w-64 bg-white rounded-lg shadow-xl border border-gray-200 py-2 z-50"
                    >
                      {/* User Info in Dropdown */}
                      <div className="px-4 py-3 border-b border-gray-100">
                        <p className="text-sm font-semibold text-gray-900">
                          {user?.name || 'User'}
                        </p>
                        <p className="text-xs text-gray-500 flex items-center mt-1">
                          <Mail className="w-3 h-3 mr-1" />
                          {user?.email || 'user@example.com'}
                        </p>
                      </div>

                      {/* Menu Items */}
                      <div className="py-1">
                        <button
                          onClick={() => {
                            setIsProfileDropdownOpen(false);
                            navigate('/profile');
                          }}
                          className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-50 flex items-center space-x-3 transition-colors"
                        >
                          <User className="w-4 h-4" />
                          <span>My Profile</span>
                        </button>

                        <button
                          onClick={() => {
                            setIsProfileDropdownOpen(false);
                            // Navigate to settings
                          }}
                          className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-50 flex items-center space-x-3 transition-colors"
                        >
                          <Settings className="w-4 h-4" />
                          <span>Settings</span>
                        </button>

                        <button
                          onClick={() => {
                            setIsProfileDropdownOpen(false);
                            // Navigate to history
                          }}
                          className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-50 flex items-center space-x-3 transition-colors"
                        >
                          <History className="w-4 h-4" />
                          <span>My Trips</span>
                        </button>
                      </div>

                      {/* Logout */}
                      <div className="border-t border-gray-100 pt-1">
                        <button
                          onClick={handleLogout}
                          className="w-full px-4 py-2 text-left text-sm text-red-600 hover:bg-red-50 flex items-center space-x-3 transition-colors"
                        >
                          <LogOut className="w-4 h-4" />
                          <span>Logout</span>
                        </button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Your AI Travel Co-Pilot
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            Choose how you'd like to plan your next adventure. From quick getaways to complex multi-city journeys, 
            we've got you covered with intelligent, personalized solutions.
          </p>
          
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleStartPlanning}
            className="bg-gradient-to-r from-blue-500 to-blue-600 text-white px-8 py-4 rounded-lg font-semibold text-lg shadow-lg hover:shadow-xl transition-all duration-300 flex items-center space-x-2 mx-auto"
          >
            <MessageCircle className="w-5 h-5" />
            <span>Start New Trip Planning</span>
            <ArrowRight className="w-5 h-5" />
          </motion.button>
        </motion.div>

        {/* Core Features Grid */}
        <div className="mb-16">
          <motion.h3
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-2xl font-bold text-gray-900 mb-8 text-center"
          >
            Core Capabilities
          </motion.h3>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {coreFeatures.map((feature, index) => (
              <motion.div
                key={feature.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -5, scale: 1.02 }}
                onHoverStart={() => setHoveredCard(feature.id)}
                onHoverEnd={() => setHoveredCard(null)}
                className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer border border-gray-100 home-card-hover"
                onClick={() => handleQuickAction(feature.id)}
              >
                <div className={`w-16 h-16 bg-gradient-to-br ${feature.color} rounded-lg flex items-center justify-center mb-4 mx-auto`}>
                  <div className="text-white">
                    {feature.icon}
                  </div>
                </div>
                
                <h4 className="text-lg font-semibold text-gray-900 mb-2 text-center">
                  {feature.title}
                </h4>
                
                <p className="text-gray-600 text-sm mb-4 text-center leading-relaxed">
                  {feature.description}
                </p>
                
                <div className="flex items-center justify-between">
                  <span className="text-xs font-medium text-gray-500 bg-gray-100 px-2 py-1 rounded-full">
                    {feature.stats}
                  </span>
                  <motion.div
                    animate={{ x: hoveredCard === feature.id ? 5 : 0 }}
                    className="text-blue-500"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </motion.div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="mb-16">
          <motion.h3
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-2xl font-bold text-gray-900 mb-8 text-center"
          >
            Quick Actions
          </motion.h3>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {quickActions.map((action, index) => (
              <motion.button
                key={action.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => handleQuickAction(action.id)}
                className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 text-left border border-gray-100 quick-action-hover"
              >
                <div className={`w-12 h-12 ${action.color} rounded-lg flex items-center justify-center mb-3`}>
                  {action.icon}
                </div>
                <h4 className="font-semibold text-gray-900 text-sm mb-1">
                  {action.title}
                </h4>
                <p className="text-xs text-gray-600">
                  {action.description}
                </p>
              </motion.button>
            ))}
          </div>
        </div>

        {/* Recent Trips */}
        <div className="mb-16">
          <div className="flex items-center justify-between mb-6">
            <motion.h3
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-2xl font-bold text-gray-900"
            >
              Recent Trips
            </motion.h3>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="text-blue-500 hover:text-blue-600 font-medium flex items-center space-x-1"
            >
              <span>View All</span>
              <ArrowRight className="w-4 h-4" />
            </motion.button>
          </div>
          
          <div className="grid md:grid-cols-2 gap-4">
            {recentTrips.map((trip, index) => (
              <motion.div
                key={trip.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 border border-gray-100"
              >
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-semibold text-gray-900">{trip.destination}</h4>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${trip.color}`}>
                    {trip.status}
                  </span>
                </div>
                <p className="text-sm text-gray-600 mb-3">{trip.date}</p>
                <div className="flex items-center space-x-2">
                  <button className="text-blue-500 hover:text-blue-600 text-sm font-medium flex items-center space-x-1">
                    <Play className="w-3 h-3" />
                    <span>Continue</span>
                  </button>
                  <button className="text-gray-500 hover:text-gray-600 text-sm font-medium flex items-center space-x-1">
                    <Share2 className="w-3 h-3" />
                    <span>Share</span>
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Stats Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl p-8 text-white stats-glow"
        >
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold mb-2">Your Travel Journey</h3>
            <p className="text-blue-100">Track your progress and achievements</p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { number: "12", label: "Trips Planned", icon: <Calendar className="w-6 h-6" /> },
              { number: "₹2.4L", label: "Money Saved", icon: <DollarSign className="w-6 h-6" /> },
              { number: "47h", label: "Time Saved", icon: <Clock className="w-6 h-6" /> },
              { number: "4.9", label: "Avg Rating", icon: <Star className="w-6 h-6" /> }
            ].map((stat, index) => (
              <div key={index} className="text-center">
                <div className="flex justify-center mb-2">
                  {stat.icon}
                </div>
                <div className="text-2xl font-bold mb-1">{stat.number}</div>
                <div className="text-blue-100 text-sm">{stat.label}</div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default HomePage;
