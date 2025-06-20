const { Server } = require('socket.io');
const http = require('http');
const express = require('express');

const app = express();
const server = http.createServer(app);
const BASE_PATH = '/socket';

app.use((req, res, next) => {
  if (req.url.startsWith(BASE_PATH)) {
    req.url = req.url.replace(BASE_PATH, '') || '/';
  }
  next();
});

const io = new Server(server, {
  path: BASE_PATH,
  cors: {
    origin: ['https://codxor.itkhaver.com'],
    // origin: ['http://localhost:3000'],
    methods: ['GET', 'POST', 'PUT'],
    credentials: true,
  },
});

const userSocketMap = {}; // { userId: socketId }

const getReceiverSocketId = (receiverId) => {
  return userSocketMap[receiverId];
};

io.on('connection', (socket) => {
  console.log(' New socket connected:', socket.id);

  const userId = socket.handshake.query.userId;
  if (userId && userId !== 'undefined') {
    userSocketMap[userId] = socket.id;
  }

  io.emit('getOnlineUsers', Object.keys(userSocketMap));

  socket.on('disconnect', () => {
    console.log(' Socket disconnected:', socket.id);
    delete userSocketMap[userId];
    io.emit('getOnlineUsers', Object.keys(userSocketMap));
  });
});

module.exports = { app, server, io, getReceiverSocketId };


// ===================


