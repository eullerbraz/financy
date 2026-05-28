import { gql, type TypedDocumentNode } from '@apollo/client';
import type { CategoriesMetrics, Category } from '../../../types';

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
      transactionsAmount
      createdAt
      updatedAt
    }
  }
`;

export const CATEGORIES_METRICS: TypedDocumentNode<{
  getCategoriesMetricsByUserId: CategoriesMetrics;
}> = gql`
  query GetCategoriesMetricsByUserId {
    getCategoriesMetricsByUserId {
      countCategories
      countTransactions
      mostUsedCategory {
        id
        description
        name
        color
        icon
      }
    }
  }
`;
