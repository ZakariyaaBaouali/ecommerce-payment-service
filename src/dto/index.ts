export interface IShoppingCart {
  product_id: number;
  quantity: number;
}

export interface IProduct {
  id: number;
  name: string;
  description: string;
  avatar: string;
  price: number;
}

//🚀🚀
export interface IPayment {
  email: string;
  full_name: string;
  address: string; //json -> STRING
  provider: string; // stripe - paypal
  card_details?: string; //json -> STRING
  amount_total: number;
  amount_subTotal: number;
  currency?: string;
  order_id?: string; //this is for future plans
  status: string;
}
