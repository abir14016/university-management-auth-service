import express from 'express';
import { FacultyController } from './faculty.controller';

const router = express.Router();

//rouer for getting single faculty
router.get('/:id', FacultyController.getSingleFaculty);

//rouer for getting all faculties
router.get('/', FacultyController.getAllFaculties);

export const FacultyRoutes = router;
