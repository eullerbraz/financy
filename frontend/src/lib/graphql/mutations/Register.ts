import { gql, type TypedDocumentNode } from '@apollo/client';
import type { RegisterInput, RegisterMutationData } from '../../../types';

export const REGISTER: TypedDocumentNode<
  RegisterMutationData,
  { data: RegisterInput }
> = gql`
  mutation Register($data: RegisterInput!) {
    register(data: $data) {
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
