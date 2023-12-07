const db = require('../config/connection');
const { Profile } = require('../models');
const userseeds = require('./userSeeds.json');
const cleanDB = require('./cleanDB');

db.once('open', async () => {
  try {
    await cleanDB('User', 'Post');
    
    await Profile.create(userseeds);

    console.log('all done!');
    process.exit(0);
  } catch (err) {
    throw err;
  }
});