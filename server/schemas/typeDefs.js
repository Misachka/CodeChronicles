const { gql } = require('apollo-server');

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


  type Query {
      getUserById(userId: ID!): User
      getAllUsers: [User]
      getPostById(postId: ID!): Post
      getAllPosts: [Post]
      getUserPosts: [Post]
  }
    

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
