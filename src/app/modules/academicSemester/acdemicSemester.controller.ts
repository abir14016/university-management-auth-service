import { Response, Request, NextFunction } from 'express';
import { AcademicSemesterService } from './academicSemester.service';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import httpStatus from 'http-status';

const createSemester = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { ...academicsemesterData } = req.body;
    const result = await AcademicSemesterService.createSemester(
      academicsemesterData
    );

    next();

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Academic Semester is created successfully',
      data: result,
    });

    // res.status(200).json({
    //   success: true,
    //   message: 'Semester is created successfully',
    //   data: result,
    // });
  }
);

export const AcademicSemesterController = {
  createSemester,
};
