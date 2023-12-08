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
    $summary: String!
    $content: String!
    $file: Upload
  ) {
    createPost(
      title: $title
      summary: $summary
      content: $content
      file: $file
    ) {
      _id
      
    }
  }
`;

export const DELETE_POST = gql`
  mutation deletePost($postId: ID!) {
    deletePost(postId: $postId) {
      _id
      title
      summary
      content
      file
    }
  }
`;