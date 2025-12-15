// Settings.jsx
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';
import { useAuthContext } from '../../context/AuthContext';
import { Link } from "react-router-dom";
import Navigation from './Navigation';
import ProfileView from './ProfileView';
import EditProfile from './EditProfile';
import SocialLinks from './SocialLinks';
import AboutApp from './AboutApp.jsx';
import { ImSpinner2 } from 'react-icons/im';
import SERVER_URL from "../../utils/SERVER_URL.js"
const Settings = () => {
  const { authUser } = useAuthContext();
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    bio: '',
    portfolio: '',
    twitter: '',
    github: '',
    linkedin: '',
  });
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState('view');
  const [profileData, setProfileData] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await fetch(`${SERVER_URL}/api/users/${authUser.username}`, {
          credentials: 'include',
        });
        const data = await res.json();
        setProfileData(data);
        setFormData({
          fullName: data.fullName || '',
          email: data.email || '',
          bio: data.bio || '',
          portfolio: data.portfolio || '',
          twitter: data.socials?.twitter || '',
          github: data.socials?.github || '',
          linkedin: data.socials?.linkedin || '',
          profilePic: data.profilePic || '',
        });
      } catch (error) {
        toast.error('Failed to load profile');
      }
    };
    fetchProfile();
  }, [authUser]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const { fullName, email, bio, portfolio, twitter, github, linkedin } = formData;

    try {
      const res = await fetch(
        `${SERVER_URL}/api/users/update`,
        {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          credentials: 'include',
          body: JSON.stringify({
            fullName,
            email,
            bio,
            portfolio,
            socials: {
              twitter,
              github,
              linkedin,
            },
          }),
        },
      );
      const result = await res.json();
      if (!res.ok) throw new Error(result.message);
      toast.success('Profile updated successfully!');
      const profileRes = await fetch(
        `${SERVER_URL}/api/users/${authUser.username}`,
        {
          credentials: 'include',
        },
      );
      setProfileData(await profileRes.json());
    } catch (err) {
      toast.error(err.message || 'Update failed');
    } finally {
      setLoading(false);
    }
  };

  const renderActiveTab = () => {
    switch (activeTab) {
      case 'view':
        return <ProfileView data={profileData} />;
      case 'edit':
        return (
          <EditProfile
            formData={formData}
            handleChange={handleChange}
            loading={loading}
            handleSubmit={handleSubmit}
          />
        );
      case 'social':
        return (
          <SocialLinks
            formData={formData}
            handleChange={handleChange}
            loading={loading}
            handleSubmit={handleSubmit}
          />
        );
      case 'about':
        return <AboutApp />;
      default:
        return <ProfileView data={profileData} />;
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      className="h-full w-full p-4 bg-gray-950 flex overflow-hidden"
    >
      <div className="flex flex-col lg:flex-row gap-4 w-full h-full">
        <Navigation activeTab={activeTab} setActiveTab={setActiveTab} />

        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.2 }}
          className="flex-1 bg-gray-800 rounded-xl border border-gray-700 p-6 overflow-y-auto"
        >
          {renderActiveTab()}
        </motion.div>
      </div>
    </motion.div>
  );
};

export default Settings;
