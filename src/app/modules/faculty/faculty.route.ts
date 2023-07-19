import express from 'express';
import { FacultyController } from './faculty.controller';
import validateRequest from '../../middlewares/validateRequest';
import { FacultyValidation } from './faculty.validation';

const router = express.Router();

//rouer for getting single faculty
router.get('/:id', FacultyController.getSingleFaculty);

//rouer for updating single faculty
router.patch(
  '/:id',
  validateRequest(FacultyValidation.updateFacultyZodSchema),
  FacultyController.updateFaculty
);

//rouer for getting all faculties
router.get('/', FacultyController.getAllFaculties);

export const FacultyRoutes = router;
