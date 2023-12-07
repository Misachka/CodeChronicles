const db = require('../config/connection');
const { User, Post } = require('../models'); // Import both User and Post models
const userSeeds = require('./userSeeds.json');
const postSeeds = require('./postSeeds.json'); // Import post seeds
const cleanDB = require('./cleanDB');

db.once('open', async () => {
  try {
    await cleanDB('User', 'Post');

    // Insert users from userSeeds.json into the User collection
    await User.insertMany(userSeeds);

    // Insert posts from postSeeds.json into the Post collection
    await Post.insertMany(postSeeds);

    console.log('All done!');
    process.exit(0);
  } catch (err) {
    console.error('Error:', err);
    process.exit(1);
  }
});



