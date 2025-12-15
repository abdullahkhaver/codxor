// /backend/server.js
const express = require('express');
const dotenv = require('dotenv');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const authRoutes = require('./routes/auth.routes');
const messageRoutes = require('./routes/message.routes');
const userRoutes = require('./routes/user.routes');
const connectToMongoDB = require('./db/connectToMongoDB');
const { app, server , io} = require('./socket/socket');
const adminRoutes = require('./routes/admin.route');
const conversationRoutes = require('./routes/conversation.routes');

const requestIp = require('request-ip');
dotenv.config();

const PORT = process.env.PORT || 5000;

const allowedOrigins = [
  'https://codxor.itkhaver.com',
  'https://cxcp.itkhaver.com',
  'http://localhost:3000',
  'http://localhost:5173',
];
app.use(
  cors({
    origin: allowedOrigins,
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
  }),
);
app.options(
  '*',
  cors({
    origin: allowedOrigins,
    credentials: true,
  }),
);

app.use(express.json());
app.use(cookieParser());
app.use(requestIp.mw());
app.set('io', io);


app.use('/api/auth', authRoutes);
app.use('/api/messages', messageRoutes);
app.use('/api/users', userRoutes);
app.use('/api/conversations', conversationRoutes);

// Admin API
app.use('/api/admin', adminRoutes);



app.get('/api/health', (req, res) => {
  res.status(200).json({ status: 'API is healthy' });
});


connectToMongoDB()
  .then(() => {
    server.listen(PORT, () => {
      console.log(
        ` Server running on https://api.codxor.itkhaver.com (PORT: ${PORT})`,
      );
    });
  })
  .catch((error) => {
    console.error(' MongoDB connection failed:', error);
    process.exit(1);
  });
