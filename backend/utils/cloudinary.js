const cloudinary = require('cloudinary').v2;

// cloudinary.config({
//   cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
//   api_key: process.env.CLOUDINARY_API_KEY,
//   api_secret: process.env.CLOUDINARY_API_SECRET,
// });

cloudinary.config({
  cloud_name: 'djzlld9cb',
  api_key: '324143539475724',
  api_secret: '_HuUH9N69tUtjsOzd1hgfU3AMo0',
});
module.exports = cloudinary;
