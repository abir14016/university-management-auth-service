import { SortOrder } from 'mongoose';
import { PaginationHelpers } from '../../../helpers/paginationHelper';
import { IGenericResponse } from '../../../interfaces/common';
import { IPaginationOptions } from '../../../interfaces/pagination';
import { facultySearchableFields } from './faculty.constant';
import { IFaculty, IFacultyFilters } from './faculty.interface';
import { Faculty } from './faculty.model';

//get all faculties with pagination, searching & filtering function
const getAllFaculties = async (
  filters: IFacultyFilters,
  paginationOptions: IPaginationOptions
): Promise<IGenericResponse<IFaculty[]>> => {
  const { searchTerm, ...filtersData } = filters;
  const { page, limit, skip, sortBy, sortOrder } =
    PaginationHelpers.calculatePagination(paginationOptions);
  const andConditions = [];

  if (searchTerm) {
    andConditions.push({
      $or: facultySearchableFields.map(field => ({
        [field]: {
          $regex: searchTerm,
          $options: 'i',
        },
      })),
    });
  }

  if (Object.keys(filtersData).length) {
    andConditions.push({
      $and: Object.entries(filtersData).map(([field, value]) => ({
        [field]: value,
      })),
    });
  }

  const sortConditions: { [key: string]: SortOrder } = {};

  if (sortBy && sortOrder) {
    sortConditions[sortBy] = sortOrder;
  }
  const whereConditions =
    andConditions.length > 0 ? { $and: andConditions } : {};

  const result = await Faculty.find(whereConditions)
    .populate('academicDepartment')
    .populate('academicFaculty')
    .sort(sortConditions)
    .skip(skip)
    .limit(limit);

  const total = await Faculty.countDocuments(whereConditions);

  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  };
};

// ===============================//
// const getSingleFaculty = async (
//   id: string | Types.ObjectId
// ): Promise<IFaculty | null> => {
//   // Check if the provided id is a valid ObjectId
//   const isObjectId = isValidObjectId(id);

//   let query;

//   if (isObjectId) {
//     // If it's a valid ObjectId, search by _id
//     query = { _id: id };
//   } else {
//     // If it's a custom id, search by the custom id field (e.g., 'customIdField')
//     query = { id: id };
//   }

//   const result = await Faculty.findOne(query)
//     .populate('academicDepartment')
//     .populate('academicFaculty');

//   return result;
// };
// ===============================//

//get single faculty with custom id
const getSingleFaculty = async (id: string): Promise<IFaculty | null> => {
  const result = await Faculty.findOne({ id })
    .populate('academicDepartment')
    .populate('academicFaculty');

  return result;
};

export const FacultyService = {
  getAllFaculties,
  getSingleFaculty,
};
