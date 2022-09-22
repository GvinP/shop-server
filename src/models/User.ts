import { Schema, model, Types } from "mongoose";

export interface IUser {
  _id: Types.ObjectId;
  username: string;
  email: string;
  password: string;
  isAdmin: boolean;
  image: string;
  createdAt: Date;
}

const UserSchema: Schema = new Schema<IUser>(
  {
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    isAdmin: { type: Boolean, default: false },
    image: { type: String },
  },
  { timestamps: true }
);

export default model<IUser>("User", UserSchema);
