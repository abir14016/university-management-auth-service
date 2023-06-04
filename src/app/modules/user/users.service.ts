//business logics in this file
//req, res is not handled in service file

import config from '../../../config/index';
import { IUser } from './users.interface';
import { User } from './users.model';
import { generateUserId } from './users.utils';

const createUser = async (user: IUser): Promise<IUser | null> => {
  //auto generated incremented id
  const id = await generateUserId();
  user.id = id;

  //default password
  if (!user.password) {
    user.password = config.default_user_pass as string; //question
  }

  const createdUser = await User.create(user);

  if (!createUser) {
    throw new Error('Failed to create user');
  }

  return createdUser;
};

export default {
  createUser,
};
