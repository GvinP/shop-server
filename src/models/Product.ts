import { Schema, model, Types } from "mongoose";

export interface IProduct {
  _id: Types.ObjectId;
  title: string;
  description: string;
  image: string;
  categories: string[];
  size: string[];
  color: string[];
  price: number;
  inStock: boolean;
  createdAt: Date;
}

const ProductSchema: Schema = new Schema<IProduct>(
  {
    title: { type: String, required: true, unique: true },
    description: { type: String, required: true },
    image: { type: String, required: true },
    categories: { type: [String], required: true },
    size: { type: [String] },
    color: { type: [String] },
    price: { type: Number, required: true },
    inStock: {type: Boolean, default: true},
  },
  { timestamps: true }
);

export default model<IProduct>("Product", ProductSchema);
