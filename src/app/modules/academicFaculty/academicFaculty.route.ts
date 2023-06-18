import express from 'express';
import { AcademicFacultyController } from './academicFaculty.controller';
import validateRequest from '../../middlewares/validateRequest';
import { AcademicFacultyValidation } from './academicFaculty.validation';

const router = express.Router();

//router for creating a academic faculty
router.post(
  '/create-faculty',
  validateRequest(AcademicFacultyValidation.createFacultyZodSchema),
  AcademicFacultyController.createFaculty
);

//router for getting a single academic faculty by id
router.get('/:id', AcademicFacultyController.getSingleFaculty);

//router for getting all academic faculties
router.get('/', AcademicFacultyController.getAllFaculties);

export const AcademicFacultyRoutes = router;
