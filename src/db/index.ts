import mongoose from "mongoose";
import { IPayment } from "../dto";
import { PaymentModel } from "./models";
import { MONGODB_URI } from "../config";

export class PaymentRepo {
  //🚀🚀
  constructor() {
    mongoose
      .connect(MONGODB_URI || "")
      .then(() => console.log("Connect to Mongo Database 🚀🚀"))
      .catch((err) =>
        console.log(`Error with connect to Mongo Database 🚀🚀🚀 \n ${err}`)
      );
  }

  //🚀🚀
  public async CreatePayment(newPay: IPayment) {
    const data = await PaymentModel.create(newPay);
    if (!data) return null;
    return data;
  }

  //🚀🚀
  public async GetPaymentByID(payment_id: string) {
    try {
      const data = await PaymentModel.findById(payment_id);
      return data;
    } catch {
      return null;
    }
  }

  //🚀🚀
  public async GetPayments() {
    const data = await PaymentModel.find();
    return data;
  }
}
