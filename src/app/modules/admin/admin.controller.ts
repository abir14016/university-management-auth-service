import { Request, Response } from 'express';
import catchAsync from '../../../shared/catchAsync';
import pick from '../../../shared/pick';
import { adminFilterableFields } from './admin.constant';
import { paginationFields } from '../../../constants/pagination';
import { AdminService } from './admin.service';
import sendResponse from '../../../shared/sendResponse';
import { IAdmin } from './admin.interface';
import httpStatus from 'http-status';

const getAllAdmins = catchAsync(async (req: Request, res: Response) => {
  const filters = pick(req.query, adminFilterableFields);
  const paginationOptions = pick(req.query, paginationFields);

  const result = await AdminService.getAllAdmins(filters, paginationOptions);

  sendResponse<IAdmin[]>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Admins retrieved successfully !',
    meta: result.meta,
    data: result.data,
  });
});

export const AdminController = {
  getAllAdmins,
};
