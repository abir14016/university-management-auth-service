import { z } from 'zod';

//zod validation(schema) while creating a academic faculty
const createFacultyZodSchema = z.object({
  body: z.object({
    title: z.string({
      required_error: 'title is required',
    }),
  }),
});

export const AcademicFacultyValidation = {
  createFacultyZodSchema,
};
