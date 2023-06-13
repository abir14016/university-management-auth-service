import express from 'express';
// import { UserController } from './user.controller';
import validateRequest from '../../middlewares/validateRequest';
import { AcademicSemesterValidation } from './academicsemester.validation';
import { AcademicSemesterController } from './acdemicSemester.controller';

const router = express.Router();

//router for creating a semester
router.post(
  '/create-semester',
  validateRequest(AcademicSemesterValidation.createAcademicSemesterZodSchema),
  AcademicSemesterController.createSemester
);

//router for getting single semsester
router.get('/:id', AcademicSemesterController.getSingleSemester);

//router for update semester
// **patch[update] must be always before get all documents route**
router.patch(
  '/:id',
  validateRequest(AcademicSemesterValidation.updateAcademicSemesterZodSchema),
  AcademicSemesterController.updateSemester
);

//router for deleting single semester
router.delete('/:id', AcademicSemesterController.deleteSemester);

//router for getting all semsesters
router.get('/', AcademicSemesterController.getAllSemesters);

export const AcademicSemesterRoutes = router;
