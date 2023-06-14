import { IAcademicFaculty } from './academicFaculty.interface';
import { AcademicFaculty } from './academicFaculty.model';

//create academic faculty function
const createFaculty = async (
  payload: IAcademicFaculty
): Promise<IAcademicFaculty> => {
  const result = AcademicFaculty.create(payload);
  return result;
};

//get all academic faculties function
const getAllFaculties = async () => {
  const result = await AcademicFaculty.find({});
  return result;
};

export const AcademicFacultyService = {
  createFaculty,
  getAllFaculties,
};
