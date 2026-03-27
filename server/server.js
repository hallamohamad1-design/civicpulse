const express = require('express');
const http = require('http');
const cors = require('cors');
const { Server } = require('socket.io');
const cron = require('node-cron');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: 'http://localhost:5173', // Vite default port
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
  },
});

app.use(cors());
app.use(express.json());

const db = require('./db');
const authRoutes = require('./routes/authRoutes');
const issueRoutes = require('./routes/issueRoutes');

// Attach socket.io to app so controllers can use it
app.set('io', io);

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/issues', issueRoutes);

// WebSocket Setup
io.on('connection', (socket) => {
  console.log(`User connected: ${socket.id}`);

  socket.on('join_room', (issueId) => {
    socket.join(issueId);
    console.log(`User mapped to issue tracking room: ${issueId}`);
  });

  socket.on('disconnect', () => {
    console.log(`User disconnected: ${socket.id}`);
  });
});

// Priority Calculation Background Job
// Priority = (Upvotes × 2) + (Severity × 10) − (Days_Open × 0.5)
cron.schedule('0 */6 * * *', () => {
  console.log('Running background scheduler: Recalculating Priority Scores (Every 6 hours)');
  // In a real app, update DB priority_score for all PENDING, ACKNOWLEDGED, IN_PROGRESS issues here.
});

// Placeholder Routes
app.get('/api/health', (req, res) => {
  res.status(200).json({ status: 'ok', message: 'CivicPulse API is running' });
});

const PORT = process.env.PORT || 5000;

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
