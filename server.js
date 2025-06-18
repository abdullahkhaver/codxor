// const path = require('path');
const express = require('express');
const dotenv = require('dotenv');
const cookieParser = require('cookie-parser');

const authRoutes = require('./routes/auth.routes');
const messageRoutes = require('./routes/message.routes');
const userRoutes = require('./routes/user.routes');

const connectToMongoDB = require('./db/connectToMongoDB');
const { app, server } = require('./socket/socket');
dotenv.config();

// const __dirname = path.resolve();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(cookieParser());

app.use('/api/auth', authRoutes);
app.use('/api/messages', messageRoutes);
app.use('/api/users', userRoutes);

// app.use(express.static(path.join(__dirname, '/frontend/dist')));

// app.get('*', (req, res) => {
//   res.sendFile(path.join(__dirname, 'frontend', 'dist', 'index.html'));
// });

connectToMongoDB()
.then(()=>{
  server.listen(PORT, () => {
    console.log(`Server Running on port ${PORT}`);
  });
}).catch((error)=>{
  console.log(`Failed TO Start Server Due To MONGODB CONNECTION ERROR: `,error)
})
