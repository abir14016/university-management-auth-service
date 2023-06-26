import express from 'express';
import { StudentController } from './student.controller';
import validateRequest from '../../middlewares/validateRequest';
import { StudentValidaion } from './student.validation';

const router = express.Router();

//router for getting single student
router.get('/:id', StudentController.getSingleStudent);

//router for deleting single student
router.delete(':id', StudentController.deleteStudent);

//router for getting all students
router.get('/', StudentController.getAllStudents);

//router for updating student
router.patch(
  '/:id',
  validateRequest(StudentValidaion.updateStudentZodSchema),
  StudentController.updateStudent
);

export const StudentRoutes = router;
