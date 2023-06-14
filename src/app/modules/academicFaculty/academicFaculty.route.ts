import express from 'express';
import { AcademicFacultyController } from './academicFaculty.controller';

const router = express.Router();

//router for creating a academic faculty
router.post('/create-faculty', AcademicFacultyController.createFaculty);

//router for getting all academic faculties
router.get('/', AcademicFacultyController.getAllFaculties);

export const AcademicFacultyRoutes = router;
