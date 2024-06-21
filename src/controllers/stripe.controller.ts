import { Request, Response } from "express";
import { StripeService } from "../services/stripe.service";
import { IShoppingCart } from "../dto";

const stripeService = new StripeService();

export class StripeController {
  //🚀🚀
  constructor() {}

  //🚀🚀🚀🚀
  public async CreateCheckout(req: Request, res: Response) {
    const carts = <IShoppingCart[]>req.body;
    const checkout_url = await stripeService.CreateCheckout(carts);
    //return res.send(checkout_url);
    if (!checkout_url)
      return res
        .status(400)
        .send({ message: `can't create a checkout url 🚀🚀` });
    return res
      .status(200)
      .send({ message: "created checkout url 🚀🚀", url: checkout_url });
  }

  //🚀🚀
  public async GetCheckoutDetails(req: Request, res: Response) {
    const session_id = req.query.session_id as string;
    const details = await stripeService.GetCheckoutDetails(session_id);
    if (!details)
      return res
        .status(400)
        .send({ message: `can't get checkout details with id ${session_id}` });
    return res.status(200).send(details);
  }

  //🚀🚀
  public async handleFailedPayment(req: Request, res: Response) {
    return res
      .status(400)
      .send({ message: `failed to make this payment with stripe 🚀🚀` });
  }
}
