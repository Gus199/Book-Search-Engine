import { gql } from '@apollo/client';

export const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
        token
        user {
          _id
          username
          email
          bookCount
          savedBooks {
            bookId
            title
            description
            authors
            image
            link
          }
        }
      }
    }
`;

export const ADD_USER = gql`
  mutation addUser($email: String!, $username: String!, $password: String!) {
    addUser(email: $email, username: $username, password: $password) {
        token
        user {
          _id
          username
          email
        }
      }
    }
`;

export const SAVE_BOOK = gql`
  mutation saveBook($input: BookInput!) {
    saveBook(input: $input) {
        token
        user {
          _id
          username
          email
          bookCount
          savedBooks {
            bookId
            authors
            title
            description
            image
            link
          }
        }
      }
    }
`;

export const REMOVE_BOOK = gql`
  mutation removeBook($bookId: String!) {
    removeBook(bookId: $bookId) {
        token
        user {
          _id
          username
          email
          bookCount
          savedBooks {
            bookId
            authors
            title
            description
            image
            link
          }
        }
      }
    }
`;