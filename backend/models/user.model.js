const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: true,
    },
    username: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      minlength: 6,
    },
    gender: {
      type: String,
      required: true,
      enum: ['male', 'female'],
    },
    role: { type: String, enum: ['user', 'admin'], default: 'user' },
    profilePic: {
      type: String,
      default:
        'https://t3.ftcdn.net/jpg/05/61/46/90/360_F_561469055_MIvaD68qP2Y66hfVAa4tX6XskuJQe3nG.jpg',
    },
    email: {
      type: String,
      default: '',
    },
    bio: {
      type: String,
      default: '',
    },
    portfolio: {
      type: String,
      default: '',
    },
    socials: {
      type: Map,
      of: String,
      default: () => ({
        twitter: '',
        linkedin: '',
        instagram: '',
        github: '',
      }),
    },
    banned: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true },
);

const User = mongoose.model('User', userSchema);

module.exports = User;
