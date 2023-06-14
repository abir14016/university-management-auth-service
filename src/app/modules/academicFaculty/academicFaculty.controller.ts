import { Request, Response } from 'express';
import catchAsync from '../../../shared/catchAsync';
import { AcademicFacultyService } from './acdemicFaculty.service';
import sendResponse from '../../../shared/sendResponse';
import { IAcademicFaculty } from './academicFaculty.interface';
import httpStatus from 'http-status';

//controller for creating a academic faculty
const createFaculty = catchAsync(async (req: Request, res: Response) => {
  const { ...academicFacultyData } = req.body;
  const result = await AcademicFacultyService.createFaculty(
    academicFacultyData
  );

  sendResponse<IAcademicFaculty>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Academic Semester is created successfully',
    data: result,
  });
});

//controller for getting all faculties
const getAllFaculties = catchAsync(async (req: Request, res: Response) => {
  const result = await AcademicFacultyService.getAllFaculties();

  sendResponse<IAcademicFaculty[]>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Academic faculties are retrived successfully',
    data: result,
  });
});

export const AcademicFacultyController = {
  createFaculty,
  getAllFaculties,
};
