import { gql, type TypedDocumentNode } from '@apollo/client';
import type { Transaction } from '../../../types';

export const LIST_TRANSACTIONS: TypedDocumentNode<{
  getAllTransactionsByUserId: Transaction[];
}> = gql`
  query GetAllTransactionsByUserId {
    getAllTransactionsByUserId {
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
      createdAt
      updatedAt
    }
  }
`;
