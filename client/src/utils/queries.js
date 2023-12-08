import { gql } from '@apollo/client';

export const QUERY_USER = gql`
  query user($username: String!) {
    user(username: $username) {
      _id
      username
      email
    }
  }
`;
import { gql } from '@apollo/client';

export const QUERY_POST = gql`
  query getPost($postId: ID!) {
    post(postId: $postId) {
      _id
      title
      body
      createdAt
      username
      commentCount
      comments {
        _id
        createdAt
        username
        body
      }
    }
  }
`;

export const QUERY_ALL_POSTS = gql`
  query getAllPosts {
    posts {
      _id
      title
      body
      createdAt
      username
      commentCount
      comments {
        _id
        createdAt
        username
        body
      }
    }
  }
`;
