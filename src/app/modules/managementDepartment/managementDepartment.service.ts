import { IManagementDepartment } from './managementDepartment.interface';
import { ManagementDepartment } from './managementDepartment.model';

//create management department function
const createManagementDepartment = async (
  payload: IManagementDepartment
): Promise<IManagementDepartment | null> => {
  const result = ManagementDepartment.create(payload);

  return result;
};

export const ManagementDepartmentService = {
  createManagementDepartment,
};
