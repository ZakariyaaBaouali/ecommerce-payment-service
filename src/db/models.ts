//🚀🚀
import { Schema, model } from "mongoose";
import { IPayment } from "../dto";

//schema 🚀🚀
const paymentSchema = new Schema<IPayment>(
  {
    email: { type: String, required: true },
    full_name: { type: String, required: true },
    address: { type: String, required: true },
    provider: { type: String, required: true },
    card_details: { type: String, default: "no data" },
    amount_total: { type: Number, required: true },
    amount_subTotal: { type: Number, required: true },
    currency: { type: String, required: true, default: "usd" },
    order_id: { type: String, default: "1212" },
    status: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

//model 🚀🚀
export const PaymentModel = model("payments", paymentSchema);
