import { Schema, model, Types } from "mongoose";

export interface ICart {
  _id: Types.ObjectId;
  user: Types.ObjectId;
  products: ICartItem[];
}

export interface ICartItem {
  _id: Types.ObjectId;
  productId: Types.ObjectId;
  quantity: number;
}

const CartSchema: Schema = new Schema<ICart>(
  {
    user: { type: Schema.Types.ObjectId, ref: "User" },
    products: [
      {
        productId: { type: Schema.Types.ObjectId, ref: "Product" },
        quantity: { type: Number, default: 1 },
      },
    ],
  },
  { timestamps: true }
);

export default model<ICart>("Cart", CartSchema);
