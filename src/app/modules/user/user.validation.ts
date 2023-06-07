import { z } from 'zod';

// zod validation

const createUserZodSchema = z.object({
  body: z.object({
    user: z.object({
      role: z.string({
        required_error: `role is required`,
      }),
      password: z.string().optional(),
    }),
  }),
});

// const createUserZodSchema = z.object({
//   body: z.object({
//     role: z.string({
//       required_error: 'role is required',
//     }),
//     password: z.string().optional(),
//   }),
// });

export const UserValidation = {
  createUserZodSchema,
};
