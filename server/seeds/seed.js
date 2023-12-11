const mongoose = require('mongoose');
const User = require('../models/User');
const Post = require('../models/Post');

// Connect to MongoDB database
mongoose.connect(process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/codechronicles', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Sample data for users
const users = [
  { 
    _id:'657603ac1b7b5f3d806d1d48',
    username: 'powerCode', 
    email: 'valery@example.com', 
    password: 'password1',
    
  },

  { 
    _id:"657603ac1b7b5f3d806d1d49",
    username: 'curlyCodes', 
    email: 'nataly@example.com', 
    password: 'password1' 
  },

  { 
    _id:'657603ac1b7b5f3d806d1d50',
    username: 'coolDude', 
    email: 'vinny@example.com', 
    password: 'password1' 
  },

  { 
    _id:'657603ac1b7b5f3d806d1d51',
    username: 'yourNerdFriend', 
    email: 'daniel@example.com', 
    password: 'password1' 
  },

  { 
    _id:'657603ac1b7b5f3d806d1d53',
    username: 'miguelito', 
    email: 'miguel@example.com', 
    password: 'password1' 
  },
  
];

// Sample data for posts
const posts = [
  { 
    title: 'Authentication vs. Authorization', 
    content: 'There is a difference between authentication and authorization.Authentication means confirming your own identity, whereas authorization means being allowed access to the system', 
    username: '657603ac1b7b5f3d806d1d48'
  },

  { 
    title: 'GraphQL', 
    content: 'GraphQLs single greatest benefit is the developer experience it provides. It is straightforward to add new types and fields to your API, and similarly straightforward for your clients to begin using those fields. This helps you design, develop, and deploy features quickly.', 
    username: '657603ac1b7b5f3d806d1d49'
  },

  { 
    title: 'React', 
    content: 'React JS comprises the in-built functionality of virtual DOM, making the rendering faster and enhancing the overall user experience. In addition, it makes the application lightweight, leading to boost performance and productivity.', 
    username: '657603ac1b7b5f3d806d1d50'
  },

  { 
    title: 'React JS', 
    content: 'React JS provides the architecture and ecosystem to build business software based on components and reuse each component multiple times.',
    username: '657603ac1b7b5f3d806d1d51' 
  },

  { 
    title: 'Styling', 
    content: 'If you are not a fan of frontend development or just do not have enought time to design from scratch, consider using libraries like Bootstrap, Tailwind, or Chrakra. They are well documented and easy to use!',
    username: '657603ac1b7b5f3d806d1d52' 
  },

  
  
];

// Function to seed users
const seedUsers = async () => {
  try {
    await User.deleteMany(); // Remove existing users
    const createdUsers = await User.create(users);
    console.log('Users seeded:', createdUsers);
  } catch (error) {
    console.error('Error seeding users:', error);
  }
};

// Function to seed posts
const seedPosts = async () => {
  try {
    await Post.deleteMany(); // Remove existing posts
    const createdPosts = await Post.create(posts);
    console.log('Posts seeded:', createdPosts);
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


