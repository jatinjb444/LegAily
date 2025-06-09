// legaily_backend/server.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const authRoutes = require('./routes/authRoutes');

const app = express();
app.use(cors());
app.use(express.json());

// Root route for sanity check
app.get('/', (req, res) => {
  res.send('✅ Backend server is running');
});

// Routes
app.use('/api/auth', authRoutes);

const PORT = 5001;

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => {
    console.log("✅ MongoDB connected");
  })
  .catch(err => {
    console.error('❌ MongoDB connection error:', err);
  });

// Add this to log the database name once connection opens
mongoose.connection.once('open', () => {
  console.log('✅ MongoDB connection is open to database:', mongoose.connection.name);
});

app.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`));
