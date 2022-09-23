import { Schema, model, Types } from "mongoose";
import { ICartItem } from "./Cart";

export interface IOrder {
  _id: Types.ObjectId;
  user: Types.ObjectId;
  products: ICartItem[];
  amount: number;
  address: IAddress;
  status: "Pending" | "Approved" | "Decliend";
}

export interface IAddress {
  city: string;
}

const OrderSchema: Schema = new Schema<IOrder>(
  {
    user: { type: Schema.Types.ObjectId, ref: "User" },
    products: [
      {
        productId: { type: Schema.Types.ObjectId, ref: "Product" },
        quantity: { type: Number, default: 1 },
      },
    ],
    amount: { type: Number, required: true },
    address: { type: Object, required: true },
    status: { type: String, default: "Pending" },
  },
  { timestamps: true }
);

export default model<IOrder>("Order", OrderSchema);
