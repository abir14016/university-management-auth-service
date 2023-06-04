import { Request, Response } from 'express';
import usersService from './users.service';

const createUser = async (req: Request, res: Response) => {
  try {
    const { user } = req.body;
    const result = await usersService.createUser(user);
    console.log(result);
    res.status(200).json({
      success: true,
      message: 'user created successfully',
      data: result,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'Failes to create user',
    });
  }
};

export default {
  createUser,
};
