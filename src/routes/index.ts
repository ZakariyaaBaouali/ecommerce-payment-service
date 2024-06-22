import { Router } from "express";
import { PaypalController } from "../controllers/paypal.controller";
import { PaymentMiddleware } from "../middlewares";
import { StripeController } from "../controllers/stripe.controller";
import { PaymentsController } from "../controllers/payments.controller";

//*🚀🚀🚀
const router = Router();
const paypalController = new PaypalController();
const paymentMiddleware = new PaymentMiddleware();
const stripeController = new StripeController();
const paymentController = new PaymentsController();

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

//*pays 🚀🚀
router.get("/pays", paymentController.getPayments);

router.get("/pays/:id", paymentController.getPaymentByID);

export { router as PaymentRouter };
