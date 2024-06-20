import axios from "axios";
import {
  PAYPAL_BASE_URL,
  PAYPAL_CLIENT_ID,
  PAYPAL_SECRET_ID,
  PORT,
} from "../config";
import {
  PaypalChckoutResult,
  PaypalIntent,
  PaypalOrderItem,
  PaypalPayLinks,
  PaypalToken,
} from "../dto/paypal.dto";
import { IShoppingCart } from "../dto";
import { productDB } from "../../mockData";

//🚀🚀
class PaypalService {
  private totalAmount = 0;

  //
  constructor() {}

  //create token 🚀🚀
  public async CreateToken(): Promise<string | null> {
    const paypal_url = `${PAYPAL_BASE_URL}/v1/oauth2/token`;
    const paypal_user = PAYPAL_CLIENT_ID ? PAYPAL_CLIENT_ID : "";
    const paypal_password = PAYPAL_SECRET_ID ? PAYPAL_SECRET_ID : "";
    //
    const response = await axios({
      url: paypal_url,
      method: "post",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      data: "grant_type=client_credentials",
      auth: {
        username: paypal_user,
        password: paypal_password,
      },
    });

    //
    if (response) {
      const { access_token } = response.data as PaypalToken;
      return access_token;
    }
    return null;
  }

  //create order 🚀🚀
  public async CreateOrder(
    token: string,
    data: PaypalIntent
  ): Promise<string | null> {
    const paypal_url = `${PAYPAL_BASE_URL}/v2/checkout/orders`;
    //
    const response = await axios({
      url: paypal_url,
      method: "post",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      data: JSON.stringify(data),
    });

    //
    if (response) {
      const { links } = response.data as PaypalPayLinks;
      const pay_url = links.filter((link) => link.rel === "approve")[0].href;
      return pay_url;
    }
    return null;
  }

  //get order details 🚀🚀
  public async getOrderDetails(
    token: string,
    order_id: string
  ): Promise<PaypalChckoutResult | null> {
    const paypal_url = `${PAYPAL_BASE_URL}/v2/checkout/orders/${order_id}/capture`;
    //
    const response = await axios({
      url: paypal_url,
      method: "post",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    //
    if (response) {
      return response.data as PaypalChckoutResult;
    }
    return null;
  }

  //create product item as paypal schema 🚀🚀
  public async CreateProduct(
    product_id: number,
    quantity: number
  ): Promise<PaypalOrderItem> {
    //
    const res = productDB.find((prod) => prod.id === product_id);
    const product: PaypalOrderItem = {
      name: res ? res.name : "",
      description: res ? res.description : "",
      quantity: `${quantity}`,
      unit_amount: {
        currency_code: "USD",
        value: res ? `${res.price}` : "",
      },
    };
    if (res) {
      this.totalAmount += res.price * quantity;
    }
    return product;
  }

  //🚀🚀🚀
  public async CreateIntent(cartList: IShoppingCart[]): Promise<PaypalIntent> {
    const { length } = cartList;
    const intentItems: PaypalOrderItem[] = [];
    //
    for (let i = 0; i < length; i++) {
      const { product_id, quantity } = cartList[i];
      const product = await this.CreateProduct(product_id, quantity);
      //
      intentItems.push(product);
    }
    //
    const intent: PaypalIntent = {
      intent: "CAPTURE",
      purchase_units: [
        {
          items: intentItems,
          amount: {
            currency_code: "USD",
            value: `${this.totalAmount}`,
            breakdown: {
              item_total: {
                currency_code: "USD",
                value: `${this.totalAmount}`,
              },
            },
          },
        },
      ],
      application_context: {
        return_url: `http://localhost:${PORT}/api/pay/paypal/complete`,
        cancel_url: `http://localhost:${PORT}/api/pay/paypal/cancel`,
        user_action: "PAY_NOW",
      },
    };
    //
    this.totalAmount = 0;
    return intent;
  }
}

///
export { PaypalService };
