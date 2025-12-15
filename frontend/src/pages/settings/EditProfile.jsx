import Input from './Input';
import { FiMail, FiLink2, FiSave, FiUpload, FiX, FiUser } from 'react-icons/fi';
import { ImSpinner2 } from 'react-icons/im';
import { motion } from 'framer-motion';
import { useState, useRef, useEffect } from 'react';
import toast from 'react-hot-toast';
import SERVER_URL from '../../utils/SERVER_URL';
import { useAuthContext } from '../../context/AuthContext';

const EditProfile = ({ formData, handleChange, loading, handleSubmit }) => {
  const { authUser, setAuthUser } = useAuthContext();
  const [avatarFile, setAvatarFile] = useState(null);
  const [avatarPreview, setAvatarPreview] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef(null);

  useEffect(() => {
    if (formData.profilePic) {
      setAvatarPreview(formData.profilePic);
    }
  }, [formData.profilePic]);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (!file.type.match('image.*')) {
      toast.error('Please select an image file');
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      toast.error('File size should be less than 5MB');
      return;
    }

    setAvatarFile(file);
    const reader = new FileReader();
    reader.onloadend = () => setAvatarPreview(reader.result);
    reader.readAsDataURL(file);
  };

  const handleAvatarUpload = async () => {
    if (!avatarFile) {
      toast.error('Please select a file first');
      return;
    }

    setIsUploading(true);
    const formData = new FormData();
    formData.append('avatar', avatarFile);

    try {
      // Optimistic update
      const tempUrl = avatarPreview;
      setAuthUser({ ...authUser, profilePic: tempUrl });

      const res = await fetch(`${SERVER_URL}/api/users/update-avatar`, {
        method: 'PUT',
        credentials: 'include',
        body: formData,
      });

      const result = await res.json();
      if (!res.ok) throw new Error(result.message);

      toast.success('Avatar updated successfully!');
      setAvatarPreview(result.profilePic);
      setAvatarFile(null);
      if (fileInputRef.current) fileInputRef.current.value = '';

      // Update context with actual server response
      setAuthUser({
        ...authUser,
        profilePic: result.profilePic,
      });
    } catch (err) {
      // Rollback on error
      setAuthUser(authUser);
      toast.error(err.message || 'Avatar upload failed');
    } finally {
      setIsUploading(false);
    }
  };

  const removeAvatar = () => {
    setAvatarFile(null);
    setAvatarPreview(formData.profilePic || null);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-gray-900/70 backdrop-blur-lg rounded-2xl p-8 border border-gray-700/30 shadow-xl max-w-2xl w-full"
    >
      <h1 className="text-2xl font-bold mb-8 text-white">Edit Profile</h1>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="flex flex-col space-y-4">
          <label className="text-sm font-medium text-white">
            Profile Picture
          </label>

          <div className="flex items-center gap-6">
            {/* Avatar Preview */}
            <div className="relative">
              {avatarPreview ? (
                <>
                  <img
                    src={avatarPreview}
                    alt="Profile preview"
                    className="w-20 h-20 rounded-full object-cover border-2 border-blue-500"
                  />
                  {(avatarFile || !formData.profilePic) && (
                    <button
                      type="button"
                      onClick={removeAvatar}
                      className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 transition-colors"
                    >
                      <FiX size={14} />
                    </button>
                  )}
                </>
              ) : (
                <div className="w-20 h-20 rounded-full bg-gray-700 flex items-center justify-center border-2 border-dashed border-gray-600">
                  <FiUser size={24} className="text-gray-400" />
                </div>
              )}
            </div>

            {/* Upload Controls */}
            <div className="flex-1 space-y-3">
              <div className="flex items-center gap-3">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  ref={fileInputRef}
                  className="hidden"
                  id="avatar-upload"
                />
                <motion.label
                  htmlFor="avatar-upload"
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  className="px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-lg cursor-pointer flex items-center gap-2 transition-colors"
                >
                  <FiUpload size={16} />
                  {avatarPreview ? 'Change Image' : 'Choose Image'}
                </motion.label>

                {avatarFile && (
                  <motion.button
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    type="button"
                    onClick={handleAvatarUpload}
                    disabled={isUploading}
                    className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  >
                    {isUploading ? (
                      <ImSpinner2 className="animate-spin w-4 h-4" />
                    ) : (
                      <FiUpload size={16} />
                    )}
                    {isUploading ? 'Uploading...' : 'Upload'}
                  </motion.button>
                )}
              </div>

              <p className="text-xs text-gray-400">JPG, PNG or GIF (Max 5MB)</p>
            </div>
          </div>
        </div>

        {/* Rest of the form remains the same */}
        <Input
          label="Full Name"
          name="fullName"
          value={formData.fullName}
          onChange={handleChange}
        />
        <Input
          label="Email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          icon={<FiMail className="text-gray-400" />}
        />
        <Input
          label="Bio"
          name="bio"
          value={formData.bio}
          onChange={handleChange}
          textarea
        />
        <Input
          label="Portfolio"
          name="portfolio"
          value={formData.portfolio}
          onChange={handleChange}
          icon={<FiLink2 className="text-gray-400" />}
        />

        <div className="pt-4">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            type="submit"
            disabled={loading}
            className="w-full px-8 py-3 bg-gradient-to-r from-teal-500 to-blue-600 hover:from-teal-600 hover:to-blue-700 text-white rounded-xl flex items-center justify-center gap-3 text-base font-semibold shadow-md transition-all"
          >
            {loading ? (
              <ImSpinner2 className="animate-spin w-5 h-5" />
            ) : (
              <FiSave className="w-5 h-5" />
            )}
            Save Changes
          </motion.button>
        </div>
      </form>
    </motion.div>
  );
};

export default EditProfile;
