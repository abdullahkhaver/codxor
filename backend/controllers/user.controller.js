const User = require('../models/user.model');

const getUsersForSidebar = async (req, res) => {
  try {
    const loggedInUserId = req.user._id;
    const filteredUsers = await User.find({
      _id: { $ne: loggedInUserId },
    }).select('-password');
    res.status(200).json(filteredUsers);
  } catch (error) {
    console.error('Error in getUsersForSidebar:', error.message);
    res.status(500).json({ error: 'Internal server error' });
  }
};

const getUserByUsername = async (req, res) => {
  try {
    const { username } = req.params;
    const user = await User.findOne({ username }).select(
      'username fullName profilePic gender createdAt email bio portfolio socials role',
    );
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.status(200).json(user);
  } catch (error) {
    console.error('Error fetching user by username:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

const updateUserProfile = async (req, res) => {
  try {
    const userId = req.user._id;
    const { email, bio, portfolio, socials, fullName } = req.body;

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { $set: { fullName, email, bio, portfolio, socials } },
      { new: true, runValidators: true },
    ).select('-password');

    // Emit profile update event
    const io = req.app.get('io');
    io.emit('profileUpdated', {
      userId: updatedUser._id,
      updatedFields: {
        fullName: updatedUser.fullName,
        email: updatedUser.email,
        bio: updatedUser.bio,
        portfolio: updatedUser.portfolio,
        socials: updatedUser.socials,
        profilePic: updatedUser.profilePic,
      },
    });

    res.status(200).json(updatedUser);
  } catch (error) {
    console.error('Error updating profile:', error);
    res.status(500).json({ message: 'Failed to update profile' });
  }
};

const updateUserAvatar = async (req, res) => {
  try {
    const userId = req.user._id;
    const imageUrl = req.file?.path;

    if (!imageUrl)
      return res.status(400).json({ message: 'No image uploaded' });

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { profilePic: imageUrl },
      { new: true },
    ).select('-password');

    // Emit avatar update event
    const io = req.app.get('io');
    io.emit('profileUpdated', {
      userId: updatedUser._id,
      updatedFields: { profilePic: updatedUser.profilePic },
    });

    res.status(200).json(updatedUser);
  } catch (error) {
    console.error('Error updating avatar:', error);
    res.status(500).json({ message: 'Failed to update avatar' });
  }
};

module.exports = {
  getUsersForSidebar,
  getUserByUsername,
  updateUserProfile,
  updateUserAvatar,
};
