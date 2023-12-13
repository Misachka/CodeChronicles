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
  mutation addPost(
    $title: String!
    $content: String!
  ) {
    addPost(
      title: $title
     
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

export const UPDATE_POST = gql`
  mutation updatePost(
    $id: ID!, 
    $title: String!, 
    $content: String!
    ) {
    updatePost(id: $id, title: $title, content: $content) {
      _id
      title
      content
    }
  }
`;

export const DELETE_POST = gql`
  mutation removePost($postId: ID!) {
    removePost(postId: $postId) {
      _id
      title
      content
      
    }
  }
`;