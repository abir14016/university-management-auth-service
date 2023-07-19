import express from 'express';
import { AdminController } from './admin.controller';
const router = express.Router();

//router for getting single admin
router.get('/:id', AdminController.getSingleAdmin);

//router for getting all admins
router.get('/', AdminController.getAllAdmins);

export const AdminRoutes = router;
