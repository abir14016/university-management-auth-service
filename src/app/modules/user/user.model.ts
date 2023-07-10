import { Schema, model } from 'mongoose';
import { IUser, UserModel } from './user.interface';

//schema corresponding to interface
const UserSchema = new Schema<IUser>(
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
    student: {
      type: Schema.Types.ObjectId,
      ref: 'Student',
    },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  }
);

//model
export const User = model<IUser, UserModel>('User', UserSchema);
