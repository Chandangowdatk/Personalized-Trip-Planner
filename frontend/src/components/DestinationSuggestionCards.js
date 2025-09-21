import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  MapPin, 
  Star, 
  Heart,
  ChevronRight,
  ChevronLeft,
  Plane,
  Camera,
  Utensils,
  Mountain,
  Waves,
  Building,
  TreePine,
  Circle
} from 'lucide-react';

const DestinationSuggestionCards = ({ 
  destinations = [], 
  onDestinationSelect, 
  userPreferences = {} 
}) => {
  const [selectedDestination, setSelectedDestination] = useState(null);
  const [hoveredCard, setHoveredCard] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const carouselRef = useRef(null);
  const autoPlayRef = useRef(null);

  // Auto-play functionality
  useEffect(() => {
    if (isAutoPlaying && destinations.length > 1) {
      autoPlayRef.current = setInterval(() => {
        setCurrentIndex((prevIndex) => 
          prevIndex === destinations.length - 1 ? 0 : prevIndex + 1
        );
      }, 4000); // Change slide every 4 seconds
    }

    return () => {
      if (autoPlayRef.current) {
        clearInterval(autoPlayRef.current);
      }
    };
  }, [isAutoPlaying, destinations.length]);

  // Pause auto-play on hover
  const handleMouseEnter = () => {
    setIsAutoPlaying(false);
  };

  const handleMouseLeave = () => {
    setIsAutoPlaying(true);
  };

  // Navigation functions
  const goToPrevious = () => {
    setCurrentIndex(currentIndex === 0 ? destinations.length - 1 : currentIndex - 1);
  };

  const goToNext = () => {
    setCurrentIndex(currentIndex === destinations.length - 1 ? 0 : currentIndex + 1);
  };

  const goToSlide = (index) => {
    setCurrentIndex(index);
  };

  // Mock data for demonstration - in real app, this would come from the backend
  const destinationData = {
    'Jaipur': {
      name: 'Jaipur',
      state: 'Rajasthan',
      description: 'The Pink City - Royal palaces, vibrant bazaars, and rich heritage',
      highlights: ['Amber Fort', 'City Palace', 'Hawa Mahal', 'Jantar Mantar'],
      bestTime: 'Oct-Mar',
      avgCost: '₹3,000-5,000',
      duration: '3-4 days',
      category: 'heritage',
      rating: 4.6,
      image: 'https://images.unsplash.com/photo-1564507592333-c60657eea523?w=400&h=300&fit=crop',
      icon: <Building className="w-6 h-6" />,
      color: 'from-amber-500 to-orange-600'
    },
    'Goa': {
      name: 'Goa',
      state: 'Goa',
      description: 'Beach paradise with Portuguese heritage and vibrant nightlife',
      highlights: ['Beaches', 'Portuguese Architecture', 'Nightlife', 'Water Sports'],
      bestTime: 'Nov-Mar',
      avgCost: '₹2,500-4,500',
      duration: '4-5 days',
      category: 'beach',
      rating: 4.4,
      image: 'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?w=400&h=300&fit=crop',
      icon: <Waves className="w-6 h-6" />,
      color: 'from-blue-500 to-cyan-600'
    },
    'Varanasi': {
      name: 'Varanasi',
      state: 'Uttar Pradesh',
      description: 'Spiritual capital with ancient temples and Ganga ghats',
      highlights: ['Ganga Ghats', 'Kashi Vishwanath', 'Sarnath', 'Ganga Aarti'],
      bestTime: 'Oct-Mar',
      avgCost: '₹2,000-3,500',
      duration: '2-3 days',
      category: 'spiritual',
      rating: 4.3,
      image: 'https://images.unsplash.com/photo-1524492412937-b28074a5d7da?w=400&h=300&fit=crop',
      color: 'from-purple-500 to-indigo-600'
    },
    'Kerala': {
      name: 'Kerala',
      state: 'Kerala',
      description: 'God\'s Own Country - Backwaters, hill stations, and lush greenery',
      highlights: ['Backwaters', 'Munnar Hills', 'Kochi', 'Ayurveda'],
      bestTime: 'Oct-Mar',
      avgCost: '₹3,500-6,000',
      duration: '5-7 days',
      category: 'nature',
      rating: 4.7,
      image: 'https://images.unsplash.com/photo-1583417319078-4a69db38a482?w=400&h=300&fit=crop',
      icon: <TreePine className="w-6 h-6" />,
      color: 'from-green-500 to-emerald-600'
    },
    'Ladakh': {
      name: 'Ladakh',
      state: 'Jammu & Kashmir',
      description: 'High-altitude desert with stunning landscapes and monasteries',
      highlights: ['Pangong Lake', 'Nubra Valley', 'Leh Palace', 'Monasteries'],
      bestTime: 'May-Sep',
      avgCost: '₹4,000-7,000',
      duration: '6-8 days',
      category: 'adventure',
      rating: 4.8,
      image: 'https://images.unsplash.com/photo-1587474260584-136574528ed5?w=400&h=300&fit=crop',
      icon: <Mountain className="w-6 h-6" />,
      color: 'from-slate-500 to-blue-600'
    },
    'Mumbai': {
      name: 'Mumbai',
      state: 'Maharashtra',
      description: 'City of Dreams - Bollywood, beaches, and bustling markets',
      highlights: ['Gateway of India', 'Marine Drive', 'Bollywood', 'Street Food'],
      bestTime: 'Oct-Mar',
      avgCost: '₹4,000-6,000',
      duration: '3-4 days',
      category: 'urban',
      rating: 4.2,
      image: 'https://images.unsplash.com/photo-1529258283598-8d6fe60b27f4?w=400&h=300&fit=crop',
      icon: <Building className="w-6 h-6" />,
      color: 'from-gray-500 to-slate-600'
    }
  };

  const getDestinationInfo = (destinationName) => {
    return destinationData[destinationName] || {
      name: destinationName,
      state: 'India',
      description: `Explore the beautiful destination of ${destinationName}`,
      highlights: ['Local Attractions', 'Cultural Sites', 'Food & Cuisine'],
      bestTime: 'Year Round',
      avgCost: '₹2,000-5,000',
      duration: '3-5 days',
      category: 'general',
      rating: 4.0,
      image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300&fit=crop',
      icon: <MapPin className="w-6 h-6" />,
      color: 'from-blue-500 to-purple-600'
    };
  };

  const handleDestinationClick = (destination) => {
    setSelectedDestination(destination);
    if (onDestinationSelect) {
      onDestinationSelect(destination);
    }
  };

  const getCategoryIcon = (category) => {
    switch (category) {
      case 'heritage': return <Building className="w-4 h-4" />;
      case 'beach': return <Waves className="w-4 h-4" />;
      case 'spiritual': return <Heart className="w-4 h-4" />;
      case 'nature': return <TreePine className="w-4 h-4" />;
      case 'adventure': return <Mountain className="w-4 h-4" />;
      case 'urban': return <Building className="w-4 h-4" />;
      default: return <MapPin className="w-4 h-4" />;
    }
  };

  if (!destinations || destinations.length === 0) {
    return null;
  }

  return (
    <div className="mt-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-6"
      >
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-xl font-bold text-white">
            🎯 Perfect Destinations for Your Trip
          </h3>
          <div className="text-xs text-white/70">
            {destinations.length} destination{destinations.length !== 1 ? 's' : ''} found
          </div>
        </div>
        <p className="text-primary-100 text-sm">
          Based on your preferences, here are the best destinations we found for you:
        </p>
      </motion.div>

      {/* Carousel Container */}
      <div 
        className="relative overflow-hidden rounded-2xl carousel-container"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {/* Main Carousel */}
        <div className="relative min-h-[500px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, x: 300 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -300 }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
              className="w-full"
            >
              {(() => {
                const destination = destinations[currentIndex];
                const info = getDestinationInfo(destination);
                const isSelected = selectedDestination === destination;
                const isHovered = hoveredCard === destination;

                return (
                  <div className="w-full bg-white rounded-2xl overflow-hidden shadow-2xl">
                    {/* Hero Image Section */}
                    <div className="relative h-64 overflow-hidden">
                      <img
                        src={info.image}
                        alt={info.name}
                        className="w-full h-full object-cover destination-image"
                      />
                      <div className={`absolute inset-0 bg-gradient-to-t ${info.color} opacity-30`} />
                      
                      {/* Overlay Content */}
                      <div className="absolute inset-0 p-6 flex flex-col justify-between">
                        {/* Top Row */}
                        <div className="flex items-start justify-between">
                          <div className="flex items-center space-x-1 destination-badge px-3 py-1 rounded-full text-sm font-medium text-gray-700">
                            {getCategoryIcon(info.category)}
                            <span className="capitalize">{info.category}</span>
                          </div>
                          <div className="flex items-center space-x-1 destination-rating px-3 py-1 rounded-full">
                            <Star className="w-4 h-4 text-yellow-500 fill-current" />
                            <span className="text-sm font-medium text-gray-700">{info.rating}</span>
                          </div>
                        </div>

                        {/* Bottom Row */}
                        <div className="text-white">
                          <h4 className="text-3xl font-bold mb-2">{info.name}</h4>
                          <p className="text-lg text-white/90 mb-2">{info.state}</p>
                          <p className="text-white/80 text-sm line-clamp-2">
                            {info.description}
                          </p>
                        </div>
                      </div>

                      {/* Selection Overlay */}
                      {isSelected && (
                        <div className="absolute inset-0 bg-blue-500/20 flex items-center justify-center z-10">
                          <div className="bg-blue-500 text-white px-6 py-3 rounded-full font-medium flex items-center space-x-2 shadow-lg">
                            <Heart className="w-5 h-5 fill-current" />
                            <span>Selected</span>
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Content Section */}
                    <div className="p-6">
                      {/* Highlights */}
                      <div className="mb-4">
                        <h5 className="text-sm font-semibold text-gray-700 mb-2">Key Highlights</h5>
                        <div className="flex flex-wrap gap-2">
                          {info.highlights.slice(0, 4).map((highlight, idx) => (
                            <span
                              key={idx}
                              className="text-xs bg-gray-100 text-gray-600 px-3 py-1 rounded-full destination-highlight"
                            >
                              {highlight}
                            </span>
                          ))}
                        </div>
                      </div>


                      {/* Action Button */}
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => handleDestinationClick(destination)}
                        className={`
                          w-full py-4 px-6 rounded-xl font-bold text-lg
                          destination-button flex items-center justify-center space-x-3
                          shadow-lg hover:shadow-xl transition-all duration-200
                          ${isSelected
                            ? 'bg-green-500 text-white hover:bg-green-600'
                            : 'bg-gradient-to-r from-blue-500 to-blue-600 text-white hover:from-blue-600 hover:to-blue-700'
                          }
                        `}
                      >
                        <span>{isSelected ? '✓ Selected' : 'Select This Destination'}</span>
                        <ChevronRight className="w-6 h-6" />
                      </motion.button>
                    </div>
                  </div>
                );
              })()}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Navigation Arrows */}
        {destinations.length > 1 && (
          <>
            <button
              onClick={goToPrevious}
              className="absolute left-4 top-1/2 transform -translate-y-1/2 w-12 h-12 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg hover:bg-white carousel-nav-button z-10"
            >
              <ChevronLeft className="w-6 h-6 text-gray-700" />
            </button>
            <button
              onClick={goToNext}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 w-12 h-12 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg hover:bg-white carousel-nav-button z-10"
            >
              <ChevronRight className="w-6 h-6 text-gray-700" />
            </button>
          </>
        )}

        {/* Dots Indicator */}
        {destinations.length > 1 && (
          <div className="flex justify-center space-x-2 mt-4">
            {destinations.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`w-3 h-3 rounded-full carousel-dot ${
                  index === currentIndex 
                    ? 'carousel-dot-active bg-blue-500' 
                    : 'bg-white/50 hover:bg-white/70'
                }`}
              />
            ))}
          </div>
        )}

        {/* Auto-play Indicator */}
        {destinations.length > 1 && (
          <div className="flex justify-center mt-2">
            <div className="flex items-center space-x-2 text-xs text-white/70 auto-play-indicator">
              <div className={`w-2 h-2 rounded-full auto-play-dot ${isAutoPlaying ? 'bg-green-400' : 'bg-gray-400'}`} />
              <span>{isAutoPlaying ? 'Auto-playing' : 'Paused'}</span>
            </div>
          </div>
        )}

      </div>

      {/* Selection Summary */}
      {selectedDestination && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-6 p-6 bg-white/10 backdrop-blur-sm rounded-xl border border-white/20"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center">
                <Heart className="w-6 h-6 text-white fill-current" />
              </div>
              <div>
                <h4 className="font-bold text-white text-lg">Excellent choice!</h4>
                <p className="text-primary-100">
                  You've selected <span className="font-semibold text-white">{selectedDestination}</span> for your trip
                </p>
              </div>
            </div>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
            >
              Continue Planning
            </motion.button>
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default DestinationSuggestionCards;
