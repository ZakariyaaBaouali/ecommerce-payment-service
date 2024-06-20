import { NextFunction, Request, Response } from "express";
import { PaypalService } from "../services/paypal.service";

const paypalService = new PaypalService();

class PaymentMiddleware {
  //
  constructor() {}

  //
  public async verifyPaypalToken(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    if (req.paypal_token) next();

    //
    const token = await paypalService.CreateToken();
    if (!token)
      return res.status(400).send({ message: `can't create a paypal token!` });

    req.paypal_token = token;
    next();
  }
}

export { PaymentMiddleware };
