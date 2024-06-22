import Stripe from "stripe";
import { PORT, STRIPE_SECRET_KEY } from "../config";
import { IPayment, IShoppingCart } from "../dto";
import { StripePaymentIntent, StripeProductItem } from "../dto/stripe.dto";
import { productDB } from "../../mockData";
import { paymentDB } from "..";

//🚀🚀
const key = STRIPE_SECRET_KEY || "";
const stripe = new Stripe(key);

//🚀🚀
class StripeService {
  //🚀🚀
  constructor() {}

  //🚀🚀
  public async CreateCheckout(
    cartItems: IShoppingCart[]
  ): Promise<string | null> {
    //🚀🚀
    const items = await this.CreateLineItems(cartItems);
    //🚀🚀
    const session = await stripe.checkout.sessions.create({
      line_items: items,
      shipping_address_collection: {
        allowed_countries: ["MA", "US", "CA", "DE"],
      },
      mode: "payment",
      success_url: `http://localhost:${PORT}/api/pay/stripe/complete?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `http://localhost:${PORT}/api/pay/stripe/cancel`,
    });
    if (session) {
      return session.url;
    }
    return null;
  }

  //🚀🚀
  public async GetCheckoutDetails(session_id: string) {
    const details = await stripe.checkout.sessions.retrieve(session_id, {
      expand: ["payment_intent.payment_method"],
    });
    if (details) {
      //create new pay 🚀🚀
      const email = details.customer_details?.email;
      const full_name = details.customer_details?.name;
      const address = details.customer_details?.address;
      const status = details.status;
      const total = details.amount_total;
      const subTotal = details.amount_subtotal;
      const payment_intent = details?.payment_intent as StripePaymentIntent;
      const { brand, country, exp_month, exp_year, last4 } =
        payment_intent.payment_method.card;
      //
      const newPay = {
        email: email ? email : "",
        full_name: full_name ? full_name : "",
        address: JSON.stringify(address),
        amount_total: total ? total : 0,
        amount_subTotal: subTotal ? subTotal : 0,
        provider: "STRIPE",
        status: status ? status : "",
        card_details: JSON.stringify({
          brand,
          country,
          exp_month,
          exp_year,
          last4,
        }),
      };
      const res = await paymentDB.CreatePayment(newPay);
      return res;
    }
    return null;
  }

  //🚀🚀
  private async CreateLineItems(
    cartItems: IShoppingCart[]
  ): Promise<StripeProductItem[]> {
    const { length } = cartItems;
    const lineItems: StripeProductItem[] = [];
    //🚀🚀
    for (let i = 0; i < length; i++) {
      const { product_id, quantity } = cartItems[i];
      const product = await this.GetProduct(product_id);
      lineItems.push({
        price_data: {
          currency: "usd",
          unit_amount: product ? product.price * 100 : 0,
          product_data: {
            name: product?.name || "",
            description: product?.description || "",
            images: [product?.avatar || ""],
            metadata: {
              id: product?.id || 0,
            },
          },
        },
        quantity,
      });
    }
    //🚀🚀
    return lineItems;
  }

  //🚀🚀
  private async GetProduct(product_id: number) {
    const product = productDB.find((prod) => prod.id === product_id);
    return product;
  }
}

export { StripeService };
