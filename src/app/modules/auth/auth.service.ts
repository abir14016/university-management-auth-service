import httpStatus from 'http-status';
import ApiError from '../../../errors/ApiError';
import { User } from '../user/user.model';
import {
  IChangePassword,
  ILoginUser,
  ILoginUserResponse,
  IRefreshTokenResponse,
} from './auth.interface';
import { JwtPayload, Secret } from 'jsonwebtoken';
import config from '../../../config';
import { JwtHelpers } from '../../../helpers/jwtHelpers';

const loginUser = async (payload: ILoginUser): Promise<ILoginUserResponse> => {
  const { id, password } = payload;

  //instance[user] of model[User]
  //   const user = new User();

  //access to out instance menthod
  //   const isUserExist = await user.isUserExist(id); //returns Partial<IUser>

  //check whetehr the user exist or not
  const isUserExist = await User.isUserExist(id);
  if (!isUserExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User does not exist');
  }

  //match password
  const isPasswordMatched = await User.isPasswordMatched(
    password,
    isUserExist.password
  );
  if (isUserExist.password && !isPasswordMatched) {
    throw new ApiError(httpStatus.UNAUTHORIZED, 'Password is incorrect');
  }

  const { id: userId, role, needsPasswordChange } = isUserExist;

  //create access token
  const accessToken = JwtHelpers.createToken(
    { userId, role },
    config.jwt.secret as Secret,
    config.jwt.expires_in as string
  );

  //create refresh token
  const refreshToken = JwtHelpers.createToken(
    { userId, role },
    config.jwt.refresh_secret as Secret,
    config.jwt.refresh_expires_in as string
  );

  return {
    accessToken,
    refreshToken,
    needsPasswordChange,
  };
};

const refreshToken = async (token: string): Promise<IRefreshTokenResponse> => {
  //verify token
  let verifiedToken = null;
  try {
    verifiedToken = JwtHelpers.verifyToken(
      token,
      config.jwt.refresh_secret as Secret
    );
  } catch (err) {
    throw new ApiError(httpStatus.FORBIDDEN, 'Invalid refresh token');
    // err
  }

  //check deleted user's refresh token
  const { userId } = verifiedToken;
  const isUserExist = await User.isUserExist(userId);
  if (!isUserExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User does not exist');
  }

  //generate new token
  const newAccessToken = JwtHelpers.createToken(
    {
      id: isUserExist.id,
      role: isUserExist.role,
    },
    config.jwt.secret as Secret,
    config.jwt.expires_in as string
  );

  return {
    accessToken: newAccessToken,
  };
};

const changePassword = async (
  user: JwtPayload,
  payload: IChangePassword
): Promise<void> => {
  const { userId } = user;
  const { oldPassword, newPassword } = payload;

  //checking the user exist or not
  const isUserExist = await User.findOne({ id: userId }).select('+password');

  if (!isUserExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User does not exist');
  }

  //checking old password
  const isPasswordMatched = await User.isPasswordMatched(
    oldPassword,
    isUserExist.password
  );
  if (isUserExist.password && !isPasswordMatched) {
    throw new ApiError(httpStatus.UNAUTHORIZED, 'Old Password is incorrect');
  }

  // data update
  isUserExist.password = newPassword;
  isUserExist.needsPasswordChange = false;

  // updating using save()
  isUserExist.save();
};

export const AuthService = {
  loginUser,
  refreshToken,
  changePassword,
};
