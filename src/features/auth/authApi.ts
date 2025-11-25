import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { url } from '../../url';

// Login types
interface LoginRequest {
  username: string;
  password: string;
  
}

interface LoginResponse {
  access: string;
  refresh?: string;
  user:{
    id: number;
    username: string;
    phone_number: string;
    allowed_to_post: boolean;
    is_staff: boolean;
  }
}

// Register types
interface RegisterRequest {
  username: string;
  phone_number: string;
  password: string;
  
}

interface RegisterResponse {
  id: number;
  username: string;
  phone_number: string;
  
}

export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: fetchBaseQuery({ baseUrl: import.meta.env.VITE_API_BASE }),
  endpoints: (builder) => ({
    login: builder.mutation<LoginResponse, LoginRequest>({
      query: (credentials) => ({
        url: `${url}/api/auth/token/`,
        method: 'POST',
        body: credentials,
      }),
    }),
    register: builder.mutation<RegisterResponse, RegisterRequest>({
      query: (body) => ({
        url: `${url}/api/accounts/register/`,
        method: 'POST',
        body,
      }),
    }),
  }),
});

export const { useLoginMutation, useRegisterMutation } = authApi;
