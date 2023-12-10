import { gql } from '@apollo/client';

export const GET_USER = gql`
  query GetUser {
    getUserById {
      _id
      username
      email
      posts {
        _id
        title
        content
      }
    }
  }
`;

export const GET_ALL_USERS = gql`
  query GetAllUsers {
    getAllUsers {
      _id
      username
      email
      posts {
        _id
        title
        content
      }
    }
  }
`;

export const GET_POST = gql`
  query GetPost {
    getPostById {
      _id
      title
      content
      username {
        _id
        username
      }
    }
  }
`;

export const GET_ALL_POSTS = gql`
  query GetAllPosts {
    getAllPosts {
      _id
      title
      content
      username {
        _id
        username
      }
    }
  }
`;