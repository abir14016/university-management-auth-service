import { Request, Response } from 'express';
import catchAsync from '../../../shared/catchAsync';
import { ManagementDepartmentService } from './managementDepartment.service';
import sendResponse from '../../../shared/sendResponse';
import { IManagementDepartment } from './managementDepartment.interface';
import httpStatus from 'http-status';

//controller for creating a management department
const createManagementDepartment = catchAsync(
  async (req: Request, res: Response) => {
    const { ...managementDepartment } = req.body;
    const result = await ManagementDepartmentService.createManagementDepartment(
      managementDepartment
    );

    sendResponse<IManagementDepartment>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Management department created successfully',
      data: result,
    });
  }
);

export const ManagementDepartmentController = {
  createManagementDepartment,
};
