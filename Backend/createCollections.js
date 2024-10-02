// createCollections.js
const mongoose = require('mongoose');
const dotenv = require('dotenv');

// Import your existing models
const User = require('./models/User');
const Club = require('./models/Club');
const Event = require('./models/Event');
const Membership = require('./models/Membership');

dotenv.config();

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('MongoDB connected');

    // Create a test User and retrieve its ObjectId
    const adminUser = await User.create({ 
      name: 'Admin', 
      email: 'admin@example.com', 
      password: 'password', 
      role: 'supervisor' 
    });

    // Use the ObjectId from the created user for supervisor_id
    const adminUserId = adminUser._id;

    // Create a Club with the supervisor_id
    const chessClub = await Club.create({ 
      name: 'Chess Club', 
      description: 'A club for chess enthusiasts.', 
      image_url: 'chess_club.png', 
      supervisor_id: adminUserId // Use the ObjectId here
    });

    // Create an Event linked to the club
    const chessEvent = await Event.create({ 
      club_id: chessClub._id, // Use the ObjectId of the created club
      title: 'Chess Tournament', 
      description: 'An annual chess tournament.', 
      date: new Date(), 
      location: 'Main Hall' 
    });

    // Create a Membership linked to the club and user
    await Membership.create({ 
      club_id: chessClub._id, 
      student_id: adminUser._id, // Assuming you want to link to the admin as a student
      status: 'member' 
    });

    console.log('Collections created and test documents added.');
    mongoose.connection.close(); // Close connection after operation
  } catch (error) {
    console.error('Error creating collections:', error.message);
    mongoose.connection.close();
  }
};

connectDB();
