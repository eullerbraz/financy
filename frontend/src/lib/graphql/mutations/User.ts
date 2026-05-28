import { gql } from '@apollo/client';

export const UPDATE_USER = gql`
  mutation UpdateUserById($data: UpdateUserInput!) {
    updateUserById(data: $data) {
      id
      name
      email
      password
    }
  }
`;
