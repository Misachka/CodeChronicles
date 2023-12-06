const { gql } = require('apollo-server');

const typeDefs = gql `
  type User {
    _id: ID
    username: String
    email: String
    password: String
    posts: [Post]!
  }

  type Post {
    _id: ID
    title: String
    content: String
    user: User
  }

  type Auth {
    token: ID!
    user: User
  }

  type Query {
    users: [User]!
    user(userId: ID!): User
    posts: [Post]!
    post(postId: ID!): Post
  }

  type Mutation {
    addUser(username: String!, email: String!, password: String!): Auth
    login(email: String!, password: String!): Auth

    addPost(userId: ID!, title: String!, content: String!): Post
    removeUser(userId: ID!): User
    removePost(postId: ID!): Post
  }
`;

module.exports = typeDefs;
