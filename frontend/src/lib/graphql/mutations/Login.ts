import { gql, type TypedDocumentNode } from '@apollo/client';
import type { LoginInput, LoginMutationData } from '../../../types';

export const LOGIN: TypedDocumentNode<LoginMutationData, { data: LoginInput }> =
  gql`
    mutation Login($data: LoginInput!) {
      login(data: $data) {
        token
        refreshToken
        user {
          id
          name
          email
          createdAt
          updatedAt
        }
      }
    }
  `;
