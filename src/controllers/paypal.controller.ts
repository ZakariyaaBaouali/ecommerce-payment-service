import { Request, Response } from "express";
import { PaypalService } from "../services/paypal.service";
import { IShoppingCart } from "../dto";

const paypalService = new PaypalService();

//🚀🚀
export class PaypalController {
  //
  constructor() {}

  //🚀🚀
  public async CreateOrder(req: Request, res: Response) {
    const cart = <IShoppingCart[]>req.body;
    const token = req.paypal_token as string;
    const createIntent = await paypalService.CreateIntent(cart);
    const pay_url = await paypalService.CreateOrder(token, createIntent);
    if (!pay_url)
      return res
        .status(400)
        .send({ message: `can't create a checkout url 🚀🚀` });
    return res
      .status(200)
      .send({ message: "created checkout url 🚀🚀", url: pay_url });
  }

  //🚀🚀
  public async GetOrderDetails(req: Request, res: Response) {
    const token = req.paypal_token as string;
    const order_id = req.query.token as string;
    const details = await paypalService.getOrderDetails(token, order_id);
    if (!details)
      return res
        .status(400)
        .send({ message: `can't checkout details with id ${order_id} 🚀🚀` });
    return res.status(200).send(details);
  }

  //🚀🚀
  public async handleFailedPayment(req: Request, res: Response) {
    return res
      .status(400)
      .send({ message: `failed to make this payment with paypal 🚀🚀` });
  }
}
