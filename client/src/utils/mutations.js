import { gql } from '@apollo/client';

export const LOGIN = gql`
  mutation login(
    $email: String!, 
    $password: String!) 
    {
    login(
        email: $email, 
        password: $password) {
      token
      user {
        _id
      }
    }
  }
`;

export const ADD_USER  = gql`
  mutation addUser(
    $username: String!
    $email: String!
    $password: String!
  ) {
    addUser(
      username: $username
      email: $email
      password: $password
    ) {
      token
      user {
        _id
      }
    }
  }
`;

export const CREATE_POST = gql`
  mutation createPost(
    $title: String!
    $userId: ID!  
    $content: String!
  ) {
    createPost(
      title: $title
      userId: $userId  
      content: $content
    ) {
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

export const DELETE_POST = gql`
  mutation deletePost($postId: ID!) {
    deletePost(postId: $postId) {
      _id
      title
      content
      
    }
  }
`;