// backend/socket/socket.js
const { Server } = require('socket.io');
const http = require('http');
const express = require('express');
const { isValidObjectId } = require('mongoose');
const Message = require('../models/message.model');
const Conversation = require('../models/conversation.model');
const app = express();
const server = http.createServer(app);
const BASE_PATH = '/socket';

const allowedOrigins =
  process.env.NODE_ENV === 'production'
    ? ['https://codxor.itkhaver.com', 'https://cxcp.itkhaver.com']
    : [
        'https://codxor.itkhaver.com',
        'https://cxcp.itkhaver.com',
        'http://localhost:3000',
        'http://localhost:5173',
      ];

const io = new Server(server, {
  path: BASE_PATH,
  cors: {
    origin: allowedOrigins,
    methods: ['GET', 'POST', 'PUT'],
    credentials: true,
  },
});

const userSocketMap = {};

const getReceiverSocketId = (receiverId) => userSocketMap[receiverId];

io.use((socket, next) => {
  const userId = socket.handshake.query.userId;
  if (!userId || !isValidObjectId(userId)) {
    return next(new Error('Authentication error: Invalid userId'));
  }
  socket.userId = userId;
  next();
});

io.on('connection', (socket) => {
  const userId = socket.userId;
  userSocketMap[userId] = socket.id;
  console.log(`New socket connected: ${socket.id} for user ${userId}`);

  io.emit('getOnlineUsers', Object.keys(userSocketMap));

  socket.on('sendMessage', async ({ conversationId, receiverId, text }) => {
    try {
      if (
        !isValidObjectId(conversationId) ||
        !isValidObjectId(receiverId) ||
        !text
      ) {
        socket.emit('messageError', { error: 'Invalid message data' });
        return;
      }

      // Verify user is part of the conversation
      const conversation = await Conversation.findById(conversationId);
      if (!conversation || !conversation.participants.includes(userId)) {
        socket.emit('messageError', {
          error: 'Unauthorized: User not in conversation',
        });
        return;
      }

      // Save message to database
      const message = await Message.create({
        conversationId,
        senderId: userId,
        receiverId,
        text,
        seen: false,
        createdAt: new Date(),
      });

      // Update conversation's lastMessage
      await Conversation.findByIdAndUpdate(conversationId, {
        lastMessage: {
          text,
          seen: false,
          createdAt: message.createdAt,
        },
      });

      // Emit to sender
      socket.emit('newMessage', message);

      // Emit to receiver if online
      const receiverSocketId = getReceiverSocketId(receiverId);
      if (receiverSocketId) {
        io.to(receiverSocketId).emit('newMessage', message);
      }

      console.log(`Message sent: ${text} to conversation ${conversationId}`);
    } catch (error) {
      console.error('Send message error:', error);
      socket.emit('messageError', { error: 'Failed to send message' });
    }
  });

  socket.on('markAsSeen', async ({ conversationId }) => {
    try {
      if (!isValidObjectId(conversationId)) {
        socket.emit('messageError', { error: 'Invalid conversation ID' });
        return;
      }

      // Verify user is part of the conversation
      const conversation = await Conversation.findById(conversationId);
      if (!conversation || !conversation.participants.includes(userId)) {
        socket.emit('messageError', {
          error: 'Unauthorized: User not in conversation',
        });
        return;
      }

      // Update unseen messages to seen
      await Message.updateMany(
        { conversationId, seen: false, senderId: { $ne: userId } },
        { seen: true },
      );

      // Update conversation's lastMessage
      await Conversation.findByIdAndUpdate(conversationId, {
        'lastMessage.seen': true,
      });

      // Notify all conversation participants
      conversation.participants.forEach((participantId) => {
        if (participantId.toString() !== userId) {
          const participantSocketId = getReceiverSocketId(participantId);
          if (participantSocketId) {
            io.to(participantSocketId).emit('messageSeen', { conversationId });
          }
        }
      });
    } catch (error) {
      console.error('Mark as seen error:', error);
      socket.emit('messageError', { error: 'Failed to mark messages as seen' });
    }
  });

  socket.on('disconnect', () => {
    console.log(`Socket disconnected: ${socket.id}`);
    delete userSocketMap[userId];
    io.emit('getOnlineUsers', Object.keys(userSocketMap));
  });
});

io.on('error', (error) => {
  console.error('Socket.IO error:', error);
});

module.exports = { app, server, io, getReceiverSocketId };
