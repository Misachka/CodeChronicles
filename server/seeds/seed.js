const mongoose = require('mongoose');
const User = require('../models/User');
const Post = require('../models/Post');

// Connect to MongoDB database
mongoose.connect(process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/codechronicles', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Sample data for users

// Function to seed users
const seedUsers = async () => {
  try {
    await User.deleteMany(); // Remove existing users
  
  } catch (error) {
    console.error('Error seeding users:', error);
  }
};

// Function to seed posts
const seedPosts = async () => {
  try {
    await Post.deleteMany(); // Remove existing posts
   
  } catch (error) {
    console.error('Error seeding posts:', error);
  }
};

// Seed data
seedUsers()
  .then(() => seedPosts())
  .then(() => {
    console.log('Seed data inserted successfully');
    mongoose.connection.close(); // Close the database connection after seeding
  })
  .catch((error) => console.error('Error seeding data:', error));


