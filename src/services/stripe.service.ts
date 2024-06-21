import Stripe from "stripe";
import { PORT, STRIPE_SECRET_KEY } from "../config";
import { IShoppingCart } from "../dto";
import { StripeProductItem } from "../dto/stripe.dto";
import { productDB } from "../../mockData";

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
      return details;
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
