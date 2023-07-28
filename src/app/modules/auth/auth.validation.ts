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

//refresh token zod schema
const changePasswordZodSchema = z.object({
  body: z.object({
    oldPassword: z.string({
      required_error: 'Old password is required',
    }),
    newPassword: z.string({
      required_error: 'New password is required',
    }),
  }),
});

export const AuthValidation = {
  loginZodSchema,
  refreshTokenZodSchema,
  changePasswordZodSchema,
};
