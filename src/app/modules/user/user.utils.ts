import { IAcademicSemester } from '../academicSemester/academicSemester.interface';
import { User } from './user.model';

//find last student id from database
export const findLastStudentId = async (): Promise<string | undefined> => {
  const lastStudent = await User.findOne({ role: 'student' }, { id: 1, _id: 0 })
    .sort({
      createdAt: -1,
    })
    .lean();

  return lastStudent?.id ? lastStudent.id.substring(4) : undefined;
};

//generate student custom id
export const generateStudentId = async (
  academicSemester: IAcademicSemester
): Promise<string> => {
  const currentId =
    (await findLastStudentId()) || (0).toString().padStart(5, '0');

  //increment by 1
  let incrementedId = (parseInt(currentId) + 1).toString().padStart(5, '0');
  incrementedId = `${academicSemester.year.substring(2)}${
    academicSemester.code
  }${incrementedId}`;

  return incrementedId;
};

//find last faculty id from database
export const findLastFacultyId = async (): Promise<string | undefined> => {
  const lastFaculty = await User.findOne(
    { role: 'faculty' },
    { id: true, _id: false }
  )
    .sort({
      createdAt: -1,
    })
    .lean();

  return lastFaculty?.id ? lastFaculty.id.substring(2) : undefined;
};

//generate faculty custom id
export const generateFacultyId = async (): Promise<string> => {
  const currentID =
    (await findLastFacultyId()) || (0).toString().padStart(5, '0');
  let incrementedId = (parseInt(currentID) + 1).toString().padStart(5, '0');
  incrementedId = `F-${incrementedId}`;

  return incrementedId;
};
