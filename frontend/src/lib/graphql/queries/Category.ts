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

export const GET_CATEGORY: TypedDocumentNode<
  {
    getCategoryById: Category;
  },
  { categoryId: string }
> = gql`
  query GetCategoryById($categoryId: String!) {
    getCategoryById(id: $categoryId) {
      id
      name
      description
      color
      icon
      createdAt
      updatedAt
    }
  }
`;
