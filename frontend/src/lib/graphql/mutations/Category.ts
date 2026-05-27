import { gql } from '@apollo/client';

export const CREATE_CATEGORY = gql`
  mutation CreateCategory($data: CreateCategoryInput!) {
    createCategory(data: $data) {
      id
      name
      description
      color
      icon
    }
  }
`;

export const UPDATE_CATEGORY = gql`
  mutation UpdateCategoryById(
    $updateCategoryByIdId: String!
    $data: UpdateCategoryInput!
  ) {
    updateCategoryById(id: $updateCategoryByIdId, data: $data) {
      id
      name
      description
      color
      icon
    }
  }
`;

export const DELETE_CATEGORY = gql`
  mutation DeleteCategoryById($deleteCategoryByIdId: String!) {
    deleteCategoryById(id: $deleteCategoryByIdId)
  }
`;
