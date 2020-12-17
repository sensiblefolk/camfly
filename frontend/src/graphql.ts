import { gql } from '@apollo/client';

export const LOAD_USER = gql`
  query USER {
    userPrivate {
      address
      dateofbirth
      country
      currency
      email
      first_name
      id
      last_name
      phone
      gender
      nextofkin,
      occupation,
      state
    }
  }
`;