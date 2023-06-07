import { Schema, model } from 'mongoose';
import { IUser, UserModel } from './user.interface';

//schema corresponding to interface
const userSchema = new Schema<IUser>(
  {
    id: {
      type: String,
      required: true,
      unique: true,
    },
    role: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

//model
export const User = model<IUser, UserModel>('User', userSchema);
