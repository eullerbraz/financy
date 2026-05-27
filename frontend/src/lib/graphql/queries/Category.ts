import { gql, type TypedDocumentNode } from '@apollo/client';
import type { Category } from '../../../types';

export const LIST_CATEGORIES: TypedDocumentNode<{
  getAllCategoriesByUserId: Category[];
}> = gql`
  query GetAllCategoriesByUserId {
    getAllCategoriesByUserId {
      id
      name
      description
      color
      icon
      countTransactions
      createdAt
      updatedAt
    }
  }
`;
