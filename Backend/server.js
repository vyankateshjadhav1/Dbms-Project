const express = require('express');
const connectDB = require('./config/db');
const cors = require('cors');
const dotenv = require('dotenv');
const userRoutes = require('./routes/users');
const clubRoutes = require('./routes/clubs');
const eventRoutes = require('./routes/events');
const membershipRoutes = require('./routes/memberships');

dotenv.config();

const app = express();
connectDB();

app.use(express.json());

// Use the routes
app.use('/api/users', userRoutes);
app.use('/api/clubs', clubRoutes);
app.use('/api/events', eventRoutes);
app.use('/api/memberships', membershipRoutes);

app.get('/', (req, res) => res.send('API Running'));

const PORT = process.env.PORT || 5000;  
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
