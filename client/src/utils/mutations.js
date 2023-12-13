import { gql } from '@apollo/client';

//updtes in data client can do which were defined in typeDefs client
//gets email and password to login user, token for auth
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

//creates user, token for auth
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

//Context user info to create post, post creation
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

//context to check if user can update post, update post
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

//deletes post
export const DELETE_POST = gql`
  mutation removePost($postId: ID!) {
    removePost(postId: $postId) {
      _id
      title
      content
      
    }
  }
`;