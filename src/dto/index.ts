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
