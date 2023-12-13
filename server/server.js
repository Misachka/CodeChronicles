//Import neccessary tools 
require('dotenv').config();
const express = require('express');
const { ApolloServer } = require('@apollo/server');
const { expressMiddleware } = require('@apollo/server/express4');
const path = require('path');
const { authMiddleware } = require('./utils/auth');
const cors = require('cors');
const { typeDefs, resolvers } = require('./schemas');
const db = require('./config/connection');

const PORT = process.env.PORT || 3001;
const app = express();

//Prevents CORS from blocking access to page
const corsOptions = {
  origin: ['http://localhost:3000', 'http://localhost:3001', 'https://codechronicles2.onrender.com'],
  credentials: true,
};

// Create an Apollo Server instance
const server = new ApolloServer({
  typeDefs,
  resolvers,
  cors: corsOptions,
});

// Use CORS middleware for the /graphql endpoint
app.use('/graphql', cors(corsOptions));
app.use(cors(corsOptions));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());


// Start the Apollo Server
const startApolloServer = async () => {
  await server.start();
  
  app.use('/graphql', expressMiddleware(server, { context: authMiddleware }));

  // If in production, serve static assets
  if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, '../client/dist')));
    app.get('*', (req, res) => {
      res.sendFile(path.join(__dirname, '../client/dist/index.html'));
    });
  }

  // Start the server
  db.once('open', () => {
    app.listen(PORT, () => {
      console.log(`API server running on port ${PORT}!`);
      console.log(`Use GraphQL at http://localhost:${PORT}/graphql`);
    });
  });
};

startApolloServer();
