import { gql, type TypedDocumentNode } from '@apollo/client';
import type { Transaction, TransactionsMany } from '../../../types';

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

export const LIST_RECENT_TRANSACTIONS: TypedDocumentNode<{
  getRecentTransactionsByUserId: TransactionsMany;
}> = gql`
  query GetRecentTransactionsByUserId {
    getRecentTransactionsByUserId {
      totalInflow
      totalOutflow
      balance
      transactions {
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
  }
`;
