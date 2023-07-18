import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { ManagementDepartmentValidation } from './managementDepartment.validation';
import { ManagementDepartmentController } from './managementDepartment.controller';

const router = express.Router();

//router for creating a management department
router.post(
  '/create-management-department',
  validateRequest(
    ManagementDepartmentValidation.createManagementDepartmentZodSchema
  ),
  ManagementDepartmentController.createManagementDepartment
);

//router for getting single management department
router.get(
  '/:id',
  ManagementDepartmentController.getSingleManagementDepartment
);

//router for updating management department
router.patch(
  '/:id',
  validateRequest(
    ManagementDepartmentValidation.updateManagementDepartmentZodSchema
  ),
  ManagementDepartmentController.updateManagementDepartment
);

//router for getting all management departments
router.get('/', ManagementDepartmentController.getAllManagementDepartements);

export const ManagementDepartmentRoutes = router;