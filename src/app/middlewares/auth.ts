import { NextFunction, Request, Response } from 'express';
import ApiError from '../../errors/ApiError';
import httpStatus from 'http-status';
import { JwtHelpers } from '../../helpers/jwtHelpers';
import config from '../../config';
import { Secret } from 'jsonwebtoken';

//middleware for authorizing protected resources in route level [role-based authorization]
const auth =
  (...requiredRoles: string[]) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      //get authorization token
      const token = req.headers.authorization;

      //check whether the token is exist or not
      if (!token) {
        throw new ApiError(httpStatus.UNAUTHORIZED, 'You are not authorized !');
      }

      //verify token
      let verifiedUser = null;
      verifiedUser = JwtHelpers.verifyToken(token, config.jwt.secret as Secret);
      req.user = verifiedUser; //role, userId

      //set guard if not authorized
      if (requiredRoles.length && !requiredRoles.includes(verifiedUser.role)) {
        throw new ApiError(httpStatus.FORBIDDEN, 'Forbidden');
      }

      //if authorized, send to controller
      next();
    } catch (error) {
      next(error); //if error occured, send to global Error handler
    }
  };

export default auth;
