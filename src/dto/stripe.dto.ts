//
export interface StripeProductItem {
  price_data: {
    currency: string;
    unit_amount: number;
    product_data: {
      name: string;
      description: string;
      images: [string];
      metadata: {
        id: number;
      };
    };
  };
  quantity: number;
}
