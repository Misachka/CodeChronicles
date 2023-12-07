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

export const QUERY_POST = gql`
query getPost() {
  post {
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
 {
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