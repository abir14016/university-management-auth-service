import { SortOrder } from 'mongoose';
import { PaginationHelpers } from '../../../helpers/paginationHelper';
import { IPaginationOptions } from '../../../interfaces/pagination';
import { academicFacultySearchAbleFields } from './academicFaculty.constant';
import {
  IAcademicFaculty,
  IAcademicFacultyFilters,
} from './academicFaculty.interface';
import { AcademicFaculty } from './academicFaculty.model';
import { IGenericResponse } from '../../../interfaces/common';

//create academic faculty function
const createFaculty = async (
  payload: IAcademicFaculty
): Promise<IAcademicFaculty | null> => {
  const result = AcademicFaculty.create(payload);
  return result;
};

//get all academic faculties function
const getAllFaculties = async (
  filters: IAcademicFacultyFilters,
  paginationOptions: IPaginationOptions
): Promise<IGenericResponse<IAcademicFaculty[]>> => {
  const { searchTerm, ...filtersData } = filters;

  const { page, limit, skip, sortBy, sortOrder } =
    PaginationHelpers.calculatePagination(paginationOptions);

  const andConditions = [];

  if (searchTerm) {
    andConditions.push({
      $or: academicFacultySearchAbleFields.map(field => ({
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

  const result = await AcademicFaculty.find(whereConditions)
    .sort(sortConditions)
    .skip(skip)
    .limit(limit);

  const total = await AcademicFaculty.countDocuments();

  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  };
};

//get single faculty function
const getSingleFaculty = async (
  id: string
): Promise<IAcademicFaculty | null> => {
  const result = AcademicFaculty.findById(id);
  return result;
};

export const AcademicFacultyService = {
  createFaculty,
  getAllFaculties,
  getSingleFaculty,
};
