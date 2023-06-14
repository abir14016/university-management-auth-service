import express from 'express';
import { AcademicFacultyController } from './academicFaculty.controller';

const router = express.Router();

//router for creating a academic faculty
router.post('/create-faculty', AcademicFacultyController.createFaculty);

export const AcademicFacultyRoutes = router;
