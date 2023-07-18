import { Request, Response } from 'express';
import catchAsync from '../../../shared/catchAsync';
import { ManagementDepartmentService } from './managementDepartment.service';
import sendResponse from '../../../shared/sendResponse';
import { IManagementDepartment } from './managementDepartment.interface';
import httpStatus from 'http-status';
import pick from '../../../shared/pick';
import { managementDepartmentFilterableFields } from './managementDepartment.constant';
import { paginationFields } from '../../../constants/pagination';

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

//controller for getting all management departments with pagination, searching and filtering
const getAllManagementDepartements = catchAsync(
  async (req: Request, res: Response) => {
    const filters = pick(req.query, managementDepartmentFilterableFields);
    const paginationOptions = pick(req.query, paginationFields);

    const result =
      await ManagementDepartmentService.getAllManagementDepartments(
        filters,
        paginationOptions
      );

    sendResponse<IManagementDepartment[]>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Management departments retrieved successfully',
      meta: result.meta,
      data: result.data,
    });
  }
);

//controller for getting single management department by id
const getSingleManagementDepartment = catchAsync(
  async (req: Request, res: Response) => {
    const { id } = req.params;
    const result =
      await ManagementDepartmentService.getSingleManagementDepartment(id);

    sendResponse<IManagementDepartment>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Management department retieved successfully',
      data: result,
    });
  }
);

//controller for updating single management department
const updateManagementDepartment = catchAsync(
  async (req: Request, res: Response) => {
    const { id } = req.params;
    const { ...updatedData } = req.body;

    const result = await ManagementDepartmentService.updateManagementDepartment(
      id,
      updatedData
    );

    sendResponse<IManagementDepartment>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Management department updated successfully',
      data: result,
    });
  }
);

//controller for deleting management department
const deleteManagementDepartment = catchAsync(
  async (req: Request, res: Response) => {
    const { id } = req.params;
    const result = await ManagementDepartmentService.deleteManagementDepartment(
      id
    );

    sendResponse<IManagementDepartment>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Management department deleted successfully',
      data: result,
    });
  }
);

export const ManagementDepartmentController = {
  createManagementDepartment,
  getAllManagementDepartements,
  getSingleManagementDepartment,
  updateManagementDepartment,
  deleteManagementDepartment,
};
