import { apolloClient } from '@/lib/graphql/apollo';
import { REGISTER } from '@/lib/graphql/mutations/Register';
import type {
  LoginInput,
  LoginMutationData,
  RegisterInput,
  RegisterMutationData,
  User,
} from '@/types';
import type { ApolloClient } from '@apollo/client';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { LOGIN } from '../lib/graphql/mutations/Login';

interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  signup: (data: RegisterInput) => Promise<boolean>;
  login: (data: LoginInput) => Promise<boolean>;
  logout: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      token: null,
      isAuthenticated: false,
      login: async (loginData: LoginInput) => {
        try {
          const options: ApolloClient.MutateOptions<
            LoginMutationData,
            { data: LoginInput }
          > = {
            mutation: LOGIN,
            variables: {
              data: {
                email: loginData.email,
                password: loginData.password,
              },
            },
          };

          const { data } = await apolloClient.mutate<
            LoginMutationData,
            { data: LoginInput }
          >(options);

          if (data?.login) {
            const { user, token } = data.login;

            set({
              user: {
                id: user.id,
                name: user.name,
                email: user.email,
                createdAt: user.createdAt,
                updatedAt: user.updatedAt,
              },
              token,
              isAuthenticated: true,
            });

            return true;
          }

          return false;
        } catch (error) {
          console.log('Erro ao fazer o login');
          throw error;
        }
      },
      signup: async (registerData: RegisterInput) => {
        try {
          const options: ApolloClient.MutateOptions<
            RegisterMutationData,
            { data: RegisterInput }
          > = {
            mutation: REGISTER,
            variables: {
              data: {
                name: registerData.name,
                email: registerData.email,
                password: registerData.password,
              },
            },
          };

          const { data } = await apolloClient.mutate(options);

          if (data?.register) {
            const { token, user } = data.register;

            set({
              user: {
                id: user.id,
                name: user.name,
                email: user.email,
                createdAt: user.createdAt,
                updatedAt: user.updatedAt,
              },
              token,
              isAuthenticated: true,
            });

            return true;
          }

          return false;
        } catch (error) {
          console.log('Erro ao fazer o cadastro');
          throw error;
        }
      },
      logout: () => {
        set({
          user: null,
          token: null,
          isAuthenticated: false,
        });

        apolloClient.clearStore();
      },
    }),
    {
      name: 'auth-storage',
    },
  ),
);
