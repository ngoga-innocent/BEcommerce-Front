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
  user: {
    id: number;
    username: string;
    email: string;
    phone_number: string;
    allowed_to_post: boolean;
    is_staff: boolean;
  }
}

// Register types
interface RegisterRequest {
  username: string;
  phone_number: string;
  email: string;
  password: string;

}

interface RegisterResponse {
  id: number;
  username: string;
  email: string;
  phone_number: string;

}

export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: fetchBaseQuery({ baseUrl: url }),
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
    forgotPassword: builder.mutation<{ success: boolean; message: string }, { email: string }>({
      query: (body) => ({
        url: `${url}/api/accounts/auth/forgot-password/`,
        method: "POST",
        body,
      }),
    }),

    verifyResetOTP: builder.mutation<{ success: boolean; reset_token: string }, { email: string; otp: string }>({
      query: (body) => ({
        url: `${url}/api/accounts/auth/verify-reset-otp/`,
        method: "POST",
        body,
      }),
    }),

    resetPassword: builder.mutation<{ success: boolean; message: string }, { reset_token: string; new_password: string }>({
      query: (body) => ({
        url: `${url}/api/accounts/auth/reset-password/`,
        method: "POST",
        body,
      }),
    }),

  }),
});

export const { useLoginMutation, useRegisterMutation,useForgotPasswordMutation, useVerifyResetOTPMutation, useResetPasswordMutation } = authApi;
