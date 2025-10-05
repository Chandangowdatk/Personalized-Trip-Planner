import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { 
  User, 
  Mail, 
  Calendar, 
  MapPin, 
  Heart, 
  DollarSign, 
  Briefcase,
  Phone,
  Globe,
  Camera,
  Save,
  ArrowLeft,
  Shield,
  Bell,
  Lock
} from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import toast from 'react-hot-toast';

const ProfilePage = () => {
  const navigate = useNavigate();
  const { user, updatePreferences } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: user?.phone || '',
    location: user?.location || '',
    bio: user?.bio || '',
    preferences: {
      travelStyle: user?.preferences?.travelStyle || 'balanced',
      budget: user?.preferences?.budget || 'moderate',
      interests: user?.preferences?.interests || []
    }
  });

  const travelStyles = [
    { value: 'adventure', label: 'Adventure', icon: '🏔️' },
    { value: 'relaxation', label: 'Relaxation', icon: '🏖️' },
    { value: 'cultural', label: 'Cultural', icon: '🏛️' },
    { value: 'balanced', label: 'Balanced', icon: '⚖️' }
  ];

  const budgetOptions = [
    { value: 'budget', label: 'Budget', icon: '💰' },
    { value: 'moderate', label: 'Moderate', icon: '💳' },
    { value: 'luxury', label: 'Luxury', icon: '💎' }
  ];

  const interests = [
    'Nature', 'Food', 'History', 'Art', 'Shopping', 'Nightlife', 
    'Photography', 'Sports', 'Museums', 'Beaches', 'Mountains', 'Architecture'
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handlePreferenceChange = (key, value) => {
    setFormData(prev => ({
      ...prev,
      preferences: {
        ...prev.preferences,
        [key]: value
      }
    }));
  };

  const handleInterestToggle = (interest) => {
    setFormData(prev => {
      const currentInterests = prev.preferences.interests || [];
      const newInterests = currentInterests.includes(interest)
        ? currentInterests.filter(i => i !== interest)
        : [...currentInterests, interest];
      
      return {
        ...prev,
        preferences: {
          ...prev.preferences,
          interests: newInterests
        }
      };
    });
  };

  const handleSave = async () => {
    setIsSaving(true);
    try {
      await updatePreferences(formData.preferences);
      toast.success('Profile updated successfully!');
      setIsEditing(false);
    } catch (error) {
      toast.error('Failed to update profile. Please try again.');
    } finally {
      setIsSaving(false);
    }
  };

  const handleCancel = () => {
    setFormData({
      name: user?.name || '',
      email: user?.email || '',
      phone: user?.phone || '',
      location: user?.location || '',
      bio: user?.bio || '',
      preferences: {
        travelStyle: user?.preferences?.travelStyle || 'balanced',
        budget: user?.preferences?.budget || 'moderate',
        interests: user?.preferences?.interests || []
      }
    });
    setIsEditing(false);
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-5xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate('/home')}
              className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
              <span className="font-medium">Back to Home</span>
            </motion.button>
            
            <div className="flex items-center space-x-3">
              {isEditing ? (
                <>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleCancel}
                    className="px-4 py-2 text-gray-600 hover:text-gray-900 transition-colors"
                  >
                    Cancel
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleSave}
                    disabled={isSaving}
                    className="flex items-center space-x-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <Save className="w-4 h-4" />
                    <span>{isSaving ? 'Saving...' : 'Save Changes'}</span>
                  </motion.button>
                </>
              ) : (
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setIsEditing(true)}
                  className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                >
                  Edit Profile
                </motion.button>
              )}
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-5xl mx-auto px-6 py-8">
        <div className="grid md:grid-cols-3 gap-6">
          {/* Left Sidebar - Profile Card */}
          <div className="md:col-span-1">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-xl shadow-lg p-6 text-center sticky top-6"
            >
              {/* Profile Picture */}
              <div className="relative inline-block mb-4">
                {user?.photoURL ? (
                  <img
                    src={user.photoURL}
                    alt={user.name}
                    className="w-32 h-32 rounded-full object-cover ring-4 ring-blue-500"
                  />
                ) : (
                  <div className="w-32 h-32 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white text-4xl font-semibold ring-4 ring-blue-500">
                    {getInitials(formData.name)}
                  </div>
                )}
                <button className="absolute bottom-0 right-0 w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center text-white hover:bg-blue-600 transition-colors shadow-lg">
                  <Camera className="w-5 h-5" />
                </button>
              </div>

              <h2 className="text-xl font-bold text-gray-900 mb-1">
                {formData.name || 'User'}
              </h2>
              <p className="text-sm text-gray-500 mb-4 flex items-center justify-center">
                <Mail className="w-3 h-3 mr-1" />
                {formData.email}
              </p>

              {/* Member Since */}
              <div className="bg-gray-50 rounded-lg p-3 mb-4">
                <p className="text-xs text-gray-500 mb-1">Member Since</p>
                <p className="text-sm font-semibold text-gray-900">
                  {user?.createdAt ? new Date(user.createdAt).toLocaleDateString('en-US', { month: 'short', year: 'numeric' }) : 'Recently'}
                </p>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-2 gap-3 mb-4">
                <div className="bg-blue-50 rounded-lg p-3">
                  <MapPin className="w-5 h-5 text-blue-500 mx-auto mb-1" />
                  <p className="text-lg font-bold text-gray-900">12</p>
                  <p className="text-xs text-gray-500">Trips</p>
                </div>
                <div className="bg-purple-50 rounded-lg p-3">
                  <Heart className="w-5 h-5 text-purple-500 mx-auto mb-1" />
                  <p className="text-lg font-bold text-gray-900">34</p>
                  <p className="text-xs text-gray-500">Saved</p>
                </div>
              </div>

              {/* Quick Links */}
              <div className="space-y-2 text-left">
                <button className="w-full flex items-center space-x-3 p-2 text-sm text-gray-600 hover:bg-gray-50 rounded-lg transition-colors">
                  <Shield className="w-4 h-4" />
                  <span>Privacy & Security</span>
                </button>
                <button className="w-full flex items-center space-x-3 p-2 text-sm text-gray-600 hover:bg-gray-50 rounded-lg transition-colors">
                  <Bell className="w-4 h-4" />
                  <span>Notifications</span>
                </button>
                <button className="w-full flex items-center space-x-3 p-2 text-sm text-gray-600 hover:bg-gray-50 rounded-lg transition-colors">
                  <Lock className="w-4 h-4" />
                  <span>Change Password</span>
                </button>
              </div>
            </motion.div>
          </div>

          {/* Right Content - Profile Details */}
          <div className="md:col-span-2 space-y-6">
            {/* Personal Information */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-white rounded-xl shadow-lg p-6"
            >
              <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center">
                <User className="w-5 h-5 mr-2 text-blue-500" />
                Personal Information
              </h3>
              
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Full Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-50 disabled:text-gray-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Email Address
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    disabled={true}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-50 text-gray-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Phone Number
                  </label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      disabled={!isEditing}
                      placeholder="+1 (234) 567-8900"
                      className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-50 disabled:text-gray-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Location
                  </label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input
                      type="text"
                      name="location"
                      value={formData.location}
                      onChange={handleInputChange}
                      disabled={!isEditing}
                      placeholder="City, Country"
                      className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-50 disabled:text-gray-500"
                    />
                  </div>
                </div>
              </div>

              <div className="mt-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Bio
                </label>
                <textarea
                  name="bio"
                  value={formData.bio}
                  onChange={handleInputChange}
                  disabled={!isEditing}
                  rows={3}
                  placeholder="Tell us about yourself..."
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-50 disabled:text-gray-500 resize-none"
                />
              </div>
            </motion.div>

            {/* Travel Preferences */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-white rounded-xl shadow-lg p-6"
            >
              <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center">
                <Globe className="w-5 h-5 mr-2 text-blue-500" />
                Travel Preferences
              </h3>

              {/* Travel Style */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Travel Style
                </label>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  {travelStyles.map((style) => (
                    <button
                      key={style.value}
                      onClick={() => isEditing && handlePreferenceChange('travelStyle', style.value)}
                      disabled={!isEditing}
                      className={`p-3 rounded-lg border-2 transition-all ${
                        formData.preferences.travelStyle === style.value
                          ? 'border-blue-500 bg-blue-50'
                          : 'border-gray-200 hover:border-blue-300'
                      } ${!isEditing ? 'cursor-not-allowed opacity-60' : 'cursor-pointer'}`}
                    >
                      <div className="text-2xl mb-1">{style.icon}</div>
                      <div className="text-xs font-medium text-gray-900">{style.label}</div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Budget */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Budget Preference
                </label>
                <div className="grid grid-cols-3 gap-3">
                  {budgetOptions.map((budget) => (
                    <button
                      key={budget.value}
                      onClick={() => isEditing && handlePreferenceChange('budget', budget.value)}
                      disabled={!isEditing}
                      className={`p-3 rounded-lg border-2 transition-all ${
                        formData.preferences.budget === budget.value
                          ? 'border-blue-500 bg-blue-50'
                          : 'border-gray-200 hover:border-blue-300'
                      } ${!isEditing ? 'cursor-not-allowed opacity-60' : 'cursor-pointer'}`}
                    >
                      <div className="text-2xl mb-1">{budget.icon}</div>
                      <div className="text-xs font-medium text-gray-900">{budget.label}</div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Interests */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Interests
                </label>
                <div className="flex flex-wrap gap-2">
                  {interests.map((interest) => (
                    <button
                      key={interest}
                      onClick={() => isEditing && handleInterestToggle(interest)}
                      disabled={!isEditing}
                      className={`px-3 py-1.5 rounded-full text-sm font-medium transition-all ${
                        formData.preferences.interests?.includes(interest)
                          ? 'bg-blue-500 text-white'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      } ${!isEditing ? 'cursor-not-allowed opacity-60' : 'cursor-pointer'}`}
                    >
                      {interest}
                    </button>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
