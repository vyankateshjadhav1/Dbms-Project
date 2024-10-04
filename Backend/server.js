const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const cors = require('cors');

// Routes
const applicationRoutes = require('./routes/applicationRoutes');
const clubRoutes = require('./routes/clubRoutes');
const domainRoutes = require('./routes/domainRoutes');
const skillRoutes = require('./routes/skillRoutes');
const userRoutes = require('./routes/userRoutes');

dotenv.config();

connectDB();

const app = express();

// Middleware to parse JSON data
app.use(express.json());
app.use(cors());
app.use('/api/clubs', clubRoutes);
app.use('/api/applications', applicationRoutes);
app.use('/api/domains', domainRoutes);
app.use('/api/skills', skillRoutes);
app.use('/api/users', userRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
