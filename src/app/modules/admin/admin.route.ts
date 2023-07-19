import express from 'express';
import { AdminController } from './admin.controller';
import validateRequest from '../../middlewares/validateRequest';
import { AdminValidation } from './admin.validation';
const router = express.Router();

//router for getting single admin
router.get('/:id', AdminController.getSingleAdmin);

//router for apdating single admin
router.patch(
  '/:id',
  validateRequest(AdminValidation.updateAdminZodSchema),
  AdminController.updateAdmin
);

//router for getting all admins
router.get('/', AdminController.getAllAdmins);

export const AdminRoutes = router;
