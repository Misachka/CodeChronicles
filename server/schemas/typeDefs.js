const { gql } = require('apollo-server');

//Structures what client can get and do with data
// Define GraphQL types for User, Post, and Auth
const typeDefs = gql`
  type User {
    _id: ID
    username: String
    email: String
    posts: [Post]
  }

  type Post {
    _id: ID
    title: String
    content: String
    username: User
  }

  type Auth {
    token: ID!
    user: User
  }

  #GraphQL queries for retrieving data
  type Query {
      getUserById(userId: ID!): User
      getAllUsers: [User]
      getPostById(postId: ID!): Post
      getAllPosts: [Post]
      getUserPosts: [Post]
  }
    
  #GraphQL mutations for creating, updating, and removing data
  type Mutation {
    addUser(username: String!, email: String!, password: String!): Auth
    login(email: String!, password: String!): Auth

    addPost(title: String!, content: String!): Post
    updatePost(id: ID!, title: String!, content: String!): Post
    removeUser(userId: ID!): User
    removePost(postId: ID!): Post
  }
`;

module.exports = typeDefs;
