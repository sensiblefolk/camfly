import { gql } from 'graphql-request';

export const ADD_NEW_USER = gql`
  mutation addNewUser(
    $uid: String!
    $email: String!
    $first_name: String!
    $last_name: String!
    $avatar: String!
  ) {
    insert_users(
      objects: {
        id: $uid
        email: $email
        first_name: $first_name
        last_name: $last_name
        avatar: $avatar
      }
    ) {
      affected_rows
    }
  }
`;
