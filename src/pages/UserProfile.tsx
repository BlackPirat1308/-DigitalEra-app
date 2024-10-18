import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import axios from 'axios';

interface UserPreferences {
  theme: 'light' | 'dark';
  notifications: boolean;
}

const UserProfile: React.FC = () => {
  const { user } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState({
    name: '',
    email: '',
    address: '',
  });
  const [preferences, setPreferences] = useState<UserPreferences>({
    theme: 'light',
    notifications: true,
  });

  useEffect(() => {
    // Fetch user profile and preferences
    const fetchUserData = async () => {
      try {
        const response = await axios.get(`/api/users/${user.id}`);
        setProfile(response.data.profile);
        setPreferences(response.data.preferences);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    if (user) {
      fetchUserData();
    }
  }, [user]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setProfile((prevProfile) => ({
      ...prevProfile,
      [name]: value,
    }));
  };

  const handlePreferenceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setPreferences((prevPreferences) => ({
      ...prevPreferences,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await axios.put(`/api/users/${user.id}`, { profile, preferences });
      setIsEditing(false);
    } catch (error) {
      console.error('Error updating user data:', error);
    }
  };

  return (
    <div>
      <h2 className="text-3xl font-bold mb-6">User Profile</h2>
      <div className="bg-white rounded-lg shadow-md p-6">
        {isEditing ? (
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label htmlFor="name" className="block text-gray-700 font-bold mb-2">Name</label>
              <input
                type="text"
                id="name"
                name="name"
                value={profile.name}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                required
              />
            </div>
            <div className="mb-4">
              <label htmlFor="email" className="block text-gray-700 font-bold mb-2">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                value={profile.email}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                required
              />
            </div>
            <div className="mb-4">
              <label htmlFor="address" className="block text-gray-700 font-bold mb-2">Address</label>
              <input
                type="text"
                id="address"
                name="address"
                value={profile.address}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                required
              />
            </div>
            <div className="mb-4">
              <label htmlFor="theme" className="block text-gray-700 font-bold mb-2">Theme</label>
              <select
                id="theme"
                name="theme"
                value={preferences.theme}
                onChange={handlePreferenceChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                <option value="light">Light</option>
                <option value="dark">Dark</option>
              </select>
            </div>
            <div className="mb-4">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  name="notifications"
                  checked={preferences.notifications}
                  onChange={handlePreferenceChange}
                  className="mr-2"
                />
                <span className="text-gray-700 font-bold">Enable Notifications</span>
              </label>
            </div>
            <div className="flex justify-end">
              <button type="submit" className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 transition duration-300 mr-2">
                Save Changes
              </button>
              <button type="button" onClick={() => setIsEditing(false)} className="bg-gray-300 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-400 transition duration-300">
                Cancel
              </button>
            </div>
          </form>
        ) : (
          <div>
            <p className="mb-2"><strong>Name:</strong> {profile.name}</p>
            <p className="mb-2"><strong>Email:</strong> {profile.email}</p>
            <p className="mb-2"><strong>Address:</strong> {profile.address}</p>
            <p className="mb-2"><strong>Theme:</strong> {preferences.theme}</p>
            <p className="mb-4"><strong>Notifications:</strong> {preferences.notifications ? 'Enabled' : 'Disabled'}</p>
            <button onClick={() => setIsEditing(true)} className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 transition duration-300">
              Edit Profile
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserProfile;