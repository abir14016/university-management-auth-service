import { RequestHandler } from 'express';
import { UserService } from './user.service';

const createUser: RequestHandler = async (req, res, next) => {
  try {
    const { user } = req.body;
    const result = await UserService.createUser(user);
    res.status(200).json({
      success: true,
      message: 'user created successfully',
      data: result,
    });
  } catch (error) {
    next(error);

    // res.status(400).json({
    // error: error,
    // success: false,
    // message: 'Failes to create user',
    // });
  }
};

export const UserController = {
  createUser,
};
