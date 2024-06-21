import { Router } from "express";
import { PaypalController } from "../controllers/paypal.controller";
import { PaymentMiddleware } from "../middlewares";
import { StripeController } from "../controllers/stripe.controller";

//*🚀🚀🚀
const router = Router();
const paypalController = new PaypalController();
const paymentMiddleware = new PaymentMiddleware();
const stripeController = new StripeController();

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

router.get("/paypal/cancel", paypalController.handleFailedPayment);

//* stripe 🚀🚀🚀
router.post("/stripe/create-order", stripeController.CreateCheckout);

router.get("/stripe/complete", stripeController.GetCheckoutDetails);

router.get("/stripe/cancel", stripeController.handleFailedPayment);

export { router as PaymentRouter };
