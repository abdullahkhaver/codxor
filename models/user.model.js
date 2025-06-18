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
    profilePic: {
      type: String,
      default: '',
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
  },
  { timestamps: true },
);

const User = mongoose.model('User', userSchema);

module.exports = User;
