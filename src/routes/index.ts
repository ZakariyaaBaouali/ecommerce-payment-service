import { Router } from "express";
import { PaypalController } from "../controllers/paypal.controller";
import { PaymentMiddleware } from "../middlewares";

//*🚀🚀🚀
const router = Router();
const paypalController = new PaypalController();
const paymentMiddleware = new PaymentMiddleware();

//* paypal 🚀🚀
router.post(
  "/paypal/create-order",
  paymentMiddleware.verifyPaypalToken,
  paypalController.CreateOrder
);

router.get(
  "/paypal/complete",
  paymentMiddleware.verifyPaypalToken,
  paypalController.GetOrderDetails
);

router.get("/paypal/cancel", paypalController.GetOrderDetails);

//* stripe 🚀🚀🚀

export { router as PaymentRouter };
