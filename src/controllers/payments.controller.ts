import { Request, Response } from "express";
import { paymentDB } from "..";

//

export class PaymentsController {
  //🚀🚀
  constructor() {}

  //get pays
  public async getPayments(req: Request, res: Response) {
    const data = await paymentDB.GetPayments();
    if (!data)
      return res
        .status(400)
        .send({ message: "no payments data available 🚀🚀" });
    return res.status(200).send(data);
  }

  //get pay by id
  public async getPaymentByID(req: Request, res: Response) {
    const payID = req.params.id as string;
    const data = await paymentDB.GetPaymentByID(payID);
    if (!data)
      return res
        .status(400)
        .send({ message: `no payment data available for ID :  ${payID} 🚀🚀` });
    return res.status(200).send(data);
  }
}
