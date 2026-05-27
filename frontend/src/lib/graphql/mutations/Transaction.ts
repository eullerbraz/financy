import { gql } from '@apollo/client';

export const CREATE_TRANSACTION = gql`
  mutation CreateTransaction($data: CreateTransactionInput!) {
    createTransaction(data: $data) {
      id
      description
      date
      amount
      type
      categoryId
      category {
        name
        description
        color
        icon
      }
      userId
    }
  }
`;

export const UPDATE_TRANSACTION = gql`
  mutation UpdateTransactionById(
    $updateTransactionByIdId: String!
    $data: UpdateTransactionInput!
  ) {
    updateTransactionById(id: $updateTransactionByIdId, data: $data) {
      id
      description
      date
      amount
      type
      categoryId
      category {
        name
        description
        color
        icon
      }
      userId
    }
  }
`;
