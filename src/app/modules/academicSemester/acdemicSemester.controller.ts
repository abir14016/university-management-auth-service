import { Response, Request } from 'express';
import { AcademicSemesterService } from './academicSemester.service';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import httpStatus from 'http-status';
import pick from '../../../shared/pick';
import { paginationFields } from '../../../constants/pagination';
import { IAcademicSemester } from './academicSemester.interface';
import { academicSemesterFilterAbleFields } from './academicSemester.constant';

//controller for creating a semsester
const createSemester = catchAsync(async (req: Request, res: Response) => {
  const { ...academicsemesterData } = req.body;
  const result = await AcademicSemesterService.createSemester(
    academicsemesterData
  );

  sendResponse<IAcademicSemester>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Academic Semester is created successfully',
    data: result,
  });

  // next();
});

//controller for getting all semsesters
const getAllSemesters = catchAsync(async (req: Request, res: Response) => {
  const filters = pick(req.query, academicSemesterFilterAbleFields);
  const paginationOptions = pick(req.query, paginationFields);

  const result = await AcademicSemesterService.getAllSemesters(
    filters,
    paginationOptions
  );

  sendResponse<IAcademicSemester[]>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Academic Semesters retrived successfully',
    meta: result.meta,
    data: result.data,
  });

  // next();
});

//controller for getting single semester
const getSingleSemester = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;

  const result = await AcademicSemesterService.getSingleSemester(id);

  sendResponse<IAcademicSemester>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'SIngle Academic Semester retrived successfully',
    data: result,
  });

  // next();
});

//controller for update semester
const updateSemester = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const updatedData = req.body;

  const result = await AcademicSemesterService.updateSemester(id, updatedData);

  sendResponse<IAcademicSemester>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Academic Semester updated successfully',
    data: result,
  });

  // next();
});

export const AcademicSemesterController = {
  createSemester,
  getAllSemesters,
  getSingleSemester,
  updateSemester,
};
