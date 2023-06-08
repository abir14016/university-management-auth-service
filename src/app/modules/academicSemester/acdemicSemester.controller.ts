import { RequestHandler } from 'express';
import { AcademicSemesterService } from './academicSemester.service';

const createSemester: RequestHandler = async (req, res, next) => {
  try {
    const { ...academicsemesterData } = req.body;
    const result = await AcademicSemesterService.createSemester(
      academicsemesterData
    );
    res.status(200).json({
      success: true,
      message: 'Semester is created successfully',
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

export const AcademicSemesterController = {
  createSemester,
};
