const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const cors = require('cors');
const color = require('colors');
const morgan = require('morgan');
const connectDB = require('./config/db');
const { createServer } = require('http');
const { Server } = require('socket.io');

dotenv.config();
connectDB();

const app = express();
const httpServer = createServer(app);

// Configure Socket.io
const io = new Server(httpServer, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"]
  }
});

// After creating the io instance
app.set('io', io); // Add this line

// Middleware
app.use(express.json());
app.use(morgan('dev'));
app.use(cors());

// Routes
app.use('/api/v1/auth', require('./routes/userRoute'));
app.use('/api/v1/userabout', require('./routes/userAboutRoute'));

// Socket.io connection handler
io.on('connection', (socket) => {
  console.log('A user connected:', socket.id);

  socket.on('joinUserRoom', (userId) => {
    socket.join(userId);
    console.log(`User ${userId} joined their room`);
  });

  socket.on('sendMessage', async ({ senderId, receiverId, message, matchId }) => {
    try {
      const Message = require('./models/messageModel');
      const newMessage = await Message.create({
        match: matchId,
        sender: senderId,
        receiver: receiverId,
        content: message,
        timestamp: new Date()
      });

      io.to(receiverId).emit('receiveMessage', newMessage);
      io.to(senderId).emit('receiveMessage', newMessage);
      
    } catch (error) {
      console.error('Error sending message:', error);
    }
  });

  socket.on('disconnect', () => {
    console.log('User disconnected:', socket.id);
  });
});

const PORT = process.env.PORT || 8080;
httpServer.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`.bgCyan.white.bold);
});