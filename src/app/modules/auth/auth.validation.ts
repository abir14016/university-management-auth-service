import { z } from 'zod';

//login zod schema
const loginZodSchema = z.object({
  body: z.object({
    id: z.string({
      required_error: 'ID is required !',
    }),
    password: z.string({
      required_error: 'Password is required !',
    }),
  }),
});

//refresh token zod schema
const refreshTokenZodSchema = z.object({
  cookies: z.object({
    refreshToken: z.string({
      required_error: 'Refresh Token is required',
    }),
  }),
});

export const AuthValidation = {
  loginZodSchema,
  refreshTokenZodSchema,
};
