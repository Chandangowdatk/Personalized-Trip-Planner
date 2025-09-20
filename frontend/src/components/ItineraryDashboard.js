import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  MapPin, 
  Calendar, 
  Clock, 
  DollarSign, 
  Users, 
  Plane, 
  Hotel, 
  Utensils,
  Camera,
  Navigation,
  Download,
  Share2,
  Heart,
  Star,
  ArrowRight,
  CheckCircle,
  AlertCircle
} from 'lucide-react';
import { useChat } from '../contexts/ChatContext';
import { useAuth } from '../contexts/AuthContext';
import { itineraryAPI, bookingAPI } from '../services/api';
import toast from 'react-hot-toast';

const ItineraryDashboard = () => {
  const { user } = useAuth();
  const { sessionId } = useChat();
  const [itinerary, setItinerary] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isBooking, setIsBooking] = useState(false);
  const [selectedDay, setSelectedDay] = useState(0);

  // Sample itinerary data (in production, this would come from the API)
  const sampleItinerary = {
    id: 'itinerary_123',
    title: '5-Day Adventure Trip to Himachal Pradesh',
    duration: '5 days',
    budget: '₹45,000',
    travelers: 2,
    destination: 'Himachal Pradesh, India',
    startDate: '2024-03-15',
    endDate: '2024-03-19',
    totalCost: 45000,
    savings: 5000,
    days: [
      {
        day: 1,
        date: '2024-03-15',
        title: 'Arrival in Shimla',
        activities: [
          {
            time: '09:00',
            title: 'Arrive at Shimla Airport',
            type: 'transport',
            icon: <Plane className="w-5 h-5" />,
            description: 'Flight from Delhi to Shimla',
            cost: 8000,
            duration: '2h 30m'
          },
          {
            time: '12:00',
            title: 'Check-in at Hotel',
            type: 'accommodation',
            icon: <Hotel className="w-5 h-5" />,
            description: 'Hotel Heritage Shimla - Deluxe Room',
            cost: 2500,
            duration: '1h'
          },
          {
            time: '14:00',
            title: 'Lunch at Local Restaurant',
            type: 'dining',
            icon: <Utensils className="w-5 h-5" />,
            description: 'Traditional Himachali cuisine at Kasauli Kitchen',
            cost: 800,
            duration: '1h 30m'
          },
          {
            time: '16:00',
            title: 'Explore Mall Road',
            type: 'activity',
            icon: <Camera className="w-5 h-5" />,
            description: 'Shopping and sightseeing on the famous Mall Road',
            cost: 0,
            duration: '2h'
          }
        ]
      },
      {
        day: 2,
        date: '2024-03-16',
        title: 'Kufri Adventure Day',
        activities: [
          {
            time: '08:00',
            title: 'Breakfast at Hotel',
            type: 'dining',
            icon: <Utensils className="w-5 h-5" />,
            description: 'Continental breakfast included',
            cost: 0,
            duration: '1h'
          },
          {
            time: '09:30',
            title: 'Drive to Kufri',
            type: 'transport',
            icon: <Navigation className="w-5 h-5" />,
            description: 'Private cab to Kufri (16 km)',
            cost: 1200,
            duration: '1h'
          },
          {
            time: '11:00',
            title: 'Horse Riding & Yak Ride',
            type: 'activity',
            icon: <Camera className="w-5 h-5" />,
            description: 'Adventure activities in Kufri',
            cost: 1500,
            duration: '3h'
          },
          {
            time: '15:00',
            title: 'Lunch at Kufri',
            type: 'dining',
            icon: <Utensils className="w-5 h-5" />,
            description: 'Local mountain cuisine',
            cost: 600,
            duration: '1h'
          },
          {
            time: '17:00',
            title: 'Return to Shimla',
            type: 'transport',
            icon: <Navigation className="w-5 h-5" />,
            description: 'Private cab back to Shimla',
            cost: 1200,
            duration: '1h'
          }
        ]
      },
      {
        day: 3,
        date: '2024-03-17',
        title: 'Manali Exploration',
        activities: [
          {
            time: '07:00',
            title: 'Early Breakfast',
            type: 'dining',
            icon: <Utensils className="w-5 h-5" />,
            description: 'Quick breakfast before departure',
            cost: 0,
            duration: '30m'
          },
          {
            time: '08:00',
            title: 'Drive to Manali',
            type: 'transport',
            icon: <Navigation className="w-5 h-5" />,
            description: 'Private cab to Manali (250 km)',
            cost: 4000,
            duration: '6h'
          },
          {
            time: '14:00',
            title: 'Check-in at Manali Hotel',
            type: 'accommodation',
            icon: <Hotel className="w-5 h-5" />,
            description: 'Hotel Snow Valley - Mountain View Room',
            cost: 3000,
            duration: '1h'
          },
          {
            time: '16:00',
            title: 'Visit Hadimba Temple',
            type: 'activity',
            icon: <Camera className="w-5 h-5" />,
            description: 'Ancient temple surrounded by cedar forests',
            cost: 0,
            duration: '2h'
          },
          {
            time: '19:00',
            title: 'Dinner at Old Manali',
            type: 'dining',
            icon: <Utensils className="w-5 h-5" />,
            description: 'Authentic local cuisine at Cafe 1947',
            cost: 1000,
            duration: '2h'
          }
        ]
      },
      {
        day: 4,
        date: '2024-03-18',
        title: 'Rohtang Pass Adventure',
        activities: [
          {
            time: '06:00',
            title: 'Early Breakfast',
            type: 'dining',
            icon: <Utensils className="w-5 h-5" />,
            description: 'Hearty breakfast for the adventure day',
            cost: 0,
            duration: '30m'
          },
          {
            time: '07:00',
            title: 'Drive to Rohtang Pass',
            type: 'transport',
            icon: <Navigation className="w-5 h-5" />,
            description: '4WD vehicle to Rohtang Pass (51 km)',
            cost: 3000,
            duration: '3h'
          },
          {
            time: '11:00',
            title: 'Snow Activities',
            type: 'activity',
            icon: <Camera className="w-5 h-5" />,
            description: 'Snowboarding, skiing, and snow photography',
            cost: 2000,
            duration: '4h'
          },
          {
            time: '16:00',
            title: 'Return to Manali',
            type: 'transport',
            icon: <Navigation className="w-5 h-5" />,
            description: '4WD vehicle back to Manali',
            cost: 3000,
            duration: '3h'
          },
          {
            time: '20:00',
            title: 'Farewell Dinner',
            type: 'dining',
            icon: <Utensils className="w-5 h-5" />,
            description: 'Special dinner at Johnson\'s Cafe',
            cost: 1200,
            duration: '2h'
          }
        ]
      },
      {
        day: 5,
        date: '2024-03-19',
        title: 'Departure Day',
        activities: [
          {
            time: '08:00',
            title: 'Breakfast at Hotel',
            type: 'dining',
            icon: <Utensils className="w-5 h-5" />,
            description: 'Final breakfast before departure',
            cost: 0,
            duration: '1h'
          },
          {
            time: '10:00',
            title: 'Check-out from Hotel',
            type: 'accommodation',
            icon: <Hotel className="w-5 h-5" />,
            description: 'Check-out and luggage storage',
            cost: 0,
            duration: '30m'
          },
          {
            time: '11:00',
            title: 'Last-minute Shopping',
            type: 'activity',
            icon: <Camera className="w-5 h-5" />,
            description: 'Buy souvenirs and local handicrafts',
            cost: 2000,
            duration: '2h'
          },
          {
            time: '14:00',
            title: 'Drive to Airport',
            type: 'transport',
            icon: <Navigation className="w-5 h-5" />,
            description: 'Private cab to Kullu Airport (50 km)',
            cost: 2000,
            duration: '2h'
          },
          {
            time: '17:00',
            title: 'Flight to Delhi',
            type: 'transport',
            icon: <Plane className="w-5 h-5" />,
            description: 'Return flight to Delhi',
            cost: 8000,
            duration: '1h 30m'
          }
        ]
      }
    ]
  };

  useEffect(() => {
    // In production, fetch itinerary from API
    setItinerary(sampleItinerary);
  }, [sessionId]);

  const handleBookTrip = async () => {
    if (!itinerary) return;

    setIsBooking(true);
    try {
      // Simulate booking process
      await new Promise(resolve => setTimeout(resolve, 3000));
      
      toast.success('Trip booked successfully! Check your email for confirmations.');
    } catch (error) {
      toast.error('Booking failed. Please try again.');
    } finally {
      setIsBooking(false);
    }
  };

  const handleShareItinerary = () => {
    if (navigator.share) {
      navigator.share({
        title: itinerary.title,
        text: `Check out my amazing trip to ${itinerary.destination}!`,
        url: window.location.href
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      toast.success('Itinerary link copied to clipboard!');
    }
  };

  const handleDownloadItinerary = () => {
    // In production, generate and download PDF
    toast.success('Itinerary downloaded as PDF!');
  };

  const getActivityIcon = (type) => {
    const icons = {
      transport: <Plane className="w-5 h-5" />,
      accommodation: <Hotel className="w-5 h-5" />,
      dining: <Utensils className="w-5 h-5" />,
      activity: <Camera className="w-5 h-5" />
    };
    return icons[type] || <Star className="w-5 h-5" />;
  };

  const getActivityColor = (type) => {
    const colors = {
      transport: 'bg-blue-100 text-blue-600',
      accommodation: 'bg-green-100 text-green-600',
      dining: 'bg-orange-100 text-orange-600',
      activity: 'bg-purple-100 text-purple-600'
    };
    return colors[type] || 'bg-gray-100 text-gray-600';
  };

  if (!itinerary) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-primary-500 via-primary-600 to-primary-700 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-white border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <h2 className="text-2xl font-bold text-white mb-2">Loading Your Itinerary</h2>
          <p className="text-primary-100">Please wait while we prepare your perfect trip...</p>
        </div>
      </div>
    );
  }

  const currentDay = itinerary.days[selectedDay];
  const totalActivities = itinerary.days.reduce((sum, day) => sum + day.activities.length, 0);

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-500 via-primary-600 to-primary-700">
      {/* Header */}
      <div className="bg-white/10 backdrop-blur-sm border-b border-white/20 px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center">
              <MapPin className="w-6 h-6 text-primary-600" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-white">Your Itinerary</h1>
              <p className="text-primary-100 text-sm">{itinerary.title}</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            <button
              onClick={handleShareItinerary}
              className="p-2 text-primary-200 hover:text-white hover:bg-white/20 rounded-lg transition-colors"
              title="Share itinerary"
            >
              <Share2 className="w-5 h-5" />
            </button>
            <button
              onClick={handleDownloadItinerary}
              className="p-2 text-primary-200 hover:text-white hover:bg-white/20 rounded-lg transition-colors"
              title="Download PDF"
            >
              <Download className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Trip Overview */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="card p-8 mb-8"
        >
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
            <div className="text-center">
              <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center mx-auto mb-3">
                <Calendar className="w-6 h-6 text-primary-600" />
              </div>
              <div className="text-2xl font-bold text-gray-800">{itinerary.duration}</div>
              <div className="text-gray-600 text-sm">Duration</div>
            </div>
            
            <div className="text-center">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-3">
                <DollarSign className="w-6 h-6 text-green-600" />
              </div>
              <div className="text-2xl font-bold text-gray-800">{itinerary.budget}</div>
              <div className="text-gray-600 text-sm">Total Budget</div>
            </div>
            
            <div className="text-center">
              <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mx-auto mb-3">
                <Users className="w-6 h-6 text-orange-600" />
              </div>
              <div className="text-2xl font-bold text-gray-800">{itinerary.travelers}</div>
              <div className="text-gray-600 text-sm">Travelers</div>
            </div>
            
            <div className="text-center">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mx-auto mb-3">
                <MapPin className="w-6 h-6 text-purple-600" />
              </div>
              <div className="text-2xl font-bold text-gray-800">{totalActivities}</div>
              <div className="text-gray-600 text-sm">Activities</div>
            </div>
          </div>

          <div className="flex flex-col md:flex-row items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold text-gray-800 mb-2">{itinerary.title}</h2>
              <p className="text-gray-600">{itinerary.destination}</p>
              <p className="text-sm text-gray-500 mt-1">
                {new Date(itinerary.startDate).toLocaleDateString()} - {new Date(itinerary.endDate).toLocaleDateString()}
              </p>
            </div>
            
            <div className="mt-4 md:mt-0">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleBookTrip}
                disabled={isBooking}
                className="btn-primary text-lg px-8 py-4 flex items-center space-x-2"
              >
                {isBooking ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    <span>Booking...</span>
                  </>
                ) : (
                  <>
                    <span>Book This Trip</span>
                    <ArrowRight className="w-5 h-5" />
                  </>
                )}
              </motion.button>
            </div>
          </div>
        </motion.div>

        <div className="grid lg:grid-cols-4 gap-8">
          {/* Day Navigation */}
          <div className="lg:col-span-1">
            <div className="card p-6 sticky top-8">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Trip Days</h3>
              <div className="space-y-2">
                {itinerary.days.map((day, index) => (
                  <button
                    key={day.day}
                    onClick={() => setSelectedDay(index)}
                    className={`w-full text-left p-3 rounded-lg transition-colors ${
                      selectedDay === index
                        ? 'bg-primary-500 text-white'
                        : 'hover:bg-gray-100 text-gray-700'
                    }`}
                  >
                    <div className="font-medium">Day {day.day}</div>
                    <div className="text-sm opacity-75">{day.title}</div>
                    <div className="text-xs opacity-60">
                      {new Date(day.date).toLocaleDateString()}
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Day Details */}
          <div className="lg:col-span-3">
            <motion.div
              key={selectedDay}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="card p-6"
            >
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="text-2xl font-bold text-gray-800">
                    Day {currentDay.day}: {currentDay.title}
                  </h3>
                  <p className="text-gray-600">
                    {new Date(currentDay.date).toLocaleDateString('en-US', {
                      weekday: 'long',
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </p>
                </div>
                <div className="text-right">
                  <div className="text-sm text-gray-500">Total Cost</div>
                  <div className="text-xl font-bold text-green-600">
                    ₹{currentDay.activities.reduce((sum, activity) => sum + activity.cost, 0).toLocaleString()}
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                {currentDay.activities.map((activity, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-start space-x-4 p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                  >
                    <div className="flex-shrink-0">
                      <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${getActivityColor(activity.type)}`}>
                        {getActivityIcon(activity.type)}
                      </div>
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="text-lg font-semibold text-gray-800">
                          {activity.title}
                        </h4>
                        <div className="flex items-center space-x-2">
                          <span className="text-sm text-gray-500">{activity.time}</span>
                          <span className="text-sm text-gray-500">•</span>
                          <span className="text-sm text-gray-500">{activity.duration}</span>
                        </div>
                      </div>
                      
                      <p className="text-gray-600 mb-2">{activity.description}</p>
                      
                      {activity.cost > 0 && (
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-medium text-green-600">
                            ₹{activity.cost.toLocaleString()}
                          </span>
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getActivityColor(activity.type)}`}>
                            {activity.type.charAt(0).toUpperCase() + activity.type.slice(1)}
                          </span>
                        </div>
                      )}
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ItineraryDashboard;
